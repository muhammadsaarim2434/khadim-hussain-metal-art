import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import SiteChrome from '@/components/SiteChrome';
import { company } from '@/lib/data';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.khadimhussainmetalart.com'),
  title: {
    default:
      'Khadim Hussain Metal Art | Aluminum Furniture, Metal Gates & Grills Manufacturer – Lahore',
    template: '%s | Khadim Hussain Metal Art',
  },
  description:
    "Khadim Hussain Metal Art is Pakistan's trusted manufacturer of aluminum outdoor furniture, custom metal main gates, iron railings, grills and decorative metal art. Factory-direct pricing, Lahore.",
  keywords: [
    'aluminum furniture manufacturer Lahore',
    'metal main gate manufacturer Pakistan',
    'iron railings grills',
    'decorative metal art',
    'custom metal gates Lahore',
    'Khadim Hussain Metal Art',
  ],
  icons: { icon: '/images/logo/favicon.png' },
  openGraph: {
    type: 'website',
    siteName: 'Khadim Hussain Metal Art',
    locale: 'en_PK',
    images: ['/images/about/about-2.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: company.name,
              description:
                'Leading manufacturer of aluminum outdoor furniture, custom metal main gates, iron railings, grills, and decorative metal art in Lahore, Pakistan.',
              telephone: company.phone,
              email: company.email,
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Madar-e-Millat Road',
                addressLocality: 'Lahore',
                addressRegion: 'Punjab',
                addressCountry: 'PK',
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
