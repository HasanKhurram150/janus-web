import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JANUS — Distributed Spatial Computing",
  description:
    "Low-latency distributed engine for real-time spatial calculations, physical simulation, and connected hardware.",
  keywords: [
    "Spatial Computing",
    "Distributed Systems",
    "Real-time Simulation",
    "Low Latency",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-gradient-to-br from-[#1b1022] via-[#2d1b3b] to-[#1b1022] bg-fixed text-white antialiased selection:bg-white selection:text-[#1b1022]">
        {children}
      </body>
    </html>
  );
}
