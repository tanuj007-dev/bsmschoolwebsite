import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

const INDEX_PATH = "gallery/index.json";

function sanitize(name) {
  return (name || "image").replace(/[^a-zA-Z0-9.-]/g, "_").slice(0, 40);
}

/**
 * POST /api/gallery/upload
 * Upload gallery images to Vercel Blob and update the gallery index.
 * Requires admin cookie bsm_admin_session.
 */
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("bsm_admin_session");
    if (!session?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Gallery storage not configured. Add a Vercel Blob store and set BLOB_READ_WRITE_TOKEN." },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const category = formData.get("category") || "Other";
    const title = formData.get("title") || "";
    const desc = formData.get("desc") || "";

    const files = formData.getAll("file").filter((v) => v instanceof Blob && v.size > 0);

    if (files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const timestamp = Date.now();
    const newEntries = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const name = file.name || "image";
      const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : ".jpg";
      const pathname = `gallery/${timestamp}-${i}-${sanitize(name)}${ext}`;
      const blob = await put(pathname, file, { access: "public", addRandomSuffix: true });
      newEntries.push({
        id: uuidv4(),
        src: blob.url,
        category: files.length === 1 ? category : "Other",
        title: files.length === 1 ? (title || sanitize(name)) : (file.name?.replace(/\.[^.]+$/, "") || `Image ${i + 1}`),
        desc: files.length === 1 ? desc : "",
        createdAt: new Date().toISOString(),
      });
    }

    const { blobs } = await list({ prefix: "gallery/" });
    const indexBlob = blobs.find((b) => b.pathname === INDEX_PATH);
    let currentList = [];
    if (indexBlob?.url) {
      try {
        const res = await fetch(indexBlob.url, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          currentList = Array.isArray(data) ? data : [];
        }
      } catch (_) {}
    }

    const updatedList = [...currentList, ...newEntries];
    await put(INDEX_PATH, JSON.stringify(updatedList), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    return NextResponse.json(
      { success: true, added: newEntries.length, total: updatedList.length },
      {
        headers: {
          "Cache-Control": "private, no-store, no-cache, max-age=0, must-revalidate",
          Pragma: "no-cache",
        },
      }
    );
  } catch (err) {
    console.error("[POST /api/gallery/upload]", err);
    return NextResponse.json(
      { error: "Upload failed" },
      {
        status: 500,
        headers: {
          "Cache-Control": "private, no-store, no-cache, max-age=0, must-revalidate",
        },
      }
    );
  }
}
