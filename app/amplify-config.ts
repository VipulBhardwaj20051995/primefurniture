"use client";

import { Amplify } from 'aws-amplify';

// Use environment variables for configuration
const config = {
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
  },
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      defaultAuthMode: 'userPool',
    },
  },
};

// Configure Amplify
Amplify.configure(config);

export default config;