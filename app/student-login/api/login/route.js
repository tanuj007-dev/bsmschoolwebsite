import { NextResponse } from "next/server";

const NO_STORE_HEADERS = {
  "Cache-Control": "private, no-store, no-cache, max-age=0, must-revalidate",
  Pragma: "no-cache",
};

export async function POST(req) {
  const { admissionNo, dob } = await req.json();

  // dummy validation (replace with DB later)
  if (admissionNo === "12345" && dob === "2005-01-15") {
    return NextResponse.json(
      { success: true, message: "Login successful" },
      { headers: NO_STORE_HEADERS }
    );
  }

  return NextResponse.json(
    { success: false, message: "Invalid Admission No or DOB" },
    { status: 401, headers: NO_STORE_HEADERS }
  );
}
