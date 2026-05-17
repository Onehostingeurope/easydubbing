export default function Privacy() {
  return (
    <div className="bg-[#050505] text-[#e5e2e1] font-['Inter'] min-h-screen">
      <nav className="w-full px-6 md:px-12 h-20 flex items-center border-b border-white/5">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">video_library</span>
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold text-white">Easy Dubbing</span>
        </a>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="font-['Plus_Jakarta_Sans'] text-4xl font-extrabold mb-3">Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: May 18, 2026 · OneHostingEurope</p>

        {[
          { title: '1. Introduction', body: 'Welcome to Easy Dubbing ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your data when you visit www.easydubbing.uk or purchase our software.' },
          { title: '2. Information We Collect', body: 'We collect information you provide directly to us, such as your name and email address when you make a purchase. We also collect usage data, device information, and cookies for analytics and performance purposes. We do NOT sell your personal data to third parties.' },
          { title: '3. How We Use Your Information', body: 'We use your information to: process transactions and send related information (purchase confirmations, license keys); send technical notices and support messages; respond to your comments and questions; and improve our services.' },
          { title: '4. Payment Processing', body: 'All payments are processed securely by PayPal. We do not store your credit card or payment information on our servers. PayPal\'s privacy policy governs the processing of your payment data.' },
          { title: '5. Data Retention', body: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. License and transaction records are kept for 7 years for tax and legal compliance.' },
          { title: '6. Your Rights (GDPR)', body: 'If you are in the European Economic Area, you have the right to: access, update, or delete your personal data; object to processing of your data; request restriction of processing; and data portability. To exercise these rights, contact us at privacy@easydubbing.uk.' },
          { title: '7. Cookies', body: 'We use essential cookies to ensure the website functions correctly. Analytics cookies (via Vercel Analytics) help us understand usage patterns. You may disable cookies in your browser settings, though some features may not function properly.' },
          { title: '8. Third-Party Services', body: 'We use Supabase for data storage, Vercel for hosting, and PayPal for payments. These services have their own privacy policies and we encourage you to review them.' },
          { title: '9. Security', body: 'We implement industry-standard security measures including SSL/TLS encryption, secure API endpoints, and role-based access controls to protect your information. No method of transmission over the internet is 100% secure, however.' },
          { title: '10. Contact Us', body: 'If you have questions about this Privacy Policy, please contact us at: privacy@easydubbing.uk · OneHostingEurope · www.easydubbing.uk' },
        ].map((s, i) => (
          <div key={i} className="mb-10">
            <h2 className="text-xl font-bold text-white mb-3">{s.title}</h2>
            <p className="text-white/60 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </main>
      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/30">
        © 2026 Easy Dubbing AI. All rights reserved. · <a href="/" className="hover:text-white transition-colors">Home</a>
      </footer>
    </div>
  );
}
