# Prompt to paste into Claude Code

Open a terminal in the **dynodetech.com website repository** (not the
hardware-seo repo), start Claude Code, and paste everything below the line.

---

## THE PROMPT — copy from here down

You are fixing critical SEO problems on the website in this repository. Read
this entire brief before touching any code.

### Business context

This site is **Dynode Technology** (dynodetech.com), based in San Diego. It
sells **professionally refurbished analytical laboratory instruments**:
LC-MS/MS, GC-MS, HPLC/UHPLC, and ICP-MS systems from Agilent, Shimadzu, SCIEX,
and Thermo Fisher.

Key facts that affect the work:

- The catalog is **under 100 products**. Every page can be individually
  optimized — do not build generic templated filler.
- Buyers are lab managers, procurement officers, and principal investigators at
  research institutions, hospitals, and contract labs.
- Most transactions complete **by wire transfer after a quote**, not through
  on-site checkout. Pages should support both, but the primary conversion goal
  is a quote or contact request.
- **Buyers search by manufacturer and model number** — "Agilent 6470
  refurbished," "Shimadzu LCMS-8060 price," "used Thermo Q Exactive." These
  queries convert far better than generic category terms and are much less
  competitive. This is the single most important targeting insight for this
  project.
- Current differentiators, already used in the homepage copy: transparent
  pricing, 90-day parts and labor warranty, free U.S. shipping.

### What is broken (diagnosed externally, needs confirmation in code)

An external audit found three critical problems:

**1. Every URL returns HTTP 200 with the homepage's metadata.** Requesting an
invented path like `/this-page-definitely-does-not-exist-9x7q` returned a
successful response carrying the homepage `<title>` and meta description
instead of a 404. The paths `/products` and `/instruments` did the same. This
is the signature of a single-page app with a catch-all rewrite serving one HTML
shell for every route.

**2. No body content appears in the server-rendered HTML.** Only `<head>`
metadata came back on every URL — no headings, product names, prices, or copy.
Content appears to be rendered entirely client-side. (Caveat: the audit tool
does not execute JavaScript, so confirm this yourself rather than assuming.)

**3. The site appears to be essentially unindexed.** A `site:dynodetech.com`
search returns no pages. Searches for the site's own core categories surface
only competitors.

The consequence: because every page serves the same `<title>`, no individual
product page can rank for its own model number. A page selling an Agilent 6470
has no title mentioning the Agilent 6470.

### What is already correct — do not change

- `robots.txt` is correct: `User-agent: * / Allow: / / Sitemap:
  https://dynodetech.com/sitemap.xml`. Leave it alone.
- The **homepage** title and meta description are well written and should be
  preserved as-is, or used as the style model for other pages:
  - Title: `Dynode Technology — Refurbished LC-MS, GC-MS & HPLC Instruments | San Diego`
  - Description: `Professionally refurbished analytical instruments — LC-MS/MS, GC-MS, HPLC/UHPLC and ICP-MS from Agilent, Shimadzu, SCIEX and Thermo. Priced in the open, 90-day parts & labor warranty, free U.S. shipping.`

---

## STEP 1 — Diagnose before changing anything

Report findings to me before writing code. Determine:

1. **What framework is this?** Check `package.json`, `next.config.*`,
   `vite.config.*`, `vercel.json`, and the directory layout. Specifically: is
   this Next.js (App Router `app/` or Pages Router `pages/`), a Vite/CRA SPA
   with client-side routing, Astro, Remix, or something else?
2. **Is there a catch-all rewrite?** Look in `vercel.json` for a `rewrites`
   rule sending all paths to `/index.html` or `/`. That single rule likely
   explains all three symptoms.
3. **How is page metadata currently set?** Search for `<title`, `useEffect`
   with `document.title`, `react-helmet`, `next/head`, or `export const
   metadata`. Determine whether any per-page metadata exists at all.
4. **Where does product data live?** Hardcoded arrays, JSON/MDX files, a CMS,
   or a database? Report the exact shape of a single product object — every
   field name and type.
5. **Is content server-rendered?** Run the production build locally
   (`npm run build && npm start` or the equivalent), then check whether product
   text appears in the raw HTML:
   ```
   curl -s http://localhost:3000/ | grep -i "agilent\|shimadzu\|hplc"
   ```
   Empty output means content is client-only.
6. **What does `/sitemap.xml` actually serve?** It returned binary/unparseable
   data externally — possibly gzip or a wrong content-type. Find whether it is
   static, generated, or missing, and whether it lists product URLs.
7. **What is the current URL structure for products?** Report the real route
   pattern and two or three example product URLs.

**Stop here and report all seven findings before proceeding.**

---

## STEP 2 — Fix the rendering and routing foundation

Work on a new branch named `seo-foundation`. Do not commit to main.

The requirement, regardless of framework: **every page must serve its own
unique, complete HTML from the server**, including its own `<title>`, meta
description, canonical URL, and visible body content — before any JavaScript
runs.

Choose the approach that fits what you found:

- **If Next.js with a catch-all rewrite breaking routing:** remove the rewrite
  and let the framework's file-based routing handle paths natively.
- **If Next.js App Router without per-route metadata:** add `generateMetadata`
  to every route segment, and `generateStaticParams` for product routes so all
  pages are statically generated at build time.
- **If Next.js Pages Router:** use `getStaticProps` / `getStaticPaths` with
  `next/head` per page.
