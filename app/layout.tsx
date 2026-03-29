import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HeadStart — Professional AI Headshots in Minutes",
  description:
    "Upload a selfie, get studio-quality LinkedIn headshots powered by AI. No subscription, one-time payment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
