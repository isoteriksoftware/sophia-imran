import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://sophia-imran.vercel.app"),
  title: "Sophia & Imran: A Journey to Forever",
  description: "A tale of two hearts becoming one.",
  openGraph: {
    type: "website",
    description: "A tale of two hearts becoming one.",
    title: "Sophia & Imran: A Journey to Forever",
    url: "https://sophia-imran.vercel.app",
    images: ["https://i.imgur.com/v38BnmG.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative w-screen h-screen">
          <main className="w-full h-full">{children}</main>

          <div className="absolute top-0 left-0 z-10 w-full"></div>
        </div>
      </body>
    </html>
  );
}
