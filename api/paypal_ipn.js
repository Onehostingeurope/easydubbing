import { createClient } from '@supabase/supabase-js';

// Vercel Serverless Function to handle PayPal Payments
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Initialize Supabase
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // 1. Get Payment Data from PayPal
  const body = req.body;
  const payment_status = body.payment_status;
  const customer_email = body.payer_email;

  if (payment_status === 'Completed') {
    // 2. Generate a professional 14-character License Key
    const new_key = 'EASY-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    try {
      // 3. Save to Supabase
      const { error } = await supabase
        .from('licenses')
        .insert([{ email: customer_email, license_key: new_key }]);

      if (error) throw error;

      // 4. (Optional) You can add an email service here to send the key!
      console.log(`Generated Key: ${new_key} for ${customer_email}`);

      return res.status(200).send('IPN Processed');
    } catch (err) {
      console.error('Supabase Error:', err);
      return res.status(500).send('Database Error');
    }
  }

  res.status(200).send('OK');
}
