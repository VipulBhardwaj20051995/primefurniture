"use client";

import React from "react";
import {
  Text,
  Heading,
  View,
  Authenticator,
  ThemeProvider,
  Theme,
  useTheme,
  useAuthenticator,
  components,
} from "@aws-amplify/ui-react";
import { Link } from "@heroui/link";
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';

export const AuthWrapper = ({ children }: React.PropsWithChildren) => {
  I18n.putVocabularies(translations);
  I18n.setLanguage('en');
  I18n.putVocabularies({
    en: {
      'Sign In': 'Sign In',
      'Sign in': 'Sign In',
      'Sign Up': 'Sign Up ',
      'Create Account': 'Sign Up',
      'Send code': 'Send Code'
    },
  });
  const { tokens } = useTheme();

  const formFields = {
    signIn: {
      username: {
        placeholder: 'Enter your username',
      },
      password: {
        placeholder: 'Enter your password',
      },
    },
    signUp: {
      username: {
        placeholder: 'Choose a username',
      },
      password: {
        placeholder: 'Choose a password',
      },
      email: {
        placeholder: 'Enter your email',
      },
    },
  };

  const customTheme: Theme = {
    name: 'custom-theme',
    tokens: {
      colors: {
        background: {
          primary: { value: '#ffffff' },
          secondary: { value: '#f0f0f0' },
        },
        font: {
          primary: { value: '#000000' },
          secondary: { value: '#333333' },
        },
      },
    },
  };

  // Your component configurations
  // (Keep all the existing code for AuthHeader, etc.)

  return (
    <ThemeProvider theme={customTheme}>
      <Authenticator
        variation="default"
        socialProviders={["google"]}
        formFields={formFields}
      >
        {children}
      </Authenticator>
    </ThemeProvider>
  );
};