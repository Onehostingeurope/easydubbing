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
        
        <h1 className="text-4xl md:text-5xl font-black mb-4 font-['Plus_Jakarta_Sans'] tracking-tighter">Payment Successful!</h1>
        <p className="text-[#cfc2d7] text-lg mb-12">Thank you for joining the future of video dubbing. Your license is now active.</p>
        
        <div className="space-y-6">
          <a 
            href="#" // Put your real installer download link here!
            className="w-full bg-gradient-to-r from-[#adc6ff] to-[#ddb8ff] text-[#2c0051] font-black py-6 rounded-2xl shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-xl"
          >
            <Download size={24} />
            Download Installer for Windows
          </a>
          
          <div className="flex items-center justify-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-widest pt-4">
            <ShieldCheck size={16} className="text-primary" />
            Check your email for your Serial Key
          </div>
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
