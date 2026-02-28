export default function ConfidencePill({ score }) {
  const [color, label] =
    score >= 75 ? ["var(--green)", "HIGH"] :
    score >= 40 ? ["var(--amber)", "MED"] :
    ["var(--red)", "LOW"];

  return (
    <span style={{
      background: color + "18",
      color,
      border: `1px solid ${color}44`,
      borderRadius: 4,
      padding: "2px 7px",
      fontSize: 10,
      fontFamily: "var(--mono)",
      fontWeight: 600,
      letterSpacing: "0.08em",
    }}>
      {label} {score}%
    </span>
  );
}
