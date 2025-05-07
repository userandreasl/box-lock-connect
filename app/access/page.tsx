"use client";

import { useState } from "react";

export default function AccessPage() {
  const [password, setPassword] = useState("");

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>🔓 Accès au cadenas</h1>
      <p>Entre ton mot de passe pour ouvrir ton cadenas BoxLock Connect</p>
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", marginTop: "20px", width: "250px" }}
      />
      <br />
      <button
        style={{ marginTop: "20px", padding: "10px 20px" }}
        onClick={() => {
          if (password === "1234") {
            alert("✅ Cadenas déverrouillé !");
          } else {
            alert("❌ Mot de passe incorrect.");
          }
        }}
      >
        Déverrouiller 🔐
      </button>
    </div>
  );
}