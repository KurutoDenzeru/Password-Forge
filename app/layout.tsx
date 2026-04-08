// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://password-forge.vercel.app"),
  title: {
    default: "Password Forge – Secure, Powerful Password Generator",
    template: "%s | Password Forge",
  },
  description: "Password Forge is a modern, open-source password generator for strong, secure, and unique passwords. Free, privacy-first, and easy to use.",
  applicationName: "Password Forge",
  keywords: [
    "password generator",
    "secure passwords",
    "random password",
    "strong password",
    "password manager",
    "privacy",
    "open source",
    "security",
  ],
  authors: [{ name: "Kurt Calacday", url: "https://github.com/KurutoDenzeru" }],
  creator: "Kurt Calacday",
  publisher: "Password Forge",
  icons: [
    { rel: "icon", url: "/favicon.ico", sizes: "any" },
    { rel: "icon", url: "/favicon.png", type: "image/png", sizes: "32x32" },
    { rel: "icon", url: "/favicon.png", type: "image/png", sizes: "192x192" },
    { rel: "apple-touch-icon", url: "/favicon.png", sizes: "180x180" },
  ],
  openGraph: {
    title: "Password Forge – Secure, Powerful Password Generator",
    description: "Generate strong, unique passwords instantly. Free, open-source, privacy-first.",
    url: "https://password-forge.vercel.app",
    siteName: "Password Forge",
    images: [
      {
        url: "/OpenGraph.webp", // Generate a branded OG image!
        width: 1200,
        height: 630,
        alt: "Password Forge Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Password Forge – Secure, Powerful Password Generator",
    description: "Generate strong, unique passwords instantly. Free, open-source, privacy-first.",
    site: "@krtclcdy",
    creator: "@krtclcdy",
    images: ["/OpenGraph.webp"],
  },
  alternates: {
    canonical: "https://password-forge.vercel.app",
    languages: {
      "en-US": "https://password-forge.vercel.app",
    },
  },
  // manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon fallback for legacy browsers */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/favicon.png" sizes="180x180" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Password Forge",
              url: "https://password-forge.vercel.app/",
              description:
                "Password Forge is a modern, open-source password generator for strong, secure, and unique passwords.",
              applicationCategory: "SecurityApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Person",
                name: "Kurt Calacday",
                url: "https://github.com/KurutoDenzeru",
              },
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}