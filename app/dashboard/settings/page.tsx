import Link from "next/link";
import { SettingsForm } from "@/components/common/settingsform";
import { ChevronLeft } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground mb-8">
        Manage your account settings and set e-mail preferences.
      </p>

      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 mb-8 md:mb-0">
          <nav className="space-y-1">
            <a href="#" className="block px-3 py-2 bg-secondary rounded-md">
              Profile
            </a>
            <a
              href="#"
              className="block px-3 py-2 hover:bg-secondary rounded-md"
            >
              Account
            </a>
            <a
              href="#"
              className="block px-3 py-2 hover:bg-secondary rounded-md"
            >
              Appearance
            </a>
            <a
              href="#"
              className="block px-3 py-2 hover:bg-secondary rounded-md"
            >
              Notifications
            </a>
            <a
              href="#"
              className="block px-3 py-2 hover:bg-secondary rounded-md"
            >
              Display
            </a>
          </nav>
        </aside>
        <main className="flex-1 md:pl-8">
          <SettingsForm />
        </main>
      </div>
    </div>
  );
}
