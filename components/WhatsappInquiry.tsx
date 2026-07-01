'use client';

import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { company } from '@/lib/data';

export default function WhatsappInquiry({ productTitle }: { productTitle: string }) {
  function openChat() {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const message =
      `Hello, I want to inquire about this product:\n` +
      `*Product:* ${productTitle}\n` +
      `*Link:* ${url}`;
    const href = `${company.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(href, '_blank', 'noopener,noreferrer');
  }

  return (
    <Button type="button" variant="secondary" onClick={openChat}>
      <MessageCircle className="h-4 w-4" /> WhatsApp
    </Button>
  );
}
