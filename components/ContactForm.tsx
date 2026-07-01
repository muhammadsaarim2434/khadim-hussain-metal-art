'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { company } from '@/lib/data';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gold/30 bg-gold/5 p-12 text-center">
        <CheckCircle2 className="h-14 w-14 text-gold-600" />
        <h3 className="mt-4 font-serif text-2xl font-bold">Message Received!</h3>
        <p className="mt-2 max-w-md text-muted-foreground">
          Thank you for reaching out to {company.name}. Our team will get back to
          you shortly with a custom quote.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input required placeholder="Full Name" value={form.name} onChange={set('name')} />
        <Input required type="email" placeholder="Your Email" value={form.email} onChange={set('email')} />
        <Input type="tel" placeholder="Your Phone Number" value={form.phone} onChange={set('phone')} />
        <Input placeholder="Subject (e.g. Custom Gate Inquiry)" value={form.subject} onChange={set('subject')} />
      </div>
      <Textarea
        required
        placeholder="Describe your requirements — product type, size, quantity, etc."
        value={form.message}
        onChange={set('message')}
      />
      <Button type="submit" size="lg" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send Message'}
        <Send className="h-4 w-4" />
      </Button>
      {status === 'error' && (
        <p className="text-sm text-red-600">
          Something went wrong. Please email us directly at {company.email}.
        </p>
      )}
    </form>
  );
}
