# Dynode Technology — Standalone SEO Master Brief

**For: Claude Code, working in the dynodetech.com website repository.**

This document is self-contained. It carries every piece of context needed to
run this SEO project from start to finish. There is no other conversation to
refer back to and no one to check in with except the person at the keyboard.
Read it in full before writing any code.

---

## 0. How to use this document

Work through the phases in order. Phase 1 blocks everything after it — the site
currently cannot rank at all, and no amount of content fixes that.

Each phase has concrete tasks and acceptance criteria you can verify yourself
with shell commands. Verify before moving on.

When you are genuinely uncertain, ask the human at the keyboard. Do not guess
about prices, specifications, model numbers, warranty terms, or anything else
that could become a false claim to a customer.

Work on branches. Never commit directly to main. Push branches so Vercel builds
a preview, and let the human review the preview before merging.

---

## 1. The business

**Dynode Technology** — dynodetech.com — based in San Diego, California.

Sells **professionally refurbished analytical laboratory instruments**:

- LC-MS/MS (liquid chromatography tandem mass spectrometry)
- GC-MS (gas chromatography mass spectrometry)
- HPLC / UHPLC (high performance liquid chromatography)
- ICP-MS (inductively coupled plasma mass spectrometry)

Primary manufacturers carried: **Agilent, Shimadzu, SCIEX, Thermo Fisher**.

Catalog size: **under 100 products.** This is a significant strategic
advantage — every single page can be hand-optimized. Competitors with thousands
of SKUs cannot do this.

Stated differentiators, already reflected in homepage copy:

- Transparent pricing — prices listed openly rather than "call for quote"
- 90-day parts and labor warranty
- Free U.S. shipping
- In-house verification and testing

**How money actually changes hands:** buyers may use on-site checkout, but most
transactions complete **by wire transfer following a quote**. The primary
conversion goal is therefore a quote request or direct contact, not a cart
completion. Pages should make requesting a quote frictionless and visible.

---

## 2. Who buys, and how they search

Buyers are **lab managers, procurement officers, principal investigators, and
core facility directors** at research universities, hospital and clinical labs,
contract research organizations, biotech and pharma companies, and
environmental and food-testing labs.

Characteristics that shape everything downstream:

**They are technical and specification-driven.** They know exactly what they
need. Marketing adjectives are actively counterproductive; a spec table beats a
paragraph of prose every time.

**They search by manufacturer and model number.** This is the single most
important insight in this document. Real queries look like:

- "Agilent 6470 refurbished"
- "Shimadzu LCMS-8060 price"
- "used Thermo Q Exactive"
- "SCIEX API 4000 for sale"
- "refurbished Agilent 1290 Infinity II"

These queries have high commercial intent, low competition, and convert far
better than generic category terms like "mass spectrometer for sale." A person
typing a model number has already decided what they want and is looking for a
seller.

**Secondary query patterns worth targeting:**

- Comparison: "Agilent 6470 vs 6495," "QTRAP vs triple quad"
- Application: "LC-MS for pesticide residue analysis," "GC-MS for VOC testing"
- Compatibility and parts: "ion source for [model]," "columns compatible with [model]"
- Buying-stage: "cost of refurbished LC-MS," "is refurbished lab equipment reliable"
- Local: "lab equipment San Diego," "analytical instruments California"

**Purchase cycles are long and budget-gated.** Institutional buyers work
against fiscal-year budgets and grant timelines. Someone researching in March
may purchase in September. This means capturing contact information matters
enormously — a visitor who leaves without entering a list is usually lost.

---

## 3. Competitive landscape

Searches for this site's core categories consistently surface:

| Competitor | Notes |
| --- | --- |
| GenTech Scientific | Strong category coverage, established domain |
| Conquer Scientific | Direct competitor, similar positioning |
| American Laboratory Trading | Large catalog, good category structure |
| AmpTech Instruments | Shopify-based, decent product pages |
| Spectralab Scientific | Canadian, broad catalog |
| LabX | Marketplace rather than direct competitor, but dominates listings |

