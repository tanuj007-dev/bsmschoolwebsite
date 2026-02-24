import { NextResponse } from "next/server";
import { list, put, del } from "@vercel/blob";
import { cookies } from "next/headers";

// Ensure this route is never statically cached (fresh gallery data).
export const dynamic = "force-dynamic";

const INDEX_PATH = "gallery/index.json";

const NO_STORE_HEADERS = {
  "Cache-Control": "private, no-store, no-cache, max-age=0, must-revalidate",
  Pragma: "no-cache",
};

async function getCurrentList() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const { blobs } = await list({ prefix: "gallery/" });

    // ── Step 1: load the index.json (manually managed list) ──
    const indexBlob = blobs.find((b) => b.pathname === INDEX_PATH);
    let indexedList = [];
    if (indexBlob?.url) {
      try {
        const res = await fetch(indexBlob.url, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          indexedList = Array.isArray(data) ? data : [];
        }
      } catch (_) { }
    }

    // ── Step 2: also surface any blob image files NOT in the index
    //    (e.g. images uploaded directly via the Vercel dashboard) ──
    const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg"]);
    const indexedUrls = new Set(indexedList.map((e) => e.src));
    const unindexed = blobs
      .filter((b) => {
        if (b.pathname === INDEX_PATH) return false;
        const ext = b.pathname.slice(b.pathname.lastIndexOf(".")).toLowerCase();
        return IMAGE_EXTS.has(ext) && !indexedUrls.has(b.url);
      })
      .map((b) => {
        const filename = b.pathname.slice(b.pathname.lastIndexOf("/") + 1);
        const nameWithoutExt = filename.slice(0, filename.lastIndexOf(".")) || filename;
        return {
          id: b.pathname,
          src: b.url,
          category: "Events", // default for pre-existing blobs
          title: nameWithoutExt.replace(/[-_]+/g, " ").trim(),
          desc: "",
          createdAt: b.uploadedAt || new Date().toISOString(),
        };
      });

    return [...indexedList, ...unindexed];
  } catch (err) {
    console.error("[getCurrentList]", err);
    return [];
  }
}

async function writeList(list) {
  await put(INDEX_PATH, JSON.stringify(list), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

function requireAuth() {
  return cookies().then((c) => {
    const session = c.get("bsm_admin_session");
    if (!session?.value) return { error: "Unauthorized", status: 401 };
    return null;
  });
}

/**
 * GET /api/gallery
 * Returns gallery images from Vercel Blob only. No static/seed fallback.
 */
export async function GET() {
  try {
    const data = await getCurrentList();
    return NextResponse.json(data, { headers: NO_STORE_HEADERS });
  } catch (err) {
    console.error("[GET /api/gallery]", err);
    return NextResponse.json([], { headers: NO_STORE_HEADERS });
  }
}

/**
 * PUT /api/gallery
 * Save a fully reordered array of gallery images (admin reorder feature).
 * Body: { images: [{id, src, category, title, desc, createdAt}, ...] }
 */
export async function PUT(request) {
  const auth = await requireAuth();
  if (auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Gallery storage not configured. Set BLOB_READ_WRITE_TOKEN." },
      { status: 503 }
    );
  }
  try {
    const body = await request.json();
    const images = body?.images;
    if (!Array.isArray(images)) {
      return NextResponse.json({ error: "images array required" }, { status: 400 });
    }
    // Sanitise — keep only known fields so we don't corrupt the store
    const sanitised = images.map((img) => ({
      id: String(img.id || ""),
      src: String(img.src || ""),
      category: String(img.category || "Other"),
      title: String(img.title || ""),
      desc: String(img.desc || ""),
      createdAt: img.createdAt || new Date().toISOString(),
    }));
    await writeList(sanitised);
    return NextResponse.json({ success: true, total: sanitised.length }, { headers: NO_STORE_HEADERS });
  } catch (err) {
    console.error("[PUT /api/gallery]", err);
    return NextResponse.json({ error: "Reorder failed" }, { status: 500 });
  }
}

/**
 * POST /api/gallery
 * Add a single gallery entry by URL (admin). Body: { src, category, title, desc }
 */
export async function POST(request) {
  const auth = await requireAuth();
  if (auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Gallery storage not configured. Set BLOB_READ_WRITE_TOKEN." },
      { status: 503 }
    );
  }
  try {
    const body = await request.json();
    const src = typeof body?.src === "string" ? body.src.trim() : "";
    if (!src || (!src.startsWith("http://") && !src.startsWith("https://"))) {
      return NextResponse.json({ error: "Valid image URL required" }, { status: 400 });
    }
    const { v4: uuidv4 } = await import("uuid");
    const entry = {
      id: uuidv4(),
      src,
      category: body.category || "Other",
      title: body.title || "Untitled",
      desc: body.desc || "",
      createdAt: new Date().toISOString(),
    };
    const current = await getCurrentList();
    const updated = [...current, entry];
    await writeList(updated);
    return NextResponse.json({ success: true, id: entry.id }, { headers: NO_STORE_HEADERS });
  } catch (err) {
    console.error("[POST /api/gallery]", err);
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}

/**
 * PATCH /api/gallery
 * Update one gallery entry (title, desc, category). Body: { id, title?, desc?, category? }
 */
export async function PATCH(request) {
  const auth = await requireAuth();
  if (auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Gallery storage not configured. Set BLOB_READ_WRITE_TOKEN." },
      { status: 503 }
    );
  }
  try {
    const body = await request.json();
    const id = body?.id;
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const current = await getCurrentList();
    const index = current.findIndex((e) => e.id === id);
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const updated = current.map((e, i) =>
      i === index
        ? {
          ...e,
          ...(body.title !== undefined && { title: String(body.title) }),
          ...(body.desc !== undefined && { desc: String(body.desc) }),
          ...(body.category !== undefined && { category: String(body.category) }),
        }
        : e
    );
    await writeList(updated);
    return NextResponse.json({ success: true }, { headers: NO_STORE_HEADERS });
  } catch (err) {
    console.error("[PATCH /api/gallery]", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

/**
 * DELETE /api/gallery?id=xxx
 * Remove one gallery entry from the index AND delete the blob file from storage.
 */
export async function DELETE(request) {
  const auth = await requireAuth();
  if (auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Gallery storage not configured. Set BLOB_READ_WRITE_TOKEN." },
      { status: 503 }
    );
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const current = await getCurrentList();
    const target = current.find((e) => e.id === id);

    if (!target) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // ── Step 1: delete the actual blob file so it can't re-appear on rescan ──
    if (target.src && target.src.includes("blob.vercel-storage.com")) {
      try {
        await del(target.src);
      } catch (delErr) {
        // Log but continue — index cleanup is more important
        console.warn("[DELETE /api/gallery] blob del failed:", delErr?.message);
      }
    }

    // ── Step 2: remove from index and persist ────────────────────────────────
    const updated = current.filter((e) => e.id !== id);
    await writeList(updated);

    return NextResponse.json({ success: true }, { headers: NO_STORE_HEADERS });
  } catch (err) {
    console.error("[DELETE /api/gallery]", err);
    return NextResponse.json({ error: `Delete failed: ${err?.message}` }, { status: 500 });
  }
}
