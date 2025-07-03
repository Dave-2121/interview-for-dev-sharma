import "./globals.css";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SpaceX Launch Dashboard",
  description: "List of all SpaceX launches",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Suspense>
          <main className="max-w-7xl mx-auto px-4 mt-8">{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
