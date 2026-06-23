import type { FeedCard } from "@/types";

export const SEED_CARDS: FeedCard[] = [
  {
    id: "seed_001",
    type: "quiz",
    subject: "Physics",
    subjectColor: "#8b5cf6",
    topic: "Relativity",
    question: "What does E=mc² describe?",
    explanation:
      "Mass-energy equivalence: a tiny amount of mass converts to an enormous amount of energy, as c² is a huge number (speed of light squared).",
    xpReward: 10,
    options: [
      { id: "a", text: "Speed of sound in vacuum", isCorrect: false },
      { id: "b", text: "Mass-energy equivalence", isCorrect: true },
      { id: "c", text: "Gravitational pull formula", isCorrect: false },
      { id: "d", text: "Electron charge formula", isCorrect: false },
    ],
  },
  {
    id: "seed_002",
    type: "truefalse",
    subject: "Biology",
    subjectColor: "#14b8a6",
    topic: "DNA",
    question: "DNA is a double helix made of two strands.",
    explanation:
      "Correct! Watson and Crick confirmed in 1953 that DNA consists of two complementary strands wound around each other in a double helix.",
    xpReward: 10,
    options: [
      { id: "true", text: "True", isCorrect: true },
      { id: "false", text: "False", isCorrect: false },
    ],
  },
  {
    id: "seed_003",
    type: "matching",
    subject: "History",
    subjectColor: "#f59e0b",
    topic: "Ancient Civilizations",
    question: "Match each civilization to its iconic structure.",
    explanation:
      "Each great civilization left a monumental architectural legacy reflecting their culture, beliefs, and engineering mastery.",
    xpReward: 20,
    pairs: [
      { term: "Egypt", definition: "Pyramids of Giza" },
      { term: "Greece", definition: "Parthenon" },
      { term: "Rome", definition: "Colosseum" },
      { term: "China", definition: "Great Wall" },
    ],
  },
  {
    id: "seed_004",
    type: "speed",
    subject: "Mathematics",
    subjectColor: "#7c3aed",
    topic: "Mental Math",
    question: "What is 17 × 8?",
    explanation:
      "17 × 8 = 136. Trick: (20 × 8) − (3 × 8) = 160 − 24 = 136. Breaking numbers apart makes mental math faster.",
    xpReward: 15,
    timeLimit: 10,
    options: [
      { id: "a", text: "126", isCorrect: false },
      { id: "b", text: "136", isCorrect: true },
      { id: "c", text: "144", isCorrect: false },
      { id: "d", text: "152", isCorrect: false },
    ],
  },
  {
    id: "seed_005",
    type: "flashcard",
    subject: "Technology",
    subjectColor: "#2563eb",
    topic: "Machine Learning",
    question: "What is overfitting in ML?",
    explanation:
      "Overfitting means the model memorized training data but fails on new data — like a student memorizing answers without understanding the concepts.",
    xpReward: 10,
    front: "What is overfitting?",
    back: "When a model learns training data too well — including noise — and performs poorly on unseen data. It memorizes instead of generalizes.",
  },
  {
    id: "seed_006",
    type: "quiz",
    subject: "Philosophy",
    subjectColor: "#ec4899",
    topic: "Epistemology",
    question: "Who famously said 'I think, therefore I am'?",
    explanation:
      'René Descartes used "Cogito, ergo sum" as an indubitable foundation for knowledge — even if everything else is uncertain, the act of thinking proves existence.',
    xpReward: 10,
    options: [
      { id: "a", text: "Socrates", isCorrect: false },
      { id: "b", text: "Kant", isCorrect: false },
      { id: "c", text: "Descartes", isCorrect: true },
      { id: "d", text: "Nietzsche", isCorrect: false },
    ],
  },
  {
    id: "seed_007",
    type: "truefalse",
    subject: "Science",
    subjectColor: "#06b6d4",
    topic: "Space",
    question: "Light from the Sun takes about 8 minutes to reach Earth.",
    explanation:
      "True. The Sun is ~150 million km away. Light travels at ~300,000 km/s, so it takes ~8 minutes and 20 seconds to arrive.",
    xpReward: 10,
    options: [
      { id: "true", text: "True", isCorrect: true },
      { id: "false", text: "False", isCorrect: false },
    ],
  },
  {
    id: "seed_008",
    type: "speed",
    subject: "Chemistry",
    subjectColor: "#ef4444",
    topic: "Periodic Table",
    question: "What is the chemical symbol for Gold?",
    explanation:
      'Gold\'s symbol Au comes from "Aurum," the Latin word for gold. Many element symbols derive from their Latin names.',
    xpReward: 15,
    timeLimit: 8,
    options: [
      { id: "a", text: "Go", isCorrect: false },
      { id: "b", text: "Gd", isCorrect: false },
      { id: "c", text: "Au", isCorrect: true },
      { id: "d", text: "Ag", isCorrect: false },
    ],
  },
  {
    id: "seed_009",
    type: "matching",
    subject: "Technology",
    subjectColor: "#2563eb",
    topic: "Programming Languages",
    question: "Match each language to its primary use case.",
    explanation:
      "Different programming languages were designed for different tasks. Knowing each language's strength helps you pick the right tool.",
    xpReward: 20,
    pairs: [
      { term: "Python", definition: "Data Science & AI" },
      { term: "Swift", definition: "iOS Development" },
      { term: "Rust", definition: "Systems Programming" },
      { term: "SQL", definition: "Database Queries" },
    ],
  },
  {
    id: "seed_010",
    type: "quiz",
    subject: "Economics",
    subjectColor: "#f97316",
    topic: "Supply & Demand",
    question: "When supply falls and demand stays constant, price tends to…",
    explanation:
      "Scarcity drives price up. Less supply means each unit becomes more valuable to buyers competing for it — a core principle of market economics.",
    xpReward: 10,
    options: [
      { id: "a", text: "Fall", isCorrect: false },
      { id: "b", text: "Stay the same", isCorrect: false },
      { id: "c", text: "Rise", isCorrect: true },
      { id: "d", text: "Become unpredictable", isCorrect: false },
    ],
  },
  {
    id: "seed_011",
    type: "flashcard",
    subject: "Biology",
    subjectColor: "#14b8a6",
    topic: "Cells",
    question: "What is mitosis?",
    explanation:
      "Mitosis is how your body grows, repairs tissue, and replaces old cells — producing two identical daughters from one parent cell.",
    xpReward: 10,
    front: "What is mitosis?",
    back: "Mitosis is cell division that produces two genetically identical daughter cells. It's used for growth and tissue repair (not reproduction).",
  },
  {
    id: "seed_012",
    type: "quiz",
    subject: "Literature",
    subjectColor: "#10b981",
    topic: "Shakespeare",
    question: "Which play features the line 'To be or not to be'?",
    explanation:
      "Hamlet, Act 3, Scene 1. Prince Hamlet contemplates existence and death — arguably the most famous soliloquy in Western literature.",
    xpReward: 10,
    options: [
      { id: "a", text: "Macbeth", isCorrect: false },
      { id: "b", text: "Othello", isCorrect: false },
      { id: "c", text: "King Lear", isCorrect: false },
      { id: "d", text: "Hamlet", isCorrect: true },
    ],
  },
];

export function buildInfiniteFeed(aiCards: FeedCard[] = []): FeedCard[] {
  const combined = [...aiCards, ...SEED_CARDS];
  // Shuffle to mix AI-generated and seed content
  const shuffled = combined.sort(() => Math.random() - 0.5);
  // Create a 3x longer feed by repeating with new IDs
  const extended = [
    ...shuffled,
    ...shuffled.map((c) => ({ ...c, id: `r1_${c.id}` })),
    ...shuffled.map((c) => ({ ...c, id: `r2_${c.id}` })),
  ];
  return extended;
}
