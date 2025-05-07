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
      <body>{children}</body>
    </html>
  );
}