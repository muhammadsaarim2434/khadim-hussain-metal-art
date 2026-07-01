import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Instagram, Youtube } from 'lucide-react';
import { company, nav, categories } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="metal-dark text-white/70">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Image
            src={company.logoLight}
            alt={`${company.name} logo`}
            width={160}
            height={64}
            className="h-14 w-auto object-contain"
          />
          <p className="mt-4 text-sm leading-relaxed">
            Trusted manufacturer of aluminum furniture, custom metal main gates,
            iron railings, grills, and decorative metal art in Lahore, Pakistan —
            crafted with precision and passion.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={company.instagram}
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={company.youtube}
              aria-label="YouTube"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 transition-colors hover:border-gold hover:text-gold"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="lg:pl-6">
          <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
            Useful Links
          </h4>
          <ul className="space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="transition-colors hover:text-gold">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-gold">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
            Our Products
          </h4>
          <ul className="space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop?category=${c.slug}`}
                  className="transition-colors hover:text-gold"
                >
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white">
            Contact Information
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{company.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${company.phone}`} className="hover:text-gold">
                {company.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${company.email}`} className="hover:text-gold">
                {company.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{company.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/30">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-center text-xs text-white/60 md:flex-row md:text-left">
          <p>
            &copy; {new Date().getFullYear()} <strong className="text-white">{company.name}</strong>{' '}
            — Aluminum &amp; Metal Manufacturer, Lahore, Pakistan. All rights reserved.
          </p>
          <p>Crafted with precision.</p>
        </div>
      </div>
    </footer>
  );
}
