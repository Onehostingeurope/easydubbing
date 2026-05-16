import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Vercel Serverless Function to handle PayPal Payments & Email Keys
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  console.log('--- IPN INCOMING ---');
  console.log('Body Type:', typeof req.body);
  console.log('Body:', JSON.stringify(req.body));

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const RESEND_KEY = process.env.RESEND_API_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY || !RESEND_KEY) {
    console.error('CRITICAL: Missing environment variables!');
    return res.status(500).send('Configuration Error');
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const resend = new Resend(RESEND_KEY);

  try {
    // 1. Prepare Verification Data
    let params = new URLSearchParams();
    if (typeof req.body === 'string') {
      params = new URLSearchParams(req.body);
    } else {
      for (const key in req.body) {
        params.append(key, req.body[key]);
      }
    }
    params.set('cmd', '_notify-validate');
    
    const isSandbox = req.body.test_ipn === '1';
    const paypalUrl = isSandbox
      ? 'https://ipnpb.sandbox.paypal.com/cgi-bin/webscr' 
      : 'https://ipnpb.paypal.com/cgi-bin/webscr';

    console.log('Verifying with PayPal at:', paypalUrl);

    const verifyResponse = await fetch(paypalUrl, {
      method: 'POST',
      body: params.toString(),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const verifyText = (await verifyResponse.text()).trim();
    console.log('PayPal Handshake Result:', verifyText);

    // 2. Extract Data (Even if verification fails for now, we want to see if it works)
    const body = req.body;
    const payment_status = body.payment_status;
    const customer_email = body.payer_email || body.email || body.receiver_email;
    const txn_id = body.txn_id || 'manual';

    console.log('Payment Status:', payment_status);
    console.log('Customer Email:', customer_email);

    if (payment_status === 'Completed' || payment_status === 'Pending' || verifyText === 'VERIFIED') {
      const new_key = 'EASY-' + Math.random().toString(36).substr(2, 9).toUpperCase();

      console.log('Creating license for:', customer_email);
      
      const { error: dbError } = await supabase
        .from('licenses')
        .insert([{ email: customer_email, license_key: new_key, transaction_id: txn_id }]);

      if (dbError) {
        console.error('Supabase Error:', dbError);
        throw dbError;
      }

      console.log('Sending email via Resend...');
      await resend.emails.send({
        from: 'Easy Dubbing <onboarding@resend.dev>',
        to: customer_email,
        subject: '🚀 Your Easy Dubbing Pro License Key!',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #050505; color: white; border-radius: 20px;">
            <h1 style="color: #ddb8ff;">Thank you for your purchase!</h1>
            <p>Your Easy Dubbing Pro license is now active. You can download the software and use the key below to unlock the studio on your PC:</p>
            <div style="text-align: center; margin: 25px 0;">
              <a href="https://easydubbing.uk/success" style="background: #ddb8ff; color: #2c0051; padding: 15px 30px; border-radius: 10px; font-weight: bold; text-decoration: none; display: inline-block;">⬇️ Download Installer</a>
            </div>
            <div style="background: #111; padding: 20px; border-radius: 15px; border: 1px solid #333; text-align: center; margin: 20px 0;">
              <code style="font-size: 24px; color: #ddb8ff; font-weight: bold; letter-spacing: 2px;">${new_key}</code>
            </div>
            <p><strong>Steps to Activate:</strong></p>
            <ol>
              <li>Open the Easy Dubbing app on your PC.</li>
              <li>Enter your email: <b>${customer_email}</b></li>
              <li>Enter the key above.</li>
              <li>Click Activate and start creating!</li>
            </ol>
            <hr style="border-color: #222; margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">If you have any questions, reply to this email. Happy Dubbing!</p>
          </div>
        `
      });

      return res.status(200).send('IPN Processed & Email Sent');
    } catch (err) {
      console.error('Processing Error:', err);
      return res.status(500).send('Processing Error');
    }
  }

  res.status(200).send('OK');
}
