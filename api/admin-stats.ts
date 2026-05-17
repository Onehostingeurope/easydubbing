import { createClient } from '@supabase/supabase-js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'EasyDub@2025!';

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export default async function handler(req: any, res: any) {
  const pw = req.headers['x-admin-password'] || req.body?.password || req.query?.password;
  if (pw !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabase = getSupabase();

  try {
    // 1. Get Licenses Data (Active & Unique)
    const { data: licenses } = await supabase.from('licenses').select('email, is_active');
    const activeLicenses = licenses?.filter(l => l.is_active).length || 0;
    const uniqueUsers = new Set(licenses?.map(l => l.email)).size;

    // 2. Get Downloads & Countries (from Activity Log)
    const { data: activity } = await supabase.from('activity_log').select('*').order('created_at', { ascending: false });
    const allActivity = activity || [];
    
    const downloads = allActivity.filter(a => a.action === 'download').length;
    
    // Calculate Countries Reached
    const countriesSet = new Set(allActivity.filter(a => a.country).map(a => a.country));
    const countriesReached = countriesSet.size;

    // 3. Top Demographics
    const countryCounts: Record<string, number> = {};
    allActivity.forEach(a => {
      if (a.country) {
        countryCounts[a.country] = (countryCounts[a.country] || 0) + 1;
      }
    });

    // Convert to array and sort
    const totalWithCountry = Object.values(countryCounts).reduce((a, b) => a + b, 0);
    const topCountries = Object.entries(countryCounts)
      .map(([code, count]) => ({
        code: getFlagEmoji(code),
        country: getCountryName(code) || code,
        users: count,
        percentage: totalWithCountry > 0 ? Math.round((count / totalWithCountry) * 100) : 0
      }))
      .sort((a, b) => b.users - a.users)
      .slice(0, 5);

    // 4. Recent Activity Stream
    const recentActivity = allActivity.slice(0, 10).map(a => ({
      time: timeAgo(new Date(a.created_at)),
      action: formatActionName(a.action),
      details: a.details || 'System',
      country: getFlagEmoji(a.country || 'US')
    }));

    return res.status(200).json({
      stats: {
        downloads,
        activeLicenses,
        uniqueUsers,
        countriesReached
      },
      topCountries,
      recentActivity
    });
  } catch (err: any) {
    console.error('Stats Error:', err);
    return res.status(500).json({ error: 'Failed to load stats' });
  }
}

// Helpers
function getFlagEmoji(countryCode: string) {
  if (!countryCode || countryCode.length !== 2) return '🌍';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const countryNames: Record<string, string> = {
  'US': 'United States', 'GB': 'United Kingdom', 'FR': 'France', 'DE': 'Germany',
  'ES': 'Spain', 'IT': 'Italy', 'CA': 'Canada', 'AU': 'Australia', 'IN': 'India',
  'BR': 'Brazil', 'JP': 'Japan', 'RU': 'Russia', 'CN': 'China', 'AE': 'UAE'
};

function getCountryName(code: string) {
  return countryNames[code.toUpperCase()];
}

function timeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function formatActionName(action: string) {
  switch (action) {
    case 'download': return 'App Downloaded';
    case 'license_retrieved': return 'License Retrieved';
    case 'hwid_bound': return 'App Activated (HWID Locked)';
    case 'admin_action': return 'Admin Action';
    default: return action;
  }
}
