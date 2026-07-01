import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB, isDbConfigured } from '@/lib/mongodb';
import { Admin, Category, Product, Banner } from '@/lib/models';
import {
  categories as staticCategories,
  products as staticProducts,
} from '@/lib/data';
import { slugify } from '@/lib/slug';

const DEFAULT_ADMIN = {
  email: process.env.SEED_ADMIN_EMAIL || 'admin@khma.com',
  password: process.env.SEED_ADMIN_PASSWORD || 'admin123',
};

export async function POST() {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: 'Set MONGODB_URI in .env.local before seeding.' },
      { status: 503 }
    );
  }

  try {
    await connectDB();
    const result: Record<string, unknown> = {};

    /* ------------------------------ Admin ------------------------------ */
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hash = await bcrypt.hash(DEFAULT_ADMIN.password, 12);
      await Admin.create({
        firstName: 'Khadim',
        lastName: 'Admin',
        email: DEFAULT_ADMIN.email,
        password: hash,
      });
      result.admin = `created (${DEFAULT_ADMIN.email})`;
    } else {
      result.admin = 'already exists';
    }

    /* ---------------------------- Categories --------------------------- */
    let catMap = new Map<string, string>();
    const catCount = await Category.countDocuments();
    if (catCount === 0) {
      const created = await Category.insertMany(
        staticCategories.map((c) => ({
          title: c.title,
          slug: c.slug,
          image: c.image,
          longImage: c.image,
          description: c.description,
        }))
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      created.forEach((c: any) => catMap.set(c.slug, String(c._id)));
      result.categories = `imported ${created.length}`;
    } else {
      const existing = await Category.find().lean();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      existing.forEach((c: any) => catMap.set(c.slug, String(c._id)));
      result.categories = 'already exist';
    }

    /* ----------------------------- Products ---------------------------- */
    const prodCount = await Product.countDocuments();
    if (prodCount === 0) {
      const docs = staticProducts.map((p) => ({
        title: p.title,
        slug: p.slug || slugify(p.title),
        description: p.description,
        descriptionLong: p.description,
        feature: Boolean(p.featured),
        sale: Boolean(p.sale),
        material: p.material,
        finish: p.finish,
        features: p.features || [],
        images: p.images && p.images.length ? p.images : [p.image],
        categoryId: catMap.get(p.category) || undefined,
        sizes: [],
      }));
      const created = await Product.insertMany(docs);
      result.products = `imported ${created.length}`;
    } else {
      result.products = 'already exist';
    }

    /* ------------------------------ Banner ----------------------------- */
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      await Banner.create({
        title: 'Your Vision, Our Metal Expertise',
        description:
          'Custom-crafted gates, railings, grills and decorative metal art.',
        image: '/images/banners/banner-1.jpg',
      });
      result.banners = 'created 1';
    } else {
      result.banners = 'already exist';
    }

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error('Seed error:', err);
    return NextResponse.json(
      { error: 'Seed failed', detail: String(err) },
      { status: 500 }
    );
  }
}
