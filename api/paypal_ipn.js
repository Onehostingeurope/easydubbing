import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Vercel Serverless Function to handle PayPal Payments & Email Keys
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Initialize Services
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  const resend = new Resend(process.env.RESEND_API_KEY);

  // 1. Verify the IPN with PayPal
  const params = new URLSearchParams(req.body);
  params.set('cmd', '_notify-validate');
  
  // Use Sandbox if the IPN says it is sandbox, otherwise use Live
  const paypalUrl = req.body.test_ipn === '1' 
    ? 'https://ipnpb.sandbox.paypal.com/cgi-bin/webscr' 
    : 'https://ipnpb.paypal.com/cgi-bin/webscr';

  const verifyResponse = await fetch(paypalUrl, {
    method: 'POST',
    body: params,
  });

  // 1. Get Payment Data from PayPal
  const body = req.body;
  const payment_status = body.payment_status;
  const customer_email = body.payer_email;

  if (payment_status === 'Completed') {
    // 2. Generate a professional License Key
    const new_key = 'EASY-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    try {
      // 3. Save to Supabase
      const { error } = await supabase
        .from('licenses')
        .insert([{ email: customer_email, license_key: new_key }]);

      if (error) throw error;

      // 4. Send the Automated Email
      await resend.emails.send({
        from: 'Easy Dubbing <onboarding@resend.dev>', // Change this later to your custom domain!
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
