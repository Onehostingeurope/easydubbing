import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Video, CreditCard } from 'lucide-react';

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent"
        >
          Simple, Transparent Pricing
        </motion.h1>
        <p className="text-gray-400 text-xl">Start dubbing your content today with AI precision.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Monthly Subscription */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-[#141414] border border-purple-500/30 p-8 rounded-3xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4">
            <span className="bg-purple-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Popular</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">Pro Monthly</h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-5xl font-bold">9€</span>
            <span className="text-gray-500">/month</span>
          </div>
          
          <ul className="space-y-4 mb-8 text-left">
            <li className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-1 rounded-full"><Check size={16} className="text-purple-400" /></div>
              <span>5 AI Dubbed Videos per month</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-1 rounded-full"><Check size={16} className="text-purple-400" /></div>
              <span>Voice Cloning & RVC Support</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="bg-purple-500/20 p-1 rounded-full"><Check size={16} className="text-purple-400" /></div>
              <span>HD 1080p Export</span>
            </li>
          </ul>

          <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all">
            Subscribe Now
          </button>
        </motion.div>

        {/* Pay as you go */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-[#141414] border border-gray-800 p-8 rounded-3xl flex flex-col justify-between"
        >
          <div>
            <h3 className="text-2xl font-bold mb-2">Pay Per Video</h3>
            <p className="text-gray-500 mb-6 text-sm">After you use your 5 monthly credits</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-bold">2€</span>
              <span className="text-gray-500">/video</span>
            </div>
            
            <ul className="space-y-4 mb-8 text-left">
              <li className="flex items-center gap-3 text-gray-400">
                <div className="bg-gray-800 p-1 rounded-full"><Check size={16} className="text-gray-600" /></div>
                <span>No monthly commitment</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <div className="bg-gray-800 p-1 rounded-full"><Check size={16} className="text-gray-600" /></div>
                <span>Credits never expire</span>
              </li>
            </ul>
          </div>

          <button className="w-full py-4 rounded-2xl bg-[#222] border border-gray-700 font-bold hover:bg-[#333] transition-all">
            Buy Credits
          </button>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <div className="mt-20 flex justify-center gap-12 grayscale opacity-50">
        <div className="flex items-center gap-2"><CreditCard size={20}/> Secure Stripe Payment</div>
        <div className="flex items-center gap-2"><Zap size={20}/> Instant AI Processing</div>
        <div className="flex items-center gap-2"><Video size={20}/> Cloud HQ Export</div>
      </div>
    </div>
  );
};

export default PricingPage;
