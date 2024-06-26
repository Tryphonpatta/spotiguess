import type { Metadata } from "next";
import { Inter } from "next/font/google";
import * as React from "react";
import BottomNav from "./component/bottomnav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-screen flex flex-col overflow-auto">
          <div className="h-full">{children}</div>
          <div className=" inset-0 flex justify-center w-full">
            <BottomNav />
          </div>
        </div>
      </body>
    </html>
  );
}
