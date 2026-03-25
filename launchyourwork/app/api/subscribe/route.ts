import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  const formData = new URLSearchParams();
  formData.append("email", email);

  const res = await fetch(
    "https://subscribe-forms.beehiiv.com/82417ecd-7955-4a07-809c-e9ddbc92da40",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    },
  );

  return NextResponse.json({ success: true });
}
