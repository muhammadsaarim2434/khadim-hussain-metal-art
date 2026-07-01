import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data?.name || !data?.email || !data?.message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Optional: forward to a webhook (e.g. Formspree/Zapier) if configured.
    const webhook = process.env.CONTACT_WEBHOOK;
    if (webhook) {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } else {
      // No webhook configured — log for now. Wire up email/CRM here.
      console.log('New contact enquiry:', data);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
