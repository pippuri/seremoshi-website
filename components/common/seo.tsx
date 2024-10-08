"use client";

import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}

const SEO = ({ title, description, keywords, image }: SEOProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    {keywords && <meta name="keywords" content={keywords} />}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    {/* Open Graph */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {image && <meta property="og:image" content={image} />}
    <meta property="og:type" content="website" />
    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    {image && <meta name="twitter:image" content={image} />}
  </Head>
);

export default SEO;
