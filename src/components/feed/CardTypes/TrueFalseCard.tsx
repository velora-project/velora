"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import type { FeedCard } from "@/types";

interface TrueFalseCardProps {
  card: FeedCard;
  onCorrect: () => void;
  onWrong: () => void;
}

export function TrueFalseCard({ card, onCorrect, onWrong }: TrueFalseCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (val: string) => {
    if (selected) return;
    setSelected(val);
    const correct = card.options?.find((o) => o.id === val)?.isCorrect;
    if (correct) onCorrect();
    else onWrong();
    setTimeout(() => setShowExplanation(true), 500);
  };

  const correctAnswer = card.options?.find((o) => o.isCorrect)?.id;

  const getStyle = (val: string) => {
    if (!selected) {
      return val === "true"
        ? "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10"
        : "border-red-500/30 bg-red-500/5 hover:bg-red-500/10";
    }
    const isCorrectChoice = correctAnswer === val;
    const isThisSelected = selected === val;

    if (isCorrectChoice) {
      return "border-emerald-500 bg-emerald-500/15";
    }
    if (isThisSelected && !isCorrectChoice) {
      return "border-red-500 bg-red-500/15";
    }
    return "border-velora-border bg-velora-dark opacity-30";
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <h2
        className="text-xl font-bold leading-snug text-velora-text"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        {card.question}
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {/* True */}
        <motion.button
          onClick={() => handleSelect("true")}
          className={`flex flex-col items-center justify-center gap-3 rounded-2xl border py-8 transition-all ${getStyle("true")}`}
          whileTap={!selected ? { scale: 0.96 } : {}}
        >
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20"
            animate={
              selected === "true"
                ? { scale: [1, 1.3, 1] }
                : {}
            }
          >
            <Check size={24} className="text-emerald-400" />
          </motion.div>
          <span className="text-base font-bold text-emerald-400">True</span>
        </motion.button>

        {/* False */}
        <motion.button
          onClick={() => handleSelect("false")}
          className={`flex flex-col items-center justify-center gap-3 rounded-2xl border py-8 transition-all ${getStyle("false")}`}
          whileTap={!selected ? { scale: 0.96 } : {}}
        >
          <motion.div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20"
            animate={
              selected === "false"
                ? { scale: [1, 1.3, 1] }
                : {}
            }
          >
            <X size={24} className="text-red-400" />
          </motion.div>
          <span className="text-base font-bold text-red-400">False</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            className="rounded-xl border border-velora-border bg-velora-dark/60 p-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-velora-cyan mb-1.5">
              The answer is {correctAnswer === "true" ? "True ✓" : "False ✗"}
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
