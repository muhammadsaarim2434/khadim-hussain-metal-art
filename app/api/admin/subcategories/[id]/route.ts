import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { SubCategory } from '@/lib/models';
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
      categoryId: String(fd.get('categoryId') || '').trim() || undefined,
    };
    const imageFile = fd.get('image');
    if (imageFile instanceof File && imageFile.size > 0) {
      update.image = await saveUpload(imageFile, 'sub_categories');
    }
    await SubCategory.findByIdAndUpdate(params.id, update);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Update subcategory error:', err);
    return NextResponse.json({ error: 'Failed to update sub-category' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { res } = await requireAdmin();
  if (res) return res;
  await connectDB();
  await SubCategory.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
