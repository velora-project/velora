"use client";
import { useState, useCallback } from "react";
import type { FeedCard } from "@/types";
import { buildInfiniteFeed } from "@/lib/cardGenerator";

export function useFeed(initialCards: FeedCard[] = []) {
  const [cards, setCards] = useState<FeedCard[]>(() =>
    buildInfiniteFeed(initialCards)
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, cards.length - 1));
  }, [cards.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const prependCards = useCallback((newCards: FeedCard[]) => {
    setCards((prev) => [...newCards, ...prev]);
    setCurrentIndex(0);
  }, []);

  return { cards, currentIndex, goNext, goPrev, prependCards };
}
