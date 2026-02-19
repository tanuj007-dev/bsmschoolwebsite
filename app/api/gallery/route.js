import { NextResponse } from "next/server";
import { list } from "@vercel/blob";
import { seedGallery } from "../../data/seedGallery";

// Ensure this route is never statically cached (fresh gallery data).
export const dynamic = "force-dynamic";

const INDEX_PATH = "gallery/index.json";

const NO_STORE_HEADERS = {
  "Cache-Control": "private, no-store, no-cache, max-age=0, must-revalidate",
  Pragma: "no-cache",
};

function seedWithIds() {
  return seedGallery.map((g, i) => ({
    ...g,
    id: g.id || `seed-${i}`,
    createdAt: g.createdAt || new Date().toISOString(),
  }));
}

/**
 * GET /api/gallery
 * Returns gallery images for the public site. Data is stored in Vercel Blob.
 * If no Blob store is configured, returns seed data so the site still works.
 */
export async function GET() {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(seedWithIds(), { headers: NO_STORE_HEADERS });
    }

    const { blobs } = await list({ prefix: "gallery/" });
    const indexBlob = blobs.find((b) => b.pathname === INDEX_PATH);
    if (!indexBlob?.url) {
      return NextResponse.json(seedWithIds(), { headers: NO_STORE_HEADERS });
    }

    const res = await fetch(indexBlob.url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(seedWithIds(), { headers: NO_STORE_HEADERS });
    }
    const data = await res.json();
    return NextResponse.json(Array.isArray(data) ? data : seedWithIds(), {
      headers: NO_STORE_HEADERS,
    });
  } catch (err) {
    console.error("[GET /api/gallery]", err);
    return NextResponse.json(seedWithIds(), { headers: NO_STORE_HEADERS });
  }
}
