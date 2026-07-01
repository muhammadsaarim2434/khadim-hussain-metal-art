'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, Loader2, Layers } from 'lucide-react';
import Modal from '@/components/admin/Modal';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Sub = any;

const inputCls =
  'w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20';
const labelCls = 'mb-1.5 block text-sm font-medium text-ink';

export default function SubCategoriesPage() {
  const [items, setItems] = useState<Sub[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cats, setCats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Sub | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState<File | null>(null);

  async function load() {
    setLoading(true);
    const [s, c] = await Promise.all([
      fetch('/api/admin/subcategories').then((r) => r.json()),
      fetch('/api/admin/categories').then((r) => r.json()),
    ]);
    setItems(s.subcategories || []);
    setCats(c.categories || []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setEditing(null);
    setTitle('');
    setCategoryId('');
    setImage(null);
    setError('');
    setModal(true);
  }
  function openEdit(s: Sub) {
    setEditing(s);
    setTitle(s.title || '');
    setCategoryId(String(s.categoryId?._id || s.categoryId || ''));
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
    fd.append('categoryId', categoryId);
    if (image) fd.append('image', image);
    const url = editing ? `/api/admin/subcategories/${editing._id}` : '/api/admin/subcategories';
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
    if (!confirm('Delete this sub-category?')) return;
    await fetch(`/api/admin/subcategories/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{items.length} sub-categories</p>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-ink-800"
        >
          <Plus className="h-4 w-4" /> Add Sub-category
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <Layers className="h-10 w-10 text-muted-foreground/50" />
            <p className="text-muted-foreground">No sub-categories yet.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-neutral-50 text-left text-xs uppercase text-muted-foreground">
                <th className="px-5 py-3">Sub-category</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => (
                <tr key={s._id} className="border-b last:border-0 hover:bg-neutral-50/60">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-neutral-100">
                        {s.image && <Image src={s.image} alt={s.title} fill className="object-cover" />}
                      </div>
                      <span className="font-medium text-ink">{s.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{s.categoryId?.title || '—'}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(s)} className="rounded-lg border p-2 text-muted-foreground hover:bg-neutral-100 hover:text-ink">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => remove(s._id)} className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Sub-category' : 'Add Sub-category'}>
        <form onSubmit={save} className="space-y-4">
          {error && <div className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</div>}
          <div>
            <label className={labelCls}>Title *</label>
            <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Parent Category</label>
            <select className={inputCls} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">— Select —</option>
              {cats.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Image</label>
            <input type="file" accept="image/*" className="text-sm" onChange={(e) => setImage(e.target.files?.[0] || null)} />
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
