import { saveUploads } from '@/lib/upload';
import { slugify } from '@/lib/slug';

function parseJsonArray(value: FormDataEntryValue | null): unknown[] {
  if (!value || typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Parses the product create/edit multipart form into a document object.
 */
export async function parseProductForm(formData: FormData) {
  const title = String(formData.get('title') || '').trim();
  const slugInput = String(formData.get('slug') || '').trim();

  const existingImages = parseJsonArray(formData.get('existingImages')) as string[];
  const newFiles = formData.getAll('images').filter((f): f is File => f instanceof File);
  const uploaded = await saveUploads(newFiles, 'products');
  const images = [...existingImages, ...uploaded];

  const sizesRaw = parseJsonArray(formData.get('sizes')) as {
    size?: string;
    price?: string;
  }[];
  const sizes = sizesRaw
    .filter((s) => (s.size && s.size.trim()) || (s.price && String(s.price).trim()))
    .map((s) => ({ size: String(s.size || ''), price: String(s.price || '') }));

  const features = (parseJsonArray(formData.get('features')) as string[])
    .map((f) => String(f).trim())
    .filter(Boolean);

  const asId = (v: FormDataEntryValue | null) => {
    const s = String(v || '').trim();
    return s ? s : undefined;
  };

  return {
    title,
    slug: slugify(slugInput || title),
    description: String(formData.get('description') || ''),
    descriptionLong: String(formData.get('descriptionLong') || ''),
    price: String(formData.get('price') || ''),
    discount: String(formData.get('discount') || '0'),
    tax: String(formData.get('tax') || '0'),
    material: String(formData.get('material') || ''),
    finish: String(formData.get('finish') || ''),
    feature: formData.get('feature') === 'true' || formData.get('feature') === 'on',
    sale: formData.get('sale') === 'true' || formData.get('sale') === 'on',
    categoryId: asId(formData.get('categoryId')),
    subCategoryId: asId(formData.get('subCategoryId')),
    regionId: asId(formData.get('regionId')),
    images,
    sizes,
    features,
  };
}
