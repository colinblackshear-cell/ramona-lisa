import type { Metadata, Viewport } from "next";
import "./globals.css";
import { courier, fell, hand } from "./fonts";
import { series } from "@/content/series/series";

export const metadata: Metadata = {
  title: series.title,
  description: series.tagline,
};

export const viewport: Viewport = {
  themeColor: "#10283B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fell.variable} ${courier.variable} ${hand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
