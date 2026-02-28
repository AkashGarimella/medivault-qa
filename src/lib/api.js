const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

export function login(email, password) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function signup(name, email, password) {
  return request("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function loadState(userId) {
  return request(`/api/state/${userId}`);
}

export function saveState(payload) {
  return request("/api/state", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// Returns: { answer, citations, confidence, evidence, found }
export function callClaude(question, documents) {
  return request("/api/generate", {
    method: "POST",
    body: JSON.stringify({ question, documents }),
  });
}
