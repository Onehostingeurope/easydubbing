import { createClient } from '@supabase/supabase-js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'EasyDub@2025!';

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

  // Helper to determine table name dynamically
  async function getTable() {
    const { error } = await supabase.from('licenses').select('id').limit(1);
    return (error && error.message.includes('relation "licenses" does not exist')) ? 'license' : 'licenses';
  }

  // ── GET: list all licenses ────────────────────────────────────────────────
  if (req.method === 'GET') {
    const table = await getTable();
    // Select *, but handle case where is_active might not exist yet
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    
    // Default is_active to true if column is missing
    const safeData = data?.map(row => ({
      ...row,
      is_active: row.is_active === undefined ? true : row.is_active
    }));
    
    return res.status(200).json({ licenses: safeData });
  }

  const { action, ...body } = req.body || {};
  const table = await getTable();


  // ── POST: add new license ─────────────────────────────────────────────────
  if (req.method === 'POST' && action === 'create') {
    const { email, license_key, plan } = body;
    if (!email || !license_key) {
      return res.status(400).json({ error: 'email and license_key required' });
    }
    const { data, error } = await supabase
      .from(table)
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
      .from(table)
      .update({ hwid: null })
      .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  // ── POST: toggle active status ────────────────────────────────────────────
  if (req.method === 'POST' && action === 'toggle_active') {
    const { id, is_active } = body;
    const { error } = await supabase
      .from(table)
      .update({ is_active })
      .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  // ── DELETE: remove license ────────────────────────────────────────────────
  if (req.method === 'DELETE') {
    const { id } = body;
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
