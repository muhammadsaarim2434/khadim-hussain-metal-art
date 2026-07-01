'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader2, Plus, Trash2, X, ImagePlus } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Opt = any;

const inputCls =
  'w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20';
const labelCls = 'mb-1.5 block text-sm font-medium text-ink';

export default function ProductForm({
  productId,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initial,
}: {
  productId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initial?: any;
}) {
  const router = useRouter();
  const [categories, setCategories] = useState<Opt[]>([]);
  const [subcategories, setSubcategories] = useState<Opt[]>([]);
  const [regions, setRegions] = useState<Opt[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: initial?.title || '',
    slug: initial?.slug || '',
    description: initial?.description || '',
    descriptionLong: initial?.descriptionLong || '',
    price: initial?.price || '',
    discount: initial?.discount || '0',
    tax: initial?.tax || '0',
    material: initial?.material || '',
    finish: initial?.finish || '',
    feature: Boolean(initial?.feature),
    sale: Boolean(initial?.sale),
    categoryId: initial?.categoryId ? String(initial.categoryId) : '',
    subCategoryId: initial?.subCategoryId ? String(initial.subCategoryId) : '',
    regionId: initial?.regionId ? String(initial.regionId) : '',
  });

  const [features, setFeatures] = useState<string[]>(
    initial?.features?.length ? initial.features : ['']
  );
  const [sizes, setSizes] = useState<{ size: string; price: string }[]>(
    initial?.sizes?.length ? initial.sizes : []
  );
  const [existingImages, setExistingImages] = useState<string[]>(initial?.images || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/categories').then((r) => r.json()),
      fetch('/api/admin/subcategories').then((r) => r.json()),
      fetch('/api/admin/regions').then((r) => r.json()),
    ]).then(([c, s, r]) => {
      setCategories(c.categories || []);
      setSubcategories(s.subcategories || []);
      setRegions(r.regions || []);
    });
  }, []);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) {
      setError('Product name is required');
      return;
    }
    setSaving(true);

    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('slug', form.slug);
    fd.append('description', form.description);
    fd.append('descriptionLong', form.descriptionLong);
    fd.append('price', form.price);
    fd.append('discount', form.discount);
    fd.append('tax', form.tax);
    fd.append('material', form.material);
    fd.append('finish', form.finish);
    fd.append('feature', form.feature ? 'true' : 'false');
    fd.append('sale', form.sale ? 'true' : 'false');
    fd.append('categoryId', form.categoryId);
    fd.append('subCategoryId', form.subCategoryId);
    fd.append('regionId', form.regionId);
    fd.append('features', JSON.stringify(features.map((f) => f.trim()).filter(Boolean)));
    fd.append('sizes', JSON.stringify(sizes));
    fd.append('existingImages', JSON.stringify(existingImages));
    newFiles.forEach((f) => fd.append('images', f));

    const url = productId ? `/api/admin/products/${productId}` : '/api/admin/products';
    const method = productId ? 'PUT' : 'POST';
    const res = await fetch(url, { method, body: fd });

    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || 'Failed to save product');
      setSaving(false);
      return;
    }
    router.push('/admin/products');
    router.refresh();
  }

  const subForCategory = form.categoryId
    ? subcategories.filter((s) => String(s.categoryId?._id || s.categoryId) === form.categoryId)
    : subcategories;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: main details */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-serif text-lg font-bold text-ink">Details</h3>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Product Name *</label>
                <input
                  className={inputCls}
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="e.g. Grand Entrance Main Gate"
                />
              </div>
              <div>
                <label className={labelCls}>Slug (URL)</label>
                <input
                  className={inputCls}
                  value={form.slug}
                  onChange={(e) => set('slug', e.target.value)}
                  placeholder="auto-generated from name if left empty"
                />
              </div>
              <div>
                <label className={labelCls}>Short Description</label>
                <textarea
                  className={inputCls}
                  rows={2}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                />
              </div>
              <div>
                <label className={labelCls}>Long Description</label>
                <textarea
                  className={inputCls}
                  rows={4}
                  value={form.descriptionLong}
                  onChange={(e) => set('descriptionLong', e.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Material</label>
                  <input
                    className={inputCls}
                    value={form.material}
                    onChange={(e) => set('material', e.target.value)}
                    placeholder="e.g. Wrought Iron"
                  />
                </div>
                <div>
                  <label className={labelCls}>Finish</label>
                  <input
                    className={inputCls}
                    value={form.finish}
                    onChange={(e) => set('finish', e.target.value)}
                    placeholder="e.g. Powder-coated"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-ink">Key Features</h3>
              <button
                type="button"
                onClick={() => setFeatures((f) => [...f, ''])}
                className="inline-flex items-center gap-1 text-sm font-medium text-gold-600 hover:underline"
              >
                <Plus className="h-4 w-4" /> Add feature
              </button>
            </div>
            <div className="space-y-2">
              {features.map((feat, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className={inputCls}
                    value={feat}
                    onChange={(e) =>
                      setFeatures((arr) => arr.map((v, idx) => (idx === i ? e.target.value : v)))
                    }
                    placeholder="e.g. Rust-resistant powder coating"
                  />
                  <button
                    type="button"
                    onClick={() => setFeatures((arr) => arr.filter((_, idx) => idx !== i))}
                    className="rounded-lg border border-red-200 px-3 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes & prices */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-ink">Sizes & Prices</h3>
              <button
                type="button"
                onClick={() => setSizes((s) => [...s, { size: '', price: '' }])}
                className="inline-flex items-center gap-1 text-sm font-medium text-gold-600 hover:underline"
              >
                <Plus className="h-4 w-4" /> Add row
              </button>
            </div>
            {sizes.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Optional. Add size/price variants (e.g. 4ft × 6ft — Rs 45,000).
              </p>
            ) : (
              <div className="space-y-2">
                {sizes.map((row, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className={inputCls}
                      value={row.size}
                      onChange={(e) =>
                        setSizes((arr) =>
                          arr.map((v, idx) => (idx === i ? { ...v, size: e.target.value } : v))
                        )
                      }
                      placeholder="Size / variant"
                    />
                    <input
                      className={inputCls}
                      value={row.price}
                      onChange={(e) =>
                        setSizes((arr) =>
                          arr.map((v, idx) => (idx === i ? { ...v, price: e.target.value } : v))
                        )
                      }
                      placeholder="Price (Rs)"
                    />
                    <button
                      type="button"
                      onClick={() => setSizes((arr) => arr.filter((_, idx) => idx !== i))}
                      className="rounded-lg border border-red-200 px-3 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Images */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-serif text-lg font-bold text-ink">Images</h3>
            <div className="flex flex-wrap gap-3">
              {existingImages.map((src) => (
                <div key={src} className="relative h-24 w-24 overflow-hidden rounded-lg border">
                  <Image src={src} alt="" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => setExistingImages((arr) => arr.filter((s) => s !== src))}
                    className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {newFiles.map((file, i) => (
                <div key={i} className="relative h-24 w-24 overflow-hidden rounded-lg border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setNewFiles((arr) => arr.filter((_, idx) => idx !== i))}
                    className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-white hover:bg-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-input text-muted-foreground hover:border-gold hover:text-gold">
                <ImagePlus className="h-5 w-5" />
                <span className="text-[11px]">Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) =>
                    setNewFiles((arr) => [...arr, ...Array.from(e.target.files || [])])
                  }
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right: organization */}
        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-serif text-lg font-bold text-ink">Organization</h3>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Category</label>
                <select
                  className={inputCls}
                  value={form.categoryId}
                  onChange={(e) => set('categoryId', e.target.value)}
                >
                  <option value="">— Select —</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Sub-category</label>
                <select
                  className={inputCls}
                  value={form.subCategoryId}
                  onChange={(e) => set('subCategoryId', e.target.value)}
                >
                  <option value="">— Select —</option>
                  {subForCategory.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Region</label>
                <select
                  className={inputCls}
                  value={form.regionId}
                  onChange={(e) => set('regionId', e.target.value)}
                >
                  <option value="">— Select —</option>
                  {regions.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-serif text-lg font-bold text-ink">Pricing & Flags</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Discount %</label>
                  <input
                    className={inputCls}
                    value={form.discount}
                    onChange={(e) => set('discount', e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Tax %</label>
                  <input
                    className={inputCls}
                    value={form.tax}
                    onChange={(e) => set('tax', e.target.value)}
                  />
                </div>
              </div>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.feature}
                  onChange={(e) => set('feature', e.target.checked)}
                  className="h-4 w-4 rounded accent-gold"
                />
                <span className="text-sm text-ink">Featured product</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.sale}
                  onChange={(e) => set('sale', e.target.checked)}
                  className="h-4 w-4 rounded accent-gold"
                />
                <span className="text-sm text-ink">On sale</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-800 disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {productId ? 'Update Product' : 'Create Product'}
          </button>
        </div>
      </div>
    </form>
  );
}
