"use client";

import * as React from "react";
import { BarChart, CreditCard, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { AboutSection } from "@/components/common/about";

export default function Component() {
  //const { setTheme, theme } = useTheme(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const userObject = useUser();
  const user = userObject.user;
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Keep your productivity uninterrupted with moshizen
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Let our AI assistant answer your calls, so you can focus on growing
            your business.
          </p>
          <Button size="lg" className="rounded-full">
            <a href="/#pricing">Get Started Now</a>
          </Button>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">
            What moshizen can do for you
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Clock className="w-10 h-10 text-purple-500" />}
              title="More time to focus on your business"
              description="Let moshizen handle your calls, so you can focus on growing your business. Just refer cold callers to speak with your AI, all the way from picking up to figuring out the caller's purpose and aligning with your preferences."
            />
            <FeatureCard
              icon={<BarChart className="w-10 h-10 text-purple-500" />}
              title="Comprehensive Analytics"
              description="Tools to keep track of how moshizen is handling your calls. You get a full dashboard of past performance and insights into how your instructions are working, with full history of contacts. No more 'Oh I forgot so-and-so called!'"
            />
            <FeatureCard
              icon={<CreditCard className="w-10 h-10 text-purple-500" />}
              title="Straightforward Pricing"
              description="We have a pricing model that makes sense and scales with your business. Try getting someone to pick up the phone 24/7 just for $0.05 per entire call."
            />
          </div>
        </section>

        <section className="mb-16" id="pricing">
          <h3 className="text-3xl font-bold text-center mb-12">
            Simple Pricing
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Starter"
              price="$9"
              description="Perfect for individuals"
              actionUrl={`https://buy.stripe.com/fZecQ85wi7SheAMdQV?prefilled_email=${user?.primaryEmailAddress}&prefilled_phone=${user?.primaryPhoneNumber}`}
              features={[
                "20 screened calls per month",
                "Custom instructions",
                "0.10$ per call extra",
                "Email transcripts",
                "Customer Portal",
                "Analytics",
                "30-day history",
                "Email support",
              ]}
            />
            <PricingCard
              title="Pro"
              price="$19"
              description="Ideal for busy executives"
              actionUrl={`https://buy.stripe.com/fZecQ85wi7SheAMdQV?prefilled_email=${user?.primaryEmailAddress}&prefilled_phone=${user?.primaryPhoneNumber}`}
              features={[
                "50 screened calls per month",
                "Custom instructions",
                "0.05$ per call extra",
                "Email transcripts",
                "Customer Portal",
                "Analytics",
                "Unlimited history",
                "Priority email support",
              ]}
              highlighted={true}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              description="For large-scale deployments"
              actionUrl="https://maas-solutions.fi/contact"
              features={[
                "Custom limits",
                "Custom instructions",
                "Custom greeting",
                "Premium numbers",
                "Email transcripts",
                "Customer Portal with SSO",
                "Full analytics suite",
                "Custom integration",
                "Priority support",
              ]}
            />
          </div>
        </section>

        <AboutSection />

        <Card className="text-center bg-purple-100 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Ready to Elevate Your Business?
            </CardTitle>
            <CardDescription className="text-xl">
              Join thousands of satisfied customers and take your business to
              the next level.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="lg" className="rounded-full">
              <SignUpButton />
            </Button>
          </CardContent>
        </Card>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 text-center text-muted-foreground">
        © 2024 moshizen. All rights reserved.
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

interface PricingCardProps {
  title: string;
  price: string | number;
  description: string;
  features: string[];
  highlighted?: boolean;
  actionUrl?: string;
}

function PricingCard({
  title,
  price,
  description,
  features,
  highlighted = false,
  actionUrl = "/signup",
}: PricingCardProps) {
  return (
    <Card
      className={`flex flex-col ${highlighted ? "border-purple-500 border-2" : ""}`}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-4xl font-bold mb-4">
          {price}
          <span className="text-xl font-normal">/mo</span>
        </p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full ${highlighted ? "bg-purple-500 hover:bg-purple-600" : ""}`}
        >
          <SignedIn>
            <a
              href={actionUrl}
              className="w-full h-full flex items-center justify-center"
            >
              Choose Plan
            </a>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <a
                href={actionUrl}
                className="w-full h-full flex items-center justify-center"
              >
                Choose Plan
              </a>
            </SignInButton>
          </SignedOut>
        </Button>
      </CardFooter>
    </Card>
  );
}
