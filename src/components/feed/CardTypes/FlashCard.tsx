"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import type { FeedCard } from "@/types";

interface FlashCardProps {
  card: FeedCard;
  onCorrect: () => void;
  onWrong: () => void;
}

export function FlashCard({ card, onCorrect, onWrong }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [answered, setAnswered] = useState(false);

  const front = card.front ?? card.question;
  const back = card.back ?? card.explanation;

  const handleFlip = () => {
    if (!isFlipped) setIsFlipped(true);
  };

  const handleKnew = () => {
    setAnswered(true);
    onCorrect();
  };

  const handleDidntKnow = () => {
    setAnswered(true);
    onWrong();
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Flashcard badge */}
      <div className="flex items-center gap-2">
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-bold"
          style={{
            background: "rgba(168,85,247,0.1)",
            border: "1px solid rgba(168,85,247,0.3)",
            color: "#a855f7",
          }}
        >
          🃏 Flashcard
        </span>
        {!isFlipped && (
          <span className="text-xs text-velora-muted">Tap to reveal</span>
        )}
      </div>

      {/* 3D Flip card */}
      <div
        className="relative cursor-pointer"
        style={{ perspective: "1000px", height: "200px" }}
        onClick={handleFlip}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-velora-border p-6 text-center"
            style={{
              backfaceVisibility: "hidden",
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(13,13,26,1))",
            }}
          >
            <span className="text-3xl mb-3">💭</span>
            <p
              className="text-lg font-bold text-velora-text"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {front}
            </p>
            {!isFlipped && (
              <p className="mt-3 text-xs text-velora-muted">tap to flip</p>
            )}
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-velora-purple/40 p-6 text-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(6,182,212,0.06))",
            }}
          >
            <p
              className="text-base font-semibold text-velora-text leading-relaxed"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {back}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Self-assessment buttons (shown after flip) */}
      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: isFlipped && !answered ? 1 : 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={handleDidntKnow}
          disabled={answered || !isFlipped}
          className="flex-1 rounded-xl border border-red-500/30 bg-red-500/5 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-0"
          whileTap={{ scale: 0.97 }}
        >
          😕 Didn&apos;t know
        </motion.button>
        <motion.button
          onClick={handleKnew}
          disabled={answered || !isFlipped}
          className="flex-1 rounded-xl border border-emerald-500/30 bg-emerald-500/5 py-3 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/10 transition-colors disabled:opacity-0"
          whileTap={{ scale: 0.97 }}
        >
          🎯 Got it!
        </motion.button>
      </motion.div>

      {answered && (
        <motion.p
          className="text-center text-xs text-velora-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Swipe up for the next card
        </motion.p>
      )}
    </div>
  );
}
