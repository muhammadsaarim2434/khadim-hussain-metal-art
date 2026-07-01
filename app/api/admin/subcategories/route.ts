import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { SubCategory } from '@/lib/models';
import { requireAdmin } from '@/lib/api-auth';
import { saveUpload } from '@/lib/upload';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { res } = await requireAdmin();
  if (res) return res;
  await connectDB();
  const subcategories = await SubCategory.find()
    .populate('categoryId', 'title')
    .sort({ createdAt: 1 })
    .lean();
  return NextResponse.json({ subcategories });
}

export async function POST(request: Request) {
  const { res } = await requireAdmin();
  if (res) return res;
  try {
    await connectDB();
    const fd = await request.formData();
    const title = String(fd.get('title') || '').trim();
    const categoryId = String(fd.get('categoryId') || '').trim() || undefined;
    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const imageFile = fd.get('image');
    const image = imageFile instanceof File && imageFile.size > 0
      ? await saveUpload(imageFile, 'sub_categories')
      : '';

    await SubCategory.create({ title, categoryId, image });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Create subcategory error:', err);
    return NextResponse.json({ error: 'Failed to create sub-category' }, { status: 500 });
  }
}
