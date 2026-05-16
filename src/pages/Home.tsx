import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import PayPalSubscription from '../components/PayPalSubscription';

const Home = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-[#050505] text-[#e5e2e1] font-['Inter'] selection:bg-purple-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between relative">
          {/* Logo - Left Column */}
          <div className="w-[200px] flex-shrink-0">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-all duration-300">
                <span className="material-symbols-outlined text-white text-xl">video_library</span>
              </div>
              <span className="font-['Plus_Jakarta_Sans'] text-[22px] font-bold tracking-tighter text-white">Easy Dubbing</span>
            </a>
          </div>

          {/* Centered Links - Middle Column (Desktop only) */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <a className="text-sm font-bold text-[#cfc2d7] hover:text-white transition-colors" href="#features">{t('nav.features')}</a>
            <a className="text-sm font-bold text-[#cfc2d7] hover:text-white transition-colors" href="#security">{t('nav.security') || 'Security'}</a>
            <a className="text-sm font-bold text-[#cfc2d7] hover:text-white transition-colors" href="#how-it-works">{t('nav.howItWorks')}</a>
            <a className="text-sm font-bold text-[#cfc2d7] hover:text-white transition-colors" href="#pricing">{t('nav.pricing')}</a>
            <a className="text-sm font-black text-primary hover:text-white transition-colors" href="/activate">{t('nav.activate')}</a>
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
                <a className="text-lg font-bold text-[#cfc2d7]" href="#features" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.features')}</a>
                <a className="text-lg font-bold text-[#cfc2d7]" href="#security" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.security') || 'Security'}</a>
                <a className="text-lg font-bold text-[#cfc2d7]" href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.howItWorks')}</a>
                <a className="text-lg font-bold text-[#cfc2d7]" href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.pricing')}</a>
                <a className="text-lg font-black text-primary" href="/activate" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.activate')}</a>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <LanguageSwitcher />
                  <a className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#adc6ff] to-[#ddb8ff] text-[#2c0051] font-bold text-sm" href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>
                    {t('nav.getStarted')}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative px-6 md:px-12 max-w-[1280px] mx-auto py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-primary text-xs font-bold border border-primary/20 tracking-widest uppercase">
                {t('hero.badge')}
              </span>
              <h1 className="font-['Plus_Jakarta_Sans'] text-[56px] md:text-[80px] leading-[1.1] font-extrabold tracking-tighter">
                {t('hero.title')} <br/>
              </h1>
              <p className="text-lg text-[#cfc2d7] max-w-lg leading-relaxed">
                {t('hero.desc')}
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <a href="#pricing" className="px-10 py-5 rounded-full bg-gradient-to-r from-[#adc6ff] to-[#ddb8ff] text-[#2c0051] font-black text-lg shadow-xl shadow-purple-500/20 flex items-center gap-2 hover:scale-110 transition-transform">
                  {t('hero.cta')}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-75" />
              <div className="bg-white/[0.03] backdrop-blur-2xl aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                <img 
                  alt="AI Dubbing Preview" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBry8FqncP4UaBbYD7LPD285RTk7iDi42eU07OdXn-Ocq3P5GfdWdH8zyE_jQXrA7iyDJcVpIFgOkK-qLeHA8bRNO8vHW6GbisXxOq1VeG6bmZQ6fXP8wnj33LlNDGu37wFr4d0w58izy_1T1uvXzXBfGJWc73pvjsIpQnWsBepIEOjFsQ5jSc6Yv2hU1ZMx9rP17vF8v5RxGcgoslwtLFJY5OjVfQ5cNdfKaa4X4LGo1GGssCRr4wCBCW38wC_0cHkyVs0bg_BBgoL"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/40 group-hover:scale-110 transition-transform cursor-pointer">
                    <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="px-6 md:px-12 max-w-[1280px] mx-auto py-32">
          <div className="mb-16 space-y-2 text-center md:text-left">
            <h2 className="font-['Plus_Jakarta_Sans'] text-4xl font-bold">{t('features.title')}</h2>
            <p className="text-[#cfc2d7] max-w-2xl">{t('features.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: 'translate', title: t('features.feat1Title'), desc: t('features.feat1Desc'), color: 'bg-blue-500/20 text-blue-400' },
              { icon: 'record_voice_over', title: t('features.feat2Title'), desc: t('features.feat2Desc'), color: 'bg-purple-500/20 text-purple-400' },
            ].map((f, i) => (
              <div key={i} className="bg-white/[0.03] backdrop-blur-md p-10 rounded-[40px] border border-white/5 hover:border-primary/30 transition-all group">
                <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <span className="material-symbols-outlined text-3xl">{f.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                <p className="text-[#cfc2d7] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Security & Trust Section */}
        <section id="security" className="px-6 md:px-12 max-w-[1280px] mx-auto py-32 border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <span className="material-symbols-outlined text-green-400 text-3xl">verified_user</span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-4xl font-bold">Safe & Verified Installation</h2>
              <p className="text-[#cfc2d7] leading-relaxed">
                Easy Dubbing is developed by <b>OneHostingEurope</b>. As an independent AI studio, our software might trigger a Windows "SmartScreen" warning during the first installation. 
                <br/><br/>
                This is normal for new professional software. Our code is 100% clean, virus-free, and focused solely on your video translation performance.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">1</span>
                  <p className="text-sm text-[#cfc2d7]">If the blue window appears, click <b>"More Info"</b>.</p>
                </div>
                <div className="flex items-start gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">2</span>
                  <p className="text-sm text-[#cfc2d7]">Click <b>"Run Anyway"</b> to start your Pro translation experience.</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-90" />
              <div className="bg-white/[0.03] backdrop-blur-md p-8 rounded-[40px] border border-white/10 shadow-2xl">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a] flex items-center justify-center p-8">
                   <div className="text-center space-y-4">
                      <span className="material-symbols-outlined text-6xl text-blue-400">info</span>
                      <p className="text-xs text-white/40 uppercase tracking-widest font-bold">SmartScreen Preview</p>
                      <div className="h-2 w-32 bg-white/10 mx-auto rounded-full" />
                      <div className="h-2 w-24 bg-white/10 mx-auto rounded-full" />
                   </div>
                </div>
                <div className="mt-8 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#cfc2d7]/40">
                  <span>Verified Clean</span>
                  <span>SSL Encrypted</span>
                  <span>FIPS Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-white/[0.02] py-32">
          <div className="px-6 md:px-12 max-w-[1280px] mx-auto">
            <h2 className="font-['Plus_Jakarta_Sans'] text-4xl font-bold text-center mb-24">{t('howItWorks.title')}</h2>
            <div className="grid md:grid-cols-3 gap-16 relative">
              {[
                { step: '01', icon: 'shopping_cart', title: t('howItWorks.step1Title'), desc: t('howItWorks.step1Desc') },
                { step: '02', icon: 'download', title: t('howItWorks.step2Title'), desc: t('howItWorks.step2Desc') },
                { step: '03', icon: 'movie_edit', title: t('howItWorks.step3Title'), desc: t('howItWorks.step3Desc') },
              ].map((s, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div className="absolute -top-16 text-[120px] font-black text-white/[0.03] select-none pointer-events-none">{s.step}</div>
                  <div className="w-20 h-20 rounded-3xl bg-white/[0.03] backdrop-blur-md flex items-center justify-center border border-white/10 mb-8 z-10">
                    <span className="material-symbols-outlined text-primary text-3xl">{s.icon}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-4 z-10">{s.title}</h4>
                  <p className="text-[#cfc2d7] max-w-xs z-10 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-6 md:px-12 max-w-[1280px] mx-auto py-32">
          <div className="grid md:grid-cols-3 gap-8 max-w-[1200px] mx-auto items-stretch">
            {/* Monthly Pass */}
            <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[48px] overflow-hidden border border-white/10 flex flex-col shadow-2xl transition-all hover:border-white/20">
              <div className="p-10 flex flex-col h-full">
                <div className="flex-1">
                  <span className="text-[#cfc2d7] text-sm font-bold tracking-[0.2em] uppercase opacity-50">{t('pricing.monthlyBill')}</span>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-black mt-4 mb-8 leading-tight">{t('pricing.monthlyTitle')}</h2>
                  <ul className="space-y-4 mb-12">
                    {[
                      t('pricing.monthlyFeat1'),
                      t('pricing.monthlyFeat2'),
                      t('pricing.monthlyFeat3'),
                      t('pricing.monthlyFeat4')
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#cfc2d7] text-xs font-medium">
                        <span className="material-symbols-outlined text-white/40 text-[18px]">check_circle</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-auto">
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-white font-['Plus_Jakarta_Sans'] text-5xl font-black">€69</span>
                      <span className="text-[#cfc2d7] opacity-50 font-bold">{t('pricing.monthlyUnit')}</span>
                    </div>
                  </div>
                  <div className="flex justify-center max-w-[280px] mx-auto">
                    <PayPalSubscription 
                      planId="P-1TT68433DC0155615NIEMPYY"
                      clientId="BAAnPQuQ8X0GMmcd0WY6kAGkXnOpmVcADNVyaSCXvckeuwda1i9Xuic7hHlX6WEjIlIgseGvESoFSb7lrY"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Annual Pass */}
            <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[48px] overflow-hidden border border-white/10 flex flex-col shadow-2xl transition-all hover:border-white/20">
              <div className="p-10 flex flex-col h-full">
                <div className="flex-1">
                  <span className="text-[#adc6ff] text-sm font-bold tracking-[0.2em] uppercase">{t('pricing.annualBill')}</span>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-black mt-4 mb-8 leading-tight">{t('pricing.annualTitle')}</h2>
                  <ul className="space-y-4 mb-12">
                    {[
                      t('pricing.annualFeat1'),
                      t('pricing.annualFeat2'),
                      t('pricing.annualFeat3'),
                      t('pricing.annualFeat4')
                    ].map((feat, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#cfc2d7] text-xs font-medium">
                        <span className="material-symbols-outlined text-[#adc6ff] text-[18px]">check_circle</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <div className="text-center mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-white font-['Plus_Jakarta_Sans'] text-5xl font-black">€189</span>
                      <span className="text-[#cfc2d7] opacity-50 font-bold">{t('pricing.annualUnit')}</span>
                    </div>
                  </div>
                  <div className="flex justify-center max-w-[280px] mx-auto">
                    <PayPalSubscription 
                      planId="P-5DH919456T471100PNIEMRCY"
                      clientId="BAAnPQuQ8X0GMmcd0WY6kAGkXnOpmVcADNVyaSCXvckeuwda1i9Xuic7hHlX6WEjIlIgseGvESoFSb7lrY"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Lifetime Pro */}
            <div className="bg-white/[0.04] backdrop-blur-3xl rounded-[48px] overflow-hidden border border-primary/40 flex flex-col shadow-2xl relative transition-all hover:border-primary/60 scale-105 z-10">
              <div className="absolute top-6 right-8">
                <span className="px-4 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black tracking-widest uppercase border border-primary/30">
                  {t('pricing.bestValue')}
                </span>
              </div>
              <div className="p-10 flex flex-col h-full">
                <div className="flex-1">
                  <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase">{t('pricing.offer')}</span>
                  <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-black mt-4 mb-8 leading-tight">{t('pricing.title')}</h2>
                  <ul className="space-y-4 mb-12">
                    {[
                      t('pricing.feat1'),
                      t('pricing.feat2'),
                      t('pricing.feat3'),
                      t('pricing.feat4')
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#cfc2d7] text-xs font-medium">
                        <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <span className="text-white font-['Plus_Jakarta_Sans'] text-5xl font-black">€315</span>
                    </div>
                    <p className="text-[10px] text-primary tracking-widest font-bold uppercase">{t('pricing.launch')}</p>
                  </div>
                  
                  <div className="flex justify-center max-w-[280px] mx-auto min-h-[150px] flex-col justify-center">
                    <style>{`.pp-7CA9SG6NMTY3J{text-align:center;border:none;border-radius:0.5rem;min-width:100%;padding:0 2rem;height:3rem;font-weight:bold;background-color:#FFD140;color:#000000;font-family:"Helvetica Neue",Arial,sans-serif;font-size:1rem;line-height:1.25rem;cursor:pointer; transition: transform 0.2s;}.pp-7CA9SG6NMTY3J:hover{background-color:#ffda66; transform: scale(1.02);}`}</style>
                    <form action="https://www.paypal.com/ncp/payment/7CA9SG6NMTY3J" method="post" target="_blank" style={{display:'inline-grid', justifyItems:'center', alignContent:'start', gap:'0.5rem', width: '100%'}}>
                      <input type="hidden" name="notify_url" value="https://www.easydubbing.uk/api/paypal_ipn" />
                      <input type="hidden" name="return" value="https://www.easydubbing.uk/success" />
                      <input className="pp-7CA9SG6NMTY3J" type="submit" value={t('pricing.title')} />
                      <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="cards" className="h-6 opacity-70" />
                    </form>
                    <div className="text-[10px] text-center opacity-40 mt-4 uppercase tracking-[0.2em] font-bold">Powered by PayPal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-24 text-center">
            <p className="text-[#cfc2d7] opacity-40 text-xs uppercase tracking-widest font-bold">{t('footer.trusted')}</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto border-t border-white/5 mt-32">
        <div className="flex flex-col items-center md:items-start gap-4 mb-12 md:mb-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm">video_library</span>
            </div>
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold">Easy Dubbing</span>
          </div>
          <p className="text-xs text-[#cfc2d7] opacity-50">{t('footer.copy')}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-xs font-bold text-[#cfc2d7]/50 uppercase tracking-widest">
          <a className="hover:text-primary transition-all" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-all" href="#">Terms of Service</a>
          <a className="hover:text-primary transition-all" href="#">Contact Support</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
