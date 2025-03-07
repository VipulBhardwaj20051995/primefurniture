"use client";

import { Amplify } from '@aws-amplify/core';
import './auth/amplify-config';  // Just import it once here

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_lNizU5HX4',
      userPoolClientId: '1grrsj5ck4p91if1ksto3dn0hp',
      identityPoolId: 'us-east-1:615a7c59-ab21-49a8-9c40-814d647c7e53',
      loginWith: {  // CRITICAL: OAuth must be inside loginWith for Gen 2
        oauth: {
          domain: 'us-east-1lnizu5hx4.auth.us-east-1.amazoncognito.com',
          scopes: ['email', 'profile', 'openid'], // "scopes" not "scope" in Gen 2
          redirectSignIn: ['https://dev.bedsflooring.com/'],  // Must be an array
          redirectSignOut: ['https://dev.bedsflooring.com/'],  // Must be an array
          responseType: "code" as "code" | "token"
        }
      }
    }
  }
};

// Configure Amplify immediately
Amplify.configure(amplifyConfig);

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}