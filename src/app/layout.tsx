import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Eugene Cho - Software Engineer | UC Davis",
  description: "Software Engineer and UC Davis Computer Science student building multi-agent platforms, event-driven backend services, and full-stack products across healthcare, education, and pharmaceutical workflows.",
  keywords: ["Eugene Cho", "Software Engineer", "Full Stack Developer", "UC Davis", "Persist AI", "Kaiser Permanente", "AggieWorks", "React", "FastAPI", "TypeScript", "Python", "Go", "Computer Science"],
  authors: [{ name: "Eugene Cho" }],
  creator: "Eugene Cho",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eacho.me",
    title: "Eugene Cho - Software Engineer",
    description: "Software Engineer and UC Davis Computer Science student building multi-agent platforms, event-driven backend services, and full-stack products.",
    siteName: "Eugene Cho Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eugene Cho - Software Engineer",
    description: "Software Engineer and UC Davis Computer Science student building multi-agent platforms, event-driven backend services, and full-stack products.",
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
        <link rel="canonical" href="https://eacho.me" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Eugene Cho",
              "jobTitle": "Software Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Persist AI"
              },
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "University of California, Davis"
              },
              "knowsAbout": ["Software Engineering", "Web Development", "Python", "React", "TypeScript", "FastAPI", "Go", "Kafka"],
              "url": "https://eacho.me"
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.add('disable-transitions');
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  window.setTimeout(function() {
                    document.documentElement.classList.remove('disable-transitions');
                  }, 0);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
