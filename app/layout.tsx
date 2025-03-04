import { Inter } from "next/font/google";
import "../styles/globals.css"; 
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ClientLayout from "../components/client-layout";
import { Banner } from "@/components/banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Banner />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}