"use client";

import * as React from "react";
import { Moon, Sun, BarChart, CreditCard, Headphones } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Component() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
            Seremosh
          </h1>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  href="#"
                >
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Transform Your Business with Seremosh
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Unlock powerful tools and analytics to drive your success.
          </p>
          <Button size="lg" className="rounded-full">
            Get Started Now
          </Button>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Our Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart className="w-10 h-10 text-purple-500" />}
              title="Comprehensive Analytics"
              description="Gain deep insights into your business performance with our advanced analytics tools."
            />
            <FeatureCard
              icon={<CreditCard className="w-10 h-10 text-purple-500" />}
              title="Seamless Subscription Management"
              description="Easily manage your subscriptions and billing with our intuitive interface."
            />
            <FeatureCard
              icon={<Headphones className="w-10 h-10 text-purple-500" />}
              title="24/7 Customer Support"
              description="Our dedicated support team is here to help you around the clock."
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
        © 2023 Seremosh. All rights reserved.
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
