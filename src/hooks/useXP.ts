"use client";
import { useState, useCallback, useEffect } from "react";
import { getUser, saveUser } from "@/lib/storage";
import type { UserState } from "@/types";

export interface XPEvent {
  id: string;
  amount: number;
  x: number;
  y: number;
}

const XP_PER_LEVEL = 100;

export function useXP() {
  const [user, setUser] = useState<UserState>(() => getUser());
  const [xpEvents, setXpEvents] = useState<XPEvent[]>([]);

  useEffect(() => {
    saveUser(user);
  }, [user]);

  const addXP = useCallback(
    (amount: number, subject: string, position?: { x: number; y: number }) => {
      const eventId = `xp_${Date.now()}`;

      // Spawn floating XP popup
      setXpEvents((prev) => [
        ...prev,
        {
          id: eventId,
          amount,
          x: position?.x ?? window.innerWidth / 2,
          y: position?.y ?? window.innerHeight / 2,
        },
      ]);

      // Remove after animation
      setTimeout(() => {
        setXpEvents((prev) => prev.filter((e) => e.id !== eventId));
      }, 1200);

      setUser((prev) => {
        const newXP = prev.xp + amount;
        const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;

        const subjectData = prev.subjectProgress[subject] ?? {
          xp: 0,
          level: 1,
        };
        const newSubjectXP = subjectData.xp + amount;
        const newSubjectLevel = Math.floor(newSubjectXP / XP_PER_LEVEL) + 1;

        return {
          ...prev,
          xp: newXP,
          level: newLevel,
          subjectProgress: {
            ...prev.subjectProgress,
            [subject]: { xp: newSubjectXP, level: newSubjectLevel },
          },
        };
      });
    },
    []
  );

  const markCardComplete = useCallback((cardId: string) => {
    setUser((prev) => ({
      ...prev,
      completedCards: [...new Set([...prev.completedCards, cardId])],
    }));
  }, []);

  const xpInLevel = user.xp % XP_PER_LEVEL;
  const xpProgress = (xpInLevel / XP_PER_LEVEL) * 100;

  return { user, addXP, markCardComplete, xpEvents, xpProgress, XP_PER_LEVEL };
}
