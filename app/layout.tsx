import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zavbala.com"),
  title: "Jeremy Zabala | Software Engineer",
  description:
    "Jeremy Zabala it's a software engineer specializing in web development and design.",
  openGraph: {
    title: "Jeremy Zabala | Software Engineer",
    description: "Software engineer at Intuit. Linux enthusiast.",
    url: "https://zavbala.com",
    siteName: "zavbala.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeremy Zabala | Software Engineer",
    description: "Software engineer at Intuit. Linux enthusiast.",
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
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