**Assessment:** most of these are conventional, somewhat dated e-commerce
sites. Their advantage is domain age and accumulated backlinks, not technical
or content sophistication. None appear to be doing model-number-level
optimization, structured data with refurbished condition, or genuinely useful
free tooling.

That gap is the opportunity. It is beatable — but only after the foundational
problems in the next section are fixed.

---

## 4. Current state — what is broken

An external audit of the live site on 2026-08-01 found the following. Confirm
each in code rather than taking it on faith; the audit tool could not execute
JavaScript.

### Finding 1 — Every URL returns HTTP 200 with the homepage's metadata

Requesting the invented path `/this-page-definitely-does-not-exist-9x7q`
returned a **successful** response carrying the homepage `<title>` and meta
description rather than a 404. The paths `/products` and `/instruments`
returned the same identical metadata.

This is the signature of a **single-page application with a catch-all
rewrite** — the server hands every request the same HTML shell and JavaScript
swaps in content on the client.

Two consequences:

- **No page can rank for its own subject.** Google uses the server-delivered
  `<title>` as a primary ranking and display signal. If every page's title says
  "Dynode Technology — Refurbished LC-MS, GC-MS & HPLC Instruments | San
  Diego," then the page selling an Agilent 6470 has no title mentioning the
  Agilent 6470, and cannot rank for it.
- **Soft 404s.** Invalid URLs returning 200 lets Google index junk paths, wastes
  crawl budget, and hides broken links.

### Finding 2 — No body content in the server-rendered HTML

Across every URL fetched, only `<head>` metadata came back. No headings, no
product names, no prices, no body copy.

Caveat stated honestly: the audit tool does not run JavaScript, and Googlebot
does render JS. So this alone does not prove Google sees nothing. But rendering
is queued, delayed, and unreliable versus server-rendered HTML — and it does
nothing to fix Finding 1, which is purely server-side.

### Finding 3 — The site appears essentially unindexed

A `site:dynodetech.com` search returned no pages from the domain. Searches for
the site's own core categories surface competitors exclusively.

This is exactly what Findings 1 and 2 would produce.

### What is already correct — do not change

**`robots.txt` is correct.** Leave it alone:

```
User-agent: *
Allow: /
Sitemap: https://dynodetech.com/sitemap.xml
```

**The homepage metadata is well written.** Preserve it, and use it as the style
model for other pages:

- Title: `Dynode Technology — Refurbished LC-MS, GC-MS & HPLC Instruments | San Diego`
- Description: `Professionally refurbished analytical instruments — LC-MS/MS, GC-MS, HPLC/UHPLC and ICP-MS from Agilent, Shimadzu, SCIEX and Thermo. Priced in the open, 90-day parts & labor warranty, free U.S. shipping.`

The problem is not metadata quality. It is that there is only one set of it for
the entire site.

### Unresolved

`/sitemap.xml` returned binary or unparseable data externally — possibly gzip,
possibly a wrong content-type. Determine what it actually serves.

---

## PHASE 0 — Diagnose

Before any code changes, establish the facts and report them to the human.

1. **Framework.** Check `package.json`, `next.config.*`, `vite.config.*`,
   `vercel.json`, directory layout. Is this Next.js (App Router `app/` or Pages
   Router `pages/`), Vite/CRA SPA, Astro, Remix, or something else?
2. **Catch-all rewrite.** Look in `vercel.json` for a `rewrites` rule sending
   all paths to `/index.html` or `/`. This one rule likely explains everything.
3. **Current metadata mechanism.** Search for `<title`, `document.title`,
   `react-helmet`, `next/head`, `export const metadata`, `generateMetadata`.
   Does per-page metadata exist at all?
4. **Product data source and shape.** Hardcoded arrays, JSON/MDX files, CMS, or
   database? Report every field name and type on a single product object. This
   determines what is possible in later phases.
