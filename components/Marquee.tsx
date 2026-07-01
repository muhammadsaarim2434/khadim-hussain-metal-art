import { Diamond } from 'lucide-react';

export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-gold/20 bg-ink py-4">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-serif text-lg font-semibold uppercase tracking-wide text-white/90">
              {item}
            </span>
            <Diamond className="h-3 w-3 fill-gold text-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}
