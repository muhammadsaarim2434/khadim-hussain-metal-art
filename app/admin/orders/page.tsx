'use client';

import { useEffect, useState } from 'react';
import { Loader2, ShoppingBag, Trash2, ChevronDown, CheckCircle2, Circle } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Order = any;

export default function OrdersPage() {
  const [items, setItems] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const data = await fetch('/api/admin/orders').then((r) => r.json());
    setItems(data.orders || []);
    setLoading(false);
  }
  useEffect(() => {
    load();
  }, []);

  async function togglePaid(o: Order) {
    await fetch(`/api/admin/orders/${o._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentStatus: o.paymentStatus ? 0 : 1 }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm('Delete this order?')) return;
    await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">{items.length} orders</p>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground/50" />
            <p className="text-muted-foreground">No orders yet.</p>
          </div>
        ) : (
          <div className="divide-y">
            {items.map((o) => (
              <div key={o._id}>
                <div className="flex flex-wrap items-center gap-3 px-5 py-4">
                  <button
                    onClick={() => setOpenId(openId === o._id ? null : o._id)}
                    className="flex items-center gap-2 text-left"
                  >
                    <ChevronDown
                      className={`h-4 w-4 text-muted-foreground transition-transform ${
                        openId === o._id ? 'rotate-180' : ''
                      }`}
                    />
                    <div>
                      <p className="font-semibold text-ink">#{o.orderId}</p>
                      <p className="text-xs text-muted-foreground">{o.fullName}</p>
                    </div>
                  </button>

                  <div className="ml-auto flex items-center gap-3">
                    <span className="text-sm font-medium text-ink">Rs {o.totalBill}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        o.paymentStatus ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {o.paymentStatus ? 'Paid' : 'Unpaid'}
                    </span>
                    <button
                      onClick={() => togglePaid(o)}
                      title="Toggle paid"
                      className="rounded-lg border p-2 text-muted-foreground hover:bg-neutral-100 hover:text-ink"
                    >
                      {o.paymentStatus ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Circle className="h-4 w-4" />}
                    </button>
                    <button onClick={() => remove(o._id)} className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {openId === o._id && (
                  <div className="grid gap-4 bg-neutral-50 px-5 py-4 md:grid-cols-2">
                    <div className="text-sm">
                      <p className="mb-1 font-semibold text-ink">Customer</p>
                      <p className="text-muted-foreground">{o.fullName}</p>
                      <p className="text-muted-foreground">{o.email}</p>
                      <p className="text-muted-foreground">{o.phone}</p>
                      <p className="text-muted-foreground">
                        {[o.address, o.city, o.country, o.postalCode].filter(Boolean).join(', ')}
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="mb-1 font-semibold text-ink">Items ({o.totalProducts || o.items?.length || 0})</p>
                      {o.items?.length ? (
                        <ul className="space-y-1">
                          {o.items.map((it: Order, idx: number) => (
                            <li key={idx} className="flex justify-between text-muted-foreground">
                              <span>{it.title} × {it.quantity}</span>
                              <span>Rs {it.totalPrice}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground">No item details.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
