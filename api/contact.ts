import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await resend.emails.send({
      from: 'Easy Dubbing Contact <noreply@easydubbing.uk>',   // must match your verified domain
      to: ['support@easydubbing.uk'],
      replyTo: email,
      subject: `[Easy Dubbing Support] ${subject}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #e5e2e1; padding: 40px; border-radius: 16px;">
          <div style="margin-bottom: 32px;">
            <div style="background: linear-gradient(135deg, #7c3aed, #3b82f6); width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
              <span style="color: white; font-size: 24px;">✉</span>
            </div>
            <h1 style="color: white; font-size: 24px; margin: 0 0 4px;">New Support Request</h1>
            <p style="color: #6b7280; margin: 0; font-size: 14px;">From Easy Dubbing Contact Form</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1f2937; color: #9ca3af; font-size: 13px; font-weight: 600; width: 120px; vertical-align: top;">NAME</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1f2937; color: white; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1f2937; color: #9ca3af; font-size: 13px; font-weight: 600; vertical-align: top;">EMAIL</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1f2937; color: #818cf8; font-size: 14px;"><a href="mailto:${email}" style="color: #818cf8;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #1f2937; color: #9ca3af; font-size: 13px; font-weight: 600; vertical-align: top;">SUBJECT</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #1f2937; color: white; font-size: 14px;">${subject}</td>
            </tr>
          </table>

          <div style="background: #111827; border-radius: 12px; padding: 20px; border: 1px solid #1f2937;">
            <p style="color: #9ca3af; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; margin: 0 0 12px;">MESSAGE</p>
            <p style="color: #d1d5db; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>

          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #1f2937;">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}"
               style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #3b82f6); color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
              ↩ Reply to ${name}
            </a>
          </div>

          <p style="color: #374151; font-size: 12px; margin-top: 24px; text-align: center;">
            Easy Dubbing · easydubbing.uk · OneHostingEurope
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err: unknown) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
