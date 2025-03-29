import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { initializeAmplify } from "@/lib/amplify-config";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maibury",
  description: "Beautiful furniture for your home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Early initialization script */}
        <Script id="amplify-init" strategy="beforeInteractive">
          {`
            if (typeof window !== 'undefined') {
              console.log("Early Amplify initialization");
              // Nothing complex, just mark that we've run this early script
              window.AMPLIFY_INIT_STARTED = true;
            }
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}