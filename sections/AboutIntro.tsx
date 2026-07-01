import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/Reveal';

const points = [
  'Metal & aluminum casting under one roof',
  'Outdoor furniture, railings, grills & frames',
  'Custom main gates & entrance gates',
];

export default function AboutIntro() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/about/about-2.jpg"
              alt="Khadim Hussain Metal Art – Aluminum and metal casting workshop in Lahore"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -right-5 -top-5 -z-10 h-full w-full rounded-2xl border-2 border-gold/40" />
          <div className="absolute bottom-5 left-5 rounded-xl bg-cream/95 px-6 py-4 shadow-lg backdrop-blur">
            <p className="font-serif text-3xl font-bold text-gold-600">12+</p>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Years of excellence
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">About Us</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight md:text-4xl">
              About Khadim Hussain Metal Art — Pakistan&apos;s Trusted Metal
              Manufacturer
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              <strong className="text-ink">Khadim Hussain Metal Art</strong> is a
              trusted name in metal craftsmanship and aluminum manufacturing in
              Pakistan. We specialize in both metal and aluminum casting — offering
              complete solutions from raw material production to fully finished,
              ready-to-sell products.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Every item reflects our passion for craftsmanship, innovation and
              customer satisfaction — designed for durability and timeless appeal.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm font-medium text-ink">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gold/15 text-gold-600">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.25}>
            <Button asChild className="mt-8" variant="secondary">
              <Link href="/about">
                Read More <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
