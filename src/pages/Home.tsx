import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import PayPalSubscription from '../components/PayPalSubscription';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#050505] text-[#e5e2e1] font-['Inter'] selection:bg-purple-500/30 overflow-x-hidden">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 max-w-[1280px] mx-auto h-16 bg-white/[0.02] backdrop-blur-xl border-b border-white/10">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-white text-xl">video_library</span>
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-[24px] font-bold tracking-tighter text-primary">Easy Dubbing</span>
        </a>
        <div className="hidden md:flex gap-4 md:gap-8 items-center text-xs md:text-sm">
          <a className="text-[#cfc2d7] font-bold hover:text-primary transition-colors" href="#features">{t('nav.features')}</a>
          <a className="text-[#cfc2d7] font-bold hover:text-primary transition-colors" href="#how-it-works">{t('nav.howItWorks')}</a>
          <a className="text-[#cfc2d7] font-bold hover:text-primary transition-colors" href="#pricing">{t('nav.pricing')}</a>
          <a className="text-primary font-black hover:text-white transition-colors" href="/app">{t('nav.activate')}</a>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <LanguageSwitcher />
          <a className="hidden sm:block px-5 py-2 rounded-full bg-gradient-to-r from-[#adc6ff] to-[#ddb8ff] text-[#2c0051] font-bold text-sm hover:scale-105 transition-transform" href="#pricing">
            {t('nav.getStarted')}
          </a>
        </div>
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
            <h2 className="font-['Plus_Jakarta_Sans'] text-4xl font-bold">Unmatched AI Technology</h2>
            <p className="text-[#cfc2d7] max-w-2xl">Built for creators, filmmakers, and global brands to dissolve language barriers instantly.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: 'translate', title: 'Instant Translation', desc: '40+ languages supported with zero delay and perfect accuracy. Localize your content in seconds.', color: 'bg-blue-500/20 text-blue-400' },
              { icon: 'record_voice_over', title: 'Pro Voice Cloning', desc: 'Keep your unique tone and emotion across any language effortlessly. Captured with high fidelity.', color: 'bg-purple-500/20 text-purple-400' },
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

        {/* How It Works */}
        <section id="how-it-works" className="bg-white/[0.02] py-32">
          <div className="px-6 md:px-12 max-w-[1280px] mx-auto">
            <h2 className="font-['Plus_Jakarta_Sans'] text-4xl font-bold text-center mb-24">How it Works</h2>
            <div className="grid md:grid-cols-3 gap-16 relative">
              {[
                { step: '01', icon: 'shopping_cart', title: 'Purchase License', desc: 'Get your lifetime activation key via PayPal instantly after payment.' },
                { step: '02', icon: 'download', title: 'Install the App', desc: 'Run the professional Windows installer on your PC and activate.' },
                { step: '03', icon: 'movie_edit', title: 'Start Dubbing', desc: 'Upload a video, choose a language, and let the AI do the magic.' },
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
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Annual Pass */}
            <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[48px] overflow-hidden border border-white/10 flex flex-col shadow-2xl transition-all hover:border-white/20">
              <div className="p-10 md:p-14 flex-1">
                <span className="text-[#adc6ff] text-sm font-bold tracking-[0.2em] uppercase">{t('pricing.annualBill')}</span>
                <h2 className="font-['Plus_Jakarta_Sans'] text-4xl font-black mt-4 mb-8 leading-tight">{t('pricing.annualTitle')}</h2>
                <ul className="space-y-4 mb-12">
                  {[
                    t('pricing.annualFeat1'),
                    t('pricing.annualFeat2'),
                    t('pricing.annualFeat3'),
                    t('pricing.annualFeat4')
                  ].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#cfc2d7] text-sm font-medium">
                      <span className="material-symbols-outlined text-[#adc6ff] text-[20px]">check_circle</span>
                      {feat}
                    </li>
                  ))}
                </ul>
                <div className="text-center mb-10">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-white font-['Plus_Jakarta_Sans'] text-5xl font-black">€49</span>
                    <span className="text-[#cfc2d7] opacity-50 font-bold">/ year</span>
                  </div>
                </div>
                <div className="max-w-[280px] mx-auto">
                  <PayPalSubscription 
                    planId="P-6D005183RT833605ANIEMFOA"
                    clientId="BAAnPQuQ8X0GMmcd0WY6kAGkXnOpmVcADNVyaSCXvckeuwda1i9Xuic7hHlX6WEjIlIgseGvESoFSb7lrY"
                  />
                </div>
              </div>
            </div>

            {/* Lifetime Pro */}
            <div className="bg-white/[0.02] backdrop-blur-3xl rounded-[48px] overflow-hidden border border-primary/30 flex flex-col shadow-2xl relative transition-all hover:border-primary/50">
              <div className="absolute top-6 right-8">
                <span className="px-4 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black tracking-widest uppercase border border-primary/30">
                  Best Value
                </span>
              </div>
              <div className="p-10 md:p-14 flex-1">
                <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase">{t('pricing.offer')}</span>
                <h2 className="font-['Plus_Jakarta_Sans'] text-4xl font-black mt-4 mb-8 leading-tight">{t('pricing.title')}</h2>
                <ul className="space-y-4 mb-12">
                  {[
                    t('pricing.feat1'),
                    t('pricing.feat2'),
                    t('pricing.feat3'),
                    t('pricing.feat4')
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#cfc2d7] text-sm font-medium">
                      <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="text-center mb-10">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <span className="text-[#cfc2d7] line-through text-xl opacity-50">€149</span>
                    <span className="text-white font-['Plus_Jakarta_Sans'] text-5xl font-black">€69</span>
                  </div>
                  <p className="text-[10px] text-primary tracking-widest font-bold uppercase">{t('pricing.launch')}</p>
                </div>
                
                <div className="flex justify-center max-w-[280px] mx-auto">
                  <style>{`
                    .pp-7CA9SG6NMTY3J{text-align:center;border:none;border-radius:0.25rem;min-width:100%;padding:0 2rem;height:3rem;font-weight:bold;background-color:#FFD140;color:#000000;font-family:"Helvetica Neue",Arial,sans-serif;font-size:1rem;line-height:1.25rem;cursor:pointer; transition: transform 0.2s;}
                    .pp-7CA9SG6NMTY3J:hover{background-color:#ffda66; transform: scale(1.02);}
                  `}</style>
                  <form action="https://www.paypal.com/ncp/payment/7CA9SG6NMTY3J" method="post" target="_blank" style={{display:'inline-grid', justifyItems:'center', alignContent:'start', gap:'0.5rem', width: '100%'}}>
                    <input type="hidden" name="notify_url" value="https://easydubbing.uk/api/paypal_ipn" />
                    <input type="hidden" name="return" value="https://easydubbing.uk/success" />
                    <input className="pp-7CA9SG6NMTY3J" type="submit" value="Get Lifetime Pro" />
                    <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="cards" className="h-6" />
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-[#cfc2d7] opacity-40 text-xs uppercase tracking-widest font-bold">Trusted by 10,000+ Global Creators</p>
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
