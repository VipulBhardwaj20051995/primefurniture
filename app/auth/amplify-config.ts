"use client";

import { Amplify } from 'aws-amplify';

// Create a more type-safe config with guaranteed non-undefined values
const config = {
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
    // Ensure these are never undefined for TypeScript
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '',
    oauth: {
      domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || '',
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN || '',
      redirectSignOut: process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT || '',
      responseType: 'code',
    },
  },
  API: {
    GraphQL: {
      // This must be a string, not undefined
      endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || '',
      region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
      defaultAuthMode: "userPool"
    },
  },
};

// Type assertion to satisfy TypeScript
Amplify.configure({
  // Type assertion just for the Auth part
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '',
    // Other auth properties
  } as any,
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || '',
      region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
      defaultAuthMode: "userPool"
    },
  },
});

export default config;