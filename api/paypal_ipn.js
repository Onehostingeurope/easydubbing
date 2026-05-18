import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export default async function handler(req, res) {
  // 1. Security Check
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    // Initialize services inside the handler
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = req.body || {};
    const txn_type = body.txn_type;
    const payment_status = body.payment_status;
    const customer_email = body.payer_email || body.email || body.receiver_email;
    const transaction_id = body.txn_id || body.subscr_id || 'paypal-' + Date.now();

    // Log the request for debugging in Vercel logs
    console.log('IPN Received:', { txn_type, payment_status, customer_email, transaction_id });

    // Trigger on:
    // 1. Standard Checkout (payment_status === 'Completed')
    // 2. Subscription Signup (txn_type === 'subscr_signup')
    // 3. Subscription Payment (txn_type === 'subscr_payment')
    const isSuccess = (
      payment_status === 'Completed' || 
      payment_status === 'Pending' || 
      txn_type === 'subscr_signup' || 
      txn_type === 'subscr_payment'
    );

    if (isSuccess && customer_email) {
      // 1. Check if this transaction already exists to prevent duplicate keys
      const { data: existing } = await supabase
        .from('licenses')
        .select('license_key')
        .eq('transaction_id', transaction_id)
        .single();

      if (existing) {
        console.log('Transaction already processed:', transaction_id);
        return res.status(200).send('ALREADY_PROCESSED');
      }

      // Generate a professional 14-character key: EASY-XXXX-XXXX
      const randomString = () => Math.random().toString(36).substr(2, 4).toUpperCase();
      const new_key = `EASY-${randomString()}-${randomString()}`;

      // 2. Save to Supabase
      const { error: dbError } = await supabase
        .from('licenses')
        .insert([{ 
          email: customer_email, 
          license_key: new_key, 
          transaction_id: transaction_id 
        }]);

      if (dbError) {
        console.error('Supabase Error:', dbError);
        throw new Error('Database Error: ' + dbError.message);
      }

      const amount = body.mc_gross || body.payment_gross || '0.00';
      const currency = body.mc_currency || 'USD';
      
      try {
        await supabase.from('activity_log').insert({
          action: 'purchase',
          details: `${amount}|${currency}`,
          country: body.residence_country || 'US'
        });
      } catch(e) {}

      console.log('License Created Successfully:', { customer_email, new_key, amount });

      // 3. Send Email via Resend
      try {
        await resend.emails.send({
          from: 'Easy Dubbing <onboarding@resend.dev>',
          to: customer_email,
          subject: '🚀 Your Easy Dubbing Pro License Key!',
          html: `
            <div style="font-family: sans-serif; padding: 40px; background: #050505; color: white; border-radius: 24px; max-width: 600px; margin: 0 auto; border: 1px solid #333;">
              <h1 style="color: #ddb8ff; margin-bottom: 24px;">Thank you for your purchase!</h1>
              <p style="font-size: 16px; color: #cfc2d7; line-height: 1.6;">Your professional license key for <b>Easy Dubbing</b> is ready for activation.</p>
              <div style="background: #111; padding: 30px; border-radius: 16px; border: 1px solid #ddb8ff33; text-align: center; margin: 32px 0;">
                <code style="font-size: 28px; color: #ddb8ff; font-weight: bold; letter-spacing: 2px;">${new_key}</code>
              </div>
              <p style="font-size: 14px; color: #cfc2d7;">Enter this key and your email (<b>${customer_email}</b>) in the app to activate your Pro features.</p>
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; font-size: 12px; color: #666; text-align: center;">
                © 2026 OneHostingEurope. All rights reserved.
              </div>
            </div>
          `
        });
        console.log('Email sent to:', customer_email);
      } catch (emailError) {
        console.error('Email Delivery Error:', emailError);
      }

      return res.status(200).send('VERIFIED');
    }

    return res.status(200).send('OK');
  } catch (err) {
    console.error('IPN Fatal Error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
