import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Globe, UploadCloud, Video, Settings2, Play, Download, ChevronRight, Wand2 } from 'lucide-react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState<'upload' | 'settings' | 'process' | 'result'>('upload');
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('French (fr)');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [progressText, setProgressText] = useState('Initializing...');
  const [credits, setCredits] = useState<number>(5); // Default 5 credits for the 9€ plan

  // Use the public URL if provided, otherwise fallback to local
  const API_URL = import.meta.env.VITE_API_URL || API_URL;

  const handleProcess = async () => {
    if (credits <= 0) {
      alert("You have run out of credits! Please purchase more for 2€/video.");
      return;
    }

    if (!url) {
      alert("Please enter a valid YouTube URL first.");
      setActiveTab('upload');
      return;
    }
    
    setActiveTab('process');
    setProgress(0);
    setProgressText('Connecting to SoniTranslate...');

    try {
      const { Client } = await import('@gradio/client');
      // Connect directly to the local backend using proxy
      const app = await Client.connect('http://127.0.0.1:7860/');
      
      const defaultArgs = [
        null, // 0: VIDEO file
        url, // 1: Media link
        "", // 2: Video Path
        "", // 3: HF Token
        true, // 4: Preview
        "tiny", // 5: Whisper model
        1, // 6: Batch size
        "default", // 7: Compute type
        "Automatic detection", // 8: Source language
        targetLanguage, // 9: Translate audio to
        1, // 10: Min speakers
        1, // 11: Max speakers
        "fr-FR-HenriNeural-Male", // 12: TTS 1
        ">alloy HD OpenAI-TTS", // 13: TTS 2
        ">alloy HD OpenAI-TTS",
        ">alloy HD OpenAI-TTS",
        ">alloy HD OpenAI-TTS",
        ">alloy HD OpenAI-TTS",
        ">alloy HD OpenAI-TTS",
        ">alloy HD OpenAI-TTS",
        ">alloy HD OpenAI-TTS",
        ">alloy HD OpenAI-TTS",
        ">alloy HD OpenAI-TTS",
        ">alloy HD OpenAI-TTS",
        "", // 24: File name
        "Mixing audio with sidechain compression", // 25
        1, // 26
        true, // 27
        0, // 28
        0, // 29
        "disable", // 30
        true, // 31
        true, // 32
        "", // 33
        true, // 34
        true, // 35
        true, // 36
        1, // 37
        "pyannote_3.1", // 38
        "google_translator_batch", // 39
        null, // 40
        "video (mp4)", // 41
        true, // 42
        true, // 43
        1, // 44
        true, // 45
        true, // 46
        "openvoice", // 47
        true, // 48
        "sentence", // 49
        "", // 50
        true, // 51
        true, // 52
        true, // 53
        true, // 54
        3, // 55
        true // 56
      ];

      setProgress(10);
      setProgressText('Starting dubbing job...');

      let currentProgress = 10;
      const progressInterval = setInterval(() => {
        currentProgress = Math.min(currentProgress + 2, 95);
        setProgress(currentProgress);
        if (currentProgress > 30) setProgressText('Transcribing & Translating...');
        if (currentProgress > 60) setProgressText('Generating Audio & Video...');
      }, 1500);

      const result = await app.predict('/batch_multilingual_media_conversion', defaultArgs);
      clearInterval(progressInterval);
      
      console.log("Translation Result:", result);
      
      // result.data contains the output. Output 0 is usually the video file obj.
      const resData = result.data as any;
      if (resData && resData.length > 0 && resData[0]) {
         const videoInfo = resData[0][0]; // SoniTranslate returns list of dicts for video/audio
         if (videoInfo && videoInfo.url) {
            // Check if URL is local or absolute. Since we are using Vite proxy for /gradio/file=... we might need to prepend proxy host.
            setDownloadUrl(videoInfo.url);
            setFileName(videoInfo.orig_name || "translated_video.mp4");
         }
      }

      setCredits(prev => prev - 1); // Deduct 1 credit
      setProgress(100);
      setProgressText('Translation Complete!');
      setTimeout(() => {
        setActiveTab('result');
      }, 1000);
      
    } catch (error) {
      console.error("Dubbing failed:", error);
      alert("Failed to process the dubbing task. Ensure SoniTranslate backend is running and the URL is correct.");
      setActiveTab('upload');
    }
  };

  return (
    <>
      <div className="bg-glow-wrapper">
        <div className="bg-glow bg-glow-1"></div>
        <div className="bg-glow bg-glow-2"></div>
      </div>

      <nav className="glass-panel" style={{ margin: '24px auto', maxWidth: '1200px', padding: '16px 24px', borderRadius: '100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-primary), #8b5cf6)' }}>
            <Globe size={20} color="white" />
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>
            Soni<span className="text-gradient-accent">Translate</span>
          </span>
        </div>
        
        <div className="flex gap-6 items-center" style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
          <span style={{ cursor: 'pointer', color: 'var(--text-primary)' }}>Dashboard</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Projects</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Voices</span>
          <button className="glass-button" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
            Upgrade
          </button>
        </div>
      </nav>

      <main className="container" style={{ paddingBottom: '100px' }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', padding: '60px 0' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid var(--border-color)', background: 'var(--glass-bg)', marginBottom: '24px' }}
          >
            <Sparkles size={16} className="text-gradient-accent" />
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Powered by SoniTranslate AI</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: '4rem', lineHeight: 1.1, marginBottom: '24px' }}
          >
            Break language barriers <br />
            with <span className="text-gradient-accent">synchronized dubbing</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}
          >
            Upload your video, select a target language, and let our AI create a perfect voice clone with synchronized lip movements.
          </motion.p>
        </section>

        {/* Main Interface */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-panel" 
          style={{ maxWidth: '900px', margin: '0 auto', padding: '0', overflow: 'hidden' }}
        >
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
            {[
              { id: 'upload', icon: <UploadCloud size={18} />, label: '1. Source Media' },
              { id: 'settings', icon: <Settings2 size={18} />, label: '2. Configuration' },
              { id: 'process', icon: <Wand2 size={18} />, label: '3. Processing' },
              { id: 'result', icon: <Play size={18} />, label: '4. Result' }
            ].map((tab) => (
              <div 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  flex: 1,
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  borderBottom: activeTab === tab.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  background: activeTab === tab.id ? 'rgba(94, 106, 210, 0.05)' : 'transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab.icon}
                {tab.label}
              </div>
            ))}
          </div>

          <div style={{ padding: '40px' }}>
            <AnimatePresence mode="wait">
              {activeTab === 'upload' && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Upload Video or Audio</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Supported formats: MP4, MKV, MP3, WAV or a YouTube URL.</p>
                  </div>
                  
                  <div className="dropzone">
                    <div className="dropzone-icon">
                      <Video size={24} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Drag & drop your file here</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Maximum file size: 2GB</p>
                    <button className="glass-button secondary">Browse Files</button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>OR IMPORT FROM URL</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
                  </div>

                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      className="glass-input" 
                      placeholder="https://www.youtube.com/watch?v=..." 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                    <button className="glass-button" onClick={() => setActiveTab('settings')} style={{ whiteSpace: 'nowrap' }}>
                      Next Step <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-8"
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div className="flex flex-col gap-6">
                      <h3 style={{ fontSize: '1.25rem' }}>Language & Voice</h3>
                      
                      <div>
                        <label className="label">Target Language</label>
                        <select className="glass-input" value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                          <option value="French (fr)">French (fr)</option>
                          <option value="Spanish (es)">Spanish (es)</option>
                          <option value="Japanese (ja)">Japanese (ja)</option>
                          <option value="German (de)">German (de)</option>
                          <option value="Italian (it)">Italian (it)</option>
                        </select>
                      </div>

                      <div>
                        <label className="label">TTS Model</label>
                        <select className="glass-input">
                          <option>Coqui XTTS (Voice Clone)</option>
                          <option>Piper TTS (Fast)</option>
                          <option>OpenVoice V2</option>
                          <option>OpenAI TTS</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="label">Output Type</label>
                        <select className="glass-input">
                          <option>Video (Synchronized Dub)</option>
                          <option>Audio Only (MP3)</option>
                          <option>Subtitles Only (SRT/ASS)</option>
                          <option>Separate Audio by Speaker</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <h3 style={{ fontSize: '1.25rem' }}>Advanced Processing</h3>
                      
                      <div className="flex items-center justify-between glass-card" style={{ padding: '16px' }}>
                        <div>
                          <div style={{ fontWeight: 500, marginBottom: '4px' }}>Vocal Enhancement</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Clean audio before transcription</div>
                        </div>
                        <label className="toggle-switch">
                          <input type="checkbox" defaultChecked />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>

                      <div className="flex items-center justify-between glass-card" style={{ padding: '16px' }}>
                        <div>
                          <div style={{ fontWeight: 500, marginBottom: '4px' }}>Overlap Reduction</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Fix speaking collisions</div>
                        </div>
                        <label className="toggle-switch">
                          <input type="checkbox" defaultChecked />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between glass-card" style={{ padding: '16px' }}>
                        <div>
                          <div style={{ fontWeight: 500, marginBottom: '4px' }}>Burn Subtitles</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Hardcode text into video</div>
                        </div>
                        <label className="toggle-switch">
                          <input type="checkbox" />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
                    <button className="glass-button secondary" onClick={() => setActiveTab('upload')}>
                      Back
                    </button>
                    <button className="glass-button" onClick={handleProcess}>
                      <Wand2 size={18} /> Start Dubbing
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'process' && (
                <motion.div
                  key="process"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center gap-8"
                  style={{ padding: '60px 0' }}
                >
                  <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                    {/* Outer glow ring */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      style={{ 
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        borderRadius: '50%',
                        background: 'conic-gradient(from 0deg, transparent 0deg, var(--accent-primary) 360deg)',
                        opacity: 0.3
                      }}
                    />
                    
                    {/* Progress Circle */}
                    <svg viewBox="0 0 100 100" style={{ position: 'absolute', width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                      <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <circle 
                        cx="50" cy="50" r="46" fill="none" 
                        stroke="var(--accent-primary)" 
                        strokeWidth="8" 
                        strokeLinecap="round"
                        strokeDasharray="289"
                        strokeDashoffset={289 - (289 * progress) / 100}
                        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
                      />
                    </svg>

                    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>{progress}%</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                      {progressText}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)' }}>This may take a few minutes depending on the video length.</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'result' && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-8"
                >
                  <div style={{ background: '#000', borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}>
                    {downloadUrl ? (
                      <video 
                        controls 
                        src={downloadUrl} 
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        autoPlay
                      />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, rgba(94, 106, 210, 0.2), rgba(139, 92, 246, 0.2))' }}>
                        <button className="glass-button" style={{ width: '80px', height: '80px', borderRadius: '50%', padding: 0 }}>
                          <Play size={32} style={{ marginLeft: '4px' }} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between glass-card" style={{ padding: '24px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>Translation Complete!</h3>
                      <p style={{ color: 'var(--text-secondary)' }}>{fileName || "Video output"}</p>
                    </div>
                    
                    <div className="flex items-center space-x-12">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-xl shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-all">
                <Video className="text-white" size={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                EASY<span className="text-purple-500">DUBBING</span>
              </span>
            </div>  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition-all shadow-lg shadow-purple-500/25">
                Dashboard
              </button>
            </div>
                    
                    <div className="flex gap-4">
                      <button className="glass-button secondary" onClick={() => setActiveTab('upload')}>
                        New Translation
                      </button>
                      {downloadUrl && (
                        <a href={downloadUrl} download={fileName} target="_blank" rel="noreferrer">
                          <button className="glass-button">
                            <Download size={18} /> Download
                          </button>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </main>
    </>
  );
}

export default App;
