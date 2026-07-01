import { cookies } from 'next/headers';
import {
  createToken,
  verifyToken,
  COOKIE_NAME,
  type SessionPayload,
} from '@/lib/jwt';

export { COOKIE_NAME, verifyToken, createToken };
export type { SessionPayload };

export async function setSession(payload: SessionPayload) {
  const token = await createToken(payload);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearSession() {
  cookies().set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
}

export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
