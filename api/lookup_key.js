import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

    // Find the latest license for this email
    const { data, error } = await supabase
      .from('licenses')
      .select('license_key')
      .eq('email', email)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) throw error;

    if (data && data.length > 0) {
      return res.status(200).json({ key: data[0].license_key });
    } else {
      return res.status(200).json({ key: null });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
