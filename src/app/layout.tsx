import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Gallery 3D Demo",
  description: "A demo website for React Gallery 3D with NextJS",
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
