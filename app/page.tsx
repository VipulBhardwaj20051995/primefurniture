/** @jsxImportSource react */
"use client";

import { Blank } from "@/components/blank";
import { Catagories } from "@/components/catagories";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";import { Hero2 } from "@/components/hero2";
import { Hero3 } from "@/components/hero3";
import Hero4 from "@/components/hero4";
import { Sale } from "@/components/sale";




export default function HomePage() {

  return (
    <div className="flex flex-col">
      <Hero />
      <Sale />
      <Catagories />
      <Hero2 />
      <Hero3 />
      <Hero3 />
      <Hero4 />
      <Blank />
      <Footer />
    </div>
  );
}
