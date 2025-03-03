"use client";

import React from "react";
import {
  Text,
  Heading,
  Image,
  View,
  Authenticator,
  ThemeProvider,
  Theme,
  useTheme,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import { Link } from "@heroui/link";

import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';

export const Layout = ({ children }: React.PropsWithChildren) => {
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

  // Define a custom Amplify theme
  const customTheme: Theme = {
    name: "CustomAuthTheme",
    tokens: {
      components: {
        authenticator: {
          router: {
            boxShadow: `0 0 20px ${tokens.colors.overlay["10"]}`,
            borderWidth: "0",
          },
          form: {
            padding: `${tokens.space.medium} ${tokens.space.xl}`,
          },
        },
        button: {
          primary: {
            backgroundColor: '#006FEE',
            _hover: { backgroundColor: '#338EF7' },
            _focus: { backgroundColor: '#338EF7', boxShadow: 'none'},
            _loading: { backgroundColor: '#338EF7' },
            _disabled: { backgroundColor: '#338EF7' },
            _active: { backgroundColor: '#338EF7' },
          },
          link: {
            color: '#9353D3',
            _hover: { color: '#9353D3' }
          },
        },
        fieldcontrol: {
          _focus: {
            boxShadow: `0 0 0 1px ${tokens.colors.neutral["60"]}`,
          },
        },
        tabs: {
          item: {
            color: tokens.colors.neutral["80"],
            _active: {
              borderColor: tokens.colors.neutral["100"],
              color: tokens.colors.neutral["80"],
            },
          },
        },
      },
    },
  };

  // Define reusable header/footer components
  const AuthHeader = ({ title }: { title: string }) => (
    <Heading padding={`${tokens.space.xl}`} level={4}>
      {title}
    </Heading>
  );

  const AuthFooter = ({ children }: React.PropsWithChildren) => (
    <View textAlign="center">{children}</View>
  );

  // Authenticator custom components
  const components = {
    Header() {
      return (
        <View textAlign="center" padding={tokens.space.large}>

        </View>
      );
    },
    Footer() {
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Text color={tokens.colors.neutral[80]}>&copy; All Rights Reserved</Text>
        </View>
      );
    },
    SignIn: {
      Header() {
        return <AuthHeader title="Sign in to your account" />;
      },
      Footer() {
        const { toForgotPassword } = useAuthenticator();
        return (
          <AuthFooter>
            <Link onPress={toForgotPassword} color="secondary" size="sm">
              Reset Password
            </Link>
          </AuthFooter>
        );
      },
    },
    SignUp: {
      Header() {
        return <AuthHeader title="Create a new account" />;
      },
      Footer() {
        const { toSignIn } = useAuthenticator();
        return (
          <AuthFooter>
            <Link onPress={toSignIn} color="secondary" size="sm">
              Back to Sign In
            </Link>
          </AuthFooter>
        );
      },
    },
    ConfirmSignUp: {
      Header() {
        return <AuthHeader title="Confirm your account" />;
      },
      Footer() {
        return (
          <AuthFooter>
            <Text>Need help? Contact support.</Text>
          </AuthFooter>
        );
      },
    },
    ForgotPassword: {
      Header() {
        return <AuthHeader title="Reset your password" />;
      },
      Footer() {
        return (
          <AuthFooter>
            <Text>Follow the instructions sent to your email.</Text>
          </AuthFooter>
        );
      },
    },
    ConfirmResetPassword: {
      Header() {
        return <AuthHeader title="Enter your new password" />;
      },
      Footer() {
        return (
          <AuthFooter>
            <Text>Password successfully reset!</Text>
          </AuthFooter>
        );
      },
    },
  };

  // Form field configurations
  const formFields = {
    signIn: {
      username: { placeholder: "Enter your email" },
      password: { placeholder: "Enter your password" },
    },
    signUp: {
      username: {
        label: "Username",
        order: 1
      },
      password: {
        label: "Password",
        placeholder: "Enter your password",
        isRequired: true,
        order: 2,
      },
      confirm_password: {
        label: "Confirm Password",
        placeholder: "Confirm your password",
        order: 3,
      },
    },
    forgotPassword: {
      username: { placeholder: "Enter your email" },
    },
    confirmResetPassword: {
      confirmation_code: {
        label: "Confirmation Code",
        placeholder: "Enter the code sent to your email",
        isRequired: true,
      },
      confirm_password: {
        placeholder: "Enter your new password",
      },
    },
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Authenticator
        variation="default"
        socialProviders={["google"]}
        formFields={formFields}
        components={components}
      >
        {children}
      </Authenticator>
    </ThemeProvider>
    //<>{children}</>
  );
};