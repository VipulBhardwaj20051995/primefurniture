import { Amplify } from 'aws-amplify';

let isConfigured = false;

export function configureAmplify() {
  // Only run once and only in browser
  if (isConfigured || typeof window === 'undefined') {
    return isConfigured;
  }
  
  try {
    // These values are hardcoded for debugging. They match what you shared.
    // In production, we'd use process.env values, but for some reason they're not loading
    const config = {
      userPoolId: 'us-east-1_lNizU5HX4',
      userPoolClientId: '1grrsj5ck4p91if1ksto3dn0hp',
      region: 'us-east-1',
      authDomain: 'us-east-1lnizu5hx4.auth.us-east-1.amazoncognito.com',
      redirectSignIn: 'https://dev.bedsflooring.com/',
      redirectSignOut: 'https://dev.bedsflooring.com/'
    };
    
    // Log for debugging
    console.log('Configuring Amplify with:', {
      userPoolId: config.userPoolId,
      userPoolClientId: config.userPoolClientId,
      region: config.region
    });
    
    // Configure Amplify
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: config.userPoolId,
          userPoolClientId: config.userPoolClientId,
          loginWith: {
            email: true,
            phone: false,
            username: false,
            oauth: {
              domain: config.authDomain,
              scopes: ['email', 'profile', 'openid'],
              redirectSignIn: [config.redirectSignIn],
              redirectSignOut: [config.redirectSignOut],
              responseType: 'code'
            }
          }
        }
      },
      API: {
        GraphQL: {
          endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || '',
          region: config.region,
          defaultAuthMode: "userPool"
        }
      }
    });
    
    isConfigured = true;
    console.log('✅ Amplify successfully configured');
    return true;
  } catch (error) {
    console.error('❌ Failed to configure Amplify:', error);
    return false;
  }
}