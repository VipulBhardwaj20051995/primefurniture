"use client"; // MUST BE THE FIRST LINE (except comments)

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signInWithRedirect } from "@aws-amplify/auth";
import { generateClient } from "@aws-amplify/api";
import Link from "next/link";
import Image from "next/image";
import { Amplify } from 'aws-amplify';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [client, setClient] = useState<any>(null);

  // Configure Amplify only in useEffect
  useEffect(() => {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
          userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '',
          loginWith: {
            email: true,
            phone: false,
            username: false,
            oauth: {
              domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || '',
              scopes: ['email', 'profile', 'openid'],
              redirectSignIn: [process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN || ''],
              redirectSignOut: [process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT || ''],
              responseType: 'code'
            }
          }
        }
      },
      API: {
        GraphQL: {
          endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || '',
          region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
          defaultAuthMode: "userPool"
        }
      }
    } as any);
    
    // Create client inside useEffect
    setClient(generateClient());
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password: password,
      });
      
      if (isSignedIn) {
        router.push("/profile"); // Or wherever you want to redirect after login
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError((error as any).message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="mt-4 text-gray-600">Verifying your session...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen md:flex">
      {/* Left panel - Brand imagery */}
      <div className="hidden md:block md:w-1/2 bg-primary relative">
        <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20 p-12">
          <div className="text-white space-y-6 max-w-md">
            <h1 className="text-4xl font-bold tracking-tight">Prime Furniture</h1>
            <p className="text-xl opacity-90">Where comfort meets elegance. Sign in to explore our exclusive collection.</p>
            <div className="h-1 w-20 bg-white"></div>
            <p className="text-sm opacity-80">Premium furniture for modern living spaces, crafted with care and delivered to your doorstep.</p>
          </div>
        </div>
        <Image
          src="/hero.png" 
          alt="Elegant furniture showcase"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Right panel - Auth form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gradient-to-b from-white to-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-2">Sign in to browse our exclusive collection</p>
          </div>
          
          {/* Social Sign-in Options */}
          <div className="flex flex-col gap-4">
            {/* Google Sign-in Button - Enhanced design */}
            <button 
              onClick={async () => {
                try {
                  console.log('Attempting Google sign-in...');
                  await signInWithRedirect({ provider: 'Google' });
                } catch (error) {
                  console.error('Google sign-in error:', error);
                }
              }}
              className="flex items-center justify-center gap-3 w-full py-3.5 px-4 
                      bg-white hover:bg-gray-50 text-gray-700 font-medium 
                      rounded-lg border border-gray-300 shadow-sm 
                      transition-all duration-200 focus:outline-none focus:ring-2 
                      focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            
            <div className="flex items-center my-3">
              <div className="flex-grow h-px bg-gray-200"></div>
              <p className="mx-4 text-sm text-gray-500 font-medium">or continue with email</p>
              <div className="flex-grow h-px bg-gray-200"></div>
            </div>
          </div>
          
          {/* Email/Password Form Container - Enhanced styling */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
            <div className="mb-5">
              <h2 className="text-lg font-medium text-gray-800">Sign in with email</h2>
              <p className="text-sm text-gray-500 mt-1">Enter your credentials to access your account</p>
            </div>
            
            {/* Custom styled form - Replace or wrap AuthWrapper content */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username/Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              {/* Password field */}
              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input 
                    id="remember-me"
                    type="checkbox" 
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="/auth/forgot-password" className="text-sm text-primary hover:text-primary-dark font-medium hover:underline">
                  Forgot password?
                </a>
              </div>
              
              {/* Sign in button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow"
              >
                Sign in
              </button>
            </form>
            
            {/* Sign up option */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>By signing in, you agree to our <a href="/terms" className="text-primary hover:underline font-medium">Terms</a> and <a href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}