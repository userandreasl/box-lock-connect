"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabase";
import type { FC } from "react";

const AccessPage: FC = () => {
  const [password, setPassword] = useState("");
  const [lockExists, setLockExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = new URLSearchParams(window.location.search);
  const lockId = searchParams.get("id");

  if (!lockId) {
    return (
      <div style={{ fontFamily: "Helvetica Neue, sans-serif", fontSize: "18px", color: "red", textAlign: "center", padding: "20px" }}>
        ❌ Le lien scanné n’est pas valide.
      </div>
    );
  }

  useEffect(() => {
    const checkLock = async () => {
      const { data, error } = await supabase
        .from("locks")
        .select("id")
        .eq("id", lockId)
        .single();

      if (error) {
        console.error("Erreur Supabase :", error.message);
        setLockExists(false);
        setLoading(false);
        return;
      }

      if (!data) {
        console.warn("Aucun cadenas trouvé, redirection vers /setup...");
        window.location.href = `/setup?id=${lockId}`;
      } else {
        console.log("Cadenas trouvé :", data.id);
        setLockExists(true);
        setLoading(false);
      }
    };

    checkLock();
  }, [lockId]);

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

  if (loading) return <p style={{ fontFamily: "Helvetica Neue, sans-serif" }}>Chargement...</p>;

  if (lockExists === false) return <p style={{ fontFamily: "Helvetica Neue, sans-serif" }}>❗ Connexion échouée ou cadenas introuvable.</p>;

  if (!lockExists) return <p style={{ fontFamily: "Helvetica Neue, sans-serif" }}>🔒 Cadenas introuvable</p>;

  return (
    <div style={{ fontFamily: "Helvetica Neue, sans-serif" }}>
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: "10px",
          margin: "10px",
          width: "250px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "4px"
        }}
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

export default AccessPage;