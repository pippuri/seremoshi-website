"use client";

import { Card } from "../common/card";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const features: Feature[] = [
  {
    title: "Comprehensive Analytics",
    description:
      "Gain deep insights into your business performance with our advanced analytics tools.",
    icon: CheckCircleIcon,
  },
  {
    title: "Seamless Subscription Management",
    description:
      "Easily manage your subscriptions and billing with our intuitive interface.",
    icon: CheckCircleIcon,
  },
  {
    title: "24/7 Customer Support",
    description:
      "Our dedicated support team is here to help you around the clock.",
    icon: CheckCircleIcon,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <feature.icon className="h-8 w-8 text-indigo-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
