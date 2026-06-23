"use client";
import { motion } from "framer-motion";

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  return (
    <motion.div
      className="flex items-center gap-1.5 rounded-full border border-velora-border bg-velora-card px-3 py-1"
      whileHover={{ scale: 1.05 }}
    >
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-sm"
      >
        🔥
      </motion.span>
      <span className="text-xs font-semibold text-velora-warning">
        {streak} day{streak !== 1 ? "s" : ""}
      </span>
    </motion.div>
  );
}
