"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import './auth/amplify-config';
import { siteConfig } from "@/config/site";
import { Providers } from "./providers";
import ClientLayout from "../components/client-layout";
import { Suspense, useEffect, useState } from "react";
import { Amplify } from "aws-amplify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [amplifyInitialized, setAmplifyInitialized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      // Configure with client-side check to prevent SSR errors
      Amplify.configure({
        Auth: {
          Cognito: {
            userPoolId: "us-east-1_lNizU5HX4",
            userPoolClientId: "1grrsj5ck4p91if1ksto3dn0hp",
            loginWith: {
              email: true, 
              phone: false,
              username: false
              // Important: REMOVE oauth config completely
            }
          }
        },
        API: {
          GraphQL: {
            endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || "",
            region: "us-east-1",
            defaultAuthMode: "userPool"
          }
        }
      });
      
      setAmplifyInitialized(true);
      console.log("Amplify initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Amplify:", error);
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* Show loading state while Amplify initializes */}
          {!amplifyInitialized && typeof window !== "undefined" ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-pulse">Initializing application...</div>
            </div>
          ) : (
            <ClientLayout>{children}</ClientLayout>
          )}
        </Providers>
      </body>
    </html>
  );
}