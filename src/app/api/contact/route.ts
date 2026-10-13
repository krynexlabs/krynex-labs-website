import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Simple in-memory rate limiter per IP (60-second window).
// NOTE: on serverless hosting this is best-effort per instance, not a global limit.
const ipRateMap = new Map<string, { count: number; expiresAt: number }>();

const serverContactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters.')
    .max(100, 'Full name exceeds 100 characters.'),
  email: z
    .string()
    .email('Valid business email address required.')
    .max(100, 'Email exceeds 100 characters.'),
  company: z.string().max(100).optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message exceeds 2000 characters.'),
  hp_field: z.string().optional(),
});

function sanitize(str: string): string {
  return str.replace(/[<>]/g, '');
}

/** Remove CR/LF so user input can never inject email headers via the subject line. */
function singleLine(str: string): string {
  return str.replace(/[\r\n]+/g, ' ').trim();
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const now = Date.now();
    const rateRecord = ipRateMap.get(ip);

    if (rateRecord && rateRecord.expiresAt > now) {
      if (rateRecord.count >= 5) {
        return NextResponse.json(
          { error: 'Too many requests. Please wait a minute before submitting again.' },
          { status: 429 }
        );
      }
      rateRecord.count += 1;
    } else {
      ipRateMap.set(ip, { count: 1, expiresAt: now + 60000 });
    }

    // 2. Parse & validate payload
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const parsed = serverContactSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || 'Invalid form submission.';
      return NextResponse.json({ error: firstError }, { status: 400 });
    }
    const data = parsed.data;

    // 3. Honeypot: bots fill the hidden field. Respond as if accepted, send nothing.
    if (data.hp_field && data.hp_field.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const clean = {
      fullName: singleLine(sanitize(data.fullName)),
      email: singleLine(sanitize(data.email)),
      company: data.company ? singleLine(sanitize(data.company)) : '',
      message: sanitize(data.message),
    };

    // 4. Delivery configuration (server-side environment variables only)
    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_EMAIL_RECIPIENT;
    const sender = process.env.CONTACT_FROM_EMAIL;
    const isConfigured = Boolean(apiKey && recipient && sender);

    if (!isConfigured) {
      if (process.env.NODE_ENV !== 'production') {
        // Local development only: log the inquiry so the form can be exercised without a provider.
        console.log('[Contact DEV — email provider not configured, inquiry NOT emailed]:', clean);
        return NextResponse.json({ success: true, delivered: false });
      }
      // Production: never claim success when nothing can be delivered.
      console.error('[Contact API] Email delivery is not configured. Set RESEND_API_KEY, CONTACT_EMAIL_RECIPIENT and CONTACT_FROM_EMAIL.');
      return NextResponse.json(
        { error: 'Our contact form is temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }

    // 5. Send via Resend and verify it was actually accepted
    let response: Response;
    try {
      response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Krynex Labs Website <${sender}>`,
          to: [recipient],
          reply_to: clean.email,
          subject: `New business inquiry: ${clean.fullName}${clean.company ? ` (${clean.company})` : ''}`,
          text: [
            `Name: ${clean.fullName}`,
            `Email: ${clean.email}`,
            `Company: ${clean.company || 'Not specified'}`,
            '',
            'Message:',
            clean.message,
          ].join('\n'),
        }),
      });
    } catch (networkErr) {
      console.error('[Contact API] Email provider unreachable:', networkErr);
      return NextResponse.json(
        { error: 'We could not send your message right now. Please try again shortly.' },
        { status: 502 }
      );
    }

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.error('[Contact API] Email provider rejected the message:', response.status, detail);
      return NextResponse.json(
        { error: 'We could not send your message right now. Please try again shortly.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
