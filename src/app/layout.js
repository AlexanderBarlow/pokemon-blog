import { Geist, Geist_Mono } from "next/font/google";
import { Press_Start_2P } from "next/font/google"; // ✅ Add the Pokémon font
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-pokemon", // ✅ Store as CSS variable
  subsets: ["latin"],
});

export const metadata = {
  title: "Pokémon Card Vault",
  description: "Browse and track your Pokémon cards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${pressStart2P.variable} ${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
