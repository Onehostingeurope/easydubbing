import { createClient } from '@supabase/supabase-js';

// Vercel Serverless Function to verify license keys
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, key, hwid } = req.body;

  // Initialize Supabase (Using environment variables set in Vercel)
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    // 1. Find the license in the database
    const { data: license, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('license_key', key)
      .single();

    if (error || !license) {
      return res.status(401).send('Invalid License Key');
    }

    // 2. Hardware ID Check (Lock the key to the PC)
    if (license.hwid && license.hwid !== hwid) {
      return res.status(403).send('License already in use on another computer');
    }

    // 3. If first time use, save the HWID
    if (!license.hwid) {
      await supabase
        .from('licenses')
        .update({ hwid: hwid })
        .eq('id', license.id);
    }

    return res.status(200).send('Verified');
  } catch (err) {
    return res.status(500).send('Server Error');
  }
}
