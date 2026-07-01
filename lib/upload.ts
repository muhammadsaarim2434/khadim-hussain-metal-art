import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { put } from '@vercel/blob';

/**
 * Saves an uploaded File and returns its public URL.
 *
 * - On Vercel (or anywhere BLOB_READ_WRITE_TOKEN is set): uploads to Vercel Blob
 *   storage, so images persist. This is the recommended production path.
 * - Otherwise (local dev): writes to /public/uploads/<folder> on disk, same as
 *   the original PHP `uploads/` folder.
 */
export async function saveUpload(file: File, folder: string): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const random = Math.floor(100000 + Math.random() * 900000);
  const filename = `${random}_${safeName}`;

  // Production / cloud: Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`${folder}/${filename}`, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
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
