"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, CheckCircle2, XCircle } from "lucide-react";
import type { FeedCard } from "@/types";

interface SpeedCardProps {
  card: FeedCard;
  onCorrect: () => void;
  onWrong: () => void;
}

export function SpeedCard({ card, onCorrect, onWrong }: SpeedCardProps) {
  const timeLimit = card.timeLimit ?? 10;
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [selected, setSelected] = useState<string | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isOver = !!selected || timedOut;

  useEffect(() => {
    if (isOver) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current!);
          setTimedOut(true);
          onWrong();
          setTimeout(() => setShowExplanation(true), 400);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [isOver, onWrong]);

  const handleSelect = (id: string) => {
    if (isOver) return;
    clearInterval(intervalRef.current!);
    setSelected(id);
    const isCorrect = card.options?.find((o) => o.id === id)?.isCorrect;
    if (isCorrect) onCorrect();
    else onWrong();
    setTimeout(() => setShowExplanation(true), 500);
  };

  const progress = (timeLeft / timeLimit) * 100;
  const isUrgent = timeLeft <= 3;

  const getTimerColor = () => {
    if (timeLeft > timeLimit * 0.6) return "#10b981";
    if (timeLeft > timeLimit * 0.3) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Timer bar */}
      <div className="flex items-center gap-3">
        <Timer
          size={16}
          style={{ color: getTimerColor() }}
          className={isUrgent && !isOver ? "animate-pulse" : ""}
        />
        <div className="flex-1 h-2 rounded-full bg-velora-border overflow-hidden">
          <motion.div
            className="h-full rounded-full transition-colors"
            style={{ backgroundColor: getTimerColor() }}
            animate={{ width: `${isOver ? (selected ? progress : 0) : progress}%` }}
            transition={{ duration: 0.9, ease: "linear" }}
          />
        </div>
        <motion.span
          className="text-sm font-bold tabular-nums w-6 text-right"
          style={{ color: getTimerColor() }}
          animate={isUrgent && !isOver ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          {timeLeft}
        </motion.span>
      </div>

      {/* Speed badge */}
      <div className="flex items-center gap-2">
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-bold"
          style={{
            background: "linear-gradient(135deg, #f59e0b22, #ef444422)",
            border: "1px solid #f59e0b44",
            color: "#f59e0b",
          }}
        >
          ⚡ Speed Round
        </span>
      </div>

      <h2
        className="text-xl font-bold leading-snug text-velora-text"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        {card.question}
      </h2>

      {timedOut && !selected && (
        <motion.div
          className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ⏱ Time&apos;s up!
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-2.5">
        {card.options?.map((option, i) => {
          const isThisSelected = selected === option.id;
          const isCorrect = option.isCorrect;

          let style = "border-velora-border bg-velora-dark text-velora-text hover:border-velora-warning/50";
          if (isOver) {
            if (isCorrect)
              style = "border-emerald-500 bg-emerald-500/10 text-emerald-400";
            else if (isThisSelected)
              style = "border-red-500 bg-red-500/10 text-red-400";
            else style = "border-velora-border bg-velora-dark opacity-30 text-velora-muted";
          }

          return (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`relative flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm font-medium transition-all ${style}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileTap={!isOver ? { scale: 0.95 } : {}}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                {option.id.toUpperCase()}
              </span>
              <span className="flex-1 text-xs leading-tight">{option.text}</span>
              {isOver && isCorrect && (
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              )}
              {isOver && isThisSelected && !isCorrect && (
                <XCircle size={14} className="text-red-400 shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            className="rounded-xl border border-velora-border bg-velora-dark/60 p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-velora-warning mb-1.5">
              Explanation
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
