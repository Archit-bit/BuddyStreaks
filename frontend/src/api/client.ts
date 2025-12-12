const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function getHealth() {
  const res = await fetch(`${API_BASE_URL}/health`);
  if (!res.ok) {
    throw new Error("Failed to fetch health");
  }
  return res.json();
}

export async function createUser(name: string) {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  return res.json();
}

export async function createStreak(
  name: string,
  frequency: string,
  createdById: string
) {
  const res = await fetch(`${API_BASE_URL}/streaks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, frequency, createdById })
  });

  if (!res.ok) {
    throw new Error("Failed to create streak");
  }

  return res.json();
}
