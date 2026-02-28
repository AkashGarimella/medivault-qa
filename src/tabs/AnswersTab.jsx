import AnswerCard from "../components/AnswerCard";
import CoverageSummary from "../components/CoverageSummary";

export default function AnswersTab({
  answers, answered, notFound, avgConf,
  generating, progress,
  qName, onEdit, onExport,
}) {
  const pct = progress.total ? Math.round((progress.cur / progress.total) * 100) : 0;

  return (
    <div>
      <div className="fade-in" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: 28, color: "var(--text)", marginBottom: 6, fontWeight: 400, letterSpacing: "-0.02em" }}>
            {qName}
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 12 }}>Review and edit before export</p>
        </div>
        {answers.length > 0 && !generating && (
          <button className="btn-primary" onClick={onExport} style={{ padding: "10px 22px", fontSize: 13 }}>
            Export →
          </button>
        )}
      </div>

      {/* Coverage summary */}
      {answers.length > 0 && (
        <CoverageSummary
          answers={answers}
          answered={answered}
          notFound={notFound}
          avgConf={avgConf}
          variant="compact"
        />
      )}

      {/* Progress bar */}
      {generating && (
        <div className="glass fade-in" style={{ borderRadius: 12, padding: "18px 22px", marginBottom: 20, border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "center" }}>
            <span style={{ color: "var(--muted)", fontSize: 12, fontFamily: "var(--mono)" }}>
              Processing question {progress.cur} / {progress.total}
            </span>
            <span style={{ color: "var(--teal)", fontFamily: "var(--mono)", fontWeight: 600, fontSize: 13 }}>{pct}%</span>
          </div>
          <div style={{ background: "rgba(0,0,0,0.4)", borderRadius: 4, height: 5, overflow: "hidden" }}>
            <div style={{
              background: "linear-gradient(90deg, var(--teal), var(--cyan))",
              height: "100%", width: `${pct}%`,
              transition: "width 0.4s ease", borderRadius: 4,
              boxShadow: "0 0 10px rgba(0,221,180,0.4)",
            }} />
          </div>
        </div>
      )}

      {answers.length === 0 && !generating && (
        <div style={{ textAlign: "center", padding: "80px 0", color: "var(--dimmed)" }}>
          <div style={{ fontSize: 42, marginBottom: 14, filter: "grayscale(0.5)" }}>🤖</div>
          <p style={{ fontSize: 14, fontFamily: "var(--mono)" }}>
            No answers yet — go to Setup and click Generate Answers
          </p>
        </div>
      )}

      {answers.map((item, i) => (
        <AnswerCard key={item.number} item={item} index={i} onEdit={onEdit} />
      ))}
    </div>
  );
}
