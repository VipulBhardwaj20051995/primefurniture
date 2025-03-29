"use client"; // MUST BE THE FIRST LINE (except comments)

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, fetchUserAttributes } from "@aws-amplify/auth";
import Link from "next/link";
import Image from "next/image";
import { initializeAmplify } from "@/lib/amplify-config";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [amplifyReady, setAmplifyReady] = useState(false);
  
  // Initialize Amplify on component mount
  useEffect(() => {
    const isInitialized = initializeAmplify();
    setAmplifyReady(isInitialized);
    
    if (!isInitialized) {
      setError("Authentication system is not available. Please try again later.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if Amplify is ready
    if (!amplifyReady) {
      setError("Authentication system is not ready yet. Please try again.");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      console.log("Attempting to sign in with:", email);
      
      // Sign in the user
      await signIn({
        username: email,
        password,
      });
      
      console.log("Sign in successful");
      
      // Store user information in localStorage
      localStorage.setItem("userEmail", email);
      
      // Try to get user attributes directly from Amplify
      try {
        const userAttributes = await fetchUserAttributes();
        console.log("User attributes:", userAttributes);
        
        if (userAttributes.name) {
          localStorage.setItem("userName", userAttributes.name);
        } else if (userAttributes.given_name) {
          localStorage.setItem("userName", userAttributes.given_name);
        } else {
          // If no name attributes found, use email username part
          const username = email.split('@')[0];
          localStorage.setItem("userName", username);
        }
      } catch (attributesError) {
        console.error("Could not fetch user attributes:", attributesError);
        // Use email as display name if attributes can't be retrieved
        const username = email.split('@')[0];
        localStorage.setItem("userName", username);
      }
      
      // Redirect to home page after successful login
      router.push("/");
      
    } catch (error) {
      console.error("Sign in error:", error);
      
      // More specific error handling
      if (error instanceof Error) {
        if (error.message.includes("password")) {
          setError("Incorrect password. Please try again.");
        } else if (error.message.includes("user") || error.message.includes("not found")) {
          setError("User does not exist. Please check your email or sign up.");
        } else {
          setError(error.message);
        }
      } else {
        setError("Failed to sign in. Please check your credentials and try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen md:flex">
      {/* Left panel with imagery */}
      <div className="hidden md:block md:w-1/2 bg-primary relative">
        <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20 p-12">
          <div className="text-white space-y-6 max-w-md">
            <h1 className="text-4xl font-bold tracking-tight">Maibury</h1>
            <p className="text-xl opacity-90">Welcome back to your furniture journey</p>
            <div className="h-1 w-20 bg-white"></div>
            <p className="text-sm opacity-80">Sign in to access your account, view your orders, and continue your shopping experience.</p>
          </div>
        </div>
        {/* Hero image */}
        <Image
          src="/hero.png" 
          alt="Elegant furniture showcase"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* Right panel - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gradient-to-b from-white to-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{' '}
              <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                create a new account
              </Link>
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <Link href="/auth/forgot-password" className="text-primary hover:underline">
                  Forgot your password?
                </Link>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}