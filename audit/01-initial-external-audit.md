# Audit 01 — Initial external audit of dynodetech.com

Date: 2026-08-01
Method: external only (no repo or analytics access yet)

## What the business actually is

Worth correcting the brief. This isn't general "biomedical laboratory
hardware" — it's **professionally refurbished analytical instrumentation**:
LC-MS/MS, GC-MS, HPLC/UHPLC, and ICP-MS from Agilent, Shimadzu, SCIEX, and
Thermo. Based in San Diego. Stated differentiators: transparent pricing, 90-day
parts and labor warranty, free U.S. shipping.

That's a narrower and more valuable niche than the original brief implied, and
it changes the keyword strategy substantially. Buyers search by manufacturer and
model number, not by generic category.

## Findings, most severe first

### 1. Every URL returns HTTP 200 with identical metadata — CRITICAL

I requested `https://dynodetech.com/this-page-definitely-does-not-exist-9x7q`,
a deliberately invented path. It returned a successful response carrying the
**homepage's** title tag and meta description rather than a 404.

The same held for `/products` and `/instruments` — both returned the identical
homepage title and description.

This is the signature of a single-page application with a catch-all rewrite:
the server hands every request the same HTML shell, and JavaScript swaps in
content on the client. Two consequences, both severe:

**Every page competes with one title tag.** Google uses the server-delivered
`<title>` and meta description as primary ranking and display signals. If all
pages share "Dynode Technology — Refurbished LC-MS, GC-MS & HPLC Instruments |
San Diego," then no individual product page can rank for its own model number.
An Agilent 6470 listing has no title that says Agilent 6470.

**Soft 404s.** Nonexistent URLs returning 200 lets Google index junk paths and
wastes crawl budget. It also means typos and dead links never signal failure.

### 2. Body content is absent from the server HTML — CRITICAL

Across every URL fetched, only `<head>` metadata came back. No headings, no
product names, no prices, no body copy.

Caveat worth stating plainly: my fetch tool does not execute JavaScript, so
this alone doesn't prove Google can't see the content — Googlebot does render
JS. But rendering is queued, delayed, and unreliable compared to server-rendered
HTML, and it does nothing to fix the shared-metadata problem in finding #1,
which is purely server-side.

### 3. The site appears to be essentially unindexed — CRITICAL

A `site:dynodetech.com` search returned no pages from the domain. Searches for
the site's own core category terms surface competitors exclusively, never
Dynode.

This is consistent with findings #1 and #2: a site where every page looks
identical to a crawler and carries no server-rendered content has very little
for Google to index.

### 4. robots.txt is correct — no action needed

```
User-agent: *
Allow: /
Sitemap: https://dynodetech.com/sitemap.xml
```

Clean. Crawling is permitted and a sitemap is declared.

### 5. sitemap.xml exists but could not be read externally

The response came back as binary rather than parseable XML — likely gzip
compression, possibly a content-type issue. Needs verification against the repo.
If the sitemap is malformed or serving the wrong content type, Google is
getting nothing useful from it.

### 6. The homepage metadata itself is well written — keep it

Genuine credit here. The title is specific, front-loads the product categories,
and includes the geography. The description names the manufacturers and leads
with concrete differentiators (open pricing, warranty, free shipping) rather
than vague positioning. Whoever wrote these has good instincts.

The problem isn't the quality of the metadata. It's that there's only one set
of it for the entire site.

## Competitive landscape

Searches for the core categories surface a consistent incumbent set:

- GenTech Scientific
- Conquer Scientific
- American Laboratory Trading
- AmpTech Instruments
- Spectralab Scientific
- LabX (marketplace, not a direct competitor but dominates listings)

Encouraging read: most of these are older, conventional e-commerce sites. None
appear to be doing anything sophisticated. Their advantage is domain age and
accumulated links, not technical or content excellence. That's beatable, but
only after the foundational problems above are fixed.

## Revised priority — this supersedes the playbook ordering

The playbook assumed a functioning site needing better content. That assumption
was wrong. The corrected order:

**Phase 0 — Fix the rendering and metadata architecture.** Every page needs its
own server-rendered title, meta description, and body content, and invalid URLs
need to return real 404s. Nothing else matters until this is done. Programmatic
SEO, free tools, and AEO all assume pages that Google can distinguish from one
another.

**Phase 1 — Per-page metadata and Product structured data** for the full
catalog. With under 100 products, every page can be hand-tuned — a real
advantage over competitors with thousands of SKUs.

**Phase 2 — Model-number and manufacturer targeting.** In this market the
highest-intent queries are model numbers ("Agilent 6470 refurbished," "Shimadzu
LCMS-8060 price"). These convert far better than category terms and are much
less competitive.

**Phase 3 onward** — the free tools, comparison content, and AEO work from the
playbook, once there's a foundation to build on.

## Open questions requiring repo or analytics access

- Is this Next.js? If so, App Router or Pages Router, and why isn't per-route
  metadata being emitted?
- Is it a Vite/CRA SPA with a Vercel catch-all rewrite?
- Where does product data live — hardcoded, CMS, or a database?
- Has the property ever been verified in Google Search Console?
