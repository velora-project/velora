import type { FeedCard } from "@/types";
import { SEED_CARDS } from "./cardGenerator";

const SUBJECT_COLORS: Record<string, string> = {
  Science: "#06b6d4",
  Mathematics: "#7c3aed",
  History: "#f59e0b",
  Literature: "#10b981",
  Technology: "#2563eb",
  Philosophy: "#ec4899",
  Geography: "#84cc16",
  Economics: "#f97316",
  Biology: "#14b8a6",
  Physics: "#8b5cf6",
  Chemistry: "#ef4444",
  General: "#a855f7",
};

function colorForSubject(subject: string): string {
  return SUBJECT_COLORS[subject] ?? "#a855f7";
}

export async function generateCardsFromText(
  rawText: string,
  title: string
): Promise<FeedCard[]> {
  const systemPrompt = `You are Velora's AI learning engine. Given study material, you generate a diverse set of interactive learning cards for a TikTok-style educational feed.

You MUST return ONLY valid JSON — no markdown fences, no preamble, no trailing text.

Return an array of exactly 8 card objects. Each card must have this shape:
{
  "type": "quiz" | "truefalse" | "matching" | "speed" | "flashcard",
  "subject": string (infer the subject area),
  "topic": string (specific topic within the material),
  "question": string,
  "explanation": string (1-2 sentences explaining the answer),
  "xpReward": number (10, 15, or 20),
  "options": [{ "id": "a"|"b"|"c"|"d", "text": string, "isCorrect": boolean }] (for quiz/speed, exactly 4 options, exactly 1 correct),
  "pairs": [{ "term": string, "definition": string }] (for matching, exactly 4 pairs),
  "timeLimit": number (for speed cards only, in seconds: 8–15),
  "front": string (for flashcard only),
  "back": string (for flashcard only)
}

Rules:
- Use varied types across the 8 cards: at least 3 quiz, 1 truefalse, 1 matching, 1 speed, 1 flashcard
- For truefalse: options must be exactly [{ id: "true", text: "True", isCorrect: bool }, { id: "false", text: "False", isCorrect: bool }]
- Make questions engaging and specific to the provided material
- Keep questions concise (max 15 words)
- Explanations should teach, not just state the answer
- subject must be one of: Science, Mathematics, History, Literature, Technology, Philosophy, Geography, Economics, Biology, Physics, Chemistry, General`;

  const userPrompt = `Study material title: "${title}"

Content:
${rawText.slice(0, 3000)}

Generate 8 varied learning cards from this content.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) throw new Error("API error");

    const data = await response.json();
    const text = data.content
      .map((b: { type: string; text?: string }) =>
        b.type === "text" ? b.text : ""
      )
      .join("");

    const clean = text.replace(/```json|```/g, "").trim();
    const parsed: Omit<FeedCard, "id" | "subjectColor">[] = JSON.parse(clean);

    return parsed.map((card, i) => ({
      ...card,
      id: `ai_${Date.now()}_${i}`,
      subjectColor: colorForSubject(card.subject),
    }));
  } catch (err) {
    console.error("AI generation failed, using seed cards", err);
    // Return a subset of seed cards on failure
    return SEED_CARDS.slice(0, 8).map((c) => ({ ...c, id: `fallback_${c.id}` }));
  }
}
