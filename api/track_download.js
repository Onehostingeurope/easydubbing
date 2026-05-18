import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const country = req.headers['x-vercel-ip-country'] || 'US';
    const city = req.headers['x-vercel-ip-city'] || '';
    const lat = req.headers['x-vercel-ip-latitude'] || '';
    const lng = req.headers['x-vercel-ip-longitude'] || '';
    
    await supabase.from('activity_log').insert({
      action: 'download',
      details: `Easy_Dubbing_Setup.exe${city ? ` - ${decodeURIComponent(city)}` : ''}${lat ? `|GEO:${lat},${lng}` : ''}`,
      country: country
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Download Tracking Error:', err.message);
    return res.status(500).json({ error: 'Failed to track' });
  }
}
