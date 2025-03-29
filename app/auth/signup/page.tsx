"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@aws-amplify/auth";
import Link from "next/link";
import Image from "next/image";
import { initializeAmplify, calculateSecretHash } from "@/lib/amplify-config";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    
    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      console.log("Attempting signup for:", email);
      
      // Get client info from window
      const clientInfo = (window as any).awsClientInfo || {
        clientId: "1grrsj5ck4p91if1ksto3dn0hp",
        clientSecret: "YOUR_CLIENT_SECRET_HERE" // Get from AWS Console
      };
      
      // Calculate SECRET_HASH
      const secretHash = calculateSecretHash(
        email, 
        clientInfo.clientId, 
        clientInfo.clientSecret
      );
      
      // Sign up the user
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name
          },
          autoSignIn: true
        }
      });
      
      // Store user profile in localStorage
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      
      // Also store in a more persistent way - you could use a database here
      // Create a user profile API call - simulated here
      try {
        const userProfile = {
          email,
          name,
          createdAt: new Date().toISOString()
        };
        
        // Save to localStorage as a persistent store (in real app, use DB)
        const profiles = JSON.parse(localStorage.getItem("userProfiles") || "{}");
        profiles[email] = userProfile;
        localStorage.setItem("userProfiles", JSON.stringify(profiles));
      } catch (profileError) {
        console.error("Failed to save profile:", profileError);
      }
      
      console.log("Signup successful, redirecting to verification");
      
      // Redirect to verification page with email
      router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
      
    } catch (error) {
      console.error("Sign up error:", error);
      
      // More specific error handling
      if (error instanceof Error) {
        if (error.message.includes("password")) {
          setError("Password must be at least 8 characters and include uppercase letters, lowercase letters, numbers, and symbols.");
        } else if (error.message.includes("email")) {
          setError("Please provide a valid email address.");
        } else {
          setError(error.message);
        }
      } else {
        setError("Failed to create account. Please try again.");
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
            <p className="text-xl opacity-90">Join our community of design enthusiasts</p>
            <div className="h-1 w-20 bg-white"></div>
            <p className="text-sm opacity-80">Create your account to access exclusive offers and personalized recommendations.</p>
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
      
      {/* Right panel - Signup form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gradient-to-b from-white to-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth" className="text-primary hover:underline font-medium">
                Sign in
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
              {/* Name field - Add this */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              
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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {loading ? 'Creating account...' : 'Sign up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}