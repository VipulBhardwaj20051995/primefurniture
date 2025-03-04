"use client";

import { AuthWrapper } from "@/components/auth-wrapper";
import { useRouter } from "next/navigation";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useEffect } from "react";

export default function AuthPage() {
  const router = useRouter();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  
  // Redirect to home if already authenticated
  useEffect(() => {
    if (authStatus === "authenticated") {
      router.push("/");
    }
  }, [authStatus, router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <AuthWrapper>
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold">Welcome back!</h2>
            <p className="mt-2">You are now signed in.</p>
            <button 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => router.push("/")}
            >
              Go to Homepage
            </button>
          </div>
        </AuthWrapper>
      </div>
    </div>
  );
}