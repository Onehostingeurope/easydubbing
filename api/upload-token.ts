// api/upload-token.ts
// Returns a signed Supabase Storage URL so the browser can upload
// large video files DIRECTLY to Supabase (bypasses Vercel 4.5MB limit).
// POST { password, lang, filename }

import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL     = process.env.SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const ADMIN_PASSWORD   = process.env.ADMIN_PASSWORD || 'EasyDub@2025!';
const BUCKET           = 'edub-videos';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  if (!body?.password || body.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const lang     = (body.lang     || 'en').replace(/[^a-z]/g, '');
  const filename = (body.filename || 'video.mp4').replace(/[^a-zA-Z0-9._-]/g, '_');
  const objectPath = `${lang}/${Date.now()}_${filename}`;

  // Create signed upload URL (valid 60 min)
  const signRes = await fetch(
    `${SUPABASE_URL}/storage/v1/object/upload/sign/${BUCKET}/${objectPath}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: '{}',
    }
  );

  if (!signRes.ok) {
    const err = await signRes.text();
    return res.status(500).json({ error: 'Failed to create upload URL', detail: err });
  }

  const { signedURL, token } = await signRes.json();
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${objectPath}`;

  return res.status(200).json({ signedURL, token, publicUrl, objectPath });
}
