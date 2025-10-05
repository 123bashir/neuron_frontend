import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const pickImageIndex = (prompt) => {
  if (!prompt) return Math.floor(Math.random() * 8) + 1;
  let sum = 0;
  for (let i = 0; i < prompt.length; i++) sum += prompt.charCodeAt(i);
  return (sum % 8) + 1;
};

const AiPrompt = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState('');
  const [resultIndex, setResultIndex] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setGenerating(true);
    setResultIndex(null);
    // simulate model generation delay
    setTimeout(() => {
      const idx = pickImageIndex(prompt.trim().toLowerCase());
      setResultIndex(idx);
      setGenerating(false);
      setImgLoading(true);
    }, 800); // slight delay for UX
  };

  const clear = () => {
    setPrompt('');
    setResultIndex(null);
    setGenerating(false);
    setImgLoading(false);
  };

  const imageUrl = resultIndex ? `/${resultIndex}.jpg` : null;

  return (
    <div className="ai-page" style={{ padding: '2rem', minHeight: '80vh', color: '#e6f7ff' }}>
      <style>{`
        .ai-panel { max-width: 980px; margin: 0 auto; }
        .ai-controls { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:18px; }
        .ai-input { flex:1; min-width:220px; padding:12px 14px; border-radius:10px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:#fff; }
        .ai-result { margin-top:18px; border-radius:12px; overflow:hidden; box-shadow:0 12px 40px rgba(0,0,0,0.6); background:#081018; padding:12px; }
        .ai-img { display:block; width:100%; height:auto; object-fit:contain; max-height:70vh; background:#000; border-radius:8px; }
        .ai-actions { margin-top:12px; display:flex; gap:8px; }
        .ai-loader, .ai-img-loader {
          display:inline-flex; align-items:center; gap:10px; color:#cfefff; font-weight:600;
        }
        .spinner {
          width:18px; height:18px; border-radius:50%;
          border:3px solid rgba(255,255,255,0.14);
          border-top-color:#00c6fb;
          animation:spin 1s linear infinite;
        }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>

      <div className="ai-panel">
        <button onClick={() => navigate(-1)} className="secondary-button" style={{ marginBottom: 16 }}>
          ← Back
        </button>

        <h1 style={{ fontSize: 28, marginBottom: 8 }}>AI Image Prompt</h1>

        <form onSubmit={submit} className="ai-controls">
          <input
            className="ai-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want..."
            aria-label="AI prompt"
            disabled={generating}
          />
          <button type="submit" className="primary-button" disabled={generating}>
            {generating ? 'Generating…' : 'Generate'}
          </button>
          <button type="button" className="secondary-button" onClick={clear} disabled={generating}>
            Clear
          </button>
        </form>

        {generating && (
          <div className="ai-loader" aria-live="polite" style={{ marginBottom: 12 }}>
            <div className="spinner" /> <span>Generating AI model output…</span>
          </div>
        )}

        {resultIndex && (
          <div className="ai-result">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontWeight: 700 }}>Result —</div>
              <div style={{ fontSize: 13, color: '#9fbfdc' }}>{prompt}</div>
            </div>

            <div style={{ position: 'relative' }}>
              {imgLoading && (
                <div className="ai-img-loader" style={{ position: 'absolute', left: 12, top: 12, zIndex: 5 }}>
                  <div className="spinner" /> <span>Loading image…</span>
                </div>
              )}

              <img
                className="ai-img"
                src={imageUrl}
                alt={`AI result ${resultIndex}`}
                onLoad={() => setImgLoading(false)}
                onError={() => setImgLoading(false)}
                draggable={false}
              />
            </div>

            <div className="ai-actions">
              <a href={imageUrl} download={`ai-${resultIndex}.jpg`} className="cta-button">Download</a>
              <button className="secondary-button" onClick={() => { setResultIndex(null); setPrompt(''); }} >New Prompt</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiPrompt;