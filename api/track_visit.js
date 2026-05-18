import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    return res.status(200).end();
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

    // Only log the visit, don't throw if it fails
    await supabase.from('activity_log').insert({
      action: 'page_view',
      details: `Website Visitor${city ? ` - ${decodeURIComponent(city)}` : ''}${lat ? `|GEO:${lat},${lng}` : ''}`,
      country: country
    });

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(200).json({ success: false }); // Always return 200 so frontend doesn't break
  }
}
