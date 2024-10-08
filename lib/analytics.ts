"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import * as gtag from "./gtag";

export const useGoogleAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    gtag.pageview(pathname);
  }, [pathname]);
};
