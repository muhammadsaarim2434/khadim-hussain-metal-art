'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Loader2, Images } from 'lucide-react';
import Modal from '@/components/admin/Modal';
import { compressImage } from '@/lib/image-compress';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Banner = any;

const inputCls =
  'w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20';
const labelCls = 'mb-1.5 block text-sm font-medium text-ink';

export default function BannersPage() {
  const [items, setItems] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  async function load() {
    setLoading(true);
    const data = await fetch('/api/admin/banners').then((r) => r.json());
    setItems(data.banners || []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setEditing(null);
    setTitle('');
    setDescription('');
    setImage(null);
    setError('');
    setModal(true);
  }
  function openEdit(b: Banner) {
    setEditing(b);
    setTitle(b.title || '');
    setDescription(b.description || '');
    setImage(null);
    setError('');
    setModal(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setSaving(true);
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    if (image) fd.append('image', await compressImage(image));
    const url = editing ? `/api/admin/banners/${editing._id}` : '/api/admin/banners';
    const res = await fetch(url, { method: editing ? 'PUT' : 'POST', body: fd });
    setSaving(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || 'Failed to save');
      return;
    }
    setModal(false);
    load();
  }

  async function remove(id: string) {
    if (!confirm('Delete this banner?')) return;
    await fetch(`/api/admin/banners/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} banners</p>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-ink-800"
        >
          <Plus className="h-4 w-4" /> Add Banner
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border bg-white py-20 text-center">
          <Images className="h-10 w-10 text-muted-foreground/50" />
          <p className="text-muted-foreground">No banners yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((b) => (
            <div key={b._id} className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="relative h-40 bg-neutral-100">
                {b.image && <Image src={b.image} alt={b.title} fill className="object-cover" />}
              </div>
              <div className="p-4">
                <p className="font-semibold text-ink">{b.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{b.description}</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => openEdit(b)} className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg border py-2 text-sm hover:bg-neutral-100">
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button onClick={() => remove(b._id)} className="rounded-lg border border-red-200 px-3 text-red-500 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Banner' : 'Add Banner'}>
        <form onSubmit={save} className="space-y-4">
          {error && <div className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</div>}
          <div>
            <label className={labelCls}>Title *</label>
            <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Description</label>
            <textarea className={inputCls} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Image</label>
            <input type="file" accept="image/*" className="text-sm" onChange={(e) => setImage(e.target.files?.[0] || null)} />
            {editing && <p className="mt-1 text-xs text-muted-foreground">Leave empty to keep current image.</p>}
          </div>
          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-ink py-2.5 text-sm font-semibold text-white hover:bg-ink-800 disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {editing ? 'Update' : 'Create'}
          </button>
        </form>
      </Modal>
    </div>
  );
}
