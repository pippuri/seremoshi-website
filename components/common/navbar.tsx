"use client";

import * as React from "react";
import { BrainCog, ChartBarIcon, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { MoshizenLogo } from "./moshizen-logo";

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavItems = () => (
    <>
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
      <NavigationMenuItem>
        <Link href="/#pricing" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/#about" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            About
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/dashboard" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Dashboard
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Link
                label="Dashboard"
                labelIcon={<ChartBarIcon />}
                href="/dashboard"
              />
              <UserButton.Link
                label="AI Settings"
                labelIcon={<BrainCog />}
                href="/dashboard/settings"
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </NavigationMenuItem>
    </>
  );

  return (
    <header className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <a href="/">
          <MoshizenLogo />
        </a>
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavItems />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <NavigationMenu className="flex flex-col space-y-2">
            <NavigationMenuList className="flex flex-col space-y-2">
              <NavItems />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </header>
  );
}
