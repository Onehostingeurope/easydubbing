import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, ShieldCheck, Video } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Activate = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans px-6 overflow-hidden relative">
      {/* Global Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between relative">
          {/* Logo - Left Column */}
          <div className="w-[200px] flex-shrink-0">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                <Video size={20} className="text-white" />
              </div>
              <span className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold tracking-tighter text-white">Easy Dubbing</span>
            </a>
          </div>

          {/* Centered Links - Middle Column (Desktop only) */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <a className="text-sm font-bold text-[#cfc2d7] hover:text-[#ddb8ff] transition-colors" href="/#features">{t('nav.features')}</a>
            <a className="text-sm font-bold text-[#cfc2d7] hover:text-[#ddb8ff] transition-colors" href="/#how-it-works">{t('nav.howItWorks')}</a>
            <a className="text-sm font-bold text-[#cfc2d7] hover:text-[#ddb8ff] transition-colors" href="/#pricing">{t('nav.pricing')}</a>
            <a className="text-sm font-black text-[#ddb8ff] hover:text-white transition-colors" href="/activate">{t('nav.activate')}</a>
          </div>

          {/* Actions - Right Column */}
          <div className="w-[280px] flex items-center justify-end gap-4">
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            <a className="hidden md:block px-6 py-2.5 rounded-full bg-gradient-to-r from-[#adc6ff] to-[#ddb8ff] text-[#2c0051] font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-500/20 whitespace-nowrap" href="/#pricing">
              {t('nav.getStarted')}
            </a>
            
            {/* Mobile Toggle */}
            <button 
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="material-symbols-outlined text-white">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-20 left-0 w-full bg-[#050505] border-b border-white/10 px-6 py-8 space-y-6 z-40 shadow-2xl"
            >
              <div className="flex flex-col gap-6">
                <a className="text-lg font-bold text-[#cfc2d7]" href="/#features" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.features')}</a>
                <a className="text-lg font-bold text-[#cfc2d7]" href="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.howItWorks')}</a>
                <a className="text-lg font-bold text-[#cfc2d7]" href="/#pricing" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.pricing')}</a>
                <a className="text-lg font-black text-[#ddb8ff]" href="/activate" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.activate')}</a>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <LanguageSwitcher />
                  <a className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#adc6ff] to-[#ddb8ff] text-[#2c0051] font-bold text-sm" href="/#pricing" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('nav.getStarted')}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-purple-900/20 to-blue-900/20 -z-10" />
      
      <div className="flex-1 flex items-center justify-center pt-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white/[0.03] backdrop-blur-3xl p-12 md:p-16 rounded-[48px] border border-white/10 shadow-2xl relative text-center"
        >
        <div className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-[#ddb8ff] border border-[#ddb8ff]/20 shadow-lg shadow-purple-500/10">
          <ShieldCheck size={48} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black mb-4 font-['Plus_Jakarta_Sans'] tracking-tighter text-white">License Activation</h1>
        <p className="text-[#cfc2d7] text-lg mb-8">Enter your email below to retrieve your license key and download the software.</p>
        
        {/* Serial Key Lookup Box */}
        <div className="mb-10 p-8 rounded-3xl bg-white/[0.02] border border-white/10 text-left">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#ddb8ff]" />
            Retrieve &amp; Activate Your License
          </h3>
          <p className="text-white/30 text-xs mb-6 leading-relaxed">
            Open Easy Dubbing on your PC → copy your <strong className="text-white/50">Machine ID</strong> shown in the activation screen → paste it below with your email.
          </p>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1.5">Purchase Email *</label>
              <input
                type="email"
                id="lookup-email"
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ddb8ff]/50 transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest block mb-1.5">Machine ID (from the app) *</label>
              <input
                type="text"
                id="lookup-hwid"
                placeholder="e.g. A1B2C3D4E5F6A1B2C3D4E5F6A1B2C3D4"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ddb8ff]/50 transition-colors font-mono text-sm tracking-widest uppercase"
                onInput={(e) => {
                  const el = e.target as HTMLInputElement;
                  el.value = el.value.toUpperCase().replace(/[^A-F0-9]/g, '').slice(0, 32);
                }}
              />
              <p className="text-[10px] text-white/20 mt-1.5">Your unique 32-character computer fingerprint. Locks the license to your machine.</p>
            </div>
            <button
              id="reveal-btn"
              className="w-full bg-[#ddb8ff] text-[#2c0051] font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all mt-1"
              onClick={async () => {
                const emailEl  = document.getElementById('lookup-email')  as HTMLInputElement;
                const hwidEl   = document.getElementById('lookup-hwid')   as HTMLInputElement;
                const display  = document.getElementById('key-display');
                const text     = document.getElementById('key-text');
                const errBlock = document.getElementById('key-error');

                const email = emailEl?.value?.trim();
                const hwid  = hwidEl?.value?.trim().toUpperCase();

                if (!email) { alert('Please enter your email.'); return; }
                if (!hwid || hwid.length < 8) { alert('Please enter your Machine ID from the app.'); return; }

                if (errBlock) errBlock.classList.add('hidden');
                if (display)  display.classList.add('hidden');
                if (text)     text.innerText = 'Searching…';
                emailEl.disabled = true;
                hwidEl.disabled  = true;

                let attempts = 0;
                const poll = async () => {
                  try {
                    const res  = await fetch(`/api/lookup_key?email=${encodeURIComponent(email)}&hwid=${encodeURIComponent(hwid)}`);
                    const data = await res.json();

                    if (res.status === 403) {
                      if (errBlock) {
                        document.getElementById('err-text')!.innerText = data.error || 'License already registered to another machine.';
                        errBlock.classList.remove('hidden');
                      }
                      emailEl.disabled = false;
                      hwidEl.disabled  = false;
                      return;
                    }

                    if (data.key) {
                      if (text)    text.innerText = data.key;
                      if (display) display.classList.remove('hidden');
                      emailEl.disabled = false;
                      hwidEl.disabled  = false;
                      return;
                    }
                  } catch (_) {}

                  if (attempts < 8) {
                    attempts++;
                    if (text) text.innerText = `Searching… (${attempts}/8)`;
                    setTimeout(poll, 3000);
                  } else {
                    if (text) text.innerText = 'Not found. Check your email or contact support.';
                    emailEl.disabled = false;
                    hwidEl.disabled  = false;
                  }
                };

                poll();
              }}
            >
              🔑 Get My License Key
            </button>

            {/* Error block */}
            <div id="key-error" className="hidden p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
              <p id="err-text" className="text-red-400 text-sm font-bold">Error</p>
              <p className="text-red-400/60 text-xs mt-1">Contact <a href="mailto:support@easydubbing.uk" className="underline">support@easydubbing.uk</a> to transfer your license.</p>
            </div>

            {/* Key display */}
            <div id="key-display" className="hidden p-6 rounded-xl bg-[#ddb8ff]/10 border border-[#ddb8ff]/20 text-center animate-in fade-in zoom-in duration-500">
              <p className="text-[10px] text-[#ddb8ff]/50 uppercase font-bold mb-2">Your License Key — Copy into the app</p>
              <code id="key-text" className="text-2xl font-black text-[#ddb8ff] tracking-widest break-all">…</code>
              <button
                className="mt-4 block mx-auto text-xs text-[#ddb8ff]/60 hover:text-[#ddb8ff] transition-colors underline"
                onClick={() => {
                  const k = document.getElementById('key-text')?.innerText;
                  if (k) navigator.clipboard.writeText(k);
                }}
              >
                📋 Copy to clipboard
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <button 
            onClick={() => {
              fetch('/api/track_download', { method: 'POST' }).catch(() => {});
              window.location.href = "https://plqlagrioxdicdourqyl.supabase.co/storage/v1/object/sign/Download/Easy_Dubbing_Setup.exe?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9jYzU4ZjdkMi1kYmZmLTQzY2ItODA2Zi0zZTdjYmQ1YWUyNzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJEb3dubG9hZC9FYXN5X0R1YmJpbmdfU2V0dXAuZXhlIiwiaWF0IjoxNzc4OTU1Njc2LCJleHAiOjE5MzY2MzU2NzZ9.oSVbRHfHzEiDkn22qPjQRaD7A4lH41Z5b-FoJJvW80M";
            }}
            className="w-full bg-gradient-to-r from-[#adc6ff] to-[#ddb8ff] text-[#2c0051] font-black py-6 rounded-2xl shadow-[0_0_40px_rgba(173,198,255,0.3)] hover:shadow-[0_0_50px_rgba(173,198,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-xl"
          >
            <Download size={24} />
            Download Installer for Windows
          </button>
        </div>
        
        <div className="mt-12 h-8" />
      </motion.div>
      </div>
    </div>
  );
};

export default Activate;
