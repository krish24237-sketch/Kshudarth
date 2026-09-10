import type { Metadata, Viewport } from "next";
import { Cinzel, EB_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kshudarth.com"),
  title: "Kshudarth — Content studio for creators & brands",
  description:
    "We help creators and brands build content that lasts. Done-for-you scripting, editing, posting, and growth. Book a free 15-minute call.",
  keywords: [
    "content studio",
    "creator growth",
    "reels editing",
    "content strategy",
    "done for you content",
    "Kshudarth",
  ],
  authors: [{ name: "Kshudarth" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://kshudarth.com",
    siteName: "Kshudarth",
    title: "Kshudarth — Content studio for creators & brands",
    description:
      "We help creators and brands build content that lasts. Done-for-you scripting, editing, posting, and growth. Book a free 15-minute call.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "Kshudarth — content & growth studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kshudarth — Content studio for creators & brands",
    description:
      "We help creators and brands build content that lasts. Book a free 15-minute call.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#3C1201",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${garamond.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
