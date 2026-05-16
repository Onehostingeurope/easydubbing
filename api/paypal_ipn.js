import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export default async function handler(req, res) {
  // 1. Heartbeat check
  if (req.method === 'GET') {
    let dbStatus = false;
    let emailStatus = false;
    let dbMsg = '';

    try {
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
      
      // 1. Check plural
      const q1 = await supabase.from('licenses').select('count', { count: 'exact', head: true });
      if (!q1.error) dbStatus = true;
      
      // 2. Check singular
      const q2 = await supabase.from('license').select('count', { count: 'exact', head: true });
      if (!q2.error) dbStatus = true;

      if (!dbStatus) {
        dbMsg = q1.error?.message || q2.error?.message || 'Table not found';
      }
    } catch (e) { dbMsg = e.message; }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error } = await resend.domains.list();
      if (!error) emailStatus = true;
    } catch (e) {}

    return res.status(200).json({ 
      status: 'alive', 
      database: dbStatus, 
      email: emailStatus,
      dbError: dbMsg || 'none'
    });
  }

  // 2. Security Check
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    // Initialize services inside the handler
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = req.body || {};
    
    // 3. SUPER DEBUG LOG (Record everything)
    await supabase.from('debug_logs').insert([{ 
      payload: {
        body: body,
        headers: req.headers,
        method: req.method,
        query: req.query,
        rawType: typeof body
      }
    }]);

    const customer_email = body.payer_email || body.email || body.receiver_email;
    const payment_status = body.payment_status;

    console.log('IPN Received for:', customer_email, 'Status:', payment_status);

    if (payment_status === 'Completed' || payment_status === 'Pending') {
      const new_key = 'EASY-' + Math.random().toString(36).substr(2, 9).toUpperCase();

      // Save to Supabase (Try both 'licenses' and 'license')
      let { error: dbError } = await supabase
        .from('licenses')
        .insert([{ 
          email: customer_email, 
          license_key: new_key, 
          transaction_id: body.txn_id || 'test-' + Date.now() 
        }]);

      if (dbError && dbError.message.includes('not found')) {
        const retry = await supabase
          .from('license')
          .insert([{ 
            email: customer_email, 
            license_key: new_key, 
            transaction_id: body.txn_id || 'test-' + Date.now() 
          }]);
        dbError = retry.error;
      }

      if (dbError) throw new Error('Database Error: ' + dbError.message);

      // 4. Send Email (Non-blocking)
      try {
        await resend.emails.send({
          from: 'Easy Dubbing <onboarding@resend.dev>',
          to: customer_email,
          subject: '🚀 Your Easy Dubbing Pro License Key!',
          html: `
            <div style="font-family: sans-serif; padding: 20px; background: #050505; color: white; border-radius: 20px;">
              <h1 style="color: #ddb8ff;">Thank you!</h1>
              <p>Your license key is ready:</p>
              <div style="background: #111; padding: 20px; border-radius: 10px; border: 1px solid #333; text-align: center;">
                <code style="font-size: 24px; color: #ddb8ff; font-weight: bold;">${new_key}</code>
              </div>
              <p>Enter this key and your email (<b>${customer_email}</b>) in the app to activate.</p>
            </div>
          `
        });
      } catch (emailErr) {
        console.error('Email Delivery Failed (Optional):', emailErr.message);
      }

      return res.status(200).send('VERIFIED');
    }

    return res.status(200).send('OK');
  } catch (err) {
    console.error('IPN Fatal Error:', err.message);
    return res.status(200).json({ error: err.message });
  }
}
