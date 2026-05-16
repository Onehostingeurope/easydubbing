import { motion } from 'framer-motion';
import { Video, Zap, Globe, Shield, Download, ArrowRight, Play, Check } from 'lucide-react';
import { useEffect } from 'react';

const LandingPage = () => {
  useEffect(() => {
    // Initialize PayPal button
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
    <div className="bg-[#050505] text-white font-sans selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
            <Video size={18} />
          </div>
          <span className="font-bold text-xl tracking-tight">Easy Dubbing</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <a href="#pricing" className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-purple-500 hover:text-white transition-all shadow-lg shadow-white/5">
          Get Started
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-purple-200">Powered by Advanced AI</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight"
          >
            Translate Videos <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">With Your Own Voice.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            The world's most powerful AI Video Dubbing Studio. <br />
            Professional lip-sync, voice cloning, and 40+ languages in one click.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a href="#pricing" className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-5 rounded-2xl text-lg font-bold flex items-center gap-2 hover:shadow-[0_0_40px_rgba(147,51,234,0.4)] transition-all">
              Unlock Lifetime Pro <ArrowRight size={20} />
            </a>
            <button className="bg-white/5 border border-white/10 px-8 py-5 rounded-2xl text-lg font-bold flex items-center gap-2 hover:bg-white/10 transition-all">
              Watch Demo <Play size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Unmatched AI Technology</h2>
            <p className="text-gray-500">Built for creators, filmmakers, and global brands.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Zap />, title: "Instant Translation", desc: "40+ languages supported with zero delay and perfect accuracy." },
              { icon: <Shield />, title: "Pro Voice Cloning", desc: "Keep your unique tone and emotion across any language effortlessly." },
              { icon: <Globe />, title: "Global Lip-Sync", desc: "Advanced AI synchronization for a truly natural viewing experience." },
            ].map((f, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-purple-500/50 transition-all group">
                <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-32 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-5xl font-bold mb-8">How it Works</h2>
            <div className="space-y-12">
              {[
                { step: "01", title: "Purchase License", desc: "Get your lifetime activation key via PayPal instantly." },
                { step: "02", title: "Install the App", desc: "Run the professional Windows installer on your PC." },
                { step: "03", title: "Start Dubbing", desc: "Upload a video, choose a language, and let the AI do the magic." },
              ].map((s, i) => (
                <div key={i} className="flex gap-6">
                  <span className="text-4xl font-black text-purple-600/30 font-mono">{s.step}</span>
                  <div>
                    <h4 className="text-xl font-bold mb-2">{s.title}</h4>
                    <p className="text-gray-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full aspect-video bg-gradient-to-tr from-purple-900/20 to-blue-900/20 rounded-3xl border border-white/10 relative flex items-center justify-center group overflow-hidden">
             <Play size={60} className="text-purple-500 group-hover:scale-125 transition-transform" />
             <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 relative">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full -z-10" />
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-[#111] border-2 border-purple-500 p-12 rounded-[40px] shadow-[0_0_80px_rgba(147,51,234,0.15)] relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              Limited Time Offer
            </div>
            <h3 className="text-3xl font-black mb-4">Lifetime Pro License</h3>
            <div className="flex items-baseline justify-center gap-2 mb-8">
              <span className="text-7xl font-black">49€</span>
              <span className="text-gray-500 line-through text-2xl">199€</span>
            </div>
            <ul className="space-y-5 text-left mb-10 text-gray-300">
              {["Unlimited Local Processing", "Hardware-Locked Security", "High-Fidelity Voice Cloning", "Lip-Sync & Emotion Preservation", "Lifetime Free Updates"].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Check size={12} className="text-purple-400" />
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
            
            {/* PayPal Button */}
            <div id="paypal-container-landing" className="min-h-[50px] overflow-hidden rounded-2xl"></div>
            
            <p className="mt-6 text-xs text-gray-500 flex items-center justify-center gap-2">
              <Shield size={12} /> Secure Hardware Activation
            </p>
          </div>
          
          <div className="mt-12 flex justify-center items-center gap-4 text-gray-500 text-sm">
             <Download size={18} />
             <a href="#" className="hover:text-white underline transition-colors">Download Installer for Windows</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
            <Video size={12} />
          </div>
          <span className="font-bold">Easy Dubbing</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">© 2026 EasyDubbing.uk | A product by OneHostingEurope LTD</p>
        <div className="flex justify-center gap-8 text-xs text-gray-700">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
