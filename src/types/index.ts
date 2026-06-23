export type CardType =
  | "quiz"
  | "truefalse"
  | "matching"
  | "speed"
  | "flashcard"
  | "story";

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface FeedCard {
  id: string;
  type: CardType;
  subject: string;
  subjectColor: string;
  topic: string;
  question: string;
  explanation: string;
  xpReward: number;
  // Quiz / TrueFalse
  options?: QuizOption[];
  // Matching
  pairs?: { term: string; definition: string }[];
  // Speed
  timeLimit?: number;
  // Flashcard
  front?: string;
  back?: string;
  // Story
  narrative?: string;
}

export interface UserState {
  xp: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  completedCards: string[];
  subjectProgress: Record<string, { xp: number; level: number }>;
}

export interface ImportedContent {
  id: string;
  title: string;
  rawText: string;
  type: "text" | "url" | "file";
  timestamp: number;
}
