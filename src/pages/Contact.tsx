import { useState } from 'react';

export default function Contact() {
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send');
      }
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please email us directly at support@easydubbing.uk');
    } finally {
      setLoading(false);
    }
  }

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
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20 tracking-widest uppercase mb-4">
            Support
          </span>
          <h1 className="font-['Plus_Jakarta_Sans'] text-4xl font-extrabold text-white mb-4">Contact Support</h1>
          <p className="text-white/50">We typically respond within 24 hours on business days.</p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { icon: 'mail', label: 'Email Us', sub: 'support@easydubbing.uk', href: 'mailto:support@easydubbing.uk' },
            { icon: 'menu_book', label: 'Documentation', sub: 'Guides & tutorials', href: '#' },
            { icon: 'chat', label: 'Community', sub: 'Join our Discord', href: '#' },
          ].map((c, i) => (
            <a key={i} href={c.href} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center hover:border-purple-500/40 hover:bg-white/[0.06] transition-all group">
              <span className="material-symbols-outlined text-purple-400 text-3xl group-hover:scale-110 transition-transform block mb-2">{c.icon}</span>
              <p className="font-bold text-sm text-white">{c.label}</p>
              <p className="text-white/40 text-xs mt-1">{c.sub}</p>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        {sent ? (
          <div className="text-center py-16 bg-green-500/10 border border-green-500/20 rounded-3xl">
            <span className="material-symbols-outlined text-green-400 text-5xl block mb-4">check_circle</span>
            <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
            <p className="text-white/50">We'll get back to you within 24 hours.</p>
            <a href="/" className="inline-block mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold hover:scale-105 transition-transform">Back to Home</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest block mb-2">Full Name *</label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500/60 transition-colors"
                  placeholder="Your name" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/50 uppercase tracking-widest block mb-2">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500/60 transition-colors"
                  placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-widest block mb-2">Subject *</label>
              <select required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/60 transition-colors">
                <option value="" className="bg-[#0a0a0a]">Select a topic…</option>
                <option value="License Activation" className="bg-[#0a0a0a]">License Activation</option>
                <option value="Technical Issue" className="bg-[#0a0a0a]">Technical Issue</option>
                <option value="Billing & Payments" className="bg-[#0a0a0a]">Billing & Payments</option>
                <option value="Refund Request" className="bg-[#0a0a0a]">Refund Request</option>
                <option value="Feature Request" className="bg-[#0a0a0a]">Feature Request</option>
                <option value="Other" className="bg-[#0a0a0a]">Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-white/50 uppercase tracking-widest block mb-2">Message *</label>
              <textarea required rows={6} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-purple-500/60 transition-colors resize-none"
                placeholder="Describe your issue in detail…" />
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                ⚠ {error}
              </div>
            )}
            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-purple-500/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Sending…
                </>
              ) : (
                <>Send Message <span className="material-symbols-outlined align-middle">send</span></>
              )}
            </button>
          </form>
        )}
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/30">
        © 2026 Easy Dubbing AI. All rights reserved. · <a href="/" className="hover:text-white transition-colors">Home</a>
      </footer>
    </div>
  );
}
