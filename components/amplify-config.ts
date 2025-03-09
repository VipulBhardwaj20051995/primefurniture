"use client";

import { Amplify } from 'aws-amplify';
import '../amplify-config'; // From pages directory

// Try to use amplify_outputs.json if it exists, otherwise use environment variables
let config;
try {
  // This will throw an error if the file doesn't exist
  config = require('../amplify_outputs.json');
} catch (e) {
  // Fallback configuration using environment variables
  config = {
    aws_project_region: process.env.NEXT_PUBLIC_AWS_REGION,
    aws_cognito_region: process.env.NEXT_PUBLIC_AWS_REGION,
    aws_user_pools_id: process.env.NEXT_PUBLIC_USER_POOL_ID,
    aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
    aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
    aws_appsync_region: process.env.NEXT_PUBLIC_AWS_REGION,
    aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  };
}

// Configure Amplify
Amplify.configure(config);

// No need to export a React component
export {};