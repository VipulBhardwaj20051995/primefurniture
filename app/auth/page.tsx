// "use client";

// import {
//   Authenticator,
//   ThemeProvider,
//   Theme,
//   useTheme,
//   useAuthenticator,
//   ColorMode
// } from "@aws-amplify/ui-react";
// import { I18n } from 'aws-amplify/utils';
// import { translations } from '@aws-amplify/ui-react';
// import React, { useEffect } from 'react';
// import { redirect } from 'next/navigation';
// import { useTheme as nextUseTheme } from "next-themes";

// export default function AuthPage() {

//   const { authStatus } = useAuthenticator(context => [context.authStatus]);
//   const { theme } = nextUseTheme()
//   const { tokens } = useTheme();
//   const [colorMode, setColorMode] = React.useState<ColorMode>();

//   I18n.putVocabularies(translations);
//   I18n.setLanguage('en');
//   I18n.putVocabularies({
//     en: {
//       'Sign in': 'Login',
//       'Sign In': 'Login',
//       'Sign In with Google': 'Login with Google',
//       'Sign Up with Google': 'Login with Google',
//       'Send code': 'Send Code',
//       'Back to Sign In': 'Back to Login',
//       'username is required to signIn': 'Email is required to login.',
//       'password is required to signIn': 'Password is required to login.',
//     },
//   });

//   // Define a custom Amplify theme
//   const customTheme: Theme = {
//     name: "CustomAuthTheme",
//     tokens: {
//       fonts: {
//         default: {
//           variable: { value: 'Raleway, sans-serif' },
//           static: { value: 'Raleway, sans-serif' },
//         },
//       },
//       colors: {
//         background: {
//           primary: colorMode === 'dark' ? '#000000' : '#f8f8f8',
//         },
//         font: {
//           primary: colorMode === 'dark' ? '#ffffff' : '#000000',
//           secondary: colorMode === 'dark' ? '#999999' : '#666666',
//           color: colorMode === 'dark' ? '#ffffff' : '#000000',
//           interactive: colorMode === 'dark' ? '#ffffff' : '#000000',
//         },
//         brand: {
//           primary: {
//             10: '#f8f8f8',
//             20: '#e5e5e5',
//             40: '#999999',
//             60: '#666666',
//             80: '#333333',
//             100: '#000000',
//           },
//         },
//       },
//       components: {
//         authenticator: {
//           router: {
//             boxShadow: `0 0 16px ${tokens.colors.overlay['10']}`,
//             borderWidth: "1px",
//             borderStyle: "solid",
//             borderColor: colorMode === 'dark' ? "#333333" : "#e5e5e5",
//             backgroundColor: colorMode === 'dark' ? '#1a1a1a' : '#ffffff',
//             //borderRadius: '16px',
//           },
//           form: {
//             padding: `${tokens.space.medium} ${tokens.space.xl} ${tokens.space.medium}`,
//           },
//         },
//         button: {
//           primary: {
//             color: { value: '#FFFFFF' },
//             backgroundColor: { value: `#006FEE` },
//             _hover: { backgroundColor: { value: colorMode === 'dark' ? '#338EF7' : '#338EF7' } },
//             _focus: { backgroundColor: { value: colorMode === 'dark' ? '#4F46E5' : '#333333' }, boxShadow: { value: 'none' } },
//             _loading: { backgroundColor: { value: colorMode === 'dark' ? '#4F46E5' : '#333333' } },
//             _disabled: { backgroundColor: { value: '#666666' } },
//             _active: { backgroundColor: { value: colorMode === 'dark' ? '#4F46E5' : '#333333' } },
//           },
//           link: {
//             color: '#9353D3',
//             _active: { 
//               color: colorMode === 'dark' ? '#9353D3' : '#9353D3', 
//               backgroundColor: '#FFFFFF'
//             },
//             _hover: {
//               color: colorMode === 'dark' ? '#9353D3' : '#9353D3',
//               backgroundColor: colorMode == 'dark' ? '#1A1A1A' : '#FFFFFF'
//             },
//           },
//         },
//         fieldcontrol: {
//           borderRadius: { value: '8px' },
//           fontSize: { value: '0.875rem' },
//           _focus: {
//             boxShadow: { value: 'none' },
//             borderColor: { value: colorMode === 'dark' ? '#ffffff' : '#000000' },
//           },
//           //_hover: {
//           //borderColor: '#666666',
//           //},
//         },
//         tabs: {
//           item: {
//             color: colorMode === 'dark' ? tokens.colors.neutral['20'] : tokens.colors.neutral['80'],
//             fontSize: '0.875rem',
//             _active: {
//               borderColor: tokens.colors.neutral['100'],
//               color: colorMode === 'dark' ? tokens.colors.neutral['20'] : tokens.colors.neutral['80'],
//             },
//             _hover: {
//               color: colorMode === 'dark' ? '#ffffff' : '#000000',
//             },
//           },
//         },
//       },
//     },
//   };

//   useEffect(() => {
//     setColorMode(theme as ColorMode);
//     if (authStatus === 'authenticated') {
//       redirect('/')
//     }
//   }, [authStatus, theme]);

//   // Form field configurations
//   const formFields = {
//     signIn: {
//       username: {
//         placeholder: "john@domain.com",
//         label: "Email",
//       },
//       password: {
//         placeholder: "••••••••",
//         label: "Password",
//       },
//     },
//     signUp: {
//       email: {
//         label: 'Email',
//         placeholder: 'john@domain.com',
//         order: 1,
//         isRequired: true
//       },
//       name: {
//         label: "Name",
//         placeholder: "John Smith",
//         isRequired: true,
//         order: 2
//       },
//       password: {
//         label: "Password",
//         placeholder: "••••••••",
//         isRequired: true,
//         order: 3,
//       },
//       confirm_password: {
//         label: "Confirm password",
//         isRequired: true,
//         placeholder: "••••••••",
//         order: 4,
//       },
//     },
//     forgotPassword: {
//       username: {
//         label: "Email",
//         placeholder: "john@domain.com"
//       },
//     },
//     confirmResetPassword: {
//       confirmation_code: {
//         label: "Verification code",
//         placeholder: "123456",
//         isRequired: true,
//       },
//       confirm_password: {
//         label: "New password",
//         placeholder: "••••••••",
//       },
//     },
//   };

//   return (
//     <ThemeProvider theme={customTheme} colorMode={colorMode}>
//       <Authenticator
//         variation="default"
//         socialProviders={["google"]}
//         formFields={formFields}
//       />
//     </ThemeProvider >
//   );
// }