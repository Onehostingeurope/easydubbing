import { useState, useEffect } from 'react';
import { BarChart3, Video, Users } from 'lucide-react';
import VideoManager from '../components/admin/VideoManager';
import LicenseManager from '../components/admin/LicenseManager';
import Analytics from '../components/admin/Analytics';

const ADMIN_PASSWORD_KEY = 'ed_admin_auth';

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'videos'>('analytics');

  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_PASSWORD_KEY);
    // Simple check: we don't know if it's right until an API call fails,
    // but we can trust sessionStorage for UI purposes.
    if (saved) setAuthed(true);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setPwError('');
    // Test the password against the licenses API
    const res = await fetch('/api/admin-licenses', {
      headers: { 'x-admin-password': pw }
    });
    if (res.ok) {
      sessionStorage.setItem(ADMIN_PASSWORD_KEY, pw);
      setAuthed(true);
    } else {
      setPwError('Incorrect password. Try again.');
    }
  }

  // ── Login Screen ─────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center font-['Inter']">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6 bg-white/[0.04] border border-white/10 rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-500" />
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="material-symbols-outlined text-white text-2xl">shield_person</span>
            </div>
            <div>
              <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-2xl tracking-tight">System Admin</h1>
              <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Secure Access</p>
            </div>
          </div>
          
          <div>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#ddb8ff]/50 transition text-lg tracking-widest text-center font-mono placeholder:text-white/20 placeholder:tracking-normal placeholder:font-sans"
              placeholder="Enter master password"
              autoFocus
            />
            {pwError && <p className="text-red-400 text-sm mt-3 text-center font-bold">{pwError}</p>}
          </div>
          
          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-lg hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(124,58,237,0.3)]">
            Authenticate
          </button>
        </form>
      </div>
    );
  }

  const password = sessionStorage.getItem(ADMIN_PASSWORD_KEY) || '';

  // ── Dashboard ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Inter'] flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/5 bg-[#050505] flex flex-col z-20">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">rocket_launch</span>
          </div>
          <div>
            <h2 className="font-bold font-['Plus_Jakarta_Sans'] tracking-tight leading-tight">Easy Dubbing</h2>
            <span className="text-[9px] font-black uppercase tracking-widest text-purple-400">Command Center</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'analytics' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
          >
            <BarChart3 size={18} className={activeTab === 'analytics' ? 'text-blue-400' : ''} />
            <span className="font-bold text-sm">Analytics</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'users' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
          >
            <Users size={18} className={activeTab === 'users' ? 'text-purple-400' : ''} />
            <span className="font-bold text-sm">Users &amp; Licenses</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'videos' ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}
          >
            <Video size={18} className={activeTab === 'videos' ? 'text-green-400' : ''} />
            <span className="font-bold text-sm">Video Management</span>
          </button>
        </nav>
        
        <div className="p-4 border-t border-white/5 hidden md:block">
          <button 
            onClick={() => { sessionStorage.clear(); setAuthed(false); }} 
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition text-sm font-bold"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Lock Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#0a0a0a]">
        {/* Top Header Mobile */}
        <header className="md:hidden border-b border-white/5 px-6 h-16 flex items-center justify-between sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-xl z-10">
          <span className="font-bold uppercase tracking-widest text-xs text-white/50">{activeTab}</span>
          <button 
            onClick={() => { sessionStorage.clear(); setAuthed(false); }} 
            className="text-xs font-bold text-red-400"
          >
            Logout
          </button>
        </header>

        <div className="max-w-5xl mx-auto p-6 md:p-12 pb-24">
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'users' && <LicenseManager password={password} />}
          {activeTab === 'videos' && <VideoManager password={password} />}
        </div>
      </main>
      
    </div>
  );
}
