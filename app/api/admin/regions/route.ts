import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Region } from '@/lib/models';
import { requireAdmin } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { res } = await requireAdmin();
  if (res) return res;
  await connectDB();
  const regions = await Region.find().sort({ createdAt: 1 }).lean();
  return NextResponse.json({ regions });
}

export async function POST(request: Request) {
  const { res } = await requireAdmin();
  if (res) return res;
  try {
    await connectDB();
    const { name } = await request.json();
    if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    await Region.create({ name: String(name).trim() });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Create region error:', err);
    return NextResponse.json({ error: 'Failed to create region' }, { status: 500 });
  }
}
