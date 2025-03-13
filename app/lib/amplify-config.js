import { Amplify } from 'aws-amplify';

// Use environment variables with fallbacks
Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '',
  },
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || '',
      region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
    },
  },
});