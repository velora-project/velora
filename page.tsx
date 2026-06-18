"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { FeedContainer } from "@/components/feed/FeedContainer";
import { ImportModal } from "@/components/import/ImportModal";
import { XPPopupLayer } from "@/components/ui/XPPopup";
import { useXP } from "@/hooks/useXP";
import { useFeed } from "@/hooks/useFeed";
import { useStreak } from "@/hooks/useStreak";
import type { FeedCard } from "@/types";

export default function Home() {
  const { user, addXP, markCardComplete, xpEvents, xpProgress } = useXP();
  const { cards, currentIndex, goNext, goPrev, prependCards } = useFeed();
  const [importOpen, setImportOpen] = useState(false);
  const [levelUpShow, setLevelUpShow] = useState(false);
  const [lastLevel, setLastLevel] = useState(user.level);
  useStreak();

  const handleCorrect = useCallback(
    (xp: number, subject: string, pos: { x: number; y: number }) => {
      const prevLevel = user.level;
      addXP(xp, subject, pos);
      // Check level up after a small delay (state update needed)
      setTimeout(() => {
        const newLevel = Math.floor((user.xp + xp) / 100) + 1;
        if (newLevel > prevLevel) {
          setLevelUpShow(true);
          setTimeout(() => setLevelUpShow(false), 2500);
        }
      }, 100);

      const card = cards[currentIndex];
      if (card) markCardComplete(card.id);

      // Auto-advance after a short delay to give time to read explanation
      setTimeout(() => goNext(), 2200);
    },
    [user, addXP, cards, currentIndex, markCardComplete, goNext]
  );

  const handleWrong = useCallback(() => {
    const card = cards[currentIndex];
    if (card) markCardComplete(card.id);
    setTimeout(() => goNext(), 2200);
  }, [cards, currentIndex, markCardComplete, goNext]);

  const handleCardsGenerated = useCallback(
    (newCards: FeedCard[]) => {
      prependCards(newCards);
    },
    [prependCards]
  );

  return (
    <main className="relative h-screen w-full overflow-hidden bg-velora-black">
      {/* Navbar */}
      <Navbar
        user={user}
        xpProgress={xpProgress}
        onOpenImport={() => setImportOpen(true)}
      />

      {/* Feed */}
      <FeedContainer
        cards={cards}
        currentIndex={currentIndex}
        onNext={goNext}
        onPrev={goPrev}
        onCorrect={handleCorrect}
        onWrong={handleWrong}
      />

      {/* Floating XP popups */}
      <XPPopupLayer events={xpEvents} />

      {/* Level up toast */}
      <AnimatePresence>
        {levelUpShow && (
          <motion.div
            className="pointer-events-none fixed inset-x-0 top-24 z-50 flex justify-center"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div
              className="flex items-center gap-3 rounded-2xl px-5 py-3"
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.95), rgba(6,182,212,0.95))",
                boxShadow: "0 0 40px rgba(124,58,237,0.4)",
              }}
            >
              <span className="text-2xl">🎉</span>
              <div>
                <p className="text-xs text-white/70">Congratulations!</p>
                <p
                  className="text-sm font-bold text-white"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Level {user.level} reached!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Import modal */}
      <ImportModal
        isOpen={importOpen}
        onClose={() => setImportOpen(false)}
        onCardsGenerated={handleCardsGenerated}
      />
    </main>
  );
}
