import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { whyChoose } from '@/lib/data';

export default function WhyChoose() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <Reveal>
            <span className="eyebrow">Why Choose Us?</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight md:text-4xl">
              Khadim Hussain Metal Art — Quality You Can Trust
            </h2>
          </Reveal>

          <div className="mt-8 space-y-6">
            {whyChoose.map((item, i) => (
              <Reveal key={item.title} delay={0.1 + i * 0.05}>
                <div className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold/15 font-serif text-lg font-bold text-gold-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/about/about-3.jpg"
              alt="Khadim Hussain Metal Art – In-house aluminum and metal manufacturing facility"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
