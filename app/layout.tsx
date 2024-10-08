import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/common/navbar";
import Script from "next/script";
import { GA_TRACKING_ID } from "../lib/gtag";
import Analytics from "../components/common/Analytics";
import { Footer } from "@/components/common/footer";

export const metadata: Metadata = {
  title: "moshizen",
  description: "Your AI-powered telephone receptionist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Script id="iubenda-cookie-consent" strategy="afterInteractive">
          {`
              var _iub = _iub || [];
              _iub.csConfiguration = {"siteId":3793871,"cookiePolicyId":30680630,"lang":"en","storage":{"useSiteId":true}};
          `}
        </Script>
        <Script
          id="uibenda-autoblocking"
          src="https://cs.iubenda.com/autoblocking/3793871.js"
          strategy="afterInteractive"
        ></Script>
        <Script
          id="uibenda-gpp"
          src="//cdn.iubenda.com/cs/gpp/stub.js"
          strategy="afterInteractive"
        ></Script>
        <Script
          id="uibenda-cs"
          src="//cdn.iubenda.com/cs/iubenda_cs.js"
          strategy="afterInteractive"
        ></Script>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body>
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <Analytics />
            {children}
          </ThemeProvider>
        </ClerkProvider>
        <Footer />
      </body>
    </html>
  );
}
