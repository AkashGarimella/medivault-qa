// Reusable coverage stats bar used in both AnswersTab and ExportTab.
// Props:
//   answers  – full answers array
//   answered – count of found answers
//   notFound – count of not-found answers
//   avgConf  – average confidence (integer 0-100)
//   variant  – "compact" (4 stats, AnswersTab) | "full" (5 stats, ExportTab)

export default function CoverageSummary({ answers, answered, notFound, avgConf, variant = "compact" }) {
  const stats =
    variant === "full"
      ? [
          { label: "TOTAL QUESTIONS",       value: answers.length,                                                    color: "var(--text)" },
          { label: "ANSWERED W/ CITATIONS",  value: answered,                                                         color: "var(--green)" },
          { label: "NOT FOUND IN REFS",      value: notFound,                                                         color: "var(--red)" },
          { label: "COVERAGE RATE",          value: `${answers.length ? Math.round(answered / answers.length * 100) : 0}%`, color: "var(--teal)" },
          { label: "AVG CONFIDENCE",         value: `${avgConf}%`,                                                    color: "var(--amber)" },
        ]
      : [
          { label: "TOTAL",    value: answers.length, color: "var(--text)" },
          { label: "ANSWERED", value: answered,        color: "var(--green)" },
          { label: "NOT FOUND",value: notFound,        color: "var(--red)" },
          { label: "AVG CONF", value: `${avgConf}%`,   color: "var(--teal)" },
        ];

  return (
    <div
      className="glass fade-in-1"
      style={{
        borderRadius: 14, padding: "20px 28px", marginBottom: 24, border: "1px solid var(--border)",
        display: "flex", gap: 0, justifyContent: "space-around", flexWrap: "wrap",
      }}
    >
      {stats.map(s => (
        <div key={s.label} className="stat-pill" style={{ flex: "1 1 100px", minWidth: 100 }}>
          <div style={{ fontSize: variant === "full" ? 24 : 26, fontWeight: 700, color: s.color, fontFamily: "var(--mono)" }}>
            {s.value}
          </div>
          <div style={{
            fontSize: variant === "full" ? 9 : 9.5,
            color: "var(--muted)", letterSpacing: "0.1em",
            fontFamily: "var(--mono)", marginTop: 4, textAlign: "center", lineHeight: 1.4,
          }}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
