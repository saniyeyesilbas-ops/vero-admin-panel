import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VERO Admin Panel",
  description: "Vero Filo Yönetim Sistemi Admin Paneli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-slate-50">
        {children}
      </body>
    </html>
  );
}