5. **Server rendering.** Build for production and check:
   ```
   npm run build && npm start
   curl -s http://localhost:3000/ | grep -i "agilent\|shimadzu\|hplc"
   ```
   Empty output means content is client-only.
6. **Sitemap.** Static, generated, or missing? Does it list product URLs?
7. **URL structure.** Report the real route pattern and two or three example
   product URLs.

---

## PHASE 1 — Fix the foundation (blocking)

Branch: `seo-foundation`

**Requirement:** every page must serve its own unique, complete HTML from the
server — its own `<title>`, meta description, canonical URL, and visible body
content — before any JavaScript runs.

Approach depends on Phase 0 findings:

- **Next.js with a catch-all rewrite breaking routing:** remove the rewrite and
  let file-based routing work natively.
- **Next.js App Router without per-route metadata:** add `generateMetadata` to
  every route segment, and `generateStaticParams` for product routes so all
  pages are statically generated at build time. With under 100 products, full
  static generation is ideal — fast, cheap, perfectly crawlable.
- **Next.js Pages Router:** `getStaticProps` / `getStaticPaths` with
  `next/head` per page.
- **Vite/CRA SPA:** this is the hard case. Migrating to Next.js App Router is
  the correct fix and is very achievable at this catalog size. **Present a
  migration plan with an effort estimate to the human and get approval before
  starting.** Do not begin a migration unprompted.

Also required in this phase:

- **Real 404s.** Invalid paths must return status 404. Add a proper not-found
  page.
- **Canonical tags.** Every page gets `<link rel="canonical">` with its own
  absolute URL.
- **Exactly one `<h1>` per page**, containing that page's real subject — the
  manufacturer and model on product pages.

### Phase 1 acceptance criteria

```bash
# 1. Three product pages return three DIFFERENT titles
curl -s http://localhost:3000/<product-1> | grep -o '<title>[^<]*</title>'
curl -s http://localhost:3000/<product-2> | grep -o '<title>[^<]*</title>'
curl -s http://localhost:3000/<product-3> | grep -o '<title>[^<]*</title>'

# 2. Invalid path returns 404, not 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/nonexistent-test-9x7q

# 3. Product content present in raw HTML (no JS execution)
curl -s http://localhost:3000/<product-1> | grep -i "agilent\|shimadzu\|sciex\|thermo"

# 4. Exactly one canonical per page
curl -s http://localhost:3000/<product-1> | grep -c 'rel="canonical"'
```

Do not proceed to Phase 2 until all four pass.

---

## PHASE 2 — Per-page metadata across the catalog

Generate from real product data. **Never invent specifications, prices, model
numbers, or condition claims.** If a field is missing, omit it.

### Product page title formula (under 60 characters)

```
{Manufacturer} {Model} Refurbished {Category} | Dynode
```

Examples:

- `Agilent 6470 Refurbished LC-MS/MS | Dynode`
- `Shimadzu LCMS-8060 Refurbished Triple Quad | Dynode`
- `Thermo Q Exactive Refurbished LC-MS | Dynode`

Front-load manufacturer and model. Those are the search terms. If the formula
exceeds 60 characters, drop the category before dropping the model.

### Product page meta description (140–155 characters)

```
Refurbished {Manufacturer} {Model} {Category}. {Key spec}. 90-day parts & labor warranty, free U.S. shipping, price listed openly.
```

Lead with model and a concrete specification. End with a differentiator.

### Category page titles

```
Refurbished {Category} Systems — {Brands} | Dynode Technology
```

Example: `Refurbished LC-MS/MS Systems — Agilent, SCIEX | Dynode Technology`

### Required on every page

Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) and
`twitter:card` set to `summary_large_image`.

If no per-page metadata system exists, build a small reusable helper rather
than hand-writing tags on every page.

---

## PHASE 3 — Structured data (JSON-LD)

Inject via `<script type="application/ld+json">`. Escape `<` as `<` in the
serialized JSON to prevent tag breakout.

