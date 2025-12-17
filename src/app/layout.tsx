import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Eugene Cho - Full Stack Software Engineer | UC Davis",
  description: "Full Stack Software Engineer at UC Davis with experience in Python, React, TypeScript, and cloud technologies. Intern at Kaiser Permanente, building scalable backend services.",
  keywords: ["Eugene Cho", "Software Engineer", "Full Stack Developer", "UC Davis", "Kaiser Permanente", "React", "Python", "TypeScript", "Web Development", "Computer Science"],
  authors: [{ name: "Eugene Cho" }],
  creator: "Eugene Cho",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eugenecho.com",
    title: "Eugene Cho - Full Stack Software Engineer",
    description: "Full Stack Software Engineer at UC Davis with experience in Python, React, TypeScript, and cloud technologies.",
    siteName: "Eugene Cho Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eugene Cho - Full Stack Software Engineer",
    description: "Full Stack Software Engineer at UC Davis with experience in Python, React, TypeScript, and cloud technologies.",
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
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111827" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://eugenecho.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Eugene Cho",
              "jobTitle": "Full Stack Software Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "University of California, Davis"
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "University of California, Davis"
              },
              "knowsAbout": ["Software Engineering", "Web Development", "Python", "React", "TypeScript", "Cloud Computing"],
              "url": "https://eugenecho.com"
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
