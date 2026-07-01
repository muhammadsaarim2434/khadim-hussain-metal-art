import { SignJWT, jwtVerify } from 'jose';

const secretString =
  process.env.AUTH_SECRET || 'khma-dev-secret-change-me-in-production-please';
const secret = new TextEncoder().encode(secretString);

export const COOKIE_NAME = 'khma_admin';

export type SessionPayload = {
  id: string;
  email: string;
  name: string;
};

export async function createToken(payload: SessionPayload) {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}
