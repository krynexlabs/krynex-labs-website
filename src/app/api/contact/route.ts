import { NextResponse } from "next/server";

// Simple HTML stripping and sanitization
function sanitize(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>?/gm, "") // strip HTML tags
    .replace(/[<>'"&]/g, (char) => {
      switch (char) {
        case "<":
          return "&lt;";
        case ">":
          return "&gt;";
        case "'":
          return "&#39;";
        case '"':
          return "&quot;";
        case "&":
          return "&amp;";
        default:
          return char;
      }
    })
    .trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, challenge, _security_honeypot, honeypot } = body;

    // 1. Bot Honeypot Check
    if (_security_honeypot || honeypot) {
      // Silently accept to thwart automated spambots
      return NextResponse.json(
        {
          success: true,
          referenceId: `KRX-SHIELD-${Math.floor(1000 + Math.random() * 9000)}`,
          contactEmail: "support@krynexlabs.in",
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    }

    // 2. Data Sanitization
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanCompany = sanitize(company);
    const cleanChallenge = sanitize(challenge);

    // 3. Strict Input Validation
    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Executive Name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }
    if (cleanName.length > 100) {
      return NextResponse.json(
        { success: false, error: "Executive Name cannot exceed 100 characters." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        { success: false, error: "A valid corporate email address is required." },
        { status: 400 }
      );
    }
    if (cleanEmail.length > 120) {
      return NextResponse.json(
        { success: false, error: "Email cannot exceed 120 characters." },
        { status: 400 }
      );
    }

    if (!cleanCompany || cleanCompany.length < 2) {
      return NextResponse.json(
        { success: false, error: "Company / Sector designation is required." },
        { status: 400 }
      );
    }
    if (cleanCompany.length > 120) {
      return NextResponse.json(
        { success: false, error: "Company designation cannot exceed 120 characters." },
        { status: 400 }
      );
    }

    if (!cleanChallenge || cleanChallenge.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a description of the operational challenge (minimum 10 characters).",
        },
        { status: 400 }
      );
    }
    if (cleanChallenge.length > 2500) {
      return NextResponse.json(
        { success: false, error: "Challenge description cannot exceed 2500 characters." },
        { status: 400 }
      );
    }

    // 4. Generate Enterprise Reference ID
    const randomTicket = Math.floor(100000 + Math.random() * 900000);
    const referenceId = `KRX-RD-${randomTicket}`;
    const timestamp = new Date().toISOString();

    // 5. Production Message Delivery Pipeline (DEFECT-NEW-02)
    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "support@krynexlabs.in";

    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || "Krynex Labs Briefing <inquiries@krynexlabs.in>",
            to: [receiverEmail],
            reply_to: cleanEmail,
            subject: `[KRYNEX R&D BRIEF] ${referenceId} - ${cleanCompany} (${cleanName})`,
            html: `
              <div style="font-family: monospace; background: #000; color: #fff; padding: 24px; border-radius: 8px;">
                <h2 style="color: #fff; margin-bottom: 16px;">KRYNEX LABS // EXECUTIVE INQUIRY DOCKET</h2>
                <p><strong>Reference ID:</strong> ${referenceId}</p>
                <p><strong>Timestamp:</strong> ${timestamp}</p>
                <p><strong>Name:</strong> ${cleanName}</p>
                <p><strong>Corporate Email:</strong> ${cleanEmail}</p>
                <p><strong>Company / Vertical:</strong> ${cleanCompany}</p>
                <hr style="border: 1px solid #333; margin: 16px 0;" />
                <h3 style="color: #aaa;">OPERATIONAL CHALLENGE:</h3>
                <p style="white-space: pre-wrap; line-height: 1.5; color: #ddd;">${cleanChallenge}</p>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const errData = await emailResponse.json().catch(() => ({}));
          console.error(`[KRYNEX LABS] Transactional dispatch returned status ${emailResponse.status}:`, errData);
        } else {
          console.log(`[KRYNEX LABS] Executive inquiry ${referenceId} successfully dispatched to ${receiverEmail}`);
        }
      } catch (dispatchErr) {
        console.error(`[KRYNEX LABS] Outbound email dispatch error:`, dispatchErr);
      }
    } else {
      // Local development or unconfigured environment: log sanitized telemetry docket
      console.log(`[KRYNEX LABS DC-01 TELEMETRY] New R&D Consultation: ${referenceId}`, {
        name: cleanName,
        company: cleanCompany,
        email: cleanEmail,
        timestamp,
        location: "SBR, Ahmedabad, India",
        note: "RESEND_API_KEY unconfigured; logged to telemetry stream",
      });
    }

    return NextResponse.json(
      {
        success: true,
        referenceId,
        contactEmail: "support@krynexlabs.in",
        timestamp,
        message: "Executive brief securely received and routed to Ahmedabad DC-01 engineering team.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[KRYNEX API ERROR] Failed to process consultation request:", error);
    return NextResponse.json(
      { success: false, error: "Internal server telemetry error. Please contact support@krynexlabs.in directly." },
      { status: 500 }
    );
  }
}
