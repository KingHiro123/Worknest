import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { DebugConsole } from "@/components/DebugConsole";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Worknest",
  description: "Notes, boards, and templates for your workspace.",
};

// The app only ships a light palette (see globals.css). Without this, some
// mobile browsers (Android Chrome/Samsung Internet's "force dark" setting)
// auto-invert pages that don't declare a color-scheme, which reads as a dark
// UI it never designed for and visibly corrupts transformed/translucent
// elements like the board's drag-overlay card. This opts the page out of that.
export const viewport: Viewport = {
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full font-sans antialiased">
        {children}
        <DebugConsole />
      </body>
    </html>
  );
}
