"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mzjnlzabetsboffjmhej.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
);

export default function AccessPage() {
  const [password, setPassword] = useState("");
  const [lockExists, setLockExists] = useState(false);
  const lockId = "lock-001";

  useEffect(() => {
    async function checkLock() {
      const { data } = await supabase.from("locks").select("id").eq("id", lockId).single();
      setLockExists(!!data);
    }
    checkLock();
  }, []);

  const handleUnlock = async () => {
    const { data, error } = await supabase
      .from("locks")
      .select("password")
      .eq("id", lockId)
      .single();

    if (error || !data) {
      alert("❌ Erreur : cadenas introuvable.");
    } else if (data.password === password) {
      alert("✅ Cadenas déverrouillé !");
    } else {
      alert("❌ Mot de passe incorrect.");
    }
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <h1>🔓 Accès au cadenas</h1>
      {lockExists ? (
        <>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "10px", margin: "10px", width: "250px" }}
          />
          <br />
          <button onClick={handleUnlock} style={{ padding: "10px 20px" }}>
            Déverrouiller 🔑
          </button>
        </>
      ) : (
        <p>🔒 Cadenas introuvable</p>
      )}
    </div>
  );
}