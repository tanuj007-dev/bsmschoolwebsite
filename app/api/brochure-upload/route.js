import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BROCHURE_UPLOAD_URL =
  process.env.BROCHURE_UPLOAD_URL ||
  "https://darkred-mouse-801836.hostingersite.com/api/brochure-downloads/upload";

/**
 * POST /api/brochure-upload
 * Forwards the uploaded PDF to the external brochure API.
 * Use this when adding or editing a course — send the PDF here; the external backend handles the rest.
 * Requires admin session (bsm_admin_session) and BROCHURE_UPLOAD_TOKEN in env.
 */
export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("bsm_admin_session");
    if (!session?.value) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = process.env.BROCHURE_UPLOAD_TOKEN;
    if (!token) {
      return NextResponse.json(
        { error: "Brochure upload not configured. Set BROCHURE_UPLOAD_TOKEN in environment." },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof Blob) || file.size === 0) {
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 });
    }

    const forwarded = new FormData();
    forwarded.append("file", file, file.name || "brochure.pdf");

    const res = await fetch(BROCHURE_UPLOAD_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: forwarded,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return NextResponse.json(
        data?.message ? { error: data.message } : { error: "Brochure upload failed" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("[POST /api/brochure-upload]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
