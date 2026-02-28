import { useRef } from "react";
import { genId, parseQuestions } from "../lib/parser";
import { SEED_QUESTIONNAIRE } from "../lib/db";

export default function UploadTab({
  documents, setDocuments,
  qText, setQText,
  qName, setQName,
  generating,
  onGenerate,
}) {
  const fileRef = useRef();
  const docRef = useRef();

  return (
    <div>
      <div className="fade-in" style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, color: "var(--text)", marginBottom: 8, fontWeight: 400, letterSpacing: "-0.02em" }}>
          Setup & Upload
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 13 }}>
          Fictional company:{" "}
          <span style={{ color: "var(--teal)", fontFamily: "var(--mono)", fontSize: 12 }}>MediVault</span>
          {" "}— HIPAA-compliant health data management SaaS · 500+ healthcare orgs
        </p>
      </div>

      {/* ── Questionnaire section ── */}
      <section className="fade-in-1" style={{ marginBottom: 28 }}>
        <p style={{ color: "var(--muted)", fontSize: 11, fontFamily: "var(--mono)", letterSpacing: "0.1em", marginBottom: 14, textTransform: "uppercase" }}>
          01 / QUESTIONNAIRE
        </p>

        <div
          className="glass glass-hover"
          onClick={() => fileRef.current?.click()}
          style={{
            borderRadius: 12, padding: "22px 24px", textAlign: "center", cursor: "pointer",
            marginBottom: 12, transition: "all 0.2s", border: "1px dashed var(--border)",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,221,180,0.3)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
        >
          <div style={{ fontSize: 26, marginBottom: 6, filter: "grayscale(0.3)" }}>📋</div>
          <p style={{ color: "var(--muted)", fontSize: 13, margin: 0 }}>Upload .txt questionnaire</p>
          <p style={{ color: "var(--dimmed)", fontSize: 11, margin: "4px 0 0", fontFamily: "var(--mono)" }}>
            or use pre-loaded sample below
          </p>
          <input
            ref={fileRef}
            type="file"
            accept=".txt,.csv"
            style={{ display: "none" }}
            onChange={e => {
              const f = e.target.files[0];
              if (!f) return;
              setQName(f.name.replace(/\.[^.]+$/, ""));
              const r = new FileReader();
              r.onload = ev => setQText(ev.target.result);
              r.readAsText(f);
            }}
          />
        </div>

        <input
          className="input-field"
          placeholder="Questionnaire name"
          value={qName}
          onChange={e => setQName(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        <textarea
          className="input-field"
          value={qText || SEED_QUESTIONNAIRE}
          onChange={e => setQText(e.target.value)}
          style={{
            minHeight: 200, resize: "vertical",
            fontFamily: "var(--mono)", fontSize: 12, lineHeight: 1.7, color: "var(--muted)",
          }}
        />
        <p style={{ color: "var(--dimmed)", fontSize: 11, fontFamily: "var(--mono)", marginTop: 6 }}>
          {parseQuestions(qText || SEED_QUESTIONNAIRE).length} questions detected
        </p>
      </section>

      {/* ── Reference documents section ── */}
      <section className="fade-in-2" style={{ marginBottom: 32 }}>
        <p style={{ color: "var(--muted)", fontSize: 11, fontFamily: "var(--mono)", letterSpacing: "0.1em", marginBottom: 14, textTransform: "uppercase" }}>
          02 / REFERENCE DOCUMENTS ({documents.length})
        </p>

        <div
          className="glass glass-hover"
          onClick={() => docRef.current?.click()}
          style={{
            borderRadius: 12, padding: "18px 24px", textAlign: "center", cursor: "pointer",
            marginBottom: 12, border: "1px dashed var(--border)", transition: "all 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,221,180,0.3)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
        >
          <div style={{ fontSize: 22, marginBottom: 4 }}>📄</div>
          <p style={{ color: "var(--muted)", fontSize: 12, margin: 0 }}>Upload additional .txt document</p>
          <input
            ref={docRef}
            type="file"
            accept=".txt"
            style={{ display: "none" }}
            onChange={e => {
              const f = e.target.files[0];
              if (!f) return;
              const r = new FileReader();
              r.onload = ev => setDocuments(prev => [...prev, { id: genId(), name: f.name, content: ev.target.result }]);
              r.readAsText(f);
            }}
          />
        </div>

        {documents.map((doc, i) => (
          <div
            key={doc.id}
            className="glass glass-hover doc-row"
            style={{ border: "1px solid var(--border)", animationDelay: `${i * 0.05}s` }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: "linear-gradient(135deg, rgba(0,221,180,0.12), rgba(0,184,212,0.08))",
                border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
              }}>📃</div>
              <div>
                <p style={{ color: "var(--text)", fontSize: 13, margin: 0, fontWeight: 500 }}>{doc.name}</p>
                <p style={{ color: "var(--dimmed)", fontSize: 10.5, margin: 0, fontFamily: "var(--mono)" }}>
                  {doc.content.length.toLocaleString()} chars
                </p>
              </div>
            </div>
            <button
              onClick={() => setDocuments(prev => prev.filter(d => d.id !== doc.id))}
              style={{ background: "transparent", border: "none", color: "var(--dimmed)", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: "0 4px", transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = "var(--red)"}
              onMouseLeave={e => e.target.style.color = "var(--dimmed)"}
            >×</button>
          </div>
        ))}
      </section>

      <div className="fade-in-3">
        <button
          className="btn-primary"
          onClick={onGenerate}
          disabled={generating || !documents.length}
          style={{ padding: "13px 36px", fontSize: 14 }}
        >
          {generating ? "⏳  Generating…" : "✦  Generate Answers"}
        </button>
      </div>
    </div>
  );
}
