import { ArrowRight, Shield, Rocket, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AboutSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">About moshizen</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're empowering professionals to focus on what they do best. No
            hassle, no distractions. Fair and transparent pricing.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <AboutCard
            icon={<Clock className="w-10 h-10 text-purple-500" />}
            title="Your time matters"
            description="No more 'I just want 5 minutes of your time'. Just refer cold callers to speak with your AI."
          />
          <AboutCard
            icon={<Shield className="w-10 h-10 text-purple-500" />}
            title="Secure & Reliable"
            description="Rest easy knowing your data is protected by state-of-the-art security measures."
          />
          <AboutCard
            icon={<Rocket className="w-10 h-10 text-purple-500" />}
            title="Scalable Solutions"
            description="Grow your business with confidence using our scalable infrastructure."
          />
        </div>
      </div>
    </section>
  );
}

function AboutCard({ icon, title, description }) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
