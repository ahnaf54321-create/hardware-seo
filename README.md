# hardware-seo

Repository for turning video/podcast transcripts into SEO-ready content and
structured data, deployable to a Next.js site hosted on Vercel.

## How this works (plain-English version)

1. You paste a transcript into Claude.
2. Claude saves the raw transcript here under `transcripts/`.
3. Claude writes an optimized article, page metadata, and JSON-LD schema into
   `content/posts/<slug>/`.
4. The files get committed to GitHub.
5. Vercel sees the new commit and republishes the site automatically.

You don't need to run any git commands yourself. Just say things like
"push this" or "show me what changed" and Claude handles it.

## Folder guide

| Folder | What's in it |
| --- | --- |
| `transcripts/` | Raw, unedited source transcripts. Never published — kept so we can regenerate content later. |
| `content/posts/<slug>/` | One folder per article. Contains the article, its metadata, and its schema. |
| `components/` | Reusable React components to drop into a Next.js site (e.g. the JSON-LD injector). |
| `lib/` | Small helper functions for building metadata. |
| `templates/` | The repeatable checklist Claude follows for every new transcript, so output stays consistent. |

## Anatomy of a post folder

```
content/posts/vibe-coded-app-no-customers/
├── index.mdx        ← the article body (Markdown + JSX)
├── meta.json        ← title tag, meta description, keywords, OG tags
└── schema.jsonld    ← structured data for Google rich results
```

## Integrating into a Next.js (App Router) site

Copy `components/JsonLd.tsx` into your site's `components/` folder, then in a
page or layout:

```tsx
import JsonLd from "@/components/JsonLd";
import schema from "@/content/posts/vibe-coded-app-no-customers/schema.jsonld";
import meta from "@/content/posts/vibe-coded-app-no-customers/meta.json";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata(meta);

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      {/* render index.mdx here */}
    </>
  );
}
```

If the site is plain HTML instead of Next.js, paste the contents of
`schema.jsonld` inside a `<script type="application/ld+json">` tag in the
`<head>` and hand-write the `<title>`/`<meta>` tags from `meta.json`.

## Before publishing — checklist

- [ ] Replace every `REPLACE_ME` placeholder in `meta.json` and `schema.jsonld`
      (domain, author, publisher, logo, image URLs).
- [ ] Confirm the article topic actually fits the site's subject matter.
- [ ] Validate structured data at https://search.google.com/test/rich-results
- [ ] Confirm you have the right to republish the source material, and keep the
      attribution link intact.
