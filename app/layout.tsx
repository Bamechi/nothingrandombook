import type { Metadata, Viewport } from "next";
import { Anton, PT_Serif, Archivo } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
});

const ptSerif = PT_Serif({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-pt-serif",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  weight: ["500", "600", "700"],
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nothing Is Random — B. Amechi",
  description:
    "Making sense of what life’s been trying to tell you. 141 entries on pattern, faith, timing, and purpose by B. Amechi. Your life has been speaking to you the whole time.",
  openGraph: {
    title: "Nothing Is Random — B. Amechi",
    description:
      "Making sense of what life’s been trying to tell you. Enter the interactive experience.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0c0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${ptSerif.variable} ${archivo.variable}`}
    >
      <body className="grain has-cursor">
        {children}
        <Cursor />
      </body>
    </html>
  );
}
