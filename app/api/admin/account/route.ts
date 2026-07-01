import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import { Admin } from '@/lib/models';
import { requireAdmin } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

export async function PUT(request: Request) {
  const { session, res } = await requireAdmin();
  if (res) return res;

  try {
    await connectDB();
    const { oldPassword, newPassword } = await request.json();
    const admin = await Admin.findById(session!.id);
    if (!admin) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const ok = await bcrypt.compare(oldPassword || '', admin.password);
    if (!ok) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }
    if (!newPassword || String(newPassword).length < 6) {
      return NextResponse.json(
        { error: 'New password must be at least 6 characters' },
        { status: 400 }
      );
    }
    admin.password = await bcrypt.hash(newPassword, 12);
    await admin.save();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Change password error:', err);
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  }
}
