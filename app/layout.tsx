import { Providers } from "./providers";
import { AmplifyConfig } from "@/components/amplify";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Navigation } from "@/components/navigation";
import { Banner } from "@/components/banner";


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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable,
      )}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <AmplifyConfig />
          <Banner />
          <Navigation />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}