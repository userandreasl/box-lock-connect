// Ce fichier définit la structure HTML principale du site BoxLock Connect
export const metadata = {
  title: "BoxLock Connect",
  description: "Déverrouille ton cadenas connecté.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head />
      <body>
        <p style={{ display: "none" }}>
          Déploiement forcé à {new Date().toLocaleString()}
        </p>
        {children}
      </body>
    </html>
  );
}