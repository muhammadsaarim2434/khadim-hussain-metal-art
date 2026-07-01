import Reveal from '@/components/Reveal';
import { stats } from '@/lib/data';

export default function StatsBar() {
  return (
    <section className="metal-dark py-16">
      <div className="container-x grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <p className="font-serif text-4xl font-bold text-gold md:text-5xl">
              {s.value}
            </p>
            <p className="mt-2 text-sm uppercase tracking-wider text-white/70">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
