import { useState } from "react";
import ConfidencePill from "./ConfidencePill";

export default function AnswerCard({ item, index, onEdit, style = {} }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(item.answer);

  const save = () => {
    onEdit(index, draft);
    setEditing(false);
  };

  return (
    <div
      className="answer-card glass glass-hover"
      style={{ ...style, animationDelay: `${index * 0.04}s`, border: "1px solid var(--border)" }}
    >
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        {/* Number badge */}
        <div style={{
          width: 30, height: 30, borderRadius: 8, flexShrink: 0,
          background: "linear-gradient(135deg, rgba(0,221,180,0.2), rgba(0,184,212,0.15))",
          border: "1px solid rgba(0,221,180,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700, color: "var(--teal)",
          fontFamily: "var(--mono)", marginTop: 2,
        }}>
          {String(item.number).padStart(2, "0")}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: "var(--muted)", fontSize: 12.5, marginBottom: 10, lineHeight: 1.5, fontStyle: "italic" }}>
            {item.question}
          </p>

          {editing ? (
            <div>
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                className="input-field"
                style={{ minHeight: 80, resize: "vertical", fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn-primary" onClick={save} style={{ padding: "7px 18px", fontSize: 12 }}>
                  Save
                </button>
                <button
                  onClick={() => { setDraft(item.answer); setEditing(false); }}
                  style={{
                    background: "transparent", color: "var(--muted)", border: "1px solid var(--border)",
                    borderRadius: 8, padding: "7px 18px", cursor: "pointer", fontSize: 12,
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p style={{
              color: item.found ? "var(--text)" : "var(--red)",
              fontSize: 13.5, lineHeight: 1.65, marginBottom: item.found ? 12 : 0,
            }}>
              {item.answer}
            </p>
          )}

          {item.found && !editing && (
            <>
              {item.evidence && (
                <div style={{
                  background: "rgba(0,221,180,0.07)", borderLeft: "2px solid var(--teal)",
                  borderRadius: "0 8px 8px 0", padding: "8px 12px", marginBottom: 10,
                  fontSize: 11.5, color: "rgba(0,221,180,0.75)", lineHeight: 1.5,
                  fontFamily: "var(--mono)",
                }}>
                  {item.evidence}
                </div>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                {item.citations?.map((c, i) => (
                  <span key={i} style={{
                    background: "rgba(255,255,255,0.04)", color: "var(--muted)",
                    border: "1px solid var(--border)", borderRadius: 5,
                    padding: "2px 8px", fontSize: 10.5, fontFamily: "var(--mono)",
                  }}>
                    ↗ {c}
                  </span>
                ))}
                <ConfidencePill score={item.confidence} />
              </div>
            </>
          )}
        </div>

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            style={{
              background: "transparent", color: "var(--muted)", border: "1px solid var(--border)",
              borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 11, flexShrink: 0,
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.target.style.color = "var(--teal)"; e.target.style.borderColor = "rgba(0,221,180,0.3)"; }}
            onMouseLeave={e => { e.target.style.color = "var(--muted)"; e.target.style.borderColor = "var(--border)"; }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
