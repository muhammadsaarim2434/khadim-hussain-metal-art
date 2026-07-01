import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Category } from '@/lib/models';
import { requireAdmin } from '@/lib/api-auth';
import { saveUpload } from '@/lib/upload';
import { slugify } from '@/lib/slug';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { res } = await requireAdmin();
  if (res) return res;
  await connectDB();
  const categories = await Category.find().sort({ createdAt: 1 }).lean();
  return NextResponse.json({ categories });
}

export async function POST(request: Request) {
  const { res } = await requireAdmin();
  if (res) return res;
  try {
    await connectDB();
    const fd = await request.formData();
    const title = String(fd.get('title') || '').trim();
    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const description = String(fd.get('description') || '');
    const imageFile = fd.get('image');
    const longFile = fd.get('longImage');

    const image = imageFile instanceof File && imageFile.size > 0
      ? await saveUpload(imageFile, 'categories')
      : '';
    const longImage = longFile instanceof File && longFile.size > 0
      ? await saveUpload(longFile, 'categories')
      : image;

    const baseSlug = slugify(String(fd.get('slug') || title));
    let slug = baseSlug;
    let n = 1;
    while (await Category.findOne({ slug })) slug = `${baseSlug}-${n++}`;

    await Category.create({ title, slug, description, image, longImage });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Create category error:', err);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
