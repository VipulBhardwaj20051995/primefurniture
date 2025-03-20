// lib/safe-client.ts
import { Amplify } from 'aws-amplify';

// Safe version that won't break SSR
export function configureAmplify() {
  // Only run in browser
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
            // Remove oauth configuration entirely if not using social logins
            // Only uncomment this if you're actually using OAuth providers
            /*
            oauth: {
              domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || '',
              scopes: ['email', 'profile', 'openid'],
              redirectSignIn: [process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN || ''],
              redirectSignOut: [process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT || ''],
              responseType: 'code'
            }
            */
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
    } as any);
    return true;
  } catch (error) {
    console.error("Failed to configure Amplify:", error);
    return false;
  }
}