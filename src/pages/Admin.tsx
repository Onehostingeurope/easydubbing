import { useState, useEffect } from 'react';

const API = '/api/videos';
const ADMIN_PASSWORD_KEY = 'ed_admin_auth';

const LANGUAGES = [
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'fr', label: 'French',   flag: '🇫🇷' },
  { code: 'es', label: 'Spanish',  flag: '🇪🇸' },
  { code: 'it', label: 'Italian',  flag: '🇮🇹' },
  { code: 'ru', label: 'Russian',  flag: '🇷🇺' },
  { code: 'de', label: 'German',   flag: '🇩🇪' },
  { code: 'ar', label: 'Arabic',   flag: '🇸🇦' },
];

type VideoConfig = Record<string, string>;

export default function Admin() {
  const [authed, setAuthed]       = useState(false);
  const [pw, setPw]               = useState('');
  const [pwError, setPwError]     = useState('');
  const [config, setConfig]       = useState<VideoConfig>({});
  const [saving, setSaving]       = useState(false);
  const [saveMsg, setSaveMsg]     = useState('');
  const [loading, setLoading]     = useState(false);
  const [preview, setPreview]     = useState<string | null>(null);

  // Check remembered session
  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_PASSWORD_KEY);
    if (saved) { setAuthed(true); fetchConfig(saved); }
  }, []);

  async function fetchConfig(password: string) {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setConfig(data);
    } catch {
      setSaveMsg('⚠️ Could not load config from server.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setPwError('');
    // Quick pre-check
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      sessionStorage.setItem(ADMIN_PASSWORD_KEY, pw);
      setAuthed(true);
      fetchConfig(pw);
    } else {
      setPwError('Incorrect password. Try again.');
    }
  }

  async function handleSave() {
    setSaving(true);
    setSaveMsg('');
    const password = sessionStorage.getItem(ADMIN_PASSWORD_KEY) || '';
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, ...config }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveMsg('✅ Videos saved successfully!');
        setConfig(data.config);
      } else {
        setSaveMsg('❌ Save failed: ' + (data.error || 'Unknown error'));
      }
    } catch {
      setSaveMsg('❌ Network error. Check server.');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(''), 4000);
    }
  }

  // ── Login Screen ────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6 bg-white/[0.04] border border-white/10 rounded-3xl p-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xl">admin_panel_settings</span>
            </div>
            <div>
              <h1 className="font-bold text-xl">Easy Dubbing Admin</h1>
              <p className="text-xs text-white/40">Video Management</p>
            </div>
          </div>
          <div>
            <label className="text-xs text-white/50 uppercase tracking-widest font-bold mb-2 block">Admin Password</label>
            <input
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition"
              placeholder="Enter admin password"
              autoFocus
            />
            {pwError && <p className="text-red-400 text-sm mt-2">{pwError}</p>}
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold hover:opacity-90 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  // ── Admin Dashboard ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Inter']">
      {/* Header */}
      <header className="border-b border-white/5 px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">video_library</span>
          </div>
          <span className="font-bold">Easy Dubbing · Admin</span>
          <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-widest bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full">Video Manager</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm text-white/40 hover:text-white transition">← Back to site</a>
          <button
            onClick={() => { sessionStorage.clear(); setAuthed(false); }}
            className="text-sm text-red-400/60 hover:text-red-400 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold mb-2">Hero Video Manager</h2>
          <p className="text-white/40 text-sm">Paste a direct video URL or YouTube embed URL for each language. Visitors will see the video matching their selected language.</p>
        </div>

        {loading ? (
          <div className="text-white/40 text-center py-20">Loading config...</div>
        ) : (
          <div className="space-y-4">
            {LANGUAGES.map(lang => (
              <div key={lang.code} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{lang.flag}</span>
                    <div>
                      <p className="font-bold">{lang.label}</p>
                      <p className="text-xs text-white/30 font-mono">code: {lang.code}</p>
                    </div>
                  </div>
                  {config[lang.code] && (
                    <button
                      onClick={() => setPreview(preview === lang.code ? null : lang.code)}
                      className="text-xs text-blue-400 hover:text-blue-300 border border-blue-400/30 px-3 py-1.5 rounded-lg transition"
                    >
                      {preview === lang.code ? 'Hide preview' : 'Preview'}
                    </button>
                  )}
                </div>

                <input
                  type="url"
                  value={config[lang.code] || ''}
                  onChange={e => setConfig(prev => ({ ...prev, [lang.code]: e.target.value }))}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition font-mono"
                  placeholder={`Paste direct .mp4 URL or YouTube embed URL for ${lang.label}...`}
                />

                {/* Preview */}
                {preview === lang.code && config[lang.code] && (
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black aspect-video">
                    {config[lang.code].includes('youtube.com') || config[lang.code].includes('youtu.be') ? (
                      <iframe
                        src={config[lang.code]}
                        className="w-full h-full"
                        allowFullScreen
                        title={`${lang.label} preview`}
                      />
                    ) : (
                      <video src={config[lang.code]} controls className="w-full h-full" />
                    )}
                  </div>
                )}

                {/* Status pill */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${config[lang.code] ? 'bg-green-400' : 'bg-white/20'}`} />
                  <span className="text-xs text-white/30">{config[lang.code] ? 'Video set' : 'No video — placeholder shown'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Save Bar */}
        <div className="mt-8 flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <div>
            {saveMsg && <p className={`text-sm font-medium ${saveMsg.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>{saveMsg}</p>}
            {!saveMsg && <p className="text-xs text-white/30">Changes apply immediately on the live website after saving.</p>}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold text-sm hover:opacity-90 transition disabled:opacity-40"
          >
            {saving ? 'Saving...' : 'Save All Videos'}
          </button>
        </div>

        {/* Help */}
        <div className="mt-8 bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
          <h3 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">info</span>
            How to add videos
          </h3>
          <ul className="text-sm text-white/50 space-y-2">
            <li>• <b className="text-white/70">Direct MP4:</b> Upload your video anywhere (Google Drive, Cloudflare, your server) and paste the direct <code className="text-blue-400">.mp4</code> URL.</li>
            <li>• <b className="text-white/70">YouTube:</b> Use the embed URL format: <code className="text-blue-400">https://www.youtube.com/embed/VIDEO_ID</code></li>
            <li>• <b className="text-white/70">No video set:</b> The app screenshot placeholder will be shown instead.</li>
          </ul>
        </div>
      </main>

      {/* Google Fonts for icons */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
    </div>
  );
}
