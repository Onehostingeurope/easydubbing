import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  useEffect(() => {
    const initPayPal = () => {
      if ((window as any).paypal) {
        (window as any).paypal.HostedButtons({
          hostedButtonId: "FQ4TQG5HTBEAS",
        }).render("#paypal-container-landing");
      } else {
        setTimeout(initPayPal, 500);
      }
    };
    initPayPal();
  }, []);

  return (
    <div className="bg-[#050505] text-[#e5e2e1] font-['Inter'] selection:bg-purple-500/30 overflow-x-hidden">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 max-w-[1280px] mx-auto h-16 bg-white/[0.02] backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">video_library</span>
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-[24px] font-bold tracking-tighter text-primary">Easy Dubbing</span>
        </div>
        <div className="hidden md:flex gap-8 items-center text-sm">
          <a className="text-[#cfc2d7] font-medium hover:text-primary transition-colors" href="#features">Features</a>
          <a className="text-[#cfc2d7] font-medium hover:text-primary transition-colors" href="#how-it-works">How it Works</a>
          <a className="text-[#cfc2d7] font-medium hover:text-primary transition-colors" href="#pricing">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <a className="px-5 py-2 rounded-full bg-gradient-to-r from-[#adc6ff] to-[#ddb8ff] text-[#2c0051] font-bold text-sm hover:scale-105 transition-transform" href="#pricing">
            Get Started
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
                Powered by Advanced AI
              </span>
              <h1 className="font-['Plus_Jakarta_Sans'] text-[56px] md:text-[80px] leading-[1.1] font-extrabold tracking-tighter">
                Translate Videos <br/>
                <span className="text-primary italic font-black">With Your Own Voice.</span>
              </h1>
              <p className="text-lg text-[#cfc2d7] max-w-lg leading-relaxed">
                The world's most powerful AI Video Dubbing Studio. Professional voice cloning and 40+ languages in one click.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <a href="#pricing" className="px-10 py-5 rounded-full bg-gradient-to-r from-[#adc6ff] to-[#ddb8ff] text-[#2c0051] font-black text-lg shadow-xl shadow-purple-500/20 flex items-center gap-2 hover:scale-110 transition-transform">
                  Get Lifetime Pro
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
          <div className="max-w-5xl mx-auto bg-white/[0.02] backdrop-blur-3xl rounded-[48px] overflow-hidden border border-white/10 grid md:grid-cols-2 shadow-2xl shadow-purple-500/5">
            <div className="p-12 md:p-16">
              <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase">Limited Time Offer</span>
              <h2 className="font-['Plus_Jakarta_Sans'] text-5xl font-black mt-4 mb-10 leading-tight">Lifetime <br/> Pro License</h2>
              <ul className="space-y-6">
                {[
                  "Unlimited Local Processing",
                  "Hardware-Locked Security",
                  "High-Fidelity Voice Cloning",
                  "Lifetime Free Updates"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[#cfc2d7] font-medium">
                    <span className="material-symbols-outlined text-primary text-[24px]">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white/[0.02] p-12 md:p-16 flex flex-col justify-center border-l border-white/10">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="text-[#cfc2d7] line-through text-2xl opacity-50">€199</span>
                  <span className="text-white font-['Plus_Jakarta_Sans'] text-[64px] font-black leading-none">€49</span>
                </div>
                <p className="text-xs text-[#cfc2d7] tracking-widest font-bold uppercase opacity-60">ONE-TIME PAYMENT • EUR</p>
              </div>
              
              <div className="space-y-4">
                <div id="paypal-container-landing" className="min-h-[50px] overflow-hidden rounded-2xl"></div>
                <button className="w-full py-5 bg-[#001c64] hover:bg-[#00154d] text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-blue-900/20">
                  <span className="material-symbols-outlined">credit_card</span>
                  Debit or Credit Card
                </button>
              </div>
              
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-6 grayscale opacity-40">
                  <img alt="Visa" className="h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYe682_f3zsPViPBBPWiaq0QFkjffwg-BULEbzalWPvhRbx2-W8t2YzbMD5FGM9rQdukYzJkVrf1JOQudufZemvzJ7FR-1Hg5bsvTNa6bwU2yMqDzUhBTNen3pLtFN6_I786GxhL6g1CwhT8LQ0m-Nr8G19HLd2TQ01lwpXGVgyMMYvTh4osgzxxC_T_GIqZoOyfXGwh-9r7eGVyvSQtFUi89CWMvTDbkJvupetrngZukinPVUCMFE7NcExibnLzHfB4KRXPqtsBzn"/>
                  <img alt="Mastercard" className="h-7" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm8DFXWQdS5rsO4-JzocHAOudw_ezlY-vTp46ikOg1xt63u0FrhFmqw_NqngfpTwTgfiimnlhIwISkUBJLAf3-q6xQnzcpX8q3QHglGBWTwNYpqlvF8w9Iz_j-fFVduBapQHwIf7IAS9K7-mTOY7B3b_cBkCpv0Vg2Y5yM46ber8He5lRKXGMKay1EIcazB91Z4RYkTyT93weLutfcl1jo9QfaUZZZjWKK69QPpj3ak6S6vyhk0nRnPnpeAcSbj_sRlUzYKBr6AnJu"/>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#cfc2d7] opacity-40 font-bold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  Secure Hardware Activation
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <a className="inline-flex items-center gap-3 text-primary hover:text-white transition-colors font-bold group" href="#">
              <span className="material-symbols-outlined group-hover:scale-125 transition-transform">download</span>
              Download Installer for Windows
            </a>
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
          <p className="text-xs text-[#cfc2d7] opacity-50">© 2024 Easy Dubbing AI. All rights reserved.</p>
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
