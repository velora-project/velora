"use client";
import { motion } from "framer-motion";

interface LevelBadgeProps {
  level: number;
  xp: number;
  xpProgress: number;
}

export function LevelBadge({ level, xp, xpProgress }: LevelBadgeProps) {
  return (
    <motion.div
      className="flex items-center gap-2"
      whileHover={{ scale: 1.03 }}
    >
      <div
        className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
          boxShadow: "0 0 10px rgba(124,58,237,0.4)",
          fontFamily: "Space Grotesk, sans-serif",
        }}
      >
        {level}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs text-velora-muted leading-none">{xp} XP</span>
        <div className="h-1 w-16 overflow-hidden rounded-full bg-velora-border">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
            }}
            animate={{ width: `${xpProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
