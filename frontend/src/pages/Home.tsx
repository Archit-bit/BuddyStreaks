import { useEffect, useState } from "react";
import { getHealth, createUser, createStreak } from "../api/client";

function Home() {
  const [health, setHealth] = useState<string>("checking...");

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState<string | null>(
    localStorage.getItem("userId")
  );

  const [streakName, setStreakName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getHealth()
      .then((res) => setHealth(res.status))
      .catch(() => setHealth("error"));
  }, []);

  async function handleCreateUser() {
    if (!userName.trim()) return;

    const user = await createUser(userName.trim());
    setUserId(user.id);
    localStorage.setItem("userId", user.id);
    setMessage(`User created: ${user.name}`);
  }

  async function handleCreateStreak() {
    if (!streakName.trim() || !frequency.trim() || !userId) return;

    const res = await createStreak(
      streakName.trim(),
      frequency.trim(),
      userId
    );

    setMessage(`Streak created: ${res.streak.name}`);
    setStreakName("");
    setFrequency("");
  }

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "3rem auto",
        fontFamily: "system-ui",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}
    >
      <h1>BuddyStreaks</h1>
      <small>Backend health: {health}</small>

      {!userId && (
        <>
          <h3>Create User</h3>
          <input
            placeholder="Your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={handleCreateUser}>Create User</button>
        </>
      )}

      {userId && (
        <>
          <h3>Create Streak</h3>
          <input
            placeholder="Streak name"
            value={streakName}
            onChange={(e) => setStreakName(e.target.value)}
          />
          <input
            placeholder="Frequency (e.g. DAILY)"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
          <button onClick={handleCreateStreak}>Create Streak</button>
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default Home;
