"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronDown } from "lucide-react";
import type { FeedCard } from "@/types";

interface QuizCardProps {
  card: FeedCard;
  onCorrect: () => void;
  onWrong: () => void;
}

export function QuizCard({ card, onCorrect, onWrong }: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (optionId: string) => {
    if (selected) return;
    setSelected(optionId);
    const isCorrect = card.options?.find((o) => o.id === optionId)?.isCorrect;
    if (isCorrect) {
      onCorrect();
    } else {
      onWrong();
    }
    setTimeout(() => setShowExplanation(true), 600);
  };

  const getOptionStyle = (optionId: string) => {
    if (!selected) {
      return {
        bg: "bg-velora-dark border-velora-border hover:border-velora-purple/50",
        text: "text-velora-text",
      };
    }
    const isThis = selected === optionId;
    const isCorrect = card.options?.find((o) => o.id === optionId)?.isCorrect;

    if (isCorrect) {
      return {
        bg: "bg-emerald-500/10 border-emerald-500",
        text: "text-emerald-400",
      };
    }
    if (isThis && !isCorrect) {
      return {
        bg: "bg-red-500/10 border-red-500",
        text: "text-red-400",
      };
    }
    return {
      bg: "bg-velora-dark border-velora-border opacity-40",
      text: "text-velora-muted",
    };
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Question */}
      <h2
        className="text-xl font-bold leading-snug text-velora-text"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        {card.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-2.5">
        {card.options?.map((option, i) => {
          const { bg, text } = getOptionStyle(option.id);
          const isCorrect = option.isCorrect;
          const isSelected = selected === option.id;

          return (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`relative flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-medium transition-all ${bg} ${text}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={!selected ? { scale: 0.98 } : {}}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold"
                style={{
                  borderColor: "currentColor",
                  opacity: selected && !isSelected && !isCorrect ? 0.4 : 1,
                }}
              >
                {option.id.toUpperCase()}
              </span>
              <span className="flex-1">{option.text}</span>
              {selected && isCorrect && (
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              )}
              {isSelected && !isCorrect && (
                <XCircle size={18} className="text-red-400 shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            className="rounded-xl border border-velora-border bg-velora-dark/60 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-velora-purple-light mb-1.5">
              Why?
            </p>
            <p className="text-sm text-velora-text leading-relaxed">
              {card.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
