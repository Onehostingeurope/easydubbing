// api/videos.ts  –  Vercel Serverless Function
// GET  → return current video config from Supabase Storage
// POST → update video config (admin password required)

import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL     = process.env.SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ADMIN_PASSWORD   = process.env.ADMIN_PASSWORD || 'EasyDub@2025!';
const BUCKET           = 'edub-config';
const FILE             = 'video-config.json';
const STORAGE_BASE     = `${SUPABASE_URL}/storage/v1`;

const LANGS = ['en', 'fr', 'es', 'it', 'ru', 'de', 'ar'];

async function readConfig(): Promise<Record<string, string>> {
  const res = await fetch(`${STORAGE_BASE}/object/public/${BUCKET}/${FILE}?t=${Date.now()}`);
  if (!res.ok) return Object.fromEntries(LANGS.map(l => [l, '']));
  return res.json();
}

async function writeConfig(config: Record<string, string>): Promise<{ ok: boolean; detail?: string }> {
  const r = await fetch(`${STORAGE_BASE}/object/${BUCKET}/${FILE}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'x-upsert': 'true',
    },
    body: JSON.stringify(config),
  });
  if (!r.ok) {
    const detail = await r.text();
    console.error('[writeConfig] Supabase error:', r.status, detail);
    return { ok: false, detail };
  }
  return { ok: true };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // ── GET ──────────────────────────────────────────────────────
  if (req.method === 'GET') {
    const config = await readConfig();
    return res.status(200).json(config);
  }

  // ── POST ─────────────────────────────────────────────────────
  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    if (!body?.password) return res.status(400).json({ error: 'Missing password' });
    if (body.password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Invalid password' });

    const current = await readConfig();
    const updated: Record<string, string> = { ...current };
    for (const lang of LANGS) {
      if (typeof body[lang] === 'string') updated[lang] = body[lang].trim();
    }
    if (typeof body['installation_video'] === 'string') {
      updated['installation_video'] = body['installation_video'].trim();
    }

    const result = await writeConfig(updated);
    if (!result.ok) {
      return res.status(500).json({ error: 'Failed to save config', detail: result.detail });
    }
    return res.status(200).json({ success: true, config: updated });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
