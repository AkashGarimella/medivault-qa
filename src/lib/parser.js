// ─── Unique ID generator ──────────────────────────────────────────────────────
export function genId() {
  return Math.random().toString(36).slice(2, 9);
}

// ─── Parse numbered questions from free-form text ─────────────────────────────
// Matches lines like "1. Question" or "1) Question"
export function parseQuestions(text) {
  const lines = text.split("\n");
  const questions = [];
  const re = /^\s*(\d+)[.)]\s+(.+)/;
  for (const line of lines) {
    const m = line.match(re);
    if (m) questions.push({ number: parseInt(m[1]), text: m[2].trim() });
  }
  return questions;
}
