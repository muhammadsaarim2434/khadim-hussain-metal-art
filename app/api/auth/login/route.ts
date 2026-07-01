import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB, isDbConfigured } from '@/lib/mongodb';
import { Admin } from '@/lib/models';
import { setSession } from '@/lib/auth';

export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: 'Database not configured. Set MONGODB_URI and run the seed.' },
      { status: 503 }
    );
  }

  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    await connectDB();
    const admin = await Admin.findOne({ email: String(email).toLowerCase() });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    await setSession({
      id: String(admin._id),
      email: admin.email,
      name: `${admin.firstName} ${admin.lastName}`.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
