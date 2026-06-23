import type { UserState, ImportedContent } from "@/types";

const KEYS = {
  USER: "velora_user",
  IMPORTS: "velora_imports",
  FEED_SEED: "velora_feed_seed",
};

export const defaultUser: UserState = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActiveDate: "",
  completedCards: [],
  subjectProgress: {},
};

export function getUser(): UserState {
  if (typeof window === "undefined") return defaultUser;
  try {
    const raw = localStorage.getItem(KEYS.USER);
    return raw ? { ...defaultUser, ...JSON.parse(raw) } : defaultUser;
  } catch {
    return defaultUser;
  }
}

export function saveUser(user: UserState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEYS.USER, JSON.stringify(user));
}

export function getImports(): ImportedContent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEYS.IMPORTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addImport(content: ImportedContent): void {
  const imports = getImports();
  imports.unshift(content);
  localStorage.setItem(KEYS.IMPORTS, JSON.stringify(imports.slice(0, 20)));
}

export function clearImports(): void {
  localStorage.removeItem(KEYS.IMPORTS);
}
