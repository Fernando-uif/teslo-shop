import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Teslo shop",
  description: "E-commerce | Teslo shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
