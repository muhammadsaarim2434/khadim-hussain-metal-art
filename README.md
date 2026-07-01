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
| `/admin` | **Admin panel** — dashboard, products, categories, sub-categories, regions, banners, orders |

## Admin Panel & Database

The full PHP admin panel is rebuilt inside this project under `/admin`, backed by
**MongoDB Atlas** (via Mongoose) with cookie/JWT authentication.

### Features
- Secure login (JWT httpOnly cookie) + route protection via `middleware.ts`
- Dashboard with live counts and recent orders
- CRUD for **Products** (multiple images, size/price variants, features, feature/sale flags, discount/tax, slug), **Categories**, **Sub-categories**, **Regions**, **Banners**
- **Orders**: view details, mark paid/unpaid, delete
- Change password + one-click **Seed** (imports the starter catalog)
- The public storefront reads live from MongoDB, with an automatic fallback to the
  static content in `lib/data.ts` when no database is configured.

### Setup
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Copy `.env.example` to `.env.local` and fill in `MONGODB_URI` and `AUTH_SECRET`.
3. Start the app, then seed the database:
   - open `/admin` → you'll be sent to `/admin/login`
   - after seeding you can log in with the default admin (below)
   - to seed: `POST /api/seed` (or use the **Seed / Import Data** button on `/admin/settings`)
4. Default admin: **admin@khma.com / admin123** (change it in Settings, or override
   via `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`).

> **Why MongoDB (not SQL)?** Zero server management, a free hosted tier, one-line
> Vercel setup, and a flexible schema that lets a product's images and size/price
> variants live inside a single document (SQL needed 3 separate tables). SQL is a
> fine alternative but is more setup for no real gain on this catalog.

### Image uploads
Uploads are saved to `public/uploads/...` (same approach as the original PHP `uploads/`
folder) — works in local dev and on any Node server / VPS. **On Vercel** the serverless
filesystem is not persistent, so for Vercel switch `lib/upload.ts` to Cloudinary or
Vercel Blob (the rest of the code stays the same).

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
