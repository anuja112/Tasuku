"use client";

import { BookIcon, CheckIcon, CopyIcon } from "@/components/Icons";
import type { Mode } from "@/lib/prompts";
import { useState } from "react";

const SKELETON_WIDTHS = ["92%", "78%", "85%", "60%", "88%", "70%"];

type QuizQuestion = {
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: string;
  explanation: string;
};

type ResultData = {
  overview?: string;
  keyPoints?: string[];
  importantConcepts?: string[];
  quickRevision?: string;
  questions?: QuizQuestion[];
  original?: string;
  improved?: string;
  improvements?: string[];
  simpleExplanation?: string;
  analogy?: string;
  keyTakeaway?: string;
};

export default function ResultCard({
  result,
  loading,
  label,
  mode,
}: {
  result: string;
  loading: boolean;
  label: string;
  mode: Mode;
}) {
  const [copied, setCopied] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [submittedKey, setSubmittedKey] = useState("");
  const quizKey = `${mode}:${result}`;
  const submitted = submittedKey === quizKey;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      // Pass
    }
  };

  let data: ResultData | null = null;

  if (result) {
    try {
      const cleaned = result
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

      data = JSON.parse(cleaned) as ResultData;
    } catch {
      data = null;
    }
  }

  const words = result
    ? result
        .replace(/```json|```/gi, "")
        .trim()
        .split(/\s+/).length
    : 0;
  const questions = data?.questions ?? [];

  const handleAnswer = (questionIndex: number, answer: string) => {
    if (submitted) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [`${quizKey}:${questionIndex}`]: answer,
    }));
  };

  const checkAnswers = () => {
    setSubmittedKey(quizKey);
  };

  return (
    <section
      id="result"
      aria-label="AI result"
      className="panel flex flex-col overflow-hidden rounded-2xl"
    >
      {/* Header */}
      <header className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div className="min-w-0">
          <h2 className="text-lg leading-tight text-ink">Result</h2>

          <p className="eyebrow mt-0.5 truncate">
            {loading
              ? "Thinking…"
              : result
                ? `${label} · ${words} words`
                : label}
          </p>
        </div>

        {result && !loading && (
          <button
            type="button"
            onClick={handleCopy}
            className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              copied
                ? "border-sage/70 bg-sage/20 text-sage-bright"
                : "border-line bg-primary-light/30 text-muted hover:border-line-strong hover:bg-sage/15 hover:text-sage-bright"
            }`}
          >
            {copied ? (
              <CheckIcon className="h-3.5 w-3.5" />
            ) : (
              <CopyIcon className="h-3.5 w-3.5" />
            )}

            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </header>

      {/* Content */}
      <div
        aria-live="polite"
        aria-busy={loading}
        className="min-h-[18rem] flex-1 px-5 py-5"
      >
        {/* Loading */}
        {loading ? (
          <div className="space-y-3.5" aria-label="Generating">
            <div className="skeleton-line !h-4 !w-2/5" />

            <div className="h-1" />

            {SKELETON_WIDTHS.map((w, i) => (
              <div key={i} className="skeleton-line" style={{ width: w }} />
            ))}
          </div>
        ) : !result ? (
          /* Empty */
          <div className="flex min-h-[18rem] flex-col items-center justify-center gap-3 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-primary-light/35 text-muted">
              <BookIcon className="h-6 w-6" />
            </span>

            <p className="max-w-[22rem] text-sm text-muted">
              Your study material will appear here.
              <br />
              Paste your notes, then hit Generate.
            </p>
          </div>
        ) : data ? (
          <>
            {/* ================= SUMMARY ================= */}
            {mode === "summarize" && (
              <div className="space-y-6 animate-rise">
                <div>
                  <p className="eyebrow mb-2">Overview</p>

                  <p className="text-sm leading-7 text-ink">{data.overview}</p>
                </div>

                <div>
                  <p className="eyebrow mb-3">Key Points</p>

                  <div className="space-y-2">
                    {data.keyPoints?.map((point: string, index: number) => (
                      <div
                        key={index}
                        className="rounded-xl border border-line bg-primary-light/25 px-4 py-3 text-sm leading-6 text-ink"
                      >
                        <span className="mr-2 text-sage-bright">
                          {index + 1}.
                        </span>

                        {point}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="eyebrow mb-3">Important Concepts</p>

                  <div className="flex flex-wrap gap-2">
                    {data.importantConcepts?.map(
                      (concept: string, index: number) => (
                        <span
                          key={index}
                          className="rounded-full border border-sage/60 bg-sage/20 px-3 py-1.5 text-xs text-sage-bright"
                        >
                          {concept}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                <div className="border-t border-line pt-5">
                  <p className="eyebrow mb-2">Quick Revision</p>

                  <p className="text-sm leading-7 text-ink">
                    {data.quickRevision}
                  </p>
                </div>
              </div>
            )}

            {/* ================= QUIZ ================= */}
            {mode === "quiz" && (
              <div className="space-y-6 animate-rise">
                {questions.map((q: QuizQuestion, index: number) => {
                  const selected = selectedAnswers[`${quizKey}:${index}`];

                  const correct = selected === q.correctAnswer;

                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-line bg-primary-light/20 p-5"
                    >
                      {/* Question */}
                      <div className="mb-4">
                        <span className="eyebrow">Question {index + 1}</span>

                        <h3 className="mt-1 text-base font-medium leading-7 text-ink">
                          {q.question}
                        </h3>
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        {(["A", "B", "C", "D"] as const).map((letter) => {
                          const isSelected = selected === letter;

                          const isCorrect =
                            submitted && letter === q.correctAnswer;

                          const isWrong =
                            submitted &&
                            isSelected &&
                            letter !== q.correctAnswer;

                          return (
                            <button
                              key={letter}
                              type="button"
                              onClick={() => handleAnswer(index, letter)}
                              className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                                isCorrect
                                  ? "border-sage/70 bg-sage/25 text-primary-dark"
                                  : isWrong
                                    ? "border-danger/60 bg-danger/15 text-danger"
                                    : isSelected
                                      ? "border-sage/60 bg-sage/20 text-ink"
                                      : "border-line bg-primary-light/20 text-muted hover:border-line-strong hover:bg-primary-light/50"
                              }`}
                            >
                              <span className="font-mono text-xs font-semibold">
                                {letter}
                              </span>

                              <span className="flex-1">
                                {q.options[letter]}
                              </span>

                              {isCorrect && (
                                <CheckIcon className="h-4 w-4 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation after submit */}
                      {submitted && (
                        <div
                          className={`mt-4 rounded-xl border px-4 py-3 ${
                            correct
                              ? "border-sage/60 bg-sage/15"
                              : "border-danger/60 bg-danger/15"
                          }`}
                        >
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                            {correct
                              ? "Correct"
                              : `Correct answer: ${q.correctAnswer}`}
                          </p>

                          <p className="mt-1 text-sm leading-6 text-muted">
                            {q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Submit */}
                {!submitted && questions.length > 0 && (
                  <button
                    type="button"
                    onClick={checkAnswers}
                    disabled={questions.some(
                      (_, index) => !selectedAnswers[`${quizKey}:${index}`],
                    )}
                    className="cta-button w-full rounded-xl border-2 border-primary px-6 py-3.5 font-medium transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Check Answers
                  </button>
                )}
              </div>
            )}

            {/* ================= IMPROVE ================= */}
            {mode === "improve" && (
              <div className="space-y-5 animate-rise">
                <div>
                  <p className="eyebrow mb-2">Original Answer</p>

                  <div className="rounded-xl border border-line bg-primary-light/25 p-4 text-sm leading-7 text-muted">
                    {data.original}
                  </div>
                </div>

                <div>
                  <p className="eyebrow mb-2">Improved Answer</p>

                  <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 text-sm leading-7 text-ink">
                    {data.improved}
                  </div>
                </div>

                <div>
                  <p className="eyebrow mb-2">What Improved</p>

                  <div className="space-y-2">
                    {data.improvements?.map((item: string, index: number) => (
                      <div key={index} className="text-sm leading-6 text-muted">
                        <span className="mr-2 text-sage-bright">✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ================= EXPLAIN ================= */}
            {mode === "explain" && (
              <div className="space-y-5 animate-rise">
                <div>
                  <p className="eyebrow mb-2">Simple Explanation</p>

                  <div className="text-sm leading-7 text-ink">
                    {data.simpleExplanation}
                  </div>
                </div>

                <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5">
                  <p className="eyebrow mb-2">Think of it like this</p>

                  <p className="text-sm leading-7 text-ink">{data.analogy}</p>
                </div>

                <div className="border-t border-line pt-5">
                  <p className="eyebrow mb-2">Key Takeaway</p>

                  <p className="text-sm font-medium leading-7 text-ink">
                    {data.keyTakeaway}
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Fallback if AI returns invalid JSON */
          <div className="animate-rise">
            <p className="whitespace-pre-wrap text-sm leading-7 text-ink">
              {result}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
