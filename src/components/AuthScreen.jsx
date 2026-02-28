import { useState } from "react";
import { login, signup } from "../lib/api";

export default function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    try {
      if (mode === "login") {
        const data = await login(form.email, form.password);
        onLogin(data.user);
        return;
      }

      if (!form.name || !form.email || !form.password) {
        setError("All fields required.");
        return;
      }

      const data = await signup(form.name, form.email, form.password);
      onLogin(data.user);
    } catch (err) {
      setError(err.message || "Authentication failed.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", zIndex: 1,
    }}>
      {/* Centered ambient glow */}
      <div style={{
        position: "fixed", width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,221,180,0.06) 0%, transparent 70%)",
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }} />

      <div className="glass fade-in" style={{
        width: 420, borderRadius: 20, padding: "48px 40px",
        boxShadow: "0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,221,180,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: "20%", right: "20%", height: 1,
          background: "linear-gradient(90deg, transparent, var(--teal), transparent)",
        }} />

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, rgba(0,221,180,0.2), rgba(0,184,212,0.1))",
              border: "1px solid rgba(0,221,180,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "pulse-ring 3s ease-in-out infinite",
            }}>
              <span style={{ fontSize: 18 }}>⬡</span>
            </div>
            <span style={{ fontFamily: "var(--serif)", fontSize: 26, color: "var(--text)", letterSpacing: "-0.02em" }}>
              MediVault
            </span>
          </div>
          <p style={{ color: "var(--muted)", fontSize: 12, fontFamily: "var(--mono)", letterSpacing: "0.1em" }}>
            QUESTIONNAIRE ANSWERING TOOL
          </p>
        </div>

        {/* Mode tabs */}
        <div style={{ display: "flex", background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 4, marginBottom: 28 }}>
          {["login", "signup"].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              style={{
                flex: 1, padding: "8px", borderRadius: 8, border: "none", cursor: "pointer",
                fontFamily: "var(--sans)", fontSize: 13, fontWeight: 500, transition: "all 0.2s",
                background: mode === m ? "rgba(0,221,180,0.12)" : "transparent",
                color: mode === m ? "var(--teal)" : "var(--muted)",
              }}
            >
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Fields */}
        {mode === "signup" && (
          <input
            placeholder="Full name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="input-field"
            style={{ marginBottom: 10 }}
          />
        )}
        <input
          placeholder="Email address"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="input-field"
          style={{ marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          onKeyDown={e => e.key === "Enter" && submit()}
          className="input-field"
          style={{ marginBottom: error ? 10 : 20 }}
        />

        {error && (
          <p style={{ color: "var(--red)", fontSize: 12, marginBottom: 14, fontFamily: "var(--mono)" }}>
            {error}
          </p>
        )}

        <button className="btn-primary" onClick={submit} style={{ width: "100%", padding: "13px" }}>
          {mode === "login" ? "Sign In →" : "Create Account →"}
        </button>

        <p style={{ textAlign: "center", marginTop: 20, color: "var(--muted)", fontSize: 12, fontFamily: "var(--mono)" }}>
          demo@medivault.io · demo123
        </p>
      </div>
    </div>
  );
}