### Product schema — highest-value item in this document

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Agilent 6470 Triple Quadrupole LC-MS/MS",
  "brand": { "@type": "Brand", "name": "Agilent" },
  "model": "6470",
  "sku": "<internal SKU>",
  "description": "<real description>",
  "image": ["<absolute image URLs>"],
  "itemCondition": "https://schema.org/RefurbishedCondition",
  "offers": {
    "@type": "Offer",
    "url": "<absolute product URL>",
    "priceCurrency": "USD",
    "price": "<numeric, no symbol or commas>",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/RefurbishedCondition",
    "seller": { "@type": "Organization", "name": "Dynode Technology" }
  }
}
```

`itemCondition: RefurbishedCondition` matters — Google can display it, and
competitors omit it. It directly reinforces the business's core positioning.

If a product is quote-only with no listed price, omit the `price` field
entirely rather than inventing one.

### Also required

- **Sitewide:** `Organization` plus `LocalBusiness` (San Diego address, phone,
  logo, `sameAs` links to social or directory profiles).
- **Every page:** `BreadcrumbList` matching the visible navigation path.
- **Category pages:** `ItemList` referencing the products shown.
- **FAQ content:** `FAQPage`, with answers matching visible page text
  word-for-word.

**Rule:** never describe content in schema that a user cannot see on the page.
Google treats that as spam and it can trigger a manual action.

Validate everything at https://search.google.com/test/rich-results

---

## PHASE 4 — Sitemap and Search Console

Produce a valid `sitemap.xml` served with content-type `application/xml`,
listing every indexable URL with accurate `lastmod` values. Generate it at
build time from the same product data source rather than maintaining it by
hand.

Then tell the human to:

1. Verify dynodetech.com in Google Search Console (free,
   search.google.com/search-console)
2. Submit the sitemap
3. Use URL Inspection on three product pages to confirm Google sees unique
   titles and rendered content

Search Console is the only reliable way to confirm the fixes worked. Without
it, this project is flying blind.

---

## PHASE 5 — Content built on the foundation

Only after Phases 1–4 pass. Priority order:

**5a. Model-number pages.** Every product in the catalog gets a genuinely
complete page: full specification table, what is included in the refurbishment,
condition detail, warranty terms, typical applications, and compatible
consumables or parts. With under 100 products this is achievable by hand and
is the highest-ROI content work available.

**5b. Comparison pages.** "Agilent 6470 vs 6495," "triple quadrupole vs QTRAP,"
"HPLC vs UHPLC." Heavily searched, genuinely useful, and the format LLMs prefer
to cite. Build these as real comparison tables with honest tradeoffs, not
thinly-disguised sales pages.

**5c. Application and protocol guides.** "Choosing an LC-MS for pesticide
residue analysis," "equipment needed for a clinical toxicology lab." These
attract early-stage buyers setting up labs, who convert into multi-instrument
quotes.

**5d. Buying-stage content.** "Is refurbished analytical equipment reliable?",
"What to check before buying a used mass spectrometer," "Refurbished vs new:
total cost of ownership." Addresses the actual objection blocking the sale.

### The programmatic SEO caveat — read before scaling

There is a well-known tactic of generating thousands of templated pages from a
dataset. **Be very careful with it here.** Google's spam policies explicitly
target scaled content abuse, and thin pages that differ only by a swapped
variable will not rank and can drag down the whole domain.

With under 100 products, the correct strategy is depth, not volume. If page
generation is used at all, it must be driven by **real specification data**
where the differentiating content is factual — compatibility matrices, spec
tables, genuine application notes. Publish 20–50, confirm they index and rank,
then consider scaling. Never publish thousands at once.

---

## PHASE 6 — Free tools (highest authority-per-effort)

This is the most underrated opportunity for this site. Lab calculators are a
proven backlink magnet — university course pages, core facility sites, and
protocol repositories link to good ones constantly. `.edu` backlinks are the
highest-authority links available in this niche, and domain authority is
exactly what this site lacks.

Candidates, roughly by value:

1. **RCF ⇄ RPM converter** — highest search volume, evergreen, universally
   linked from protocol pages.
2. **LC/GC mobile phase and buffer calculators** — bench staples.
3. **Dilution and molarity calculators** — searched daily.
4. **Instrument selection wizard** — "what LC-MS do I need for X" — doubles as
   a merchandising and lead-capture tool.
5. **Refurbished vs new TCO calculator** — directly addresses the purchase
   objection and naturally surfaces inventory.
6. **Column and consumable compatibility finder** — high commercial intent.

**Important:** keep tools free and ungated. Gating behind an email wall kills
the backlink value, which is the entire prize. Capture contact information on
the *extended* output instead — a saved configuration, a PDF spec sheet, or a
quote request.

---

## PHASE 7 — Answer engine optimization

Researchers already ask LLMs equipment questions: "what LC-MS handles pesticide
residue at ppb levels," "difference between a triple quad and a QTRAP." Being
the cited source is valuable and currently uncontested in this niche — most
competitors have marketing-copy pages that answer nothing.

What earns citations: direct factual answers near the top of the page,
specification tables (LLMs parse tables well), honest comparison content, FAQ
blocks with schema, and clear entity information about the organization.

Most of this falls out of Phases 3 and 5 done properly. The additional work is
mainly ensuring every page leads with a direct answer rather than a marketing
preamble.

---

## PHASE 8 — Capture and return

Institutional buyers research months before purchasing, gated by budget cycles.
Traffic that leaves without entering a list is usually lost permanently.

Every page from the phases above should carry a relevant capture offer — a spec
sheet, a buying guide, a quote request, an availability alert for a specific
model. Then periodic outreach timed to fiscal-year budget windows, which is
when this audience actually buys.

This is intentionally last. It only matters once there is traffic to capture.

---

## Constraints — apply to every phase

- **Branch discipline.** Work on feature branches. Never commit to main. Push
  so Vercel generates a preview; let the human review before merging.
- **Do not change visual design, layout, styling, or copy tone.** This is
  technical and metadata work. If a fix requires a visible change, ask first.
- **Never alter or invent prices, specifications, model numbers, warranty
  terms, condition claims, or shipping policies.** Read from existing data
  only. A fabricated spec on a $100,000 instrument is a serious problem, not a
  small error.
- **Preserve existing URLs.** If a URL must change, add a 301 redirect from the
  old path.
- Do not add analytics, tracking, or third-party scripts without asking.
- Do not install heavy dependencies without asking.
- Do not publish content claiming laboratory expertise the business has not
  reviewed. Scientists detect and dismiss content written by someone who has
  never run the assay — have a technically qualified person review anything
  making methodological claims.

---

## Standing verification commands

```bash
# Unique titles across pages
curl -s <url> | grep -o '<title>[^<]*</title>'

# Correct 404 status
curl -s -o /dev/null -w "%{http_code}\n" <url>/nonexistent-test-9x7q

# Server-rendered content present
curl -s <url> | grep -i "agilent\|shimadzu\|sciex\|thermo"

# Canonical present exactly once
curl -s <url> | grep -c 'rel="canonical"'

# JSON-LD present and parseable
curl -s <url> | grep -o 'application/ld+json'

# Sitemap valid
curl -s https://dynodetech.com/sitemap.xml | head -50
```

---

## The one-paragraph summary

The site currently serves the same title tag and no server-rendered content on
every URL, which is why it is effectively invisible in search. Fix the
rendering and routing so every page has its own title, description, canonical,
and crawlable content; add Product structured data with `RefurbishedCondition`;
target manufacturer and model numbers rather than generic category terms,
because that is what buyers type; build a handful of genuinely useful free lab
calculators to earn university backlinks and domain authority; then deepen
every one of the under-100 product pages. Depth over volume throughout — the
small catalog is an advantage, not a limitation.
