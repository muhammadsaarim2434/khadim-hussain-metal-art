import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Region } from '@/lib/models';
import { requireAdmin } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { res } = await requireAdmin();
  if (res) return res;
  const { name } = await request.json();
  await connectDB();
  await Region.findByIdAndUpdate(params.id, { name: String(name || '').trim() });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { res } = await requireAdmin();
  if (res) return res;
  await connectDB();
  await Region.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
