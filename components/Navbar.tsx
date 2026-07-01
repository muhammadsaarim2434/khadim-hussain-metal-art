'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, Phone, Mail, MapPin, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from '@/components/ui/sheet';
import { company, nav } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="relative z-50">
      {/* Top bar */}
      <div className="hidden bg-ink text-white/80 md:block">
        <div className="container-x flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-gold" /> {company.address}
            </span>
            <a
              href={`mailto:${company.email}`}
              className="inline-flex items-center gap-2 hover:text-gold"
            >
              <Mail className="h-3.5 w-3.5 text-gold" /> {company.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/60">{company.hours}</span>
            <span className="h-4 w-px bg-white/20" />
            <a href={company.instagram} aria-label="Instagram" className="hover:text-gold">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={company.youtube} aria-label="YouTube" className="hover:text-gold">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={cn(
          'sticky top-0 z-50 border-b transition-all duration-300',
          scrolled
            ? 'border-border bg-cream/95 shadow-sm backdrop-blur'
            : 'border-transparent bg-cream'
        )}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={company.logoLight}
              alt={`${company.name} logo`}
              width={140}
              height={56}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'link-underline text-sm font-medium uppercase tracking-wide transition-colors',
                    active ? 'text-gold-600' : 'text-ink hover:text-gold-600'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${company.phone}`}
              className="hidden items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-gold hover:text-gold-600 xl:flex"
            >
              <Phone className="h-4 w-4 text-gold-600" />
              {company.phoneDisplay}
            </a>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/contact">Get a Quote</Link>
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 text-ink lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={120}
                  height={48}
                  className="h-11 w-auto object-contain"
                />
                <nav className="mt-8 flex flex-col gap-1">
                  {nav.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="rounded-lg px-3 py-3 font-serif text-lg text-ink transition-colors hover:bg-gold-50 hover:text-gold-600"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link
                      href="/privacy"
                      className="rounded-lg px-3 py-3 text-sm text-muted-foreground hover:text-ink"
                    >
                      Privacy Policy
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/terms"
                      className="rounded-lg px-3 py-3 text-sm text-muted-foreground hover:text-ink"
                    >
                      Terms & Conditions
                    </Link>
                  </SheetClose>
                </nav>

                <div className="mt-auto space-y-3 border-t border-border pt-6 text-sm">
                  <a
                    href={`tel:${company.phone}`}
                    className="flex items-center gap-2 text-ink"
                  >
                    <Phone className="h-4 w-4 text-gold-600" /> {company.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center gap-2 text-ink"
                  >
                    <Mail className="h-4 w-4 text-gold-600" /> {company.email}
                  </a>
                  <Button asChild className="mt-2 w-full">
                    <Link href="/contact">Get a Quote</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
