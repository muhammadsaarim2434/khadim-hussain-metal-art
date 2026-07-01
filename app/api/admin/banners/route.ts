import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Banner } from '@/lib/models';
import { requireAdmin } from '@/lib/api-auth';
import { saveUpload } from '@/lib/upload';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { res } = await requireAdmin();
  if (res) return res;
  await connectDB();
  const banners = await Banner.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ banners });
}

export async function POST(request: Request) {
  const { res } = await requireAdmin();
  if (res) return res;
  try {
    await connectDB();
    const fd = await request.formData();
    const title = String(fd.get('title') || '').trim();
    const description = String(fd.get('description') || '');
    if (!title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

    const imageFile = fd.get('image');
    const image = imageFile instanceof File && imageFile.size > 0
      ? await saveUpload(imageFile, 'banners')
      : '';

    await Banner.create({ title, description, image });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Create banner error:', err);
    return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 });
  }
}
