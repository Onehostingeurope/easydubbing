import { createClient } from '@supabase/supabase-js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'easydubbing2026';

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export default async function handler(req: any, res: any) {
  // Auth
  const pw = req.headers['x-admin-password'] || req.body?.password || req.query?.password;
  if (pw !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabase = getSupabase();

  // ── GET: list all licenses ────────────────────────────────────────────────
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('licenses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ licenses: data });
  }

  const { action, ...body } = req.body || {};

  // ── POST: add new license ─────────────────────────────────────────────────
  if (req.method === 'POST' && action === 'create') {
    const { email, license_key, plan } = body;
    if (!email || !license_key) {
      return res.status(400).json({ error: 'email and license_key required' });
    }
    const { data, error } = await supabase
      .from('licenses')
      .insert({ email: email.toLowerCase().trim(), license_key, plan: plan || 'lifetime', is_active: true })
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ license: data });
  }

  // ── POST: reset HWID (transfer to new machine) ────────────────────────────
  if (req.method === 'POST' && action === 'reset_hwid') {
    const { id } = body;
    const { error } = await supabase
      .from('licenses')
      .update({ hwid: null })
      .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  // ── POST: toggle active status ────────────────────────────────────────────
  if (req.method === 'POST' && action === 'toggle_active') {
    const { id, is_active } = body;
    const { error } = await supabase
      .from('licenses')
      .update({ is_active })
      .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  // ── DELETE: remove license ────────────────────────────────────────────────
  if (req.method === 'DELETE') {
    const { id } = body;
    const { error } = await supabase
      .from('licenses')
      .delete()
      .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
