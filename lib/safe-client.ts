// lib/safe-client.ts
import { Amplify } from 'aws-amplify';

// Safe version that won't break SSR
export function configureAmplify() {
  // Only run configuration in browser environment
  if (typeof window !== 'undefined') {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
          userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '',
          loginWith: {
            email: true,
            phone: false,
            username: false
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
  }
  return false;
}