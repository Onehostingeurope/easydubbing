export default function Terms() {
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
        <h1 className="font-['Plus_Jakarta_Sans'] text-4xl font-extrabold mb-3">Terms of Service</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: May 18, 2026 · OneHostingEurope</p>

        {[
          { title: '1. Acceptance of Terms', body: 'By purchasing or using Easy Dubbing ("the Software"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Software. These terms apply to all users, including without limitation browsers, customers, merchants, and contributors of content.' },
          { title: '2. License Grant', body: 'Easy Dubbing grants you a non-exclusive, non-transferable, revocable license to install and use the Software on a single Windows machine (Lifetime license) or during the subscription period (Monthly/Annual plans). You may not sublicense, sell, resell, transfer, assign, or otherwise commercially exploit the Software.' },
          { title: '3. Subscription Plans', body: 'Monthly (€69/mo) and Annual (€189/yr) subscriptions are billed automatically via PayPal. You may cancel at any time; cancellation takes effect at the end of the current billing period. The Lifetime license (€315) is a one-time payment with no recurring charges.' },
          { title: '4. Refund Policy', body: 'We offer a 7-day money-back guarantee for first-time purchases. Refunds are not available after 7 days or if the software has been used to process more than 10 videos. To request a refund, contact support@easydubbing.uk with your order details.' },
          { title: '5. Acceptable Use', body: 'You agree not to use Easy Dubbing to: create content that violates copyright law without proper authorization; generate deepfakes intended to deceive or harm; produce content that is illegal, hateful, or harassing; or reverse engineer, decompile, or disassemble the Software.' },
          { title: '6. Intellectual Property', body: 'The Software, including all code, design, branding, and documentation, is the exclusive property of OneHostingEurope. All rights reserved. Content you create using Easy Dubbing remains your intellectual property.' },
          { title: '7. Disclaimer of Warranties', body: 'The Software is provided "as is" without warranty of any kind, express or implied. OneHostingEurope does not warrant that the Software will be error-free, uninterrupted, or free of viruses or other harmful components.' },
          { title: '8. Limitation of Liability', body: 'To the maximum extent permitted by law, OneHostingEurope shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Software.' },
          { title: '9. Updates and Modifications', body: 'We reserve the right to modify, suspend, or discontinue the Software at any time. We may update these Terms at any time; your continued use of the Software constitutes acceptance of the updated Terms.' },
          { title: '10. Governing Law', body: 'These Terms are governed by and construed in accordance with the laws of the European Union and France. Any disputes shall be resolved in the courts of France.' },
          { title: '11. Contact', body: 'For questions about these Terms, contact us at: legal@easydubbing.uk · OneHostingEurope · www.easydubbing.uk' },
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
