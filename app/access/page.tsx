import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import type { FC } from "react";

const supabase = createClient(
  "https://mzjnlzabetsboffjmhej.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16am5semFiZXRzYm9mZmptaGVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NDIxNjQsImV4cCI6MjA2MjIxODE2NH0.jzLhPu7a9a_o82CEsT_CxFUihknwwJssGbL5fGoqBRw"
);

export default function AccessPage() {
  const [password, setPassword] = useState("");
  const [lockExists, setLockExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const lockId = "lock-001"; // Identifiant unique du cadenas

  useEffect(() => {
    const checkLock = async () => {
      const { data, error } = await supabase
        .from("locks")
        .select("id")
        .eq("id", lockId)
        .single();

      if (data) setLockExists(true);
      else setLockExists(false);

      setLoading(false);
    };

    checkLock();
  }, []);

  const handleUnlock = async () => {
    const inputPassword = password;

    const { data, error } = await supabase
      .from("locks")
      .select("password")
      .eq("id", lockId)
      .single();

    if (error || !data) {
      alert("❌ Erreur de récupération.");
      return;
    }

    if (data.password === inputPassword) {
      alert("✅ Mot de passe correct !");
    } else {
      alert("❌ Mauvais mot de passe !");
    }
  };

  if (loading) return <p>Chargement...</p>;

  if (!lockExists) return <p>🔒 Cadenas introuvable</p>;

  return (
    <div>
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: "10px", margin: "10px", width: "250px" }}
      />
      <br />
      <button
        onClick={handleUnlock}
        style={{ padding: "10px 20px", fontWeight: "bold" }}
      >
        Déverrouiller 🔐
      </button>
    </div>
  );
};