"use client"; // MUST BE THE FIRST LINE (except comments)

export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@aws-amplify/auth";
import { generateClient } from "@aws-amplify/api";
import Link from "next/link";
import Image from "next/image";
import { Amplify } from 'aws-amplify';

// Create a client component specifically for the parts using useSearchParams
function SignupForm() {
  const router = useRouter();
  // useSearchParams is used here safely
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Form handling logic here...
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      // Handle form submission
    }}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen md:flex">
      {/* Left panel with imagery */}
      
      {/* Right panel - Wrap the part using useSearchParams in Suspense */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gradient-to-b from-white to-gray-50">
        <Suspense fallback={<div>Loading...</div>}>
          <SignupForm />
        </Suspense>
      </div>
    </div>
  );
}