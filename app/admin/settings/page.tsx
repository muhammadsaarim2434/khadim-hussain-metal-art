'use client';

import { useState } from 'react';
import { Loader2, KeyRound, Database, CheckCircle2 } from 'lucide-react';

const inputCls =
  'w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20';
const labelCls = 'mb-1.5 block text-sm font-medium text-ink';

export default function SettingsPage() {
  const [oldPassword, setOld] = useState('');
  const [newPassword, setNew] = useState('');
  const [pwMsg, setPwMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [pwSaving, setPwSaving] = useState(false);

  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState<string | null>(null);

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(null);
    setPwSaving(true);
    const res = await fetch('/api/admin/account', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    setPwSaving(false);
    const d = await res.json().catch(() => ({}));
    if (!res.ok) {
      setPwMsg({ type: 'err', text: d.error || 'Failed to change password' });
      return;
    }
    setPwMsg({ type: 'ok', text: 'Password changed successfully.' });
    setOld('');
    setNew('');
  }

  async function seed() {
    setSeeding(true);
    setSeedMsg(null);
    const res = await fetch('/api/seed', { method: 'POST' });
    const d = await res.json().catch(() => ({}));
    setSeeding(false);
    setSeedMsg(res.ok ? JSON.stringify(d.result) : d.error || 'Seed failed');
  }

  return (
    <div className="grid max-w-4xl gap-6 lg:grid-cols-2">
      {/* Change password */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-gold" />
          <h3 className="font-serif text-lg font-bold text-ink">Change Password</h3>
        </div>
        <form onSubmit={changePassword} className="space-y-4">
          {pwMsg && (
            <div
              className={`rounded-lg px-4 py-2.5 text-sm ${
                pwMsg.type === 'ok' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
              }`}
            >
              {pwMsg.text}
            </div>
          )}
          <div>
            <label className={labelCls}>Current Password</label>
            <input type="password" className={inputCls} value={oldPassword} onChange={(e) => setOld(e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>New Password</label>
            <input type="password" className={inputCls} value={newPassword} onChange={(e) => setNew(e.target.value)} />
          </div>
          <button
            type="submit"
            disabled={pwSaving}
            className="flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-800 disabled:opacity-60"
          >
            {pwSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            Update Password
          </button>
        </form>
      </div>

      {/* Seed */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Database className="h-5 w-5 text-gold" />
          <h3 className="font-serif text-lg font-bold text-ink">Data</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Import your starter catalog (categories, products, a banner and the default
          admin) into MongoDB. Safe to run multiple times — it never overwrites
          existing records.
        </p>
        {seedMsg && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-neutral-50 px-4 py-2.5 text-xs text-muted-foreground">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
            <span className="break-all">{seedMsg}</span>
          </div>
        )}
        <button
          onClick={seed}
          disabled={seeding}
          className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-ink px-5 py-2.5 text-sm font-semibold text-ink hover:bg-ink hover:text-white disabled:opacity-60"
        >
          {seeding && <Loader2 className="h-4 w-4 animate-spin" />}
          Seed / Import Data
        </button>
      </div>
    </div>
  );
}
