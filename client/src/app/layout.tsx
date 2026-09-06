import type { Metadata } from "next";
import { Mansalva, Orbitron } from "next/font/google";
import "./globals.css";
import TargetCursor from "@/components/TargetCursor";
import Navbar from "@/components/layout/Navbar";
import LenisProvider from "@/components/root/LenisProvider";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";



export const titleFont = Mansalva({
  weight: "400",
  subsets: ["latin"],
});

export const globalFont = Orbitron({
  weight: "500",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_CLIENT_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "MASC | Math & Applied Science Club",
    template: "%s | MASC",
  },

  description:
    "Math & Applied Science Club at APSIT. Explore mathematics, science, technology, events, workshops, projects, and ideas.",

  applicationName: "MASC WEBSITE",

  authors: [
    {
      name: "Math & Applied Science Club",
    },
  ],

  creator: "Shree Bavachikar",
  publisher: "Shree Bavachikar",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    type: "website",
    siteName: "MASC",
    title: "MASC | Math & Applied Science Club",
    description:
      "Explore mathematics, science, technology, events, workshops, projects, and ideas with MASC.",
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MASC | Math & Applied Science Club",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MASC | Math & Applied Science Club",
    description:
      "Math, science, technology, events, workshops, and ideas.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children } : {children : ReactNode}) {
  return (
    <html lang="en" className={`${globalFont.className} overflow-x-hidden`}>
      <body className="flex flex-col text-black bg-slate-100">
        <LenisProvider>
          <Toaster position="bottom-right" reverseOrder={false} />
          <TargetCursor
            spinDuration={1.4}
            hideDefaultCursor={true}
            parallaxOn
            hoverDuration={0.35}
            cursorColor="#000000"
            cursorColorOnTarget="#ff2c2c"
          />
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
