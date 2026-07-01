import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Order } from '@/lib/models';
import { requireAdmin } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { res } = await requireAdmin();
  if (res) return res;
  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ orders });
}
