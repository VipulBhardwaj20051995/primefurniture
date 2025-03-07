import { Button } from '@aws-amplify/ui-react';
import { Amplify } from '@aws-amplify/core';
import { signInWithRedirect } from '@aws-amplify/auth';

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_lNizU5HX4',
      userPoolClientId: '1grrsj5ck4p91if1ksto3dn0hp',
      identityPoolId: 'us-east-1:615a7c59-ab21-49a8-9c40-814d647c7e53',
      loginWith: {
        oauth: {
          // CORRECT FORMAT - remove https:// 
          domain: 'us-east-1lnizu5hx4.auth.us-east-1.amazoncognito.com',
          scopes: ['email', 'profile', 'openid'],
          redirectSignIn: ['https://dev.bedsflooring.com/'],
          redirectSignOut: ['https://dev.bedsflooring.com/'],
          responseType: "code" as "code"
        }
      }
    }
  }
};

export const configureAmplify = () => {
  Amplify.configure(amplifyConfig);
};

// Initialize Amplify
configureAmplify();

function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    console.log('Google sign-in clicked');
    try {
      console.log('Attempting to redirect to Google...');
      await signInWithRedirect({ provider: 'Google' });
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Button onClick={handleGoogleSignIn} className="google-signin-button">
      Continue with Google
    </Button>
  );
}

export { GoogleSignInButton as GoogleSignInButtonComponent };

// In your actual auth page file
import { GoogleSignInButtonComponent } from './Untitled-1';

export default function AuthPage() {
  return (
    <div>
      <h2>Sign in</h2>
      <GoogleSignInButtonComponent />
    </div>
  );
}