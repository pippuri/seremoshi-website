"use client";

import { Button } from "../common/button";
import { SignInButton } from "@clerk/nextjs";

const CTASection = () => {
  return (
    <section className="bg-indigo-600 text-white py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to Elevate Your Business?
        </h2>
        <p className="text-lg mb-8">
          Join moshizen today and start transforming your business with our
          cutting-edge tools.
        </p>
        <SignInButton mode="modal">
          <Button variant="secondary" size="lg">
            Sign Up Now
          </Button>
        </SignInButton>
      </div>
    </section>
  );
};

export default CTASection;
