import { Amplify } from "aws-amplify";

// Track initialization
let isInitialized = false;

export function initializeAmplify() {
  // Only initialize once
  if (isInitialized) return true;
  
  // Only run in browser
  if (typeof window === "undefined") return false;
  
  try {
    console.log("Initializing Amplify...");
    
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: "us-east-1_lNizU5HX4",
          userPoolClientId: "1grrsj5ck4p91if1ksto3dn0hp",
          // IMPORTANT: Minimal configuration is better
          loginWith: {
            email: true
          }
        }
      }
    });
    
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