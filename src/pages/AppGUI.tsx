import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Globe, Zap, Download, RefreshCw, 
  Settings, HelpCircle, AlertCircle, CheckCircle2,
  ChevronRight, Mic, Layout, Sparkles
} from 'lucide-react';

const AppGUI = () => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('studio');
  const [targetLanguage, setTargetLanguage] = useState('French (fr)');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [progressText, setProgressText] = useState('Initializing...');

  const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:7860';

  const handleProcess = async () => {
    setIsProcessing(true);
    setProgress(10);
    setProgressText('Connecting to AI Engine...');
    
    // Logic for Gradio connection would go here
    setTimeout(() => {
      setProgress(100);
      setIsProcessing(false);
      setDownloadUrl('#');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans">
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
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Pro Activated</span>
          </div>
          <p className="text-[10px] text-gray-500">Unlimited Lifetime Access</p>
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold">CA</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-2">AI Translation Studio</h1>
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

        <footer className="h-12 border-t border-white/5 px-8 flex items-center justify-between text-[10px] text-gray-700 uppercase tracking-widest font-bold bg-[#080808]">
           <span>Easy Dubbing v1.0.0</span>
           <span>Developed by OneHostingEurope LTD</span>
        </footer>
      </main>
    </div>
  );
};

export default AppGUI;
