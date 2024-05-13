import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import React from "react";
import Services from './components/services';
import Testimonials from "./components/testimonials";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green Gains",
  description: "Get your gains the green way!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Services />
        <Testimonials />
      </body>
    </html>
  );
}
