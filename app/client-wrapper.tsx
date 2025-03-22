"use client";

import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") return;

    try {
      // Keep configuration as minimal as possible
      Amplify.configure({
        Auth: {
          Cognito: {
            userPoolId: "us-east-1_lNizU5HX4",
            userPoolClientId: "1grrsj5ck4p91if1ksto3dn0hp",
            // Absolute minimal configuration 
            loginWith: { email: true }
          }
        }
      });
      console.log("✅ Amplify configured successfully");
    } catch (error) {
      console.error("❌ Error configuring Amplify:", error);
    }
  }, []);

  return <>{children}</>;
}