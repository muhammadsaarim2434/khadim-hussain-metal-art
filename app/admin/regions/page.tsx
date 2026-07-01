'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, MapPin, Check, X } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Region = any;

const inputCls =
  'w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20';

export default function RegionsPage() {
  const [items, setItems] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  async function load() {
    setLoading(true);
    const data = await fetch('/api/admin/regions').then((r) => r.json());
    setItems(data.regions || []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setAdding(true);
    await fetch('/api/admin/regions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setName('');
    setAdding(false);
    load();
  }

  async function saveEdit(id: string) {
    await fetch(`/api/admin/regions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName }),
    });
    setEditId(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm('Delete this region?')) return;
    await fetch(`/api/admin/regions/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="max-w-2xl space-y-6">
      <form onSubmit={add} className="flex gap-2 rounded-2xl border bg-white p-4 shadow-sm">
        <input
          className={inputCls}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New region name (e.g. Lahore)"
        />
        <button
          type="submit"
          disabled={adding}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-white hover:bg-ink-800 disabled:opacity-60"
        >
          {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Add
        </button>
      </form>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <MapPin className="h-10 w-10 text-muted-foreground/50" />
            <p className="text-muted-foreground">No regions yet.</p>
          </div>
        ) : (
          <ul className="divide-y">
            {items.map((r) => (
              <li key={r._id} className="flex items-center gap-3 px-5 py-3">
                {editId === r._id ? (
                  <>
                    <input className={inputCls} value={editName} onChange={(e) => setEditName(e.target.value)} />
                    <button onClick={() => saveEdit(r._id)} className="rounded-lg border border-emerald-200 p-2 text-emerald-600 hover:bg-emerald-50">
                      <Check className="h-4 w-4" />
                    </button>
                    <button onClick={() => setEditId(null)} className="rounded-lg border p-2 text-muted-foreground hover:bg-neutral-100">
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <MapPin className="h-4 w-4 text-gold" />
                    <span className="font-medium text-ink">{r.name}</span>
                    <div className="ml-auto flex gap-2">
                      <button
                        onClick={() => {
                          setEditId(r._id);
                          setEditName(r.name);
                        }}
                        className="rounded-lg border p-2 text-muted-foreground hover:bg-neutral-100 hover:text-ink"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => remove(r._id)} className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
