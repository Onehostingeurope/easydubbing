import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Video, CreditCard, ShieldCheck } from 'lucide-react';

const PricingPage = () => {
  useEffect(() => {
    // Initialize PayPal button after component mounts
    const initPayPal = () => {
      if ((window as any).paypal) {
        (window as any).paypal.HostedButtons({
          hostedButtonId: "FQ4TQG5HTBEAS",
        }).render("#paypal-container-FQ4TQG5HTBEAS");
      } else {
        // Retry if SDK is not loaded yet
        setTimeout(initPayPal, 500);
      }
    };
    initPayPal();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
        >
          Get the Full AI Dubbing Studio
        </motion.h1>
        <p className="text-gray-400 text-xl">Powerful AI translation, one simple lifetime payment.</p>
      </div>

      <div className="max-w-md mx-auto">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-[#141414] border-2 border-purple-500 p-8 rounded-3xl relative overflow-hidden group shadow-[0_0_50px_rgba(147,51,234,0.1)]"
        >
          <div className="absolute top-0 right-0 p-4">
            <span className="bg-purple-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Lifetime Access</span>
          </div>
          <h3 className="text-2xl font-bold mb-2 text-indigo-400">Easy Dubbing Pro</h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-6xl font-bold">49€</span>
            <span className="text-gray-500 text-lg">One-time payment</span>
          </div>
          
          <ul className="space-y-4 mb-8 text-left">
            <li className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-1 rounded-full"><Check size={16} className="text-purple-400" /></div>
              <span>Unlimited AI Video Translations</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-1 rounded-full"><Check size={16} className="text-purple-400" /></div>
              <span>Voice Cloning & RVC Support</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-1 rounded-full"><Check size={16} className="text-purple-400" /></div>
              <span>Lifetime Updates included</span>
            </li>
          </ul>

          {/* Official PayPal Button Container */}
          <div id="paypal-container-FQ4TQG5HTBEAS" className="mt-6 rounded-xl overflow-hidden min-h-[50px]"></div>
          
          <p className="text-gray-500 text-[10px] mt-4 text-center">
            Secured by PayPal. Instant key delivery after payment.
          </p>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-12 grayscale opacity-50">
        <div className="flex items-center gap-2"><CreditCard size={20}/> Secure PayPal Payment</div>
        <div className="flex items-center gap-2"><ShieldCheck size={20}/> Hardware-Locked License</div>
        <div className="flex items-center gap-2"><Zap size={20}/> Instant AI Activation</div>
        <div className="flex items-center gap-2"><Video size={20}/> Full HD Production</div>
      </div>
      
      <footer className="mt-20 text-center text-gray-600 text-sm pb-8">
        <p>Developed with precision by <strong>OneHostingEurope</strong></p>
      </footer>
    </div>
  );
};

export default PricingPage;
