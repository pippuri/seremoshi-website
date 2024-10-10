import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Moshizen",
  description: "Terms and conditions for using Moshizen services",
};

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using Moshizen&apos;s services, you agree to be bound
          by these Terms of Service. If you disagree with any part of the terms,
          you may not access the service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          2. Description of Service
        </h2>
        <p className="mb-4">
          Moshizen provides an AI-powered call answering service designed to
          handle incoming calls and manage communications on behalf of
          businesses and individuals.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          3. User Responsibilities
        </h2>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your
          account and password. You agree to accept responsibility for all
          activities that occur under your account.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Privacy Policy</h2>
        <p className="mb-4">
          Your use of Moshizen is also governed by our Privacy Policy, which can
          be found{" "}
          <a href="/privacy-policy" className="text-blue-600 hover:underline">
            here
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          5. Limitation of Liability
        </h2>
        <p className="mb-4">
          Moshizen shall not be liable for any indirect, incidental, special,
          consequential or punitive damages, including without limitation, loss
          of profits, data, use, goodwill, or other intangible losses.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify or replace these Terms at any time. It
          is your responsibility to check these Terms periodically for changes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at{" "}
          <a
            href="mailto:info@maas-solutions.fi"
            className="text-blue-600 hover:underline"
          >
            info@maas-solutions.fi
          </a>
          .
        </p>
      </section>

      <p className="text-sm text-gray-600">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
