import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { company } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Terms & Conditions for using the Khadim Hussain Metal Art website and services.',
};

const sections = [
  {
    h: 'Products & Custom Orders',
    p: 'Most of our products are handcrafted and made to order. Dimensions, finishes and designs can be customized. Slight variations in handmade metalwork are natural and are not considered defects.',
  },
  {
    h: 'Quotes & Pricing',
    p: 'All prices are provided on request and depend on design, size, material and quantity. A quote is valid for the period stated at the time of issue and may change with material costs.',
  },
  {
    h: 'Orders & Payments',
    p: 'Custom orders may require an advance payment to begin production. Production timelines are communicated at the time of order confirmation.',
  },
  {
    h: 'Delivery & Installation',
    p: 'Delivery and installation options vary by product and location. Any applicable charges will be discussed and agreed before order confirmation.',
  },
  {
    h: 'Warranty',
    p: 'We stand behind our craftsmanship. Any manufacturing defect should be reported promptly. Warranty does not cover damage from misuse, accidents or normal wear.',
  },
  {
    h: 'Intellectual Property',
    p: 'All content on this website — including images, designs and text — is the property of Khadim Hussain Metal Art and may not be reproduced without permission.',
  },
  {
    h: 'Contact Us',
    p: `For any questions regarding these terms, contact us at ${company.email} or ${company.phoneDisplay}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms & Conditions" crumb="Terms & Conditions" />
      <section className="py-16 md:py-20">
        <div className="container-x max-w-3xl">
          <p className="text-muted-foreground">
            Welcome to <strong className="text-ink">{company.name}</strong>. By using
            our website and services, you agree to the following terms and conditions.
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
