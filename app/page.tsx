'use client';

import { useState } from 'react';

type Mode = 'summarize' | 'quiz';

export default function Home() {
  const [mode, setMode] = useState<Mode>('summarize');
  const [content, setContent] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
  setError('');
  setResult('');

  if (!content.trim()) {
    setError('Please enter some content first.');
    return;
  }
  if (content.trim().length < 20) {
    setError('Please enter at least 20 characters.');
    return;
  }

  setLoading(true);
  try {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode, content }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.error || 'Something went wrong.');
    } else {
      setResult(data.result);
    }
  } catch (err) {
    setError('Network error. Please check your connection and try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold">StudyMate AI</h1>
        <p className="text-gray-500">Your AI-powered study assistant</p>
      </header>

      {/* Mode selector */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setMode('summarize')}
          className={`px-4 py-2 rounded-lg border ${mode === 'summarize' ? 'bg-black text-white' : 'bg-white'}`}
        >
          📝 Summarize
        </button>
        <button
          onClick={() => setMode('quiz')}
          className={`px-4 py-2 rounded-lg border ${mode === 'quiz' ? 'bg-black text-white' : 'bg-white'}`}
        >
          ❓ Generate Quiz
        </button>
      </div>

      {/* Input area */}
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your notes here..."
          rows={8}
          className="w-full border rounded-lg p-3"
        />
        <div className="text-right text-sm text-gray-400">
          {content.length} / 10000
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Generating...' : '✨ Generate'}
      </button>

      {/* Result */}
      <div className="border rounded-lg p-4 min-h-[100px] bg-gray-50">
        <h2 className="font-semibold mb-2">AI Result</h2>
        {result ? (
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        ) : (
          <p className="text-gray-400 text-sm">Your result will appear here.</p>
        )}
      </div>
    </main>
  );
}