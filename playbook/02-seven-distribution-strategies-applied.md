# Playbook 02 — Seven distribution strategies, applied to biomedical lab hardware

Source: `transcripts/01-seven-distribution-strategies.md` (Startup Ideas
Podcast — Greg Eisenberg).

The transcript gives seven distribution strategies aimed at people shipping
software. Below, each one is assessed honestly for a B2B e-commerce site
selling biomedical laboratory hardware — including the two that don't fit well.
Applying all seven equally would be a mistake; the fit varies enormously.

Fit ratings: **Strong** / **Moderate** / **Weak** / **Speculative**

---

## Strategy 2 — Programmatic SEO — **Strong (highest leverage)**

Taking these out of transcript order, because this is the one that matters most.

The transcript's example is "best CRM for dentists." The reason this strategy
fits lab hardware unusually well is that **you already own the dataset.** Most
people attempting programmatic SEO have to scrape one together. A product
catalog with specifications, compatibilities, and part numbers *is* the
dataset, and it's first-party, accurate, and unique — which is exactly what
Google rewards and what scraped competitors can't match.

### Keyword patterns worth building

The patterns below reflect how lab buyers actually search — by specification,
application, compatibility, and part number rather than by brand slogan.

**Application → equipment.** "Centrifuge for PCR tubes," "incubator for stem
cell culture," "microscope for live cell imaging." This is the largest
pattern and maps to how a researcher thinks: they have a protocol, they need
the equipment for it.

**Protocol → equipment list.** "Equipment needed for Western blot," "ELISA
setup requirements," "cell culture lab starter equipment." These pages attract
early-stage buyers setting up a lab and convert into multi-item quote requests.

**Compatibility.** "Rotors compatible with [model]," "replacement parts for
[model]," "[consumable] for [instrument]." Extremely high commercial intent —
someone searching this has already bought the parent instrument.

**Specification.** "15,000 rpm microcentrifuge," "-80°C freezer 700L," "CO2
incubator with HEPA filtration." Buyers search literal spec strings.

**Comparison.** "[Model A] vs [Model B]." Genuinely useful and heavily
searched; also the format LLMs prefer to cite.

**Lab type.** "Clinical lab equipment," "teaching lab equipment," "core
facility equipment." Broader, top-of-funnel.

### The critical caveat the transcript understates

The transcript acknowledges that AI content "doesn't feel like AI" is a problem
you have to solve. For this market that caveat needs to be much stronger.
Google's spam policies explicitly target scaled content abuse, and scientific
purchasing content sits close enough to health-adjacent territory that quality
thresholds are higher than average. Thin, templated pages that differ only by a
swapped variable will not rank and can drag down the whole domain.

The version that works here: pages generated from **real specification data**,
where the differentiating content is factual (compatibility matrices, spec
tables, application notes) rather than reworded filler. Start with 50–100
pages, confirm they index and rank, then scale. Don't publish 10,000 pages on
day one.

---

## Strategy 3 — Free tool as top of funnel — **Strong**

This may be the single most underrated opportunity for this site, because lab
calculators are a proven backlink magnet. University course pages, core
facility sites, and protocol repositories link to good lab calculators
constantly — and `.edu` backlinks are the highest-authority links available in
this niche. This is how you build the domain authority that every other
strategy depends on.

Candidate tools, roughly ordered by likely search volume and link-earning
potential:

**RCF ⇄ RPM converter** (centrifuge speed conversion). High volume, evergreen,
and near-universally linked from protocol pages. If only one tool gets built,
this is it — and it ties directly to selling centrifuges and rotors.

**Molarity / dilution / buffer calculators.** Bench staples, searched daily.

**Cell seeding density calculator.** Ties to incubators, plates, counters.

**Rotor and adapter compatibility finder.** Doubles as a merchandising tool —
it naturally surfaces products you sell.

**Freezer / LN2 capacity planner.** Ties to cold storage, a high-ticket
category.

**Lab setup checklist generator** by lab type and budget. Captures the
highest-value buyer: someone standing up a new lab.

**Pipette calibration schedule tracker.** Recurring utility, drives return
visits.

The transcript's point about gating for email applies, but should be softened
here. Gating a calculator behind an email wall kills the backlink value, which
is the main prize. Better pattern: tool is free and ungated, with the *extended*
output — a saved configuration, a PDF spec sheet, a quote — as the capture
point.

---

## Strategy 4 — Answer engine optimization — **Strong**

Researchers and lab managers are already asking LLMs equipment questions: "what
centrifuge do I need for 15 mL conicals at 4,000 × g," "difference between a
CO2 and a tri-gas incubator." Being the cited source on those answers is
valuable and currently uncontested in this niche — most lab equipment vendors
have marketing-copy product pages that answer nothing.

What earns citations here: direct, factual answers placed near the top of the
page; specification tables (LLMs parse tables well); comparison content;
FAQ blocks with schema markup; and clear entity information about the
organization.

Structured data worth implementing sitewide: `Product` with full `offers` and
spec properties, `FAQPage` on question-shaped content, `HowTo` on protocol and
setup guides, `Organization` and `BreadcrumbList` throughout.

This overlaps heavily with the programmatic SEO work — the same spec-complete
pages serve both. That overlap is why these two strategies should be executed
together rather than sequenced.

---

## Strategy 7 — AI content repurposing engine — **Moderate**

Works, but requires a pillar-content habit that may not exist yet. The
lab-equipment version of pillar content isn't a podcast — it's application
notes, protocol guides, and equipment selection walkthroughs, ideally with
input from someone with actual bench experience.

The credibility bar in this audience is high. Scientists detect and dismiss
content written by someone who has never run the assay. Repurposing amplifies
whatever the source quality is, in both directions.

Reasonable starting point: one solid technical guide per month, repurposed into
LinkedIn posts (where lab managers and procurement actually are), a newsletter
issue, and supporting FAQ content. Skip TikTok-style short form here — wrong
audience.

---

## Strategy 1 — MCP server — **Speculative, but cheap to test**

The transcript frames this as "building for mobile in 2010." For most
e-commerce that's a stretch. For this niche it's more interesting than it first
appears: a server that lets an AI assistant query a lab equipment catalog by
specification — "find me a benchtop centrifuge that takes 50 mL conicals and
hits 4,500 × g" — is a genuinely useful thing for a researcher to have.

It's speculative because it depends on lab staff adopting AI assistants for
procurement research, which is happening but not yet standard. Treat as a small
bet, not a priority. Worth revisiting once the catalog data is clean and
structured — which the programmatic SEO work requires anyway, so the marginal
cost later is low.

---

## Strategy 6 — Buy a niche newsletter — **Moderate, capital-dependent**

Plausible. Lab management, research methods, and biotech operations newsletters
exist in the 5,000–50,000 subscriber range described in the transcript.
Acquiring one buys a direct line to exactly the right audience without the
multi-year audience-building slog.

Caveats specific to this market: audience composition matters far more than
size. Ten thousand subscribers who are graduate students have a fraction of the
value of two thousand who are lab managers and procurement officers, because
students don't hold purchasing authority. Verify subscriber composition and
engagement before valuing anything.

Not a first move. Revisit once the site's conversion rate and customer LTV are
known well enough to price an acquisition rationally.

---

## Strategy 5 — Viral artifacts — **Weak**

Honest assessment: this is the weakest fit of the seven.

Spotify Wrapped, GitHub contribution graphs, and Duolingo streaks work because
they're identity-expressive in a consumer context. Nobody screenshots their
centrifuge purchase to impress their friends. The transcript's "B2B are people
too" rebuttal is fair in general, but the shareable-artifact mechanism relies
on personal identity signaling that capital equipment procurement doesn't
produce.

The nearest viable version isn't really an artifact — it's the free tools
above. A researcher sharing a calculator link in a lab Slack channel is the
realistic sharing behavior in this market, and it's already covered under
Strategy 3. Build tools; don't force a Wrapped.

---

## What this means in practice

Three strategies do the heavy lifting and reinforce each other: programmatic
SEO builds the page inventory, free tools build the domain authority that makes
those pages rank, and AEO makes both citable by LLMs. They share the same
underlying requirement — clean, structured, first-party specification data.

That shared dependency is the actual first task, and it's why the site audit
comes before anything else.
