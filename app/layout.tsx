import type { Metadata } from "next";
import { SettingsProvider } from "@/context/SettingsContext";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { SettingsModal } from "@/components/SettingsModal";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pomodoro",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen bg-[var(--bg-main)]">
          <SettingsProvider>
            <Header />
            <SettingsModal />
            <main className="flex-1 flex flex-col items-center justify-center">
              {children}
            </main>
            <Footer />
          </SettingsProvider>
        </div>
      </body>
    </html>
  );
}
