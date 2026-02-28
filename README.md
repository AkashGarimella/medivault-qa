<div align="center">

# ⬡ MediVault
### Structured Questionnaire Answering Tool
*GTM Engineering Internship Assignment*

![Stack](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Stack](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)
![Stack](https://img.shields.io/badge/Node-Express-339933?style=flat-square&logo=node.js)
![Stack](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite)
![Stack](https://img.shields.io/badge/Groq-LLaMA_3.3-F55036?style=flat-square)

</div>

---

## What is MediVault?

**Industry:** HealthTech SaaS

**Company:** MediVault is a HIPAA-compliant health data management platform serving 500+ healthcare organizations. It helps hospitals, clinics, and health systems securely store, share, and analyze patient health records.

**The Problem:** Security and compliance teams regularly receive vendor assessment questionnaires — HIPAA reviews, SOC 2 audits, procurement forms — that take hours to complete manually.

**The Solution:** MediVault QA Tool automates this by reading your internal reference documents and using AI to generate accurate, cited answers for every question — in seconds.

## Live Demo

🔗 https://medivault-qa.onrender.com

> **Note:** Hosted on Render free tier — first load may take 30-60 seconds to wake up.

## Quick Start (Demo)

1. Open the live link
2. Sign up for a new account (or use `demo@medivault.io` / `demo123`)
3. The questionnaire and reference documents are pre-loaded
4. Click **Generate Answers** directly — no uploads needed
5. Review answers, edit if needed, then export

Note: Hosted on Render free tier — 
first load may take 30-60 seconds to wake up.

---

## Features

### Phase 1 — Core Workflow
| Feature | Details |
|---|---|
| 🔐 Authentication | Signup / login with bcrypt password hashing |
| 📋 Questionnaire Upload | Upload .txt file or paste directly — auto-detects numbered questions |
| 📄 Reference Documents | 5 pre-loaded docs + upload your own |
| 🤖 AI Answer Generation | Groq LLaMA 3.3 70B answers each question grounded in your documents |
| 📎 Citations | Every answer includes source document + exact quote |
| ❌ Not Found Fallback | Returns "Not found in references." when documents don't support an answer |

### Phase 2 — Review & Export
| Feature | Details |
|---|---|
| ✏️ Inline Editing | Edit any answer before export |
| 📊 Coverage Summary | Total / Answered / Not Found / Avg Confidence at a glance |
| ⬇️ Export | Download completed questionnaire as .txt preserving original structure |
| 💾 Persistence | All state saved per user in SQLite — picks up where you left off |

### Nice-to-Haves
- ✅ Confidence scores (High / Medium / Low per answer)
- ✅ Evidence snippets (verbatim source text)
- ✅ Coverage summary dashboard

---

## Tech Stack
```
Frontend    React 18 + Vite 6
Backend     Node.js + Express
Database    SQLite (better-sqlite3)
AI Engine   Groq API — LLaMA 3.3 70B Versatile
Auth        bcryptjs password hashing
Styling     CSS variables + glassmorphism + canvas particle animation
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Free Groq API key from [console.groq.com](https://console.groq.com)

### Setup
```bash
# 1. Clone the repo
git clone https://github.com/yourusername/medivault-qa
cd medivault-qa

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# 4. Start the app
npm run dev
```

### Open the app
| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API | http://localhost:4000 |

### Demo credentials
```
Email:    demo@medivault.io  (or create your own account)
Password: demo123
```

---

## How It Works
```
User uploads questionnaire
        ↓
Parser detects numbered questions (1. 2. 3. ...)
        ↓
For each question → POST /api/generate
        ↓
Groq LLaMA 3.3 reads reference documents + question
        ↓
Returns { answer, citations, confidence, evidence, found }
        ↓
User reviews + edits answers
        ↓
Export as .txt document
```

---

## Project Structure
```
medivault-qa/
├── src/
│   ├── components/
│   │   ├── ParticleCanvas.jsx    # Animated background
│   │   ├── AuthScreen.jsx        # Login / signup
│   │   ├── AnswerCard.jsx        # Q&A card with edit
│   │   └── CoverageSummary.jsx   # Stats dashboard
│   ├── tabs/
│   │   ├── UploadTab.jsx         # Setup & upload
│   │   ├── AnswersTab.jsx        # Review answers
│   │   └── ExportTab.jsx         # Preview & download
│   ├── lib/
│   │   ├── api.js                # Frontend API calls
│   │   ├── parser.js             # Question parser
│   │   └── db.js                 # Seed documents & questionnaire
│   ├── styles/
│   │   └── globals.css           # CSS variables + animations
│   └── App.jsx                   # Root component
├── server/
│   ├── index.js                  # Express API
│   ├── mockAnswer.js             # Groq AI integration
│   ├── db.js                     # SQLite setup
│   └── defaults.js               # Seed data
├── .env.example
├── .gitignore
└── README.md
```

---

## Assumptions

- Questions must be numbered (`1.` or `1)`) for the parser to detect them
- Reference documents are plain text — production would add PDF/DOCX parsing
- SQLite is used for local dev — production would use managed Postgres
- One API call per question for accuracy (not batched)

---

## Trade-offs

| Decision | Trade-off |
|---|---|
| One Groq call per question | More accurate than batching, slightly slower |
| Plain text documents | Simple to implement — wouldn't scale past ~20 docs without vector search |
| SQLite | Zero-config local dev — needs Postgres for production |
| Single Express server | Easy deployment — production should split API and static serving |

---

## What I'd Improve With More Time

1. **Vector search** — chunk + embed documents with pgvector for semantic retrieval at scale
2. **PDF/DOCX parsing** — ingest real vendor documents with `pdf-parse` / `mammoth`
3. **Streaming answers** — stream tokens word-by-word for faster perceived response
4. **Partial regeneration** — re-run only selected questions
5. **Version history** — save multiple runs and diff answers between them
6. **Export to original format** — inject answers directly into the uploaded questionnaire layout

---

## Deployment (Render)
```bash
# Build command
npm install

# Start command  
npm start

# Environment variables to set
GROQ_API_KEY=your_key
PORT=10000
VITE_API_BASE_URL=https://your-app.onrender.com
MOCK_AI=false
```

---

<div align="center">
Built with ♥ for the GTM Engineering Internship Assignment
</div>
