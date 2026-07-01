import nodemailer from 'nodemailer';
import { company } from '@/lib/data';

const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = Number(process.env.SMTP_PORT || 465);
const user = process.env.SMTP_USER || '';
const pass = process.env.SMTP_PASS || '';

export function isMailConfigured() {
  return Boolean(user && pass);
}

let cached: nodemailer.Transporter | null = null;

function getTransport() {
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: { user, pass },
  });
  return cached;
}

type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
};

const fromAddress = `"${company.name}" <${user}>`;

function esc(s: string) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function sendContactEmails(data: ContactPayload) {
  const transport = getTransport();
  const to = process.env.CONTACT_TO_EMAIL || user || company.email;
  const subject = data.subject?.trim() || 'New Website Inquiry';

  // 1) Notification to the business
  const businessHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#1f2937">
      <h2 style="color:#b45309;margin-bottom:4px">New Contact Inquiry</h2>
      <p style="color:#6b7280;margin-top:0">From ${company.name} website contact form</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px">
        <tr><td style="padding:8px 0;font-weight:bold;width:120px">Name</td><td style="padding:8px 0">${esc(data.name)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold">Email</td><td style="padding:8px 0">${esc(data.email)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold">Phone</td><td style="padding:8px 0">${esc(data.phone || '—')}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold">Subject</td><td style="padding:8px 0">${esc(subject)}</td></tr>
      </table>
      <h3 style="margin-top:20px;margin-bottom:6px">Message</h3>
      <p style="white-space:pre-wrap;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px">${esc(data.message)}</p>
    </div>`;

  await transport.sendMail({
    from: fromAddress,
    to,
    replyTo: data.email,
    subject: `[Inquiry] ${subject} — ${data.name}`,
    html: businessHtml,
    text:
      `New contact inquiry\n\n` +
      `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || '—'}\n` +
      `Subject: ${subject}\n\nMessage:\n${data.message}`,
  });

  // 2) Auto-reply / thank-you to the customer
  const replyHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;color:#1f2937">
      <h2 style="color:#b45309">Thanks for contacting us, ${esc(data.name)}!</h2>
      <p>We've received your message and our team will get back to you shortly with a custom quote.</p>
      <p style="margin-top:16px;font-weight:bold">Your message:</p>
      <p style="white-space:pre-wrap;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px">${esc(data.message)}</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0" />
      <p style="margin:0"><strong>${company.name}</strong></p>
      <p style="margin:4px 0;color:#6b7280">${company.address}</p>
      <p style="margin:4px 0;color:#6b7280">Phone: ${company.phoneDisplay} · Email: ${company.email}</p>
    </div>`;

  await transport.sendMail({
    from: fromAddress,
    to: data.email,
    subject: `Thanks for contacting ${company.name}`,
    html: replyHtml,
    text:
      `Thanks for contacting us, ${data.name}!\n\n` +
      `We've received your message and our team will get back to you shortly with a custom quote.\n\n` +
      `Your message:\n${data.message}\n\n` +
      `${company.name}\n${company.address}\nPhone: ${company.phoneDisplay} · Email: ${company.email}`,
  });
}
