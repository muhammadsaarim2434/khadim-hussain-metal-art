import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/Reveal';

export default function CtaBanner() {
  return (
    <section className="py-16">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gold px-8 py-12 md:px-14 md:py-16">
            <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="font-serif text-3xl font-bold leading-tight text-ink md:text-4xl">
                  Handcrafted Metal Creations
                  <br />
                  Built to Last, Designed to Impress
                </h2>
                <p className="mt-4 max-w-md text-ink/80">
                  Explore our wide range of aluminum furniture, custom main gates,
                  grills, railings and decorative metal art — all crafted with
                  precision at our Lahore factory.
                </p>
                <Button asChild variant="secondary" size="lg" className="mt-8">
                  <Link href="/shop">
                    Show Products <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative hidden aspect-[4/3] md:block">
                <Image
                  src="/images/about/cta.png"
                  alt="Khadim Hussain Metal Art – Decorative aluminum and metal products showcase"
                  fill
                  sizes="50vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
