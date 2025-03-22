"use client";

import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      Amplify.configure({
        Auth: {
          Cognito: {
            userPoolId: "us-east-1_lNizU5HX4",
            userPoolClientId: "1grrsj5ck4p91if1ksto3dn0hp",
            loginWith: {
              email: true
            }
          }
        }
      });
      console.log("Auth configured successfully");
    } catch (error) {
      console.error("Auth config error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading && typeof window !== "undefined") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}