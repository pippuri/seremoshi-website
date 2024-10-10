import Link from "next/link";
import { SettingsForm } from "@/components/common/settingsform";
import { ChevronLeft } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground mb-8">
        Manage your account settings and set e-mail preferences.
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <nav className="space-y-1">
            <a href="#" className="block px-3 py-2 bg-secondary rounded-md">
              Profile
            </a>
            <a
              href="https://account.moshizen.com"
              className="block px-3 py-2 hover:bg-secondary rounded-md"
            >
              Account
            </a>
            <a
              href="https://billing.stripe.com/p/login/aEUcPxglJ29FfWU8ww"
              className="block px-3 py-2 hover:bg-secondary rounded-md"
            >
              Subscription
            </a>
            <a
              href="#"
              className="block px-3 py-2 hover:bg-secondary rounded-md"
            >
              Notifications
            </a>
          </nav>
        </aside>
        <main className="flex-1">
          <SettingsForm />
        </main>
      </div>
    </div>
  );
}
