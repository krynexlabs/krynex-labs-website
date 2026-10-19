import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  sanitizeSingleLine,
  sanitizeMultiline,
  isValidEmail,
  escapeHtml,
} from "@/lib/sanitizer";
import { checkRateLimit, getClientIp } from "@/lib/rate-limiter";

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many inquiries from this network. Please wait ${rateLimit.resetInSeconds} seconds before trying again, or email support@krynexlabs.in directly.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetInSeconds),
            "Cache-Control": "no-store",
          },
        }
      );
    }

    // Parse JSON request payload with payload safety check
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON transmission payload." },
        { status: 400 }
      );
    }

    const { name, email, company, challenge, _security_honeypot, honeypot } = body;

    // 2. Anti-Spam Bot Honeypot Check
    // If hidden honeypot fields contain values, silently respond with simulated receipt
    if (_security_honeypot || honeypot) {
      return NextResponse.json(
        {
          success: true,
          referenceId: `KRX-SHIELD-${Math.floor(1000 + Math.random() * 9000)}`,
          contactEmail: "support@krynexlabs.in",
          timestamp: new Date().toISOString(),
          message: "Transmission received.",
        },
        { status: 200 }
      );
    }

    // 3. Input Sanitization (Preserves <10ms, x < y, AT&T, O'Brien; strips HTML tags & CRLF)
    const cleanName = sanitizeSingleLine(name, 100);
    const rawEmail = typeof email === "string" ? email.trim() : "";
    const cleanCompany = sanitizeSingleLine(company, 120);
    const cleanChallenge = sanitizeMultiline(challenge, 2500);

    // 4. Server-Side Input Validation
    if (!cleanName || cleanName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Your name is required (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!rawEmail || !isValidEmail(rawEmail)) {
      return NextResponse.json(
        { success: false, error: "A valid corporate or work email address is required." },
        { status: 400 }
      );
    }

    if (!cleanCompany || cleanCompany.length < 2) {
      return NextResponse.json(
        { success: false, error: "Your organization / company name is required." },
        { status: 400 }
      );
    }

    if (!cleanChallenge || cleanChallenge.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Please describe your operational challenge or inquiry (minimum 10 characters).",
        },
        { status: 400 }
      );
    }

    // 5. Generate Reference ID & Audit Metadata
    const randomTicket = Math.floor(100000 + Math.random() * 900000);
    const referenceId = `KRX-RD-${randomTicket}`;
    const timestamp = new Date().toISOString();

    // 6. Outbound Email Delivery Configuration
    const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const resendApiKey = process.env.RESEND_API_KEY;

    // Recipient address resolution (defaults to CONTACT_RECEIVER_EMAIL, then GMAIL_USER, then support@krynexlabs.in)
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || gmailUser || "support@krynexlabs.in";

    // Clean single-line subject to prevent CRLF injection
    const isTest =
      cleanChallenge.includes("[GIAS EMAIL TEST]") ||
      (typeof body.subject === "string" && body.subject.includes("[GIAS EMAIL TEST]"));
    const subjectPrefix = isTest ? "[GIAS EMAIL TEST]" : "[KRYNEX PRODUCT INQUIRY]";
    const subject = `${subjectPrefix} ${referenceId} - ${cleanCompany} (${cleanName})`;

    // Plaintext fallback body
    const textContent = [
      "KRYNEX LABS // EXECUTIVE INQUIRY DOCKET",
      "========================================",
      `Reference ID: ${referenceId}`,
      `Timestamp:    ${timestamp}`,
      `Client Name:  ${cleanName}`,
      `Work Email:   ${rawEmail}`,
      `Company:      ${cleanCompany}`,
      "----------------------------------------",
      "OPERATIONAL CHALLENGE / INQUIRY:",
      cleanChallenge,
      "========================================",
    ].join("\n");

    // HTML escaped template
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #000; color: #fff; padding: 24px; border-radius: 8px;">
        <h2 style="color: #fff; margin-bottom: 16px; font-size: 18px; letter-spacing: 0.5px;">KRYNEX LABS // PRODUCT INQUIRY DOCKET</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #ccc;">
          <tr><td style="padding: 6px 0; color: #888;">Reference ID:</td><td style="padding: 6px 0; color: #fff; font-family: monospace;">${escapeHtml(referenceId)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Timestamp:</td><td style="padding: 6px 0; color: #fff; font-family: monospace;">${escapeHtml(timestamp)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Client Name:</td><td style="padding: 6px 0; color: #fff;">${escapeHtml(cleanName)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Work Email:</td><td style="padding: 6px 0; color: #fff;">${escapeHtml(rawEmail)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Company / Sector:</td><td style="padding: 6px 0; color: #fff;">${escapeHtml(cleanCompany)}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;" />
        <h3 style="color: #aaa; font-size: 14px; text-transform: uppercase; margin-bottom: 8px;">Operational Challenge:</h3>
        <div style="white-space: pre-wrap; line-height: 1.6; color: #eee; background: #0a0a0a; border: 1px solid #222; border-radius: 6px; padding: 14px; font-size: 13px;">${escapeHtml(cleanChallenge)}</div>
      </div>
    `;

    let emailDelivered = false;

    // Delivery Provider 1: Gmail SMTP / Custom SMTP (if configured)
    if (gmailUser && gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost || "smtp.gmail.com",
          port: smtpPort ? parseInt(smtpPort, 10) : 465,
          secure: smtpPort === "587" ? false : true,
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        const fromAddress = process.env.CONTACT_FROM_EMAIL || `Krynex Labs Briefing <${gmailUser}>`;

        await transporter.sendMail({
          from: fromAddress,
          to: receiverEmail,
          replyTo: rawEmail,
          subject,
          text: textContent,
          html: htmlContent,
        });

        emailDelivered = true;
      } catch (smtpErr) {
        console.error("[KRYNEX NOTIFICATION ERROR] SMTP delivery exception:", smtpErr instanceof Error ? smtpErr.message : "Unknown SMTP failure");
        // Fall through to Resend if available
      }
    }

    // Delivery Provider 2: Resend API (if configured and SMTP was not used or failed)
    if (!emailDelivered && resendApiKey) {
      let fromEmail = process.env.CONTACT_FROM_EMAIL || "Krynex Labs Briefing <onboarding@resend.dev>";
      let toRecipient = receiverEmail;

      const sendViaResend = async (from: string, to: string) => {
        return await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: [to],
            reply_to: rawEmail,
            subject,
            text: textContent,
            html: htmlContent,
          }),
        });
      };

      try {
        let emailResponse = await sendViaResend(fromEmail, toRecipient);

        // If custom domain is unverified or sandbox restriction triggers
        if (!emailResponse.ok) {
          const errData: any = await emailResponse.json().catch(() => ({}));
          console.error(`[KRYNEX NOTIFICATION ERROR] Resend initial dispatch status ${emailResponse.status}:`, errData);

          // Retry with onboarding sandbox if custom domain was unverified
          if (!fromEmail.includes("onboarding@resend.dev")) {
            fromEmail = "Krynex Labs Briefing <onboarding@resend.dev>";
            emailResponse = await sendViaResend(fromEmail, toRecipient);
          }

          // If restricted to account owner email, extract and retry
          if (!emailResponse.ok && typeof errData?.message === "string") {
            const match = errData.message.match(/\(([^)]+)\)/);
            if (match && match[1] && isValidEmail(match[1]) && match[1] !== toRecipient) {
              toRecipient = match[1];
              emailResponse = await sendViaResend(fromEmail, toRecipient);
            }
          }
        }

        if (emailResponse.ok) {
          emailDelivered = true;
        }
      } catch (resendErr) {
        console.error("[KRYNEX NOTIFICATION ERROR] Resend network exception:", resendErr instanceof Error ? resendErr.message : "Unknown Resend failure");
      }
    }

    // Evaluate delivery result
    const hasConfiguredProvider = Boolean((gmailUser && gmailPass) || resendApiKey);

    if (hasConfiguredProvider && !emailDelivered) {
      return NextResponse.json(
        {
          success: false,
          error: "Notification delivery service is temporarily unavailable. Please reach us at support@krynexlabs.in or WhatsApp +91 9879418569 directly.",
        },
        { status: 502 }
      );
    }

    if (!hasConfiguredProvider) {
      if (process.env.NODE_ENV === "production") {
        // In production, NEVER falsely report success when email delivery is impossible
        console.error("[KRYNEX CONFIG ERROR] No outbound email credentials configured (GMAIL_USER/GMAIL_APP_PASSWORD or RESEND_API_KEY missing).");
        return NextResponse.json(
          {
            success: false,
            error: "Inquiry dispatch service is temporarily unconfigured. Please email support@krynexlabs.in or WhatsApp +91 9879418569 directly.",
          },
          { status: 503 }
        );
      }

      // Local development mock mode (NO personal user data logged)
      console.log(`[DEV/TEST MOCK] Inquiry Docket Created: ${referenceId}`);
    }

    // 7. Successful Acceptance Response
    return NextResponse.json(
      {
        success: true,
        referenceId,
        contactEmail: "support@krynexlabs.in",
        timestamp,
        message: "Inquiry docket created and routed to Krynex Labs engineering team.",
      },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" },
      }
    );
  } catch (error) {
    console.error("[KRYNEX API ERROR] Unhandled exception in contact handler:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please contact support@krynexlabs.in or WhatsApp +91 9879418569 directly.",
      },
      { status: 500 }
    );
  }
}
