import { useState, useEffect, useRef } from 'react';

const API_VIDEOS = '/api/videos';
const API_TOKEN  = '/api/upload-token';

const LANGUAGES = [
  { code: 'installation_video', label: 'Installation Section Video', flag: '🛡️' },
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

export default function VideoManager({ password }: { password: string }) {
  const [config, setConfig]     = useState<VideoConfig>({});
  const [saving, setSaving]     = useState(false);
  const [saveMsg, setSaveMsg]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [preview, setPreview]   = useState<string | null>(null);
  const [uploads, setUploads]   = useState<UploadState>({});
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetchConfig();
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

  async function handleFileUpload(lang: string, file: File) {
    setUpload(lang, { status: 'uploading', progress: 0, msg: 'Requesting upload slot...' });

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
    }).then(async () => {
      const newConfig = { ...config, [lang]: publicUrl };
      setConfig(newConfig);
      
      const saveRes = await fetch(API_VIDEOS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, ...newConfig }),
      });
      if (saveRes.ok) {
        setUpload(lang, { status: 'done', progress: 100, msg: '✅ Uploaded & saved! Now live.' });
      } else {
        setUpload(lang, { status: 'done', progress: 100, msg: '✅ Uploaded — click Save to go live.' });
      }
    }).catch((err) => {
      setUpload(lang, { status: 'error', msg: String(err) });
    });
  }

  async function handleSave() {
    setSaving(true);
    setSaveMsg('');
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

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold mb-1">Hero Video Manager</h2>
        <p className="text-white/40 text-sm">Upload a video or paste a URL for each language.</p>
      </div>

      {loading ? (
        <div className="text-white/40 text-center py-20">Loading videos...</div>
      ) : (
        <div className="space-y-4">
          {LANGUAGES.map(lang => {
            const up = uploads[lang.code];
            const hasVideo = !!config[lang.code];
            const isYT = hasVideo && (config[lang.code].includes('youtube.com') || config[lang.code].includes('youtu.be'));

            return (
              <div key={lang.code} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-4">
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
                        <div className="h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full" style={{ width: `${up.progress}%` }} />
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
                        <p className="text-xs text-white/20 mt-0.5">MP4, MOV, WebM</p>
                      </div>
                    </>
                  )}
                </div>

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
                  placeholder="Direct .mp4 URL or YouTube embed..."
                />

                {preview === lang.code && hasVideo && (
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-black aspect-video mt-4">
                    {isYT ? (
                      <iframe src={config[lang.code]} className="w-full h-full" allowFullScreen />
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

      <div className="mt-8 flex items-center justify-between bg-white/[0.03] border border-white/10 rounded-2xl p-5">
        <div>
          {saveMsg
            ? <p className={`text-sm font-medium ${saveMsg.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>{saveMsg}</p>
            : <p className="text-xs text-white/30">Changes apply immediately after saving.</p>
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
    </div>
  );
}
