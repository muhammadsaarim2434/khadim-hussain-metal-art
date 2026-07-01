import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

/**
 * Guard for admin API route handlers.
 * Returns the session, or a NextResponse (401) to return early.
 */
export async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    return { session: null, res: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  return { session, res: null };
}
