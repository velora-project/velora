import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Velora — Learn Without Trying",
  description:
    "A TikTok-style AI learning feed that turns study material into interactive games and quizzes.",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#080810",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-velora-black text-velora-text antialiased">
        {children}
      </body>
    </html>
  );
}
