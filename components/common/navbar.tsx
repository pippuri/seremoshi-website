"use client";

import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
      <Link
        href="/"
        className="text-xl font-bold text-gray-900 dark:text-white"
      >
        Seremosh
      </Link>
      <div className="flex items-center space-x-4">
        <Link
          href="/pricing"
          className="text-gray-700 dark:text-gray-300 hover:underline"
        >
          Pricing
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
