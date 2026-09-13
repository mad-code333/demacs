import type { Metadata } from "next";
import { SiteAtmosphere } from "../components/SiteAtmosphere";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import "./globals.css";

const siteDescription =
  "Rewards, leaderboards, and VIP perks when you play with Roobet code demacskick. Sign in with Kick, track the leaderboard, and follow live tournaments and bonus hunts.";

function getMetadataBase(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    const normalized = fromEnv.replace(/\/+$/, "");
    return new URL(`${normalized}/`);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}/`);
  }
  return new URL("http://localhost:3000/");
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  applicationName: "demacs",
  title: {
    default: "demacs",
    template: "%s · demacs",
  },
  description: siteDescription,
  keywords: [
    "demacs",
    "Roobet",
    "Kick",
    "leaderboard",
    "VIP rewards",
    "casino affiliate",
    "demacskick",
  ],
  authors: [{ name: "demacs" }],
  creator: "demacs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "demacs",
    title: "demacs",
    description: siteDescription,
    images: [
      {
        url: "/images/username.png",
        alt: "DEMACS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "demacs",
    description: siteDescription,
    images: ["/images/username.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="relative h-full overflow-x-hidden antialiased font-sans"
    >
      <body className="relative flex min-h-full flex-col bg-transparent font-sans font-normal antialiased">
        <SiteAtmosphere />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
