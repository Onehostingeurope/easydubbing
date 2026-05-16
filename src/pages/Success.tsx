import { motion } from 'framer-motion';
import { Download, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

const Success = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-sans px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-purple-900/20 to-blue-900/20 -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white/[0.03] backdrop-blur-3xl p-12 md:p-16 rounded-[48px] border border-white/10 shadow-2xl relative text-center"
      >
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500 border border-green-500/20 shadow-lg shadow-green-500/10">
          <CheckCircle2 size={48} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black mb-4 font-['Plus_Jakarta_Sans'] tracking-tighter text-white">Payment Successful!</h1>
        <p className="text-[#cfc2d7] text-lg mb-8">Thank you for joining the future of video dubbing. Your license is now active.</p>
        
        {/* Serial Key Lookup Box */}
        <div className="mb-10 p-8 rounded-3xl bg-white/[0.02] border border-white/10 text-left">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#ddb8ff]" />
            Your Serial Key
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input 
                type="email" 
                id="lookup-email"
                placeholder="Enter your email"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#ddb8ff]/50 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    document.getElementById('reveal-btn')?.click();
                  }
                }}
              />
              <button 
                id="reveal-btn"
                className="bg-[#ddb8ff] text-[#2c0051] font-bold px-6 rounded-xl hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                onClick={async () => {
                  const target = document.getElementById('lookup-email');
                  const email = target.value;
                  const display = document.getElementById('key-display');
                  const text = document.getElementById('key-text');
                  
                  if (!email) return;
                  
                  const startLookup = async () => {
                    target.disabled = true;
                    if (text) text.innerText = 'Searching...';
                    if (display) display.classList.remove('hidden');

                    let attempts = 0;
                    const maxAttempts = 10;
                    
                    const performLookup = async () => {
                      try {
                        const res = await fetch(`/api/lookup_key?email=${encodeURIComponent(email)}`);
                        const data = await res.json();
                        
                        if (data.key) {
                          if (text) text.innerText = data.key;
                          target.disabled = false;
                          return true;
                        }
                      } catch (err) {
                        console.error('Lookup failed', err);
                      }
                      return false;
                    };

                    const poll = async () => {
                      const found = await performLookup();
                      if (!found && attempts < maxAttempts) {
                        attempts++;
                        if (text) text.innerText = `Searching... (${attempts}/${maxAttempts})`;
                        setTimeout(poll, 3000);
                      } else if (!found) {
                        if (text) text.innerText = 'Not found yet. Try again in 10s.';
                        target.disabled = false;
                      }
                    };

                    poll();
                  };

                  startLookup();
                }}
              >
                Reveal My Key
              </button>
            </div>
            <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest text-center">Enter email and click the button or press Enter</p>
            
            <div id="key-display" className="hidden p-6 rounded-xl bg-[#ddb8ff]/10 border border-[#ddb8ff]/20 text-center animate-in fade-in zoom-in duration-500">
              <code id="key-text" className="text-3xl font-black text-[#ddb8ff] tracking-widest">Searching...</code>
              <p className="text-[10px] text-[#ddb8ff]/50 mt-3 uppercase font-bold">Copy this key into the app to activate</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <a 
            href="https://easydubbing.uk/installer.exe" 
            className="w-full bg-gradient-to-r from-[#adc6ff] to-[#ddb8ff] text-[#2c0051] font-black py-6 rounded-2xl shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-xl"
          >
            <Download size={24} />
            Download Installer for Windows
          </a>
        </div>

        <div className="mt-12 pt-12 border-t border-white/5">
          <a href="/app" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-bold group">
            Go to Activation Studio
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;
