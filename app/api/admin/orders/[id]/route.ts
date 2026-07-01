import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/lib/models';
import { requireAdmin } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { res } = await requireAdmin();
  if (res) return res;
  const { paymentStatus } = await request.json();
  await connectDB();
  await Order.findByIdAndUpdate(params.id, {
    paymentStatus: Number(paymentStatus) ? 1 : 0,
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const { res } = await requireAdmin();
  if (res) return res;
  await connectDB();
  await Order.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
