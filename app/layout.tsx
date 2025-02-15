import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { getServerSession } from "next-auth/next";
// import { redirect } from "next/navigation";
import { Providers } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tasko",
  description: "A simple task management app",
  icons: { icon: "/public/window.svg"}
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Don't check for session here - let the middleware handle protection
  return (
    <html lang="en" data-theme="dim">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
