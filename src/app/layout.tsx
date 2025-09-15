// LIBRARIES
import { Inter } from "next/font/google";
// COMPONENTS
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/layout/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// TYPES
import type { Metadata } from "next";
// STYLES
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Football Dashboard App",
  description: "A comprehensive football dashboard featuring league standings, team information, player statistics, and interactive data visualizations powered by TheSportsDB API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Header />
            <main className="flex-1 p-6">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
