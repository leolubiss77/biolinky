import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const BASE_URL = "https://biolinky.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "BioLinky - Link in Bio Gratis untuk Creators Indonesia",
    template: "%s | BioLinky",
  },
  description:
    "BioLinky adalah platform link-in-bio gratis terbaik untuk creators, influencers, dan businesses Indonesia. Kumpulkan semua link sosial media dalam satu halaman cantik. Analytics real-time, QR code, custom theme — 100% gratis selamanya.",
  keywords: [
    "link in bio",
    "link in bio gratis",
    "biolink",
    "bio link indonesia",
    "linktree alternatif",
    "linktree gratis",
    "link sosial media",
    "creator tools",
    "BioLinky",
    "link instagram",
    "link tiktok",
    "halaman bio",
    "one link",
  ],
  authors: [{ name: "BioLinky", url: BASE_URL }],
  creator: "BioLinky",
  publisher: "BioLinky",
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "BioLinky",
    title: "BioLinky - Link in Bio Gratis untuk Creators Indonesia",
    description:
      "Kumpulkan semua link sosial media dalam satu halaman cantik. Analytics real-time, QR code, custom theme — 100% gratis selamanya.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BioLinky - Link in Bio Gratis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BioLinky - Link in Bio Gratis untuk Creators Indonesia",
    description:
      "Kumpulkan semua link sosial media dalam satu halaman cantik. Gratis selamanya!",
    images: ["/og-image.png"],
    creator: "@biolinky",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: BASE_URL,
    languages: {
      "id-ID": BASE_URL,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
