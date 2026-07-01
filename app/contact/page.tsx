import type { Metadata } from 'next';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { company, faqs } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contact Us – Get a Custom Metal Art Quote',
  description:
    'Contact Khadim Hussain Metal Art for custom aluminum furniture, metal gates, railings and grills. Located on Madar-e-Millat Road, Lahore.',
};

const info = [
  { icon: MapPin, label: 'Address', value: company.address },
  { icon: Phone, label: 'Phone', value: company.phoneDisplay, href: `tel:${company.phone}` },
  { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
  { icon: Clock, label: 'Business Hours', value: company.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" crumb="Contact Us" image="/images/about/contact.jpg" />

      <section className="py-20 md:py-24">
        <div className="container-x">
          {/* Info cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {info.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gold/15 text-gold-600">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-semibold">{item.label}</h3>
                  {item.href ? (
                    <a href={item.href} className="mt-1 block text-sm text-muted-foreground hover:text-gold-600">
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm text-muted-foreground">{item.value}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Form + map */}
          <div className="mt-14 grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Reveal>
                <span className="eyebrow">Contact Form</span>
                <h2 className="mt-3 font-serif text-3xl font-bold">
                  Send Us a Message — Get a Custom Quote
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Interested in aluminum furniture, custom gates, railings or any metal
                  art product? Fill in the form and our team will get back to you
                  promptly.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-2">
              <Reveal delay={0.1}>
                <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
                  <iframe
                    title="Khadim Hussain Metal Art location"
                    src="https://www.google.com/maps?q=Madar-e-Millat%20Road%20Lahore&output=embed"
                    className="h-[320px] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8">
                  <h3 className="font-serif text-xl font-bold">Frequently Asked</h3>
                  <Accordion type="single" collapsible className="mt-2">
                    {faqs.map((f, i) => (
                      <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger>{f.q}</AccordionTrigger>
                        <AccordionContent>{f.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
