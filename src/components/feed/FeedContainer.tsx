"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FeedCard } from "./FeedCard";
import type { FeedCard as FeedCardType } from "@/types";

interface FeedContainerProps {
  cards: FeedCardType[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onCorrect: (xp: number, subject: string, pos: { x: number; y: number }) => void;
  onWrong: () => void;
}

export function FeedContainer({
  cards,
  currentIndex,
  onNext,
  onPrev,
  onCorrect,
  onWrong,
}: FeedContainerProps) {
  const touchStartY = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const isDragging = useRef(false);
  const lastScrollTime = useRef(0);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 500) return;
      lastScrollTime.current = now;

      if (e.deltaY > 30) onNext();
      else if (e.deltaY < -30) onPrev();
    },
    [onNext, onPrev]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      const deltaX = Math.abs(touchStartX.current - e.changedTouches[0].clientX);

      // Only register vertical swipe if horizontal movement is small
      if (deltaX > 40) return;

      if (deltaY > 50) onNext();
      else if (deltaY < -50) onPrev();
    },
    [onNext, onPrev]
  );

  useEffect(() => {
    const el = document.getElementById("feed-root");
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchEnd]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        onNext();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        onPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onNext, onPrev]);

  const card = cards[currentIndex];
  if (!card) return null;

  return (
    <div
      id="feed-root"
      className="relative h-full w-full overflow-hidden"
      style={{ touchAction: "none" }}
    >
      {/* Background gradient that shifts per card */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        animate={{
          background: `radial-gradient(ellipse at 60% 0%, ${card.subjectColor}18 0%, transparent 60%)`,
        }}
        transition={{ duration: 0.8 }}
      />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={card.id}
          className="absolute inset-0 z-10"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            y: { type: "spring", damping: 32, stiffness: 280 },
            opacity: { duration: 0.2 },
          }}
        >
          <FeedCard
            card={card}
            isActive
            onCorrect={(xp, pos) => onCorrect(xp, card.subject, pos)}
            onWrong={onWrong}
          />
        </motion.div>
      </AnimatePresence>

      {/* Card counter */}
      <div className="pointer-events-none absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-1">
        {cards.slice(
          Math.max(0, currentIndex - 2),
          Math.min(cards.length, currentIndex + 5)
        ).map((_, relIdx) => {
          const absIdx = Math.max(0, currentIndex - 2) + relIdx;
          const isActive = absIdx === currentIndex;
          return (
            <motion.div
              key={absIdx}
              className="rounded-full"
              style={{ backgroundColor: card.subjectColor }}
              animate={{
                width: isActive ? 3 : 2,
                height: isActive ? 20 : 6,
                opacity: isActive ? 1 : 0.3,
              }}
              transition={{ duration: 0.25 }}
            />
          );
        })}
      </div>
    </div>
  );
}
