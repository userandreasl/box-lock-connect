// Forçage de déploiement Vercel
export const metadata = {
  title: 'BoxLock Connect',
  description: 'Accès sécurisé à ton cadenas NFC',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}