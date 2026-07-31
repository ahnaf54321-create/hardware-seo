/**
 * Turns a post's meta.json into a Next.js App Router `Metadata` object.
 *
 * Usage in app/blog/[slug]/page.tsx:
 *   import meta from "@/content/posts/my-post/meta.json";
 *   import { buildMetadata } from "@/lib/seo";
 *   export const metadata = buildMetadata(meta);
 *
 * The `Metadata` type import is commented out so this file also compiles in a
 * plain TypeScript or JavaScript project without Next.js installed. Uncomment
 * it once this lives inside the Next.js app.
 */

// import type { Metadata } from "next";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  canonical: string;
  keywords: string[];
  datePublished: string;
  dateModified: string;
  author: { name: string; url?: string };
  image: { url: string; alt: string; width?: number; height?: number };
  openGraph?: {
    type?: string;
    title?: string;
    description?: string;
    siteName?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    creator?: string;
  };
  robots?: { index: boolean; follow: boolean };
};

export function buildMetadata(meta: PostMeta) /*: Metadata */ {
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: meta.author.name, url: meta.author.url }],
    alternates: {
      canonical: meta.canonical,
    },
    robots: {
      index: meta.robots?.index ?? true,
      follow: meta.robots?.follow ?? true,
    },
    openGraph: {
      type: meta.openGraph?.type ?? "article",
      title: meta.openGraph?.title ?? meta.title,
      description: meta.openGraph?.description ?? meta.description,
      url: meta.canonical,
      siteName: meta.openGraph?.siteName,
      publishedTime: meta.datePublished,
      modifiedTime: meta.dateModified,
      images: [
        {
          url: meta.image.url,
          alt: meta.image.alt,
          width: meta.image.width ?? 1200,
          height: meta.image.height ?? 630,
        },
      ],
    },
    twitter: {
      card: meta.twitter?.card ?? "summary_large_image",
      title: meta.twitter?.title ?? meta.title,
      description: meta.twitter?.description ?? meta.description,
      creator: meta.twitter?.creator,
      images: [meta.image.url],
    },
  };
}

/** Guard against title/description lengths that get truncated in search results. */
export function auditMeta(meta: PostMeta): string[] {
  const warnings: string[] = [];
  if (meta.title.length > 60) {
    warnings.push(`Title is ${meta.title.length} chars — may truncate over 60.`);
  }
  if (meta.description.length < 120 || meta.description.length > 158) {
    warnings.push(
      `Description is ${meta.description.length} chars — aim for 140–155.`
    );
  }
  if (JSON.stringify(meta).includes("REPLACE_ME")) {
    warnings.push("Placeholder REPLACE_ME values still present — do not ship.");
  }
  return warnings;
}
