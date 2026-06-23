"use client";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0–100
  className?: string;
}

export function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  return (
    <div
      className={`relative h-1.5 w-full overflow-hidden rounded-full bg-velora-border ${className}`}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          background: "linear-gradient(90deg, #7c3aed, #2563eb, #06b6d4)",
          boxShadow: "0 0 8px rgba(124,58,237,0.5)",
        }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(progress, 100)}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
