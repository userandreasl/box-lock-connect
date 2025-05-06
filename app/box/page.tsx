"use client"
import { useState, useEffect } from "react"

export default function BoxAccessPage() {
  const [boxId, setBoxId] = useState("")
  const [step, setStep] = useState("loading")
  const [code, setCode] = useState("")
  const [lockName, setLockName] = useState("")
  const [storedName, setStoredName] = useState("")
  const [storedCode, setStoredCode] = useState("")
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    if (!id || id.trim() === "") {
      setStep("invalid")
      return
    }
    setBoxId(id)
    const saved = localStorage.getItem(id)
    if (saved) {
      const parsed = JSON.parse(saved)
      setStoredName(parsed.name)
      setStoredCode(parsed.code)
      setStep("auth")
    } else {
      setStep("setup")
    }
  }, [])

  const handleSetup = () => {
    if (lockName.trim() && code.trim()) {
      localStorage.setItem(boxId, JSON.stringify({ name: lockName.trim(), code: code.trim() }))
      setStoredName(lockName.trim())
      setStoredCode(code.trim())
      setStep("auth")
    }
  }

  const handleAccess = () => {
    setIsAuthorized(code === storedCode)
    setStep("result")
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: 400, margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "1rem" }}>BoxLock Connect</h1>
      {step === "loading" && <p>Chargement...</p>}
      {step === "invalid" && <p style={{ color: "red" }}>Lien invalide</p>}
      {step === "setup" && (
        <>
          <p>Configuration initiale du verrou :</p>
          <input placeholder="Nom du verrou" value={lockName} onChange={(e) => setLockName(e.target.value)} style={{ width: "100%", padding: "0.5rem", marginTop: "1rem" }} />
          <input placeholder="Mot de passe" value={code} onChange={(e) => setCode(e.target.value)} type="password" style={{ width: "100%", padding: "0.5rem", marginTop: "1rem" }} />
          <button onClick={handleSetup} style={{ marginTop: "1rem" }}>Valider</button>
        </>
      )}
      {step === "auth" && (
        <>
          <p>Verrou : <strong>{storedName}</strong></p>
          <input placeholder="Mot de passe" value={code} onChange={(e) => setCode(e.target.value)} type="password" style={{ width: "100%", padding: "0.5rem", marginTop: "1rem" }} />
          <button onClick={handleAccess} style={{ marginTop: "1rem" }}>Déverrouiller</button>
        </>
      )}
      {step === "result" && (
        isAuthorized
          ? <p style={{ color: "green" }}>🔓 Verrou déverrouillé</p>
          : <>
              <p style={{ color: "red" }}>Mot de passe incorrect</p>
              <button onClick={() => setStep("auth")}>Réessayer</button>
            </>
      )}
    </main>
  )
}
