import { NextResponse } from "next/server";
import { list } from "@vercel/blob";
import { seedGallery } from "../../data/seedGallery";

const INDEX_PATH = "gallery/index.json";

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
      return NextResponse.json(seedWithIds());
    }

    const { blobs } = await list({ prefix: "gallery/" });
    const indexBlob = blobs.find((b) => b.pathname === INDEX_PATH);
    if (!indexBlob?.url) {
      return NextResponse.json(seedWithIds());
    }

    const res = await fetch(indexBlob.url, { next: { revalidate: 0 } });
    if (!res.ok) {
      return NextResponse.json(seedWithIds());
    }
    const data = await res.json();
    return NextResponse.json(Array.isArray(data) ? data : seedWithIds());
  } catch (err) {
    console.error("[GET /api/gallery]", err);
    return NextResponse.json(seedWithIds());
  }
}
