"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FeedCard } from "@/types";

interface MatchingCardProps {
  card: FeedCard;
  onCorrect: () => void;
  onWrong: () => void;
}

type MatchState = "idle" | "correct" | "wrong";

interface PairState {
  term: string;
  definition: string;
  state: MatchState;
}

export function MatchingCard({ card, onCorrect, onWrong }: MatchingCardProps) {
  const pairs = card.pairs ?? [];

  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDef, setSelectedDef] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ term: string; def: string } | null>(null);
  const [done, setDone] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Shuffle definitions once
  const [shuffledDefs] = useState(() =>
    [...pairs.map((p) => p.definition)].sort(() => Math.random() - 0.5)
  );

  const handleTermClick = useCallback(
    (term: string) => {
      if (matched.has(term) || done) return;
      setSelectedTerm(term);
      setWrongPair(null);
    },
    [matched, done]
  );

  const handleDefClick = useCallback(
    (def: string) => {
      if (!selectedTerm || done) return;
      const matchedPair = matched;

      const correctDef = pairs.find((p) => p.term === selectedTerm)?.definition;

      if (def === correctDef) {
        const newMatched = new Set([...matchedPair, selectedTerm]);
        setMatched(newMatched);
        setSelectedTerm(null);
        setSelectedDef(null);
        onCorrect();

        if (newMatched.size === pairs.length) {
          setDone(true);
          setTimeout(() => setShowExplanation(true), 400);
        }
      } else {
        setWrongPair({ term: selectedTerm, def });
        onWrong();
        setTimeout(() => {
          setWrongPair(null);
          setSelectedTerm(null);
          setSelectedDef(null);
        }, 700);
      }
    },
    [selectedTerm, matched, pairs, done, onCorrect, onWrong]
  );

  const getTermStyle = (term: string) => {
    if (matched.has(term)) return "border-emerald-500 bg-emerald-500/10 text-emerald-400 opacity-70";
    if (selectedTerm === term) return "border-velora-purple bg-velora-purple/15 text-velora-purple-light";
    if (wrongPair?.term === term) return "border-red-500 bg-red-500/10 text-red-400";
    return "border-velora-border bg-velora-dark text-velora-text hover:border-velora-purple/50";
  };

  const getDefStyle = (def: string) => {
    const matchedTerm = [...matched].find(
      (t) => pairs.find((p) => p.term === t)?.definition === def
    );
    if (matchedTerm) return "border-emerald-500 bg-emerald-500/10 text-emerald-400 opacity-70";
    if (wrongPair?.def === def) return "border-red-500 bg-red-500/10 text-red-400";
    if (!selectedTerm) return "border-velora-border bg-velora-dark text-velora-muted";
    return "border-velora-border bg-velora-dark text-velora-text hover:border-cyan-500/50 cursor-pointer";
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2
        className="text-xl font-bold text-velora-text"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        {card.question}
      </h2>

      <p className="text-xs text-velora-muted">
        Tap a term, then tap its match — {matched.size}/{pairs.length} matched
      </p>

      <div className="grid grid-cols-2 gap-2">
        {/* Terms column */}
        <div className="flex flex-col gap-2">
          {pairs.map((p) => (
            <motion.button
              key={p.term}
              onClick={() => handleTermClick(p.term)}
              className={`rounded-xl border px-3 py-3 text-left text-xs font-semibold transition-all ${getTermStyle(p.term)}`}
              whileTap={!matched.has(p.term) ? { scale: 0.96 } : {}}
              animate={wrongPair?.term === p.term ? { x: [-4, 4, -4, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              {p.term}
            </motion.button>
          ))}
        </div>

        {/* Definitions column */}
        <div className="flex flex-col gap-2">
          {shuffledDefs.map((def) => (
            <motion.button
              key={def}
              onClick={() => handleDefClick(def)}
              className={`rounded-xl border px-3 py-3 text-left text-xs transition-all ${getDefStyle(def)}`}
              whileTap={selectedTerm ? { scale: 0.96 } : {}}
              animate={wrongPair?.def === def ? { x: [-4, 4, -4, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              {def}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs font-bold text-emerald-400 mb-1">
              🎉 Perfect match!
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
