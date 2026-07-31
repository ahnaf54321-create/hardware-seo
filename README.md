# hardware-seo

SEO working repository for a **biomedical laboratory hardware** e-commerce site
(Next.js on Vercel).

**New to this chat? Read [`HANDOFF.md`](./HANDOFF.md) first.**

## How this works (plain-English version)

1. Ali pastes a transcript of an SEO/marketing video into Claude.
2. Claude archives the raw transcript under `transcripts/`.
3. Claude extracts the *tactics* from it and translates them for this market
   into `playbook/`. The transcript content itself is never published — it's
   method input, not website content.
4. Once we have the live site, Claude turns the playbook into concrete
   deliverables: keyword targets, page metadata, structured data, and code.
5. Files get committed to GitHub; Vercel republishes automatically.

You don't need to run any git commands yourself. Just say things like
"push this" or "show me what changed" and Claude handles it.

## Folder guide

| Folder | What's in it |
| --- | --- |
| `transcripts/` | Raw, unedited source transcripts. Method input only — never published. |
| `playbook/` | Tactics extracted from the transcripts, translated for B2B lab equipment. |
| `components/` | Reusable React components to drop into a Next.js site (e.g. the JSON-LD injector). |
| `lib/` | Helper functions for building page metadata. |
| `templates/` | The repeatable checklist Claude follows, so output stays consistent. |
| `examples/` | Format demonstrations. **Not for publishing.** |

## Status

- [x] Transcript #2 archived and translated into a playbook
- [ ] Transcript #1 — not yet provided
- [ ] Live site URL — **blocking everything site-specific**
- [ ] Site repo / platform details
- [ ] Site audit
- [ ] Keyword and content plan
- [ ] Technical SEO deliverables

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
