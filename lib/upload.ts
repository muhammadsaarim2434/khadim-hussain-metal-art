import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { put } from '@vercel/blob';

/**
 * Saves an uploaded File and returns its public URL.
 *
 * - On Vercel: uploads to Vercel Blob storage so images persist. Auth is handled
 *   automatically — via OIDC (VERCEL_OIDC_TOKEN + BLOB_STORE_ID) when the store is
 *   connected, or via BLOB_READ_WRITE_TOKEN if that env var is set.
 * - Locally (no Vercel, no token): writes to /public/uploads/<folder> on disk,
 *   same as the original PHP `uploads/` folder.
 */
export async function saveUpload(file: File, folder: string): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const random = Math.floor(100000 + Math.random() * 900000);
  const filename = `${random}_${safeName}`;

  // Use Vercel Blob when running on Vercel or when a token is configured.
  // The SDK auto-selects OIDC or the read-write token from the environment.
  const useBlob = Boolean(process.env.VERCEL || process.env.BLOB_READ_WRITE_TOKEN);
  if (useBlob) {
    const blob = await put(`${folder}/${filename}`, file, { access: 'public' });
    return blob.url;
  }

  // Local dev: write to disk
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const dir = path.join(process.cwd(), 'public', 'uploads', folder);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return `/uploads/${folder}/${filename}`;
}

export async function saveUploads(files: File[], folder: string): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    if (file && file.size > 0) {
      urls.push(await saveUpload(file, folder));
    }
  }
  return urls;
}
