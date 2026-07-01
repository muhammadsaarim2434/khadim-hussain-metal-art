import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Banner } from '@/lib/models';
import { requireAdmin } from '@/lib/api-auth';
import { saveUpload } from '@/lib/upload';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { res } = await requireAdmin();
  if (res) return res;
  try {
    await connectDB();
    const fd = await request.formData();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const update: any = {
      title: String(fd.get('title') || '').trim(),
      description: String(fd.get('description') || ''),
    };
    const imageFile = fd.get('image');
    if (imageFile instanceof File && imageFile.size > 0) {
      update.image = await saveUpload(imageFile, 'banners');
    }
    await Banner.findByIdAndUpdate(params.id, update);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Update banner error:', err);
    return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { res } = await requireAdmin();
  if (res) return res;
  await connectDB();
  await Banner.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
