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
    // 1. IP Rate Limiting (5 requests per sliding window)
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

    // 4. Field Normalization (Supports canonical Phase 5 schema & legacy payload naming)
    const rawFullName = body.fullName || body.name || body.executiveName;
    const rawEmail = body.workEmail || body.email || body.corporateEmail;
    const rawCompany = body.companyName || body.company || body.companySector || "";
    const rawInquiryType = body.inquiryType || body.inquiryCategory || "General Inquiry";
    const rawMessage = body.message || body.challenge || body.operationalFriction;

    // 5. Input Sanitization (Preserves engineering expressions like <10ms, x < y, O'Brien; strips malicious tags)
    const cleanFullName = sanitizeSingleLine(rawFullName, 100);
    const cleanEmail = typeof rawEmail === "string" ? rawEmail.trim() : "";
    const cleanCompany = sanitizeSingleLine(rawCompany, 120);
    const cleanInquiryType = sanitizeSingleLine(rawInquiryType, 100);
    const cleanMessage = sanitizeMultiline(rawMessage, 3000);

    // 6. Strict Server-Side Validation with Structured Errors
    const fieldErrors: Record<string, string> = {};

    if (!cleanFullName || cleanFullName.length < 2) {
      fieldErrors.fullName = "Full Name is required (minimum 2 characters).";
    }

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      fieldErrors.workEmail = "A valid work email address is required.";
    }

    const validInquiryTypes = [
      "General Inquiry",
      "Software Development",
      "SaaS & Technology Services",
      "Business Partnership",
      "Other",
    ];
    if (!validInquiryTypes.includes(cleanInquiryType)) {
      // Allow legacy categories or standardize to General Inquiry
      // fieldErrors.inquiryType = "Please select a valid inquiry type.";
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      fieldErrors.message = "Message is required (minimum 10 characters).";
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

    // 8. Dispatch Transport: Webhook Support (Slack / CRM Webhook if configured)
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
            fullName: cleanFullName,
            workEmail: cleanEmail,
            companyName: cleanCompany || "Not specified",
            inquiryType: cleanInquiryType,
            message: cleanMessage,
          }),
        });
      } catch (webhookErr) {
        console.error(
          "[KRYNEX WEBHOOK DISPATCH ERROR]:",
          webhookErr instanceof Error ? webhookErr.message : "Unknown webhook error"
        );
      }
    }

    // 9. Dispatch Transport: Email Delivery (Resend API or SMTP)
    const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || gmailUser || "support@krynexlabs.in";

    const subject = `[KRYNEX INQUIRY] ${referenceId} - ${cleanFullName}${cleanCompany ? ` (${cleanCompany})` : ""} [${cleanInquiryType}]`;

    const textContent = [
      "KRYNEX LABS // CLIENT INQUIRY DOCKET",
      "========================================",
      `Reference ID:       ${referenceId}`,
      `Timestamp:          ${timestamp}`,
      `Inquiry Type:       ${cleanInquiryType}`,
      `Full Name:          ${cleanFullName}`,
      `Work Email:         ${cleanEmail}`,
      `Company:            ${cleanCompany || "Not specified"}`,
      "----------------------------------------",
      "INQUIRY MESSAGE:",
      cleanMessage,
      "========================================",
    ].join("\n");

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #000; color: #fff; padding: 24px; border-radius: 8px;">
        <h2 style="color: #fff; margin-bottom: 16px; font-size: 18px; letter-spacing: 0.5px;">KRYNEX LABS // CLIENT INQUIRY DOCKET</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #ccc;">
          <tr><td style="padding: 6px 0; color: #888; width: 140px;">Reference ID:</td><td style="padding: 6px 0; color: #fff; font-family: monospace;">${escapeHtml(referenceId)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Timestamp:</td><td style="padding: 6px 0; color: #fff; font-family: monospace;">${escapeHtml(timestamp)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Inquiry Type:</td><td style="padding: 6px 0; color: #fff;">${escapeHtml(cleanInquiryType)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Full Name:</td><td style="padding: 6px 0; color: #fff;">${escapeHtml(cleanFullName)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Work Email:</td><td style="padding: 6px 0; color: #fff;">${escapeHtml(cleanEmail)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Company:</td><td style="padding: 6px 0; color: #fff;">${escapeHtml(cleanCompany || "Not specified")}</td></tr>
        </table>
        <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;" />
        <h3 style="color: #aaa; font-size: 13px; text-transform: uppercase; margin-bottom: 8px;">Message:</h3>
        <div style="white-space: pre-wrap; line-height: 1.6; color: #eee; background: #0a0a0a; border: 1px solid #222; border-radius: 6px; padding: 14px; font-size: 13px;">${escapeHtml(cleanMessage)}</div>
      </div>
    `;

    // Try SMTP if credentials present
    if (gmailUser && gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost || "smtp.gmail.com",
          port: smtpPort ? parseInt(smtpPort, 10) : 465,
          secure: smtpPort === "587" ? false : true,
          auth: { user: gmailUser, pass: gmailPass },
        });

        const fromAddress = process.env.CONTACT_FROM_EMAIL || `Krynex Labs <${gmailUser}>`;

        await transporter.sendMail({
          from: fromAddress,
          to: receiverEmail,
          replyTo: cleanEmail,
          subject,
          text: textContent,
          html: htmlContent,
        });
      } catch (smtpErr) {
        console.error(
          "[KRYNEX NOTIFICATION ERROR] SMTP delivery exception:",
          smtpErr instanceof Error ? smtpErr.message : "Unknown SMTP failure"
        );
      }
    } else if (resendApiKey) {
      // Try Resend if credentials present
      try {
        const fromEmail = process.env.CONTACT_FROM_EMAIL || "Krynex Labs <onboarding@resend.dev>";
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
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
        });
      } catch (resendErr) {
        console.error(
          "[KRYNEX NOTIFICATION ERROR] Resend exception:",
          resendErr instanceof Error ? resendErr.message : "Unknown Resend failure"
        );
      }
    }

    // 10. Audit Logging
    console.log(
      `[KRYNEX INQUIRY LOGGED] Reference ID: ${referenceId} | Type: ${cleanInquiryType} | Client: ${cleanFullName}`
    );

    // 11. Return 200 OK Response with Tracking Dossier
    return NextResponse.json(
      {
        ok: true,
        success: true,
        referenceId,
        timestamp,
        message: "Thank you for contacting Krynex Labs. Your inquiry has been submitted successfully.",
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
        error: "Internal server error. Please email support@krynexlabs.in or WhatsApp +91 9879418569 directly.",
      },
      { status: 500 }
    );
  }
}
