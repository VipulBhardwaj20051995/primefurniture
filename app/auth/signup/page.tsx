"use client"; // MUST BE THE FIRST LINE (except comments)

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmSignUp } from "@aws-amplify/auth";
import Link from "next/link";
import Image from "next/image";
import { configureAmplify } from "../../../lib/safe-client";

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    configureAmplify();
  }, []);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    if (name === "code") setCode(value);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      router.push("/auth");
    } catch (error) {
      console.error("Verification error:", error);
      setError((error as any).message || "Failed to verify account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:flex">
      {/* Left panel - Brand imagery */}
      <div className="hidden md:block md:w-1/2 bg-primary relative">
        <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20 p-12">
          <div className="text-white space-y-6 max-w-md">
            <h1 className="text-4xl font-bold tracking-tight">Prime Furniture</h1>
            <p className="text-xl opacity-90">Join our community of design enthusiasts and furniture lovers.</p>
            <div className="h-1 w-20 bg-white"></div>
            <p className="text-sm opacity-80">Verify your account to start exploring our exclusive collection.</p>
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
      
      {/* Right panel - Verification form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gradient-to-b from-white to-gray-50">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Verify Your Account</h1>
            <p className="text-gray-600 mt-2">Enter the verification code sent to your email</p>
          </div>
          
          {/* Verification form */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Verification code field */}
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={code}
                  onChange={handleChange}
                  required
                  placeholder="Enter your verification code"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : 'shadow-sm hover:shadow'}`}
              >
                {loading ? 'Verifying...' : 'Verify Account'}
              </button>
            </form>
          </div>
          
          {/* Resend verification code */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              <Link href="/auth/resend" className="text-primary hover:underline font-medium">
                Resend Code
              </Link>
            </p>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>By verifying your account, you agree to our <Link href="/terms" className="text-primary hover:underline font-medium">Terms</Link> and <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}