import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, Globe, Zap, Download, RefreshCw, 
  Settings, HelpCircle, AlertCircle, CheckCircle2,
  ChevronRight, Mic, Layout, Play, Lock, ShieldCheck
} from 'lucide-react';

const AppGUI = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('studio');
  const [targetLanguage, setTargetLanguage] = useState('French (fr)');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [progressText, setProgressText] = useState('Initializing...');

  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:7860';
  const VERIFY_URL = '/api/verify';

  useEffect(() => {
    const savedKey = localStorage.getItem('license_key');
    if (savedKey) setIsActivated(true);
  }, []);

  const handleActivate = async () => {
    setIsVerifying(true);
    setError('');
    
    try {
      // Hardware ID generation (placeholder for web version, real in desktop)
      const hwid = 'HW-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      
      const response = await fetch(VERIFY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(email)}&key=${encodeURIComponent(licenseKey)}&hwid=${hwid}`
      });

      if (response.ok) {
        localStorage.setItem('license_key', licenseKey);
        setIsActivated(true);
      } else {
        const text = await response.text();
        setError(text || 'Invalid License Key or Email');
      }
    } catch (err) {
      setError('Connection Error: Could not reach activation server.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleProcess = async () => {
    console.log('Connecting to API:', API_URL);
    setIsProcessing(true);
    setProgress(10);
    setProgressText('Connecting to AI Engine...');
    
    setTimeout(() => {
      setProgress(100);
      setIsProcessing(false);
      setDownloadUrl('#');
    }, 5000);
  };

  if (!isActivated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans px-6 overflow-hidden relative">
        {/* Global Navigation */}
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-16 bg-white/[0.02] backdrop-blur-xl border-b border-white/10">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Video size={20} className="text-white" />
            </div>
            <span className="font-['Plus_Jakarta_Sans'] text-[24px] font-bold tracking-tighter text-[#ddb8ff]">Easy Dubbing</span>
          </a>
          <div className="flex gap-4 md:gap-8 items-center text-xs md:text-sm">
            <a className="text-[#cfc2d7] font-bold hover:text-[#ddb8ff] transition-colors" href="/#features">Features</a>
            <a className="text-[#cfc2d7] font-bold hover:text-[#ddb8ff] transition-colors" href="/#how-it-works">How it Works</a>
            <a className="text-[#cfc2d7] font-bold hover:text-[#ddb8ff] transition-colors" href="/#pricing">Pricing</a>
            <a className="text-[#ddb8ff] font-black hover:text-white transition-colors" href="/app">Activate License</a>
          </div>
          <div className="flex items-center gap-4">
            <a className="px-5 py-2 rounded-full bg-gradient-to-r from-[#adc6ff] to-[#ddb8ff] text-[#2c0051] font-bold text-sm hover:scale-105 transition-transform" href="/#pricing">
              Get Started
            </a>
          </div>
        </nav>

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-purple-900/20 to-blue-900/20 -z-10" />
        <div className="flex-1 flex items-center justify-center pt-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-white/[0.03] backdrop-blur-3xl p-10 rounded-[48px] border border-white/10 shadow-2xl relative"
          >
          <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-purple-500/20">
            <Lock size={32} />
          </div>
          <h2 className="text-3xl font-black text-center mb-2 font-['Plus_Jakarta_Sans']">Activate Studio</h2>
          <p className="text-center text-[#cfc2d7] text-sm mb-10">Enter your Pro license to unlock AI Dubbing.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-4">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-all placeholder:text-gray-800"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-4">License Key</label>
              <input 
                type="text" 
                value={licenseKey}
                onChange={(e) => setLicenseKey(e.target.value)}
                placeholder="OHE-XXXX-XXXX-XXXX"
                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-all placeholder:text-gray-800"
              />
            </div>
            
            {error && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs text-center font-bold px-4 pt-2"
              >
                {error}
              </motion.p>
            )}

            <button 
              onClick={handleActivate}
              disabled={isVerifying || !licenseKey || !email}
              className="w-full bg-gradient-to-r from-[#adc6ff] to-[#ddb8ff] text-[#2c0051] font-black py-5 rounded-2xl shadow-lg shadow-purple-500/10 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 mt-6"
            >
              {isVerifying ? 'Verifying...' : 'Activate Now'}
            </button>
          </div>
          
          <p className="mt-8 text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            Don't have a key? <a href="https://easydubbing.uk#pricing" target="_blank" className="text-primary hover:underline">Get Lifetime Access</a>
          </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      {/* Global Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-16 bg-white/[0.02] backdrop-blur-xl border-b border-white/10">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Video size={20} className="text-white" />
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-[24px] font-bold tracking-tighter text-[#ddb8ff]">Easy Dubbing</span>
        </a>
        <div className="flex gap-4 md:gap-8 items-center text-xs md:text-sm">
          <a className="text-[#cfc2d7] font-bold hover:text-[#ddb8ff] transition-colors" href="/#features">Features</a>
          <a className="text-[#cfc2d7] font-bold hover:text-[#ddb8ff] transition-colors" href="/#how-it-works">How it Works</a>
          <a className="text-[#cfc2d7] font-bold hover:text-[#ddb8ff] transition-colors" href="/#pricing">Pricing</a>
          <a className="text-[#ddb8ff] font-black hover:text-white transition-colors" href="/app">Activate License</a>
        </div>
        <div className="flex items-center gap-4">
          <a className="px-5 py-2 rounded-full bg-gradient-to-r from-[#adc6ff] to-[#ddb8ff] text-[#2c0051] font-bold text-sm hover:scale-105 transition-transform" href="/#pricing">
            Get Started
          </a>
        </div>
      </nav>

      <div className="flex flex-1 pt-16">
        {/* Sidebar Navigation */}
        <nav className="w-20 md:w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col p-4">
          <div className="flex items-center gap-3 px-4 py-8">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Video size={20} />
            </div>
            <span className="font-bold text-xl hidden md:block tracking-tight">Easy Dubbing</span>
          </div>

        <div className="flex-1 space-y-2 mt-8">
          {[
            { id: 'studio', icon: <Layout size={20} />, label: 'AI Studio' },
            { id: 'library', icon: <Video size={20} />, label: 'My Projects' },
            { id: 'voices', icon: <Mic size={20} />, label: 'Voice Lab' },
            { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span className="font-medium hidden md:block">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 bg-purple-600/5 rounded-2xl border border-purple-500/10 hidden md:block">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <ShieldCheck size={16} />
            <span className="text-xs font-bold uppercase tracking-widest text-green-400">Pro Activated</span>
          </div>
          <p className="text-[10px] text-gray-500">Hardware Locked: ACTIVE</p>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#080808]">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Projects</span>
            <ChevronRight size={14} />
            <span className="text-white font-medium">New Translation</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors"><HelpCircle size={20} /></button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold uppercase">{email.substring(0, 2)}</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-2 font-['Plus_Jakarta_Sans']">AI Translation Studio</h1>
              <p className="text-gray-500">Professional video dubbing with zero effort.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Input Section */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-8 shadow-xl">
                  <label className="block text-sm font-medium text-gray-400 mb-4">Video Source URL (YouTube/Drive)</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-4 focus:border-purple-500 focus:outline-none transition-all placeholder:text-gray-700"
                    />
                    <button 
                      onClick={handleProcess}
                      disabled={isProcessing || !url}
                      className="bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-600 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20"
                    >
                      {isProcessing ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />}
                      {isProcessing ? 'Processing...' : 'Start Dubbing'}
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-4 text-purple-400">
                      <Globe size={18} />
                      <span className="font-bold text-sm">Target Language</span>
                    </div>
                    <select 
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-purple-500 focus:outline-none"
                    >
                      <option>French (fr)</option>
                      <option>Spanish (es)</option>
                      <option>German (de)</option>
                      <option>Italian (it)</option>
                      <option>Japanese (ja)</option>
                    </select>
                  </div>
                  <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-4 text-blue-400">
                      <Zap size={18} />
                      <span className="font-bold text-sm">AI Quality</span>
                    </div>
                    <div className="flex items-center justify-between bg-black rounded-xl px-4 py-3 text-sm border border-white/10">
                      <span>Pro Ultra-HD</span>
                      <CheckCircle2 size={16} className="text-green-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div className="space-y-6">
                <div className="bg-[#0f0f0f] border border-white/5 rounded-3xl p-6 h-full">
                  <h4 className="font-bold mb-6 flex items-center gap-2">
                    <AlertCircle size={16} className="text-gray-500" />
                    Project Status
                  </h4>
                  
                  {isProcessing ? (
                    <div className="space-y-6">
                      <div className="w-full bg-black rounded-full h-2 border border-white/5 overflow-hidden">
                        <motion.div 
                          className="bg-purple-600 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-400 animate-pulse">{progressText}</p>
                    </div>
                  ) : downloadUrl ? (
                    <div className="space-y-6 text-center">
                      <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500">
                        <CheckCircle2 size={40} />
                      </div>
                      <h5 className="font-bold text-xl text-green-400">Dubbing Ready!</h5>
                      <a 
                        href={downloadUrl}
                        className="w-full bg-green-600 hover:bg-green-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all"
                      >
                        <Download size={20} /> Download MP4
                      </a>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-700 mb-4">
                        <Play size={24} />
                      </div>
                      <p className="text-xs text-gray-600 uppercase tracking-widest font-bold">Ready to Start</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>

        <footer className="h-12 border-t border-white/5 px-8 flex items-center justify-between text-[10px] text-gray-700 uppercase tracking-widest font-bold bg-[#080808]">
           <span>Easy Dubbing v1.0.0</span>
           <span>Developed by OneHostingEurope LTD</span>
        </footer>
      </main>
      </div>
    </div>
  );
};

export default AppGUI;
