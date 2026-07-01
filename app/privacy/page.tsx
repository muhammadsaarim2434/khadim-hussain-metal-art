import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { company } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Khadim Hussain Metal Art — how we collect, use and protect your information.',
};

const sections = [
  {
    h: 'Information We Collect',
    p: 'When you contact us or request a quote, we may collect your name, email address, phone number and any details you share about your project. We only collect information you voluntarily provide.',
  },
  {
    h: 'How We Use Your Information',
    p: 'We use your information solely to respond to your enquiries, prepare quotes, fulfill orders and improve our services. We do not sell or rent your personal information to third parties.',
  },
  {
    h: 'Data Security',
    p: 'We take reasonable measures to protect your personal information against unauthorized access, alteration or disclosure. However, no method of transmission over the internet is 100% secure.',
  },
  {
    h: 'Cookies',
    p: 'Our website may use basic cookies to improve your browsing experience and understand site usage. You can disable cookies in your browser settings at any time.',
  },
  {
    h: 'Third-Party Links',
    p: 'Our site may contain links to external websites. We are not responsible for the privacy practices or content of those sites.',
  },
  {
    h: 'Contact Us',
    p: `If you have any questions about this Privacy Policy, please contact us at ${company.email} or ${company.phoneDisplay}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" crumb="Privacy Policy" />
      <section className="py-16 md:py-20">
        <div className="container-x max-w-3xl">
          <p className="text-muted-foreground">
            At <strong className="text-ink">{company.name}</strong>, we respect your
            privacy and are committed to protecting your personal information. This
            policy explains how we handle the information you share with us.
          </p>
          <div className="mt-10 space-y-8">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-serif text-xl font-bold text-ink">{s.h}</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
