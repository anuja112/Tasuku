"use client";

import {
  LightbulbIcon,
  NotesIcon,
  PenIcon,
  QuizIcon,
} from "@/components/Icons";
import type { Mode } from "@/lib/prompts";
import { useRef } from "react";

export type ModeConfig = {
  key: Mode;
  label: string;
  compact: string;
  short: string;
  inputLabel: string;
  placeholder: string;
  Icon: typeof NotesIcon;
};

export const MODES: ModeConfig[] = [
  {
    key: "summarize",
    label: "Summarize",
    compact: "Summarize",
    short: "Summary",
    inputLabel: "Study material",
    placeholder:
      "Paste a lecture transcript, textbook section, or your messy class notes…",
    Icon: NotesIcon,
  },
  {
    key: "quiz",
    label: "Generate Quiz",
    compact: "Quiz",
    short: "Quiz",
    inputLabel: "Study material",
    placeholder: "Paste the chapter or topic you want to be tested on…",
    Icon: QuizIcon,
  },
  {
    key: "improve",
    label: "Improve Answer",
    compact: "Improve",
    short: "Improved",
    inputLabel: "Your answer",
    placeholder: "Paste your draft answer and it will come back sharper…",
    Icon: PenIcon,
  },
  {
    key: "explain",
    label: "Explain Topic",
    compact: "Explain",
    short: "Explain",
    inputLabel: "Topic or concept",
    placeholder: "Enter a topic or concept you want explained simply…",
    Icon: LightbulbIcon,
  },
];

export default function ModeSwitcher({
  mode,
  onChange,
  disabled,
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
  disabled?: boolean;
}) {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = MODES.findIndex((m) => m.key === mode);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;

    if (!delta) return;

    e.preventDefault();

    const next = (activeIndex + delta + MODES.length) % MODES.length;

    onChange(MODES[next].key);
    tabsRef.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Study mode"
      onKeyDown={handleKeyDown}
      className="mode-panel relative grid grid-cols-2 gap-1 rounded-2xl border p-1.5 shadow-sm sm:grid-cols-4"
    >
      {/* Sliding active indicator: two columns on phones, four on larger screens. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1.5 top-1.5 h-[calc((100%-0.75rem)/2)] w-[calc((100%-0.75rem)/2)] rounded-xl bg-cream shadow-sm transition-transform duration-300 ease-out sm:hidden"
        style={{
          transform: `translate(${activeIndex % 2 ? "calc(100% + 0.25rem)" : "0"}, ${
            activeIndex > 1 ? "calc(100% + 0.25rem)" : "0"
          })`,
        }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1.5 left-1.5 hidden w-[calc((100%-0.75rem)/4)] rounded-xl bg-cream shadow-sm transition-transform duration-300 ease-out sm:block"
        style={{
          transform: `translateX(${activeIndex ? `calc(${activeIndex * 100}% + ${activeIndex * 0.25}rem)` : "0"})`,
        }}
      />

      {MODES.map(({ key, label, compact, Icon }, i) => {
        const selected = key === mode;

        return (
          <button
            key={key}
            ref={(el) => {
              tabsRef.current[i] = el;
            }}
            role="tab"
            type="button"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            disabled={disabled}
            onClick={() => onChange(key)}
            className={`relative z-10 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-300 disabled:cursor-not-allowed ${
              selected
                ? "text-primary-dark"
                : "text-cream hover:bg-cream/10 hover:text-cream"
            }`}
          >
            <Icon
              className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                selected ? "scale-110" : ""
              }`}
            />

            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{compact}</span>
          </button>
        );
      })}
    </div>
  );
}
