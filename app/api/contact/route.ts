import { NextResponse } from 'next/server';
import { isMailConfigured, sendContactEmails } from '@/lib/mailer';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data?.name || !data?.email || !data?.message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    if (isMailConfigured()) {
      await sendContactEmails(data);
    } else {
      // Optional: forward to a webhook (e.g. Formspree/Zapier) if configured.
      const webhook = process.env.CONTACT_WEBHOOK;
      if (webhook) {
        await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
      } else {
        // No mailer/webhook configured — log so the form still works in dev.
        console.log('New contact enquiry (mailer not configured):', data);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
