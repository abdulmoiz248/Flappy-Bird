import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "Flappy Bird",
  description: "Flappy Bird clone built with React and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
