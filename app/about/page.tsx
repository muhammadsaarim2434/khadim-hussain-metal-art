import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Tag, PencilRuler, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import StatsBar from '@/sections/StatsBar';
import WhyChoose from '@/sections/WhyChoose';
import { offers } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Us – Aluminum & Metal Manufacturer Lahore',
  description:
    "Learn about Khadim Hussain Metal Art – Pakistan's trusted manufacturer of aluminum furniture, custom metal gates, railings, grills and decorative metal art. Based in Lahore.",
};

const iconMap = { tag: Tag, 'pencil-ruler': PencilRuler, 'shield-check': ShieldCheck };

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Us" crumb="About Us" image="/images/about/about-1.jpg" />

      <section className="py-20 md:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/about/contact.jpg"
                alt="Khadim Hussain Metal Art – Metal and aluminum manufacturing workshop in Lahore"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <span className="eyebrow">Welcome to KHMA</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-3 font-serif text-3xl font-bold leading-tight md:text-4xl">
                Welcome to Khadim Hussain Metal Art
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                At <strong className="text-ink">Khadim Hussain Metal Art</strong>, we
                specialize in designing and manufacturing high-quality metal and
                aluminum products that blend durability with elegance. From concept to
                completion, we bring metal to life with creativity, precision and
                passion.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Our team is skilled in both traditional craftsmanship and modern
                casting techniques — allowing us to deliver everything from decorative
                metal art pieces to large-scale main gates, railings and outdoor
                furniture.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Button asChild className="mt-8" variant="secondary">
                <Link href="/contact">
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Offers */}
      <section className="bg-muted/50 py-20 md:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Our Promise</span>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              What Does Khadim Hussain Metal Art Offer?
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {offers.map((o, i) => {
              const Icon = iconMap[o.icon as keyof typeof iconMap] ?? Tag;
              return (
                <Reveal key={o.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-lg">
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/15 text-gold-600">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="mt-6 font-serif text-xl font-semibold">{o.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {o.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <WhyChoose />
      <StatsBar />
    </>
  );
}
