import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export default async function handler(req, res) {
  // 1. Heartbeat check
  if (req.method === 'GET') {
    return res.status(200).json({ 
      status: 'alive', 
      database: !!process.env.SUPABASE_URL,
      email: !!process.env.RESEND_API_KEY
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

      // Send Email
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

      return res.status(200).send('VERIFIED');
    }

    return res.status(200).send('OK');
  } catch (err) {
    console.error('IPN Fatal Error:', err.message);
    return res.status(200).json({ error: err.message });
  }
}
