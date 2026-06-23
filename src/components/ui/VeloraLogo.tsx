"use client";
import { motion } from "framer-motion";

interface VeloraLogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export function VeloraLogo({
  size = 32,
  animated = true,
  className = "",
}: VeloraLogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      animate={animated ? { rotate: [0, 2, -2, 0] } : undefined}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="vGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <filter id="vGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Outer rounded square bg */}
      <rect width="40" height="40" rx="10" fill="url(#vGrad)" opacity="0.15" />
      {/* V shape — left arm */}
      <motion.path
        d="M8 10 L20 32"
        stroke="url(#vGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#vGlow)"
        initial={{ pathLength: 0 }}
        animate={animated ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      {/* V shape — right arm */}
      <motion.path
        d="M32 10 L20 32"
        stroke="url(#vGrad)"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#vGlow)"
        initial={{ pathLength: 0 }}
        animate={animated ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      />
      {/* Accent dot at tip */}
      <motion.circle
        cx="20"
        cy="32"
        r="2"
        fill="#06b6d4"
        filter="url(#vGlow)"
        initial={{ scale: 0 }}
        animate={animated ? { scale: [0, 1.4, 1] } : undefined}
        transition={{ duration: 0.4, delay: 0.6 }}
      />
    </motion.svg>
  );
}
