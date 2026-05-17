import { createClient } from '@supabase/supabase-js';

/**
 * GET /api/lookup_key?email=...&hwid=...
 *
 * Looks up a license by email, binds the HWID to it (if not yet bound),
 * and returns the key. If the license is already bound to a DIFFERENT HWID,
 * returns a 403 so the user knows the machine doesn't match.
 */
export default async function handler(req, res) {
  const { email, hwid } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Try both table names for backwards compatibility
    let license = null;
    let tableName = null;

    for (const table of ['licenses', 'license']) {
      const { data } = await supabase
        .from(table)
        .select('id, license_key, hwid')
        .eq('email', email.toLowerCase().trim())
        .order('created_at', { ascending: false })
        .limit(1);

      if (data && data.length > 0) {
        license = data[0];
        tableName = table;
        break;
      }
    }

    if (!license) {
      return res.status(200).json({ key: null });
    }

    // ── HWID Binding ──────────────────────────────────────────────────────
    if (hwid) {
      if (license.hwid && license.hwid !== hwid) {
        // Key is already locked to a DIFFERENT machine
        return res.status(403).json({
          error: 'This license is already registered to a different computer. Contact support@easydubbing.uk to transfer it.'
        });
      }

      if (!license.hwid) {
        // First time: bind the HWID now, at key retrieval time
        await supabase
          .from(tableName)
          .update({ hwid })
          .eq('id', license.id);
      }
    }
    // ─────────────────────────────────────────────────────────────────────

    return res.status(200).json({ key: license.license_key });

  } catch (err) {
    console.error('Lookup Error:', err.message);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
