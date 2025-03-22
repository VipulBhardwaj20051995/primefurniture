/** @jsxImportSource react */
"use client";

import { Blank } from "@/components/blank";
import { Catagories } from "@/components/catagories";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Hero2 } from "@/components/hero2";
import { Hero3 } from "@/components/hero3";
import Hero4 from "@/components/hero4";
import { Sale } from "@/components/sale";
import { AuthProvider } from "@/components/auth-provider";
import Link from "next/link";

export default function Home() {
  return (
    <AuthProvider>
      <main className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-8">Prime Furniture</h1>
        <div className="flex flex-col gap-4 w-full max-w-md">
          <Link 
            href="/auth"
            className="px-4 py-2 bg-blue-600 text-white rounded text-center"
          >
            Sign In
          </Link>
          <Link 
            href="/auth/signup"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded text-center"
          >
            Create Account
          </Link>
        </div>
      </main>
    </AuthProvider>
  );
}
