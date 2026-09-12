"use client";

import { AlertIcon, EraserIcon, SpinnerIcon } from "@/components/Icons";
import ModeSwitcher, { MODES } from "@/components/ModeSwitcher";
import ResultCard from "@/components/ResultCard";
import type { Mode } from "@/lib/prompts";
import { useEffect, useRef, useState } from "react";

const MAX_CHARS = 10000;
const MIN_CHARS = 20;

const SAMPLE = `An API, or Application Programming Interface, allows different software applications to communicate with each other. Instead of one application needing to understand how another application works internally, it can send a request to the API and receive a structured response. For example, a weather application can use a weather API to request the current temperature for a particular city. The API receives the request, processes it on the server, and commonly returns the requested information in JSON format. APIs can use different HTTP methods such as GET for retrieving data, POST for creating or sending data, PUT or PATCH for updating data, and DELETE for removing data. This approach makes software development more modular because developers can reuse functionality provided by other services without building everything from scratch.`;

export default function Home() {
  const [mode, setMode] = useState<Mode>("summarize");
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resultRef = useRef<HTMLDivElement>(null);

  const active = MODES.find((m) => m.key === mode) ?? MODES[0];

  const count = content.length;
  const trimmedLength = content.trim().length;
  const overLimit = count > MAX_CHARS;
  const tooShort = count > 0 && trimmedLength < MIN_CHARS;
  const fillPct = Math.min(100, (count / MAX_CHARS) * 100);

  const handleGenerate = async () => {
    setError("");

    const trimmed = content.trim();

    if (!trimmed) {
      setError("Please enter some content first.");
      return;
    }

    if (trimmed.length < MIN_CHARS) {
      setError(`Please enter at least ${MIN_CHARS} characters.`);
      return;
    }

    if (count > MAX_CHARS) {
      setError("Content is too long (max 10,000 characters).");
      return;
    }

    setResult("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mode,
          content: trimmed,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Something went wrong.");
      } else {
        setResult(data.result);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && result) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [loading, result]);

  const handleClear = () => {
    setContent("");
    setResult("");
    setError("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && !loading) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <main className="page-shell">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand-row">
            <span className="brand-line" />

            <h1>TASUKU</h1>

            <span className="brand-line" />
          </div>

          <p>AI-powered study assistant for smarter learning.</p>
        </div>
      </header>

      {/* Main content */}
      <div className="content-wrapper">
        <div className="mode-wrapper">
          <ModeSwitcher
            mode={mode}
            onChange={(newMode) => {
              setMode(newMode);
              setError("");
              setResult("");
            }}
            disabled={loading}
          />
        </div>

        <section className="input-card">
          <div className="input-header">
            <label htmlFor="content">{active.inputLabel}</label>
          </div>

          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={active.placeholder}
            rows={6}
            maxLength={MAX_CHARS}
            spellCheck={true}
          />

          <div className="character-bar">
            <div
              className={`character-progress ${
                overLimit ? "is-error" : fillPct > 85 ? "is-warning" : ""
              }`}
              style={{ width: `${fillPct}%` }}
            />
          </div>

          <div className="input-footer">
            <div className="footer-actions">
              <button
                type="button"
                onClick={handleClear}
                disabled={!content && !result}
                className="secondary-action"
              >
                <EraserIcon className="h-4 w-4" />
                Clear
              </button>

              {!content && (
                <button
                  type="button"
                  onClick={() => setContent(SAMPLE)}
                  className="secondary-action"
                >
                  Try example
                </button>
              )}
            </div>

            <div className="character-count">
              {tooShort && (
                <span className="too-short">
                  {MIN_CHARS - trimmedLength} more characters
                </span>
              )}

              <span
                className={
                  overLimit
                    ? "count-error"
                    : fillPct > 85
                      ? "count-warning"
                      : ""
                }
              >
                {count.toLocaleString()} / {MAX_CHARS.toLocaleString()}
              </span>
            </div>
          </div>
        </section>

        {error && (
          <div className="error-box" role="alert">
            <AlertIcon className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || overLimit || trimmedLength < MIN_CHARS}
          className="generate-button"
        >
          {loading ? (
            <>
              <SpinnerIcon className="h-4 w-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <active.Icon className="h-4 w-4" />
              {active.label}
            </>
          )}
        </button>

        <div ref={resultRef} className="result-wrapper">
          <ResultCard
            result={result}
            loading={loading}
            label={active.short}
            mode={mode}
          />
        </div>
      </div>

      <footer className="site-footer">
        Made by{" "}
        <a
          href="https://github.com/anuja112"
          target="_blank"
          rel="noopener noreferrer"
        >
          Anuja Ghosal
        </a>
      </footer>
    </main>
  );
}
