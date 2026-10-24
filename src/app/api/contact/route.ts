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
    // 1. IP Rate Limiting (5 requests per sliding 10-minute window)
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          ok: false,
          success: false,
          error: `Rate limit exceeded. Please wait ${rateLimit.resetInSeconds} seconds before submitting again, or email support@krynexlabs.in directly.`,
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

    // 2. Parse JSON Request Payload
    let body: any;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, success: false, error: "Invalid JSON transmission payload." },
        { status: 400 }
      );
    }

    // 3. Spam Honeypot Detection
    const honeypot =
      body.websiteHoneypot || body._security_honeypot || body.honeypot;
    if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
      // Silent 200 OK acceptance to mislead bot scrapers
      return NextResponse.json(
        {
          ok: true,
          success: true,
          referenceId: `KL-REQ-${Date.now().toString(36).toUpperCase()}-BOT`,
          timestamp: new Date().toISOString(),
          message: "Transmission received and logged.",
        },
        { status: 200 }
      );
    }

    // 4. Field Normalization (Supports canonical & legacy payload naming)
    const rawName = body.executiveName || body.name;
    const rawEmail = body.corporateEmail || body.email;
    const rawCompany = body.companySector || body.company;
    const rawFriction = body.operationalFriction || body.challenge;
    const rawCategory = body.inquiryCategory || "General Inquiry";
    const requestWalkthrough = Boolean(body.requestWalkthrough || body.requestMeeting);

    // 5. Input Sanitization (Preserves engineering expressions like <10ms, x < y, O'Brien; strips malicious tags)
    const cleanName = sanitizeSingleLine(rawName, 100);
    const cleanEmail = typeof rawEmail === "string" ? rawEmail.trim() : "";
    const cleanCompany = sanitizeSingleLine(rawCompany, 120);
    const cleanFriction = sanitizeMultiline(rawFriction, 3000);
    const cleanCategory = sanitizeSingleLine(rawCategory, 100);

    // 6. Strict Server-Side Validation with Structured Errors
    const fieldErrors: Record<string, string> = {};

    if (!cleanName || cleanName.length < 2) {
      fieldErrors.executiveName = "Executive Name is required (minimum 2 characters).";
    }

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      fieldErrors.corporateEmail = "A valid corporate email address is required.";
    }

    if (!cleanCompany || cleanCompany.length < 2) {
      fieldErrors.companySector = "Company and sector are required (minimum 2 characters).";
    }

    if (!cleanFriction || cleanFriction.length < 10) {
      fieldErrors.operationalFriction = "Please provide at least 10 characters describing the operational friction.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          success: false,
          error: "Validation failed. Please correct the highlighted fields.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    // 7. Deterministic Reference ID & Timestamp Generation
    const timestamp = new Date().toISOString();
    const referenceId = `KL-REQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    // 8. Dispatch Transport: Webhook Support (e.g., Slack / Discord / Custom CRM Webhook)
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "krynex.inquiry.created",
            referenceId,
            timestamp,
            inquiryCategory: cleanCategory,
            executiveName: cleanName,
            corporateEmail: cleanEmail,
            companySector: cleanCompany,
            operationalFriction: cleanFriction,
            requestWalkthrough,
          }),
        });
      } catch (webhookErr) {
        console.error(
          "[KRYNEX WEBHOOK DISPATCH ERROR]:",
          webhookErr instanceof Error ? webhookErr.message : "Unknown webhook error"
        );
      }
    }

    const subject = `[KRYNEX INQUIRY] ${referenceId} - ${cleanCompany} (${cleanName})${requestWalkthrough ? " [WALKTHROUGH REQUESTED]" : ""}`;

    const textContent = [
      "KRYNEX LABS // EXECUTIVE INQUIRY DOCKET",
      "========================================",
      `Reference ID:       ${referenceId}`,
      `Timestamp:          ${timestamp}`,
      `Inquiry Category:   ${cleanCategory}`,
      `Client Name:        ${cleanName}`,
      `Corporate Email:    ${cleanEmail}`,
      `Company / Sector:   ${cleanCompany}`,
      `Walkthrough Call:   ${requestWalkthrough ? "YES (Requested Google Meet / Zoom Architecture Walkthrough)" : "No"}`,
      "----------------------------------------",
      "OPERATIONAL FRICTION / PROJECT SCOPE:",
      cleanFriction,
      "========================================",
    ].join("\n");

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #000; color: #fff; padding: 24px; border-radius: 8px;">
        <h2 style="color: #fff; margin-bottom: 16px; font-size: 18px; letter-spacing: 0.5px;">KRYNEX LABS // PRODUCT INQUIRY DOCKET</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #ccc;">
          <tr><td style="padding: 6px 0; color: #888;">Reference ID:</td><td style="padding: 6px 0; color: #fff; font-family: monospace;">${escapeHtml(referenceId)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Timestamp:</td><td style="padding: 6px 0; color: #fff; font-family: monospace;">${escapeHtml(timestamp)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Category:</td><td style="padding: 6px 0; color: #fff;">${escapeHtml(cleanCategory)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Executive:</td><td style="padding: 6px 0; color: #fff;">${escapeHtml(cleanName)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Email:</td><td style="padding: 6px 0; color: #fff;">${escapeHtml(cleanEmail)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Company / Sector:</td><td style="padding: 6px 0; color: #fff;">${escapeHtml(cleanCompany)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Walkthrough:</td><td style="padding: 6px 0; color: ${requestWalkthrough ? "#4ade80" : "#aaa"}; font-weight: bold;">${requestWalkthrough ? "YES (Scheduled Architecture Call Requested)" : "Standard Response"}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;" />
        <h3 style="color: #aaa; font-size: 13px; text-transform: uppercase; margin-bottom: 8px;">Operational Friction:</h3>
        <div style="white-space: pre-wrap; line-height: 1.6; color: #eee; background: #0a0a0a; border: 1px solid #222; border-radius: 6px; padding: 14px; font-size: 13px;">${escapeHtml(cleanFriction)}</div>
      </div>
    `;

    // 9. Dispatch Transport: Email Delivery (Resend API or SMTP)
    const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || gmailUser || "support@krynexlabs.in";

    let isDelivered = false;
    let providerFailureReason: string | null = null;

    // Try SMTP if credentials present
    if (gmailUser && gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost || "smtp.gmail.com",
          port: smtpPort ? parseInt(smtpPort, 10) : 465,
          secure: smtpPort === "587" ? false : true,
          auth: { user: gmailUser, pass: gmailPass },
        });

        const fromAddress = process.env.CONTACT_FROM_EMAIL || `Krynex Labs Briefing <${gmailUser}>`;

        const info = await transporter.sendMail({
          from: fromAddress,
          to: receiverEmail,
          replyTo: cleanEmail,
          subject,
          text: textContent,
          html: htmlContent,
        });

        if (info && info.messageId) {
          isDelivered = true;
        }
      } catch (smtpErr) {
        providerFailureReason = smtpErr instanceof Error ? smtpErr.message : "SMTP transport exception";
        console.error("[KRYNEX NOTIFICATION ERROR] SMTP delivery exception:", providerFailureReason);
      }
    } else if (resendApiKey) {
      // Try Resend if credentials present
      try {
        const fromEmail = process.env.CONTACT_FROM_EMAIL || "Krynex Labs <onboarding@resend.dev>";
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [receiverEmail],
            reply_to: cleanEmail,
            subject,
            text: textContent,
            html: htmlContent,
          }),
          signal: AbortSignal.timeout(8000), // 8-second timeout guard
        });

        if (resendResponse.ok) {
          isDelivered = true;
        } else {
          const errData = await resendResponse.json().catch(() => ({}));
          providerFailureReason = errData?.message || `Resend HTTP ${resendResponse.status}`;
          console.error(`[KRYNEX NOTIFICATION ERROR] Resend rejected dispatch: ${providerFailureReason}`);
        }
      } catch (resendErr) {
        providerFailureReason = resendErr instanceof Error ? resendErr.message : "Resend network failure or timeout";
        console.error("[KRYNEX NOTIFICATION ERROR] Resend exception:", providerFailureReason);
      }
    } else {
      // Neither SMTP nor Resend configured
      providerFailureReason = "No production email transport configured in environment.";
      console.warn("[KRYNEX NOTIFICATION WARNING]", providerFailureReason);
    }

    // 10. Audit Logging (Safe operational telemetry without printing sensitive credentials)
    console.log(`[KRYNEX INQUIRY LOGGED] Reference ID: ${referenceId} | Category: ${cleanCategory} | Company: ${cleanCompany} | Delivered: ${isDelivered}`);

    // Construct customer mailto fallback link with prefilled docket details
    const fallbackMailto = `mailto:support@krynexlabs.in?subject=${encodeURIComponent(
      `[KRYNEX BRIEFING] ${referenceId} - ${cleanCompany} (${cleanName})`
    )}&body=${encodeURIComponent(
      `Reference ID: ${referenceId}\nCompany: ${cleanCompany}\nName: ${cleanName}\nInquiry: ${cleanCategory}\n\nScope:\n${cleanFriction}`
    )}`;

    // 11. Return HTTP 503 if provider delivery could not be confirmed (SEC-001)
    if (!isDelivered) {
      return NextResponse.json(
        {
          ok: false,
          success: false,
          referenceId,
          timestamp,
          error: "Inquiry delivery could not be confirmed at this moment. Please email our Software Engineering team directly at support@krynexlabs.in referencing your Reference ID.",
          fallbackMailto,
        },
        {
          status: 503,
          headers: { "Cache-Control": "no-store" },
        }
      );
    }

    // 12. Return 200 OK Response with Tracking Dossier upon Confirmed Delivery
    return NextResponse.json(
      {
        ok: true,
        success: true,
        referenceId,
        timestamp,
        message: "Inquiry dossier created and successfully dispatched to Krynex Labs engineering team.",
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
        ok: false,
        success: false,
        error: "Internal server error. Please email support@krynexlabs.in directly.",
      },
      { status: 500 }
    );
  }
}
