// lib/safe-client.ts
import { Amplify } from 'aws-amplify';

// Safe version that won't break SSR
export function configureAmplify() {
  // Safety check for SSR
  if (typeof window === 'undefined') return false;
  
  try {
    // Wrap in try/catch to prevent uncaught exceptions
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
          userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '',
          loginWith: {
            email: true,
            phone: false,
            username: false,
            // Only add OAuth if domain is configured
            ...(process.env.NEXT_PUBLIC_AUTH_DOMAIN ? {
              oauth: {
                domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
                scopes: ['email', 'profile', 'openid'],
                redirectSignIn: [process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN || ''],
                redirectSignOut: [process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT || ''],
                responseType: 'code'
              }
            } : {})
          }
        }
      },
      API: {
        GraphQL: {
          endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || '',
          region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
          defaultAuthMode: "userPool"
        }
      }
    });
    return true;
  } catch (error) {
    console.error("Failed to configure Amplify:", error);
    return false;
  }
}