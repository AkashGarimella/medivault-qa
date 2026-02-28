import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db.js";
import { SEED_DOCUMENTS, SEED_QUESTIONNAIRE } from "./defaults.js";
import { generateMockAnswer } from "./mockAnswer.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "4mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "..", "dist");

function safeUser(row) {
  return { id: row.id, name: row.name, email: row.email };
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, mode: "groq-ai" });
});

app.get("/", (_req, res) => {
  if (fs.existsSync(path.join(distDir, "index.html"))) {
    return res.sendFile(path.join(distDir, "index.html"));
  }
  return res.send("MediVault API is running. Use /api/health");
});

app.post("/api/auth/signup", (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email.trim().toLowerCase());
  if (existing) {
    return res.status(409).json({ error: "Email already registered." });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const insert = db
    .prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)")
    .run(name.trim(), email.trim().toLowerCase(), passwordHash);

  const user = db.prepare("SELECT id, name, email FROM users WHERE id = ?").get(insert.lastInsertRowid);
  return res.json({ user: safeUser(user) });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = db
    .prepare("SELECT id, name, email, password_hash FROM users WHERE email = ?")
    .get(email.trim().toLowerCase());

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  return res.json({ user: safeUser(user) });
});

app.get("/api/state/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  if (!Number.isInteger(userId)) {
    return res.status(400).json({ error: "Invalid user id." });
  }

  const state = db.prepare("SELECT * FROM user_states WHERE user_id = ?").get(userId);
  if (!state) {
    return res.json({
      qName: "Northshore Security Assessment",
      qText: "",
      documents: SEED_DOCUMENTS,
      answers: [],
      seedQuestionnaire: SEED_QUESTIONNAIRE,
    });
  }

  return res.json({
    qName: state.q_name || "Northshore Security Assessment",
    qText: state.q_text || "",
    documents: state.documents_json ? JSON.parse(state.documents_json) : SEED_DOCUMENTS,
    answers: state.answers_json ? JSON.parse(state.answers_json) : [],
    seedQuestionnaire: SEED_QUESTIONNAIRE,
  });
});

app.put("/api/state", (req, res) => {
  const { userId, qName, qText, documents, answers } = req.body || {};
  if (!Number.isInteger(userId)) {
    return res.status(400).json({ error: "Invalid user id." });
  }

  db.prepare(
    `INSERT INTO user_states (user_id, q_name, q_text, documents_json, answers_json, updated_at)
     VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(user_id) DO UPDATE SET
       q_name = excluded.q_name,
       q_text = excluded.q_text,
       documents_json = excluded.documents_json,
       answers_json = excluded.answers_json,
       updated_at = CURRENT_TIMESTAMP`
  ).run(
    userId,
    qName || "",
    qText || "",
    JSON.stringify(Array.isArray(documents) ? documents : []),
    JSON.stringify(Array.isArray(answers) ? answers : [])
  );

  return res.json({ ok: true });
});

app.post("/api/generate", async (req, res) => {
  const { question, documents } = req.body || {};
  if (!question || !Array.isArray(documents)) {
    return res.status(400).json({ error: "Question and documents are required." });
  }
  try {
    const answer = await generateMockAnswer(question, documents);
    return res.json(answer);
  } catch (error) {
    console.error("Answer generation error:", error);
    return res.status(500).json({ error: "Failed to generate answer." });
  }
});

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    return res.sendFile(path.join(distDir, "index.html"));
  });
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${PORT}`);
});
