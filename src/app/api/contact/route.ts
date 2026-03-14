import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "send.one.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const RECIPIENT_MAP: Record<string, string> = {
  default: "info@elektromaster.be",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, source } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const toEmail = RECIPIENT_MAP[source as string] ?? RECIPIENT_MAP.default;

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: `Nieuw contactformulier: ${name}`,
      html: `
        <h2>Nieuw contactformulier</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefoon:</strong> ${phone || "Niet opgegeven"}</p>
        <p><strong>Dienst:</strong> ${service || "Niet opgegeven"}</p>
        <hr />
        <p><strong>Bericht:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Email send error:", errMsg);
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}