- **If a Vite/CRA SPA:** this is the hard case. Migrating to Next.js App Router
  is the correct long-term fix, and with under 100 products it is very
  achievable. Before starting, present me a migration plan with an effort
  estimate and wait for approval. Do not begin a migration unprompted.

Also required:

- **Real 404s.** Invalid paths must return HTTP status 404, not 200. Add a
  proper not-found page.
- **Canonical tags.** Every page needs `<link rel="canonical">` pointing at its
  own absolute URL.
- **One `<h1>` per page**, containing that page's actual subject — the
  manufacturer and model for product pages.

---

## STEP 3 — Per-page metadata for the whole catalog

Generate metadata from real product data. Never invent specifications, prices,
model numbers, or condition claims — if a field is missing, omit it rather than
guessing.

**Product page title formula** (keep under 60 characters):

```
{Manufacturer} {Model} Refurbished {Category} | Dynode
```

Examples: `Agilent 6470 Refurbished LC-MS/MS | Dynode`,
`Shimadzu LCMS-8060 Refurbished Triple Quad | Dynode`

Front-load manufacturer and model — those are the search terms.

**Product page meta description** (140–155 characters): lead with the model and
a concrete specification, then a differentiator. Example pattern:

```
Refurbished {Manufacturer} {Model} {Category}. {Key spec}. 90-day parts & labor warranty, free U.S. shipping, price listed openly.
```

**Category page titles:**

```
Refurbished {Category} Systems — {Brands} | Dynode Technology
```

**Every page also needs** Open Graph tags (`og:title`, `og:description`,
`og:image`, `og:url`, `og:type`) and `twitter:card` set to
`summary_large_image`.

If the repo has no per-page metadata system, build a small reusable helper
rather than hand-writing tags on every page.

---

## STEP 4 — Structured data (JSON-LD)

Add JSON-LD to every relevant page. Inject via
`<script type="application/ld+json">`. Escape `<` as `<` inside the
serialized JSON to prevent tag-breakout.

**Every product page — `Product` schema.** This is the highest-value item in
the whole brief. Required properties:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Agilent 6470 Triple Quadrupole LC-MS/MS",
  "brand": { "@type": "Brand", "name": "Agilent" },
  "model": "6470",
  "sku": "<your internal SKU>",
  "description": "<real product description>",
  "image": ["<absolute image URLs>"],
  "itemCondition": "https://schema.org/RefurbishedCondition",
  "offers": {
    "@type": "Offer",
    "url": "<absolute product URL>",
    "priceCurrency": "USD",
    "price": "<numeric price, no currency symbol or commas>",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/RefurbishedCondition",
    "seller": { "@type": "Organization", "name": "Dynode Technology" }
  }
}
```

`itemCondition: RefurbishedCondition` matters — it is a differentiator Google
can display, and most competitors omit it.

If a product's price is quote-only, omit `price` and use
`"availability": "https://schema.org/InStock"` with a `priceSpecification`
only if a real number exists. Do not fabricate prices.

**Sitewide — `Organization` plus `LocalBusiness`** (San Diego address, phone,
logo, `sameAs` links to any social or directory profiles).

**Every page — `BreadcrumbList`** matching the visible navigation path.

**Category pages — `ItemList`** referencing the products shown.

**Any FAQ content — `FAQPage`**, with answers matching the visible page text
word-for-word. Never put content in schema that a user cannot see on the page.

---

## STEP 5 — Sitemap

Produce a valid `sitemap.xml` served with content-type `application/xml`,
containing every indexable URL: homepage, category pages, product pages, and
static pages. Include accurate `lastmod` values. Exclude any noindex or
utility pages. Prefer generating it at build time from the same product data
source rather than maintaining it by hand.

---

## Constraints

- Work on the `seo-foundation` branch. Do not push to main or auto-merge.
- **Do not change visual design, layout, styling, or copy tone.** This is a
  technical and metadata change. If a fix requires a visible change, ask first.
- **Do not alter prices, specifications, model numbers, warranty terms, or
  shipping claims.** Read them from existing data only.
- Do not add analytics, tracking, or third-party scripts.
- Do not install heavy dependencies without asking.
- Preserve all existing URLs. If any URL must change, add a 301 redirect from
  the old path.

---

## Acceptance criteria — verify before telling me you are done

Run the production build locally and confirm each of these:

1. **Unique titles.** Three different product pages return three different
   `<title>` values, each containing that product's manufacturer and model:
   ```
   curl -s http://localhost:3000/<product-1> | grep -o '<title>[^<]*</title>'
   curl -s http://localhost:3000/<product-2> | grep -o '<title>[^<]*</title>'
   ```
2. **Real 404.** An invalid path returns status 404:
   ```
   curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/nonexistent-test-path-9x7q
   ```
3. **Server-rendered content.** Product names appear in raw HTML with
   JavaScript disabled:
   ```
   curl -s http://localhost:3000/<product-1> | grep -i "agilent\|shimadzu\|sciex\|thermo"
   ```
4. **Valid JSON-LD.** Every product page contains a parseable
   `application/ld+json` block with `@type: Product` and a valid
   `itemCondition`.
5. **Canonicals.** Every page has exactly one `<link rel="canonical">` with an
   absolute URL matching that page.
6. **Sitemap.** `/sitemap.xml` returns valid XML listing every product URL.
7. **No regressions.** The build succeeds with no new errors, and pages render
   visually identical to before.

Then push the branch so a Vercel preview deployment is generated, and give me
the preview URL. Do not merge to main.

Finally, write a short summary of what changed, what you could not fix and why,
and any decisions where you had to guess.

## END OF PROMPT
