import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Adam | Disruptor Personal Site",
  description: "A bold, industrial-themed personal website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <Navbar />
        <main className="lg:pr-[200px] flex flex-col items-center">
          {children}
        </main>
        <Sidebar />
      </body>
    </html>
  );
}
