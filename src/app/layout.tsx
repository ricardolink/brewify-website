import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Nav } from "@/components/Nav";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brewify Coffee",
  description: "Coffee that knows you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased bg-brew-black text-brew-ivory`}
      >
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Nav />
            <div className="flex-1">{children}</div>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
