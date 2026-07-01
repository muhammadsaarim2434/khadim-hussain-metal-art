import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export default function PageHeader({
  title,
  crumb,
  image = '/images/about/about-4.jpg',
}: {
  title: string;
  crumb: string;
  image?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 -z-10 bg-ink/75" />
      <div className="container-x flex flex-col items-center justify-center py-20 text-center md:py-28">
        <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
          {title}
        </h1>
        <nav className="mt-4 flex items-center gap-2 text-sm text-white/70">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-gold">
            <Home className="h-3.5 w-3.5" /> Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gold">{crumb}</span>
        </nav>
      </div>
    </section>
  );
}
