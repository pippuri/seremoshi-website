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

export default function Component() {
  //const { setTheme, theme } = useTheme(); // eslint-disable-line @typescript-eslint/no-unused-vars

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
              description="Let moshizen handle your calls, so you can focus on growing your business."
            />
            <FeatureCard
              icon={<BarChart className="w-10 h-10 text-purple-500" />}
              title="Comprehensive Analytics"
              description="Tools to keep track of how moshizen is handling your calls."
            />
            <FeatureCard
              icon={<CreditCard className="w-10 h-10 text-purple-500" />}
              title="Straightforward Pricing"
              description="We have a pricing model that makes sense and scales with your business."
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
              price="$2"
              description="Perfect for individuals"
              actionUrl="/signup?plan=starter"
              features={[
                "50 AI-answered calls per month",
                "Custom instructions",
                "0.01$ per call extra",
                "Email transcripts",
                "Customer Portal",
                "Analytics",
                "Email support",
              ]}
            />
            <PricingCard
              title="Pro"
              price="$19"
              description="Ideal for busy executives"
              actionUrl="/signup?plan=pro"
              features={[
                "200 AI-answered calls per month",
                "Custom instructions",
                "0.01$ per call extra",
                "Email transcripts",
                "Customer Portal",
                "Analytics",
                "Priority email support",
              ]}
              highlighted={true}
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              description="For large-scale operations"
              actionUrl="https://maas-solutions.fi/contact"
              features={[
                "Custom limits",
                "Custom instructions",
                "Custom greeting",
                "Email transcripts",
                "Customer Portal with SSO",
                "Full analytics suite",
                "Custom integration",
                "Priority support",
              ]}
            />
          </div>
        </section>

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
              Start Your Free Trial
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

function FeatureCard({ icon, title, description }) {
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

function PricingCard({
  title,
  price,
  description,
  features,
  highlighted = false,
  actionUrl = "/signup",
}) {
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
          <a
            href={actionUrl}
            className="w-full h-full flex items-center justify-center"
          >
            Choose Plan
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
