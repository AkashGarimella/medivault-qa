import CoverageSummary from "../components/CoverageSummary";

export default function ExportTab({
  answers, answered, notFound, avgConf,
  qName, onDownload, onSetupClick,
}) {
  return (
    <div>
      <div className="fade-in" style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: "var(--serif)", fontSize: 32, color: "var(--text)", marginBottom: 6, fontWeight: 400, letterSpacing: "-0.02em" }}>
          Export
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 13 }}>Download the completed questionnaire document</p>
      </div>

      {!answers.length ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--dimmed)" }}>
          <p style={{ fontFamily: "var(--mono)", fontSize: 13, marginBottom: 20 }}>Generate answers first</p>
          <button className="btn-primary" onClick={onSetupClick} style={{ padding: "11px 24px", fontSize: 13 }}>
            Go to Setup →
          </button>
        </div>
      ) : (
        <>
          {/* Coverage summary */}
          <div className="glass fade-in-1" style={{ borderRadius: 14, padding: "24px 28px", marginBottom: 24, border: "1px solid var(--border)" }}>
            <p style={{ color: "var(--muted)", fontSize: 11, fontFamily: "var(--mono)", letterSpacing: "0.1em", marginBottom: 18, textTransform: "uppercase" }}>
              Coverage Summary
            </p>
            <CoverageSummary
              answers={answers}
              answered={answered}
              notFound={notFound}
              avgConf={avgConf}
              variant="full"
            />
          </div>

          {/* Document preview */}
          <div className="glass fade-in-2" style={{
            borderRadius: 14, padding: "24px 28px", marginBottom: 24, border: "1px solid var(--border)",
            maxHeight: 380, overflowY: "auto",
          }}>
            <p style={{ color: "var(--muted)", fontSize: 11, fontFamily: "var(--mono)", letterSpacing: "0.1em", marginBottom: 18, textTransform: "uppercase" }}>
              Document Preview
            </p>
            {answers.map(a => (
              <div key={a.number} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <p style={{ color: "var(--muted)", fontSize: 12, fontFamily: "var(--mono)", marginBottom: 6, fontWeight: 600 }}>
                  Q{a.number}. {a.question}
                </p>
                <p style={{ color: a.found ? "var(--text)" : "var(--red)", fontSize: 13, marginBottom: 6, lineHeight: 1.5 }}>
                  {a.answer}
                </p>
                {a.found && a.citations?.map((c, i) => (
                  <span key={i} style={{ color: "var(--dimmed)", fontSize: 10.5, fontFamily: "var(--mono)", display: "block" }}>
                    ↗ {c}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <button className="btn-primary fade-in-3" onClick={onDownload} style={{ padding: "13px 32px", fontSize: 14 }}>
            ⬇  Download Document
          </button>
        </>
      )}
    </div>
  );
}
