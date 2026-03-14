import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
      from_name: body.name,
      email: body.email,
      phone: body.phone || "",
      service: body.service || "",
      message: body.message,
      subject: `Nieuw contactformulier: ${body.name}`,
      to_email: "info@elektromaster.be",
    }),
  });

  const data = await response.json();

  if (data.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false, error: data.message }, { status: 500 });
  }
}
