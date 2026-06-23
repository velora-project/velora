"use client";
import { motion } from "framer-motion";
import type { XPEvent } from "@/hooks/useXP";

interface XPPopupLayerProps {
  events: XPEvent[];
}

export function XPPopupLayer({ events }: XPPopupLayerProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {events.map((e) => (
        <motion.div
          key={e.id}
          className="absolute flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold"
          style={{
            left: e.x - 40,
            top: e.y - 20,
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.9), rgba(6,182,212,0.9))",
            boxShadow: "0 0 16px rgba(124,58,237,0.5)",
            fontFamily: "Space Grotesk, sans-serif",
          }}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -64, scale: 1.15 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <span>⚡</span>
          <span>+{e.amount} XP</span>
        </motion.div>
      ))}
    </div>
  );
}
