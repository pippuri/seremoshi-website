"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      // Fetch session details from your backend
      fetch(`/api/checkout-sessions/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.customer_email) {
            setEmail(data.customer_email);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching session:", err);
          setError("Failed to load session data. Please try again.");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Here you would typically send the data to your backend to create the user
    // For now, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Redirect to dashboard or show success message
    alert("Signup successful!");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Complete Your Signup</CardTitle>
          <CardDescription>
            Please fill in the remaining details to complete your account setup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  readOnly={!!email}
                />
              </div>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Complete Signup
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
