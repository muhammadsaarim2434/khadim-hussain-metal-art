'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { company, stats } from '@/lib/data';

const fade = (d: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const },
});

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden metal-dark">
      {/* background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('/images/banners/banner-1.jpg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      {/* gold glow */}
      <div className="pointer-events-none absolute -right-40 top-10 -z-10 h-96 w-96 rounded-full bg-gold/20 blur-[130px]" />

      <div className="container-x grid items-center gap-10 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.span
            {...fade(0.1)}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold"
          >
            <Star className="h-3.5 w-3.5 fill-gold" /> Premium Metal Craftsmanship — Lahore
          </motion.span>

          <motion.h1
            {...fade(0.2)}
            className="mt-6 font-serif text-5xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl"
          >
            Your Vision,
            <br />
            Our <span className="gold-text">Metal Expertise</span>
          </motion.h1>

          <motion.p
            {...fade(0.35)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
          >
            {company.heroSub}
          </motion.p>

          <motion.div {...fade(0.5)} className="mt-9 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/shop">
                Our Products <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:border-gold hover:text-gold">
              <a href={`tel:${company.phone}`}>
                <Phone className="h-4 w-4" /> {company.phoneDisplay}
              </a>
            </Button>
          </motion.div>

          <motion.div
            {...fade(0.65)}
            className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {stats.slice(0, 3).map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl font-bold text-gold">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Floating product frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:col-span-5 lg:block"
        >
          <div className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/banners/banner-2.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-xl border border-gold/30 bg-ink/90 px-6 py-4 shadow-xl backdrop-blur">
            <p className="font-serif text-2xl font-bold text-gold">100%</p>
            <p className="text-xs uppercase tracking-wider text-white/70">In-house production</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
