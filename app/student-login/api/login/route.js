import { NextResponse } from "next/server";

export async function POST(req) {
  const { admissionNo, dob } = await req.json();

  // dummy validation (replace with DB later)
  if (admissionNo === "12345" && dob === "2005-01-15") {
    return NextResponse.json({
      success: true,
      message: "Login successful",
    });
  }

  return NextResponse.json(
    { success: false, message: "Invalid Admission No or DOB" },
    { status: 401 }
  );
}
