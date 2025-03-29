import { Amplify } from "aws-amplify";
import * as crypto from 'crypto-js';

// Track initialization
let isInitialized = false;

// This function calculates the SECRET_HASH required by Cognito
export function calculateSecretHash(username: string, clientId: string, clientSecret: string): string {
  const message = username + clientId;
  const hash = crypto.HmacSHA256(message, clientSecret);
  return hash.toString(crypto.enc.Base64);
}

export function initializeAmplify() {
  // Only initialize once
  if (isInitialized) return true;
  
  // Only run in browser
  if (typeof window === "undefined") return false;
  
  try {
    console.log("Initializing Amplify...");
    
    // Your client-specific values
    const userPoolId = "us-east-1_lNizU5HX4";
    const userPoolClientId = "1grrsj5ck4p91if1ksto3dn0hp";
    const clientSecret = "YOUR_CLIENT_SECRET_HERE"; // Get this from AWS Console
    
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId,
          userPoolClientId,
          loginWith: {
            email: true
          }
        }
      }
    });
    
    // Attach client secret to window for reuse
    (window as any).awsClientInfo = {
      clientId: userPoolClientId,
      clientSecret: clientSecret
    };
    
    isInitialized = true;
    console.log("✅ Amplify initialized successfully!");
    return true;
  } catch (error) {
    console.error("❌ Failed to initialize Amplify:", error);
    return false;
  }
}

// Initialize immediately for early availability
if (typeof window !== "undefined") {
  initializeAmplify();
}