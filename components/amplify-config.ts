"use client";

import { Amplify } from 'aws-amplify';
import config from '../app/amplify-config';

// Configure Amplify
Amplify.configure(config);

// In app/auth/page.tsx
import '../amplify-config';

// In app/auth/signup/page.tsx
import '../amplify-config';

// In app/auth/verify/page.tsx
import '../amplify-config';

// No need to export a React component
export default config;