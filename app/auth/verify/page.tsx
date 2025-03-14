"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmSignUp, autoSignIn } from "@aws-amplify/auth";
import Link from "next/link";
import Image from "next/image";
import { Amplify } from 'aws-amplify';

// INLINE CONFIGURATION with type assertion
Amplify.configure({
  Auth: {
    region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || '',
    userPoolClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID || '',
    oauth: {
      domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN || '',
      scope: ['email', 'profile', 'openid'],
      redirectSignIn: process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN || '',
      redirectSignOut: process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT || '',
      responseType: 'code',
    },
  } as any, // Add this type assertion to fix the error
  API: {
    GraphQL: {
      endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || '',
      region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
      defaultAuthMode: "userPool" // Use Cognito user pool authentication
    },
  },
});

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Confirm signup with verification code
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      // Redirect to login page
      router.push("/auth?verified=true");
    } catch (error) {
      console.error("Verification error:", error);
      setError((error as Error).message || "Failed to verify account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="text-gray-600 mt-2">Enter the confirmation code sent to your email</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                disabled
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50"
              />
            </div>
            
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
              <input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                placeholder="Enter verification code"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : 'shadow-sm hover:shadow'}`}
            >
              {loading ? 'Verifying...' : 'Verify Account'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Didn't receive a code?{' '}
              <button 
                className="text-primary hover:underline font-medium"
                onClick={async () => {
                  // Logic to resend verification code would go here
                  alert("Resend functionality would be implemented here");
                }}
              >
                Resend code
              </button>
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            <Link href="/auth" className="text-primary hover:underline font-medium">
              ← Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}