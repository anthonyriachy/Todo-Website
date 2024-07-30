import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import {Providers} from '../GlobalRedux/provider';
import LayoutHeader from "./todos/components/LayoutHeader";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { //this is from next
  title: "Todo App",
  description: "Stop Procrastinating, Start Organizing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //className="dark"
  return (
    <html lang="en" > 
      <body className='' >
        <Providers>
        <LayoutHeader></LayoutHeader>
          {children}
        </Providers>
      </body>
    </html>
  );
}
