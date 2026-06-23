"use client";
import { useCallback, useEffect } from "react";
import { getUser, saveUser } from "@/lib/storage";

export function useStreak() {
  const checkAndUpdateStreak = useCallback(() => {
    const user = getUser();
    const today = new Date().toISOString().split("T")[0];

    if (user.lastActiveDate === today) return user.streak;

    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split("T")[0];

    const newStreak =
      user.lastActiveDate === yesterday ? user.streak + 1 : 1;

    const updated = {
      ...user,
      streak: newStreak,
      lastActiveDate: today,
    };

    saveUser(updated);
    return newStreak;
  }, []);

  useEffect(() => {
    checkAndUpdateStreak();
  }, [checkAndUpdateStreak]);

  return { checkAndUpdateStreak };
}
