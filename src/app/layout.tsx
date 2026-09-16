import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
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
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-theme-gradient bg-fixed text-white antialiased selection:bg-white selection:text-janus-bg">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
