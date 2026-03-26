import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUB_ID}/subscriptions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify({
        email: email,
        reactivate_existing: true,
        send_welcome_email: false,
        utm_source: "launch_your_work",
        utm_medium: "landing_page",
        double_opt_override: "off",
        automation_ids: [process.env.BEEHIIV_AUTOMATION_ID],
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to subscribe", details: data },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
