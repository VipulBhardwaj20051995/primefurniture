"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@aws-amplify/auth";
import { generateClient } from "@aws-amplify/api";
import { Schema } from "../../../amplify/data/resource";
import Link from "next/link";
import Image from "next/image";
import '../amplify-config'; // Import configuration

const client = generateClient<Schema>();

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Create Cognito user
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            email: formData.email,
            name: formData.name,
          }
        }
      });

      // 2. Save additional user details to the accountdetail table
      await client.models.AccountDetail.create({
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        userId: userId || formData.email,
        createdAt: new Date().toISOString()
      });

      // 3. Redirect to verification page or appropriate next step
      router.push(`/auth/verify?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      console.error("Sign up error:", error);
      setError(error.message || "Failed to create account. Please try again.");
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
            <p className="text-sm opacity-80">Create an account to save your favorites, track orders, and get personalized recommendations.</p>
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
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
            <p className="text-gray-600 mt-2">Join Prime Furniture to explore our exclusive collection</p>
          </div>
          
          {/* Signup form */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 transition-all duration-300 hover:shadow-lg">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-200">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a strong password"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters with letters and numbers</p>
              </div>
              
              {/* Address field */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter your street address"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              {/* City, State, Zip in one row */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="City"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="State"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    placeholder="ZIP"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
              
              {/* Terms and conditions */}
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </label>
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : 'shadow-sm hover:shadow'}`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>
          
          {/* Already have an account */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>By creating an account, you agree to our <Link href="/terms" className="text-primary hover:underline font-medium">Terms</Link> and <Link href="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}