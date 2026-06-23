"use client";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { VeloraLogo } from "@/components/ui/VeloraLogo";
import { LevelBadge } from "@/components/ui/LevelBadge";
import { StreakBadge } from "@/components/ui/StreakBadge";
import type { UserState } from "@/types";

interface NavbarProps {
  user: UserState;
  xpProgress: number;
  onOpenImport: () => void;
}

export function Navbar({ user, xpProgress, onOpenImport }: NavbarProps) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3"
      style={{
        background:
          "linear-gradient(180deg, rgba(8,8,16,0.95) 0%, rgba(8,8,16,0) 100%)",
        backdropFilter: "blur(8px)",
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Logo + brand */}
      <div className="flex items-center gap-2.5">
        <VeloraLogo size={34} animated />
        <span
          className="text-lg font-bold tracking-tight"
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            background: "linear-gradient(135deg, #a855f7, #06b6d4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Velora
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3">
        <StreakBadge streak={user.streak} />
        <LevelBadge
          level={user.level}
          xp={user.xp}
          xpProgress={xpProgress}
        />
        <motion.button
          onClick={onOpenImport}
          className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #2563eb)",
            boxShadow: "0 0 12px rgba(124,58,237,0.35)",
          }}
          whileHover={{ scale: 1.06, boxShadow: "0 0 20px rgba(124,58,237,0.5)" }}
          whileTap={{ scale: 0.96 }}
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Import</span>
        </motion.button>
      </div>
    </motion.header>
  );
}
