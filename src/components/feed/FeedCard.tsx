"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { QuizCard } from "./CardTypes/QuizCard";
import { TrueFalseCard } from "./CardTypes/TrueFalseCard";
import { MatchingCard } from "./CardTypes/MatchingCard";
import { SpeedCard } from "./CardTypes/SpeedCard";
import { FlashCard } from "./CardTypes/FlashCard";
import type { FeedCard as FeedCardType } from "@/types";

interface FeedCardProps {
  card: FeedCardType;
  isActive: boolean;
  onCorrect: (xp: number, position: { x: number; y: number }) => void;
  onWrong: () => void;
}

const TYPE_LABELS: Record<string, string> = {
  quiz: "🎯 Quiz",
  truefalse: "⚖️ True or False",
  matching: "🔗 Match It",
  speed: "⚡ Speed Round",
  flashcard: "🃏 Flashcard",
  story: "📖 Story Mode",
};

export function FeedCard({ card, isActive, onCorrect, onWrong }: FeedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCorrect = () => {
    const rect = cardRef.current?.getBoundingClientRect();
    const pos = rect
      ? { x: rect.left + rect.width / 2, y: rect.top + 80 }
      : { x: window.innerWidth / 2, y: 200 };
    onCorrect(card.xpReward, pos);
  };

  const renderCardContent = () => {
    const props = { card, onCorrect: handleCorrect, onWrong };
    switch (card.type) {
      case "quiz":
        return <QuizCard {...props} />;
      case "truefalse":
        return <TrueFalseCard {...props} />;
      case "matching":
        return <MatchingCard {...props} />;
      case "speed":
        return <SpeedCard {...props} />;
      case "flashcard":
        return <FlashCard {...props} />;
      default:
        return <QuizCard {...props} />;
    }
  };

  return (
    <div
      ref={cardRef}
      className="flex h-full w-full flex-col justify-between px-4 py-6 pt-20"
    >
      <div
        className="relative flex w-full flex-col gap-5 overflow-hidden rounded-3xl p-5"
        style={{
          background: "rgba(13,13,26,0.9)",
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.5)",
          backdropFilter: "blur(16px)",
        }}
      >
        {/* Subtle glow orb behind card */}
        <div
          className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: card.subjectColor }}
        />

        {/* Subject pill + XP badge */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: card.subjectColor,
                boxShadow: `0 0 8px ${card.subjectColor}`,
              }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: card.subjectColor }}
            >
              {card.subject}
            </span>
            <span className="text-velora-border">·</span>
            <span className="text-xs text-velora-muted">{card.topic}</span>
          </div>

          {/* XP reward badge */}
          <div
            className="flex items-center gap-1 rounded-full px-2 py-0.5"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.25)",
            }}
          >
            <Zap size={10} className="text-velora-purple-light" />
            <span className="text-xs font-bold text-velora-purple-light">
              +{card.xpReward} XP
            </span>
          </div>
        </div>

        {/* Type label */}
        <div>
          <span
            className="text-xs font-medium text-velora-muted"
          >
            {TYPE_LABELS[card.type] ?? card.type}
          </span>
        </div>

        {/* Card content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          {renderCardContent()}
        </motion.div>
      </div>

      {/* Swipe hint at bottom */}
      <div className="flex justify-center pb-6 pt-3">
        <div className="flex flex-col items-center gap-1">
          <motion.div
            className="flex flex-col items-center gap-0.5"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="h-1 w-1 rounded-full bg-velora-muted opacity-60" />
            <div className="h-1 w-1 rounded-full bg-velora-muted opacity-40" />
            <div className="h-1 w-1 rounded-full bg-velora-muted opacity-20" />
          </motion.div>
          <span className="text-xs text-velora-muted opacity-60">swipe up</span>
        </div>
      </div>
    </div>
  );
}
