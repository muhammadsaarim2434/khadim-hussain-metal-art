# Khadim Hussain Metal Art — Next.js

A modern, redesigned website for **Khadim Hussain Metal Art** (Aluminum & Metal Manufacturer, Lahore), converted from the original PHP site into **Next.js + Tailwind CSS + shadcn-style UI**.

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with a custom classic/gold brand theme
- **shadcn-style UI** components (Button, Card, Badge, Input, Textarea, Sheet, Accordion) built on Radix UI
- **Framer Motion** for scroll reveal animations
- **lucide-react** icons

## Pages

| Route | Description |
| --- | --- |
| `/` | Home — hero, about, categories, why-us, featured & latest products, CTA, stats |
| `/about` | Company story, offers, why-choose, stats |
| `/shop` | Product grid with live category filter + search (`/shop?category=main-gates`) |
| `/categories` | All product categories |
| `/products/[slug]` | Product detail with gallery, specs, quote CTA, related products |
| `/contact` | Contact info, form, map, FAQ |
| `/privacy`, `/terms` | Legal pages |

## Content & Data

All company content (info, categories, products, stats, FAQs) lives in `lib/data.ts`.
Images are in `public/images/` (logo, about, banners, categories, products) — copied from the original site.

> Product data is representative sample data mapped to the real product images.
> Replace titles/descriptions in `lib/data.ts` and swap images in `public/images/products/` as needed.

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy (Vercel)

1. Push this folder to a GitHub repo.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js** → Deploy.

### Contact form

The form posts to `/api/contact`. To receive submissions, set an env var
`CONTACT_WEBHOOK` (e.g. a Formspree/Zapier URL) in Vercel; otherwise submissions
are logged server-side. Hook up email/CRM in `app/api/contact/route.ts`.
