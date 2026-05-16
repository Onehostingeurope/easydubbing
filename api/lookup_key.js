import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

    // 1. Try 'licenses'
    const try1 = await supabase
      .from('licenses')
      .select('license_key')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1);

    if (try1.data && try1.data.length > 0) {
      return res.status(200).json({ key: try1.data[0].license_key });
    }

    // 2. Try 'license' (if first one failed or was empty)
    const try2 = await supabase
      .from('license')
      .select('license_key')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1);

    if (try2.data && try2.data.length > 0) {
      return res.status(200).json({ key: try2.data[0].license_key });
    }

    // 3. Not found in either
    return res.status(200).json({ key: null });

  } catch (err) {
    console.error('Lookup Error:', err.message);
    return res.status(200).json({ key: null, error: err.message });
  }
}
