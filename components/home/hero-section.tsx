"use client";

import { Button } from "../common/button";
import { SignInButton } from "@clerk/nextjs";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-28">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Transform Your Business with Seremosh
        </h1>
        <p className="text-xl mb-8">
          Unlock powerful tools and analytics to drive your success.
        </p>
        <SignInButton mode="modal">
          <Button variant="primary" size="lg">
            Get Started Now
          </Button>
        </SignInButton>
      </div>
    </section>
  );
};

export default HeroSection;
