import { useState, useEffect, useRef } from 'react';

const API_VIDEOS = '/api/videos';
const API_TOKEN  = '/api/upload-token';
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
type UploadState = Record<string, { progress: number; status: 'idle' | 'uploading' | 'done' | 'error'; msg: string }>;

export default function Admin() {
  const [authed, setAuthed]     = useState(false);
  const [pw, setPw]             = useState('');
  const [pwError, setPwError]   = useState('');
  const [config, setConfig]     = useState<VideoConfig>({});
  const [saving, setSaving]     = useState(false);
  const [saveMsg, setSaveMsg]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [preview, setPreview]   = useState<string | null>(null);
  const [uploads, setUploads]   = useState<UploadState>({});
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const saved = sessionStorage.getItem(ADMIN_PASSWORD_KEY);
    if (saved) { setAuthed(true); fetchConfig(); }
  }, []);

  async function fetchConfig() {
    setLoading(true);
    try {
      const res = await fetch(API_VIDEOS);
      const data = await res.json();
      setConfig(data);
    } catch {
      setSaveMsg('⚠️ Could not load config from server.');
    } finally {
      setLoading(false);
    }
  }

  function setUpload(lang: string, patch: Partial<UploadState[string]>) {
    setUploads(prev => ({ ...prev, [lang]: { ...prev[lang], progress: 0, status: 'idle' as const, msg: '', ...patch } }));
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setPwError('');
    const res = await fetch(API_VIDEOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      sessionStorage.setItem(ADMIN_PASSWORD_KEY, pw);
      setAuthed(true);
      fetchConfig();
    } else {
      setPwError('Incorrect password. Try again.');
    }
  }

  async function handleFileUpload(lang: string, file: File) {
    const password = sessionStorage.getItem(ADMIN_PASSWORD_KEY) || '';
    setUpload(lang, { status: 'uploading', progress: 0, msg: 'Requesting upload slot...' });

    // 1. Get signed URL from our API
    let signedURL: string, publicUrl: string;
    try {
      const tokenRes = await fetch(API_TOKEN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, lang, filename: file.name }),
      });
      if (!tokenRes.ok) throw new Error(await tokenRes.text());
      const data = await tokenRes.json();
      signedURL  = data.signedURL;
      publicUrl  = data.publicUrl;
    } catch (err) {
      setUpload(lang, { status: 'error', msg: `Failed to get upload slot: ${err}` });
      return;
    }

    // 2. Upload directly to Supabase via XHR (for progress tracking)
    setUpload(lang, { status: 'uploading', progress: 0, msg: 'Uploading video...' });
    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedURL);
      xhr.setRequestHeader('Content-Type', file.type || 'video/mp4');
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const pct = Math.round((e.loaded / e.total) * 100);
          setUpload(lang, { status: 'uploading', progress: pct, msg: `Uploading... ${pct}%` });
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve();
        else reject(new Error(`Upload failed: ${xhr.status} ${xhr.responseText}`));
      };
      xhr.onerror = () => reject(new Error('Network error during upload'));
      xhr.send(file);
    }).then(() => {
      setUpload(lang, { status: 'done', progress: 100, msg: '✅ Uploaded! Click Save to apply.' });
      setConfig(prev => ({ ...prev, [lang]: publicUrl }));
    }).catch((err) => {
      setUpload(lang, { status: 'error', msg: String(err) });
    });
  }

  async function handleSave() {
    setSaving(true);
    setSaveMsg('');
    const password = sessionStorage.getItem(ADMIN_PASSWORD_KEY) || '';
    try {
      const res = await fetch(API_VIDEOS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, ...config }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveMsg('✅ All videos saved and live!');
        setConfig(data.config);
      } else {
        setSaveMsg('❌ Save failed: ' + (data.error || 'Unknown error'));
      }
    } catch {
      setSaveMsg('❌ Network error. Check connection.');
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMsg(''), 5000);
    }
  }

  // ── Login ─────────────────────────────────────────────────────
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

  // ── Dashboard ─────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Inter']">
      <header className="border-b border-white/5 px-8 h-16 flex items-center justify-between sticky top-0 bg-[#050505]/90 backdrop-blur-xl z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">video_library</span>
          </div>
          <span className="font-bold">Easy Dubbing · Admin</span>
          <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-widest bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full">Video Manager</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/" className="text-sm text-white/40 hover:text-white transition">← Back to site</a>
          <button onClick={() => { sessionStorage.clear(); setAuthed(false); }} className="text-sm text-red-400/60 hover:text-red-400 transition">Logout</button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h2 className="font-['Plus_Jakarta_Sans'] text-3xl font-bold mb-2">Hero Video Manager</h2>
          <p className="text-white/40 text-sm">Upload a video from your PC or paste a URL for each language.</p>
        </div>

        {loading ? (
          <div className="text-white/40 text-center py-20">Loading...</div>
        ) : (
          <div className="space-y-4">
            {LANGUAGES.map(lang => {
              const up = uploads[lang.code];
              const hasVideo = !!config[lang.code];
              const isYT = hasVideo && (config[lang.code].includes('youtube.com') || config[lang.code].includes('youtu.be'));

              return (
                <div key={lang.code} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{lang.flag}</span>
                      <div>
                        <p className="font-bold">{lang.label}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${hasVideo ? 'bg-green-400' : 'bg-white/20'}`} />
                          <span className="text-xs text-white/30">{hasVideo ? 'Video set' : 'No video'}</span>
                        </div>
                      </div>
                    </div>
                    {hasVideo && (
                      <button
                        onClick={() => setPreview(preview === lang.code ? null : lang.code)}
                        className="text-xs text-blue-400 hover:text-blue-300 border border-blue-400/30 px-3 py-1.5 rounded-lg transition"
                      >
                        {preview === lang.code ? 'Hide' : 'Preview'}
                      </button>
                    )}
                  </div>

                  {/* Upload from PC */}
                  <div
                    className="border-2 border-dashed border-white/10 rounded-xl p-5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-purple-500/40 hover:bg-purple-500/5 transition group"
                    onClick={() => fileRefs.current[lang.code]?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file) handleFileUpload(lang.code, file);
                    }}
                  >
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      ref={el => { fileRefs.current[lang.code] = el; }}
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(lang.code, file);
                        e.target.value = '';
                      }}
                    />
                    {up?.status === 'uploading' ? (
                      <div className="w-full space-y-2">
                        <div className="flex justify-between text-xs text-white/50">
                          <span>{up.msg}</span>
                          <span>{up.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-300 rounded-full"
                            style={{ width: `${up.progress}%` }}
                          />
                        </div>
                      </div>
                    ) : up?.status === 'done' ? (
                      <p className="text-green-400 text-sm font-medium">{up.msg}</p>
                    ) : up?.status === 'error' ? (
                      <p className="text-red-400 text-xs">{up.msg}</p>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-white/20 text-4xl group-hover:text-purple-400 transition">cloud_upload</span>
                        <div className="text-center">
                          <p className="text-sm font-medium text-white/60 group-hover:text-white transition">Click or drag a video file</p>
                          <p className="text-xs text-white/20 mt-0.5">MP4, MOV, WebM · Any size</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* OR paste URL */}
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/5" />
                    <span className="text-xs text-white/20 uppercase tracking-widest">or paste URL</span>
                    <div className="h-px flex-1 bg-white/5" />
                  </div>

                  <input
                    type="url"
                    value={config[lang.code] || ''}
                    onChange={e => setConfig(prev => ({ ...prev, [lang.code]: e.target.value }))}
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-purple-500 transition font-mono"
                    placeholder={`Direct .mp4 URL or YouTube embed for ${lang.label}...`}
                  />

                  {/* Preview */}
                  {preview === lang.code && hasVideo && (
                    <div className="rounded-xl overflow-hidden border border-white/10 bg-black aspect-video">
                      {isYT ? (
                        <iframe src={config[lang.code]} className="w-full h-full" allowFullScreen title={`${lang.label} preview`} />
                      ) : (
                        <video src={config[lang.code]} controls className="w-full h-full" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Save bar */}
        <div className="mt-8 flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <div>
            {saveMsg
              ? <p className={`text-sm font-medium ${saveMsg.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>{saveMsg}</p>
              : <p className="text-xs text-white/30">Changes apply immediately on the live site after saving.</p>
            }
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
        <div className="mt-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
          <h3 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">info</span>
            Tips
          </h3>
          <ul className="text-sm text-white/50 space-y-1.5">
            <li>• <b className="text-white/70">Upload:</b> Click the dashed box or drag a video file. It uploads directly to our CDN.</li>
            <li>• <b className="text-white/70">YouTube:</b> Use embed format: <code className="text-blue-400">https://www.youtube.com/embed/VIDEO_ID</code></li>
            <li>• <b className="text-white/70">No video set:</b> The app screenshot placeholder is shown instead.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
