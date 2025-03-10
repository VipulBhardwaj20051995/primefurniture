// Notice: Using .js instead of .ts to avoid TypeScript issues

// Handle environments where process.env might not be available
const config = {
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '',
  }
};

if (typeof window !== 'undefined') {
  // Import AWS Amplify dynamically to avoid SSR issues
  import('aws-amplify').then(({ Amplify }) => {
    Amplify.configure(config);
  });
}

export default config;