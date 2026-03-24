import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  const apiKey = process.env.KIT_API_KEY!;

  // Step 1: Create subscriber
  const createRes = await fetch("https://api.kit.com/v4/subscribers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": apiKey,
    },
    body: JSON.stringify({
      email_address: email,
      state: "active",
    }),
  });

  if (!createRes.ok) {
    return NextResponse.json(
      { error: "Failed to create subscriber" },
      { status: 500 },
    );
  }

  const data = await createRes.json();
  const subscriberId = data.subscriber?.id;

  if (!subscriberId) {
    return NextResponse.json(
      { error: "No subscriber ID returned" },
      { status: 500 },
    );
  }

  // Step 2: Add subscriber to form
  await fetch(
    `https://api.kit.com/v4/forms/9240743/subscribers/${subscriberId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Kit-Api-Key": apiKey,
      },
    },
  );

  return NextResponse.json({ success: true });
}
