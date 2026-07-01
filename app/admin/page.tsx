'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Package,
  FolderTree,
  Layers,
  MapPin,
  Images,
  ShoppingBag,
  ArrowUpRight,
  Loader2,
} from 'lucide-react';

type Stats = {
  counts: {
    products: number;
    categories: number;
    subcategories: number;
    regions: number;
    banners: number;
    orders: number;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recentOrders: any[];
};

const CARDS = [
  { key: 'products', label: 'Products', icon: Package, href: '/admin/products', color: 'bg-emerald-500' },
  { key: 'categories', label: 'Categories', icon: FolderTree, href: '/admin/categories', color: 'bg-gold' },
  { key: 'subcategories', label: 'Sub-categories', icon: Layers, href: '/admin/subcategories', color: 'bg-rose-500' },
  { key: 'regions', label: 'Regions', icon: MapPin, href: '/admin/regions', color: 'bg-indigo-500' },
  { key: 'banners', label: 'Banners', icon: Images, href: '/admin/banners', color: 'bg-sky-500' },
  { key: 'orders', label: 'Orders', icon: ShoppingBag, href: '/admin/orders', color: 'bg-brown' },
] as const;

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(async (r) => {
        if (!r.ok) throw new Error('Failed to load stats');
        return r.json();
      })
      .then(setStats)
      .catch(() => setError('Could not load statistics. Is the database connected & seeded?'));
  }, []);

  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-ink to-ink-700 p-8 text-white">
        <p className="text-sm text-gold">Welcome back</p>
        <h2 className="mt-1 font-serif text-3xl font-bold">Khadim Hussain Metal Art</h2>
        <p className="mt-2 max-w-xl text-sm text-white/60">
          Manage your products, categories, banners and orders — everything that
          powers your storefront, in one place.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          {error}{' '}
          <Link href="/admin/settings" className="font-semibold underline">
            Go to Settings to seed data
          </Link>
          .
        </div>
      )}

      {!stats && !error && (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading…
        </div>
      )}

      {stats && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.key}
                  href={c.href}
                  className="group flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${c.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-ink">
                      {stats.counts[c.key as keyof Stats['counts']]}
                    </p>
                    <p className="text-sm text-muted-foreground">{c.label}</p>
                  </div>
                  <ArrowUpRight className="ml-auto h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-ink">Recent Orders</h3>
              <Link href="/admin/orders" className="text-sm font-medium text-gold-600 hover:underline">
                View all
              </Link>
            </div>
            {stats.recentOrders.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No orders yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-xs uppercase text-muted-foreground">
                      <th className="pb-2 pr-4">Order</th>
                      <th className="pb-2 pr-4">Customer</th>
                      <th className="pb-2 pr-4">Total</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map((o) => (
                      <tr key={o._id} className="border-b last:border-0">
                        <td className="py-3 pr-4 font-medium">#{o.orderId}</td>
                        <td className="py-3 pr-4">{o.fullName}</td>
                        <td className="py-3 pr-4">Rs {o.totalBill}</td>
                        <td className="py-3">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              o.paymentStatus
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {o.paymentStatus ? 'Paid' : 'Unpaid'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
