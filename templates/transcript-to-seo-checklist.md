# Transcript → SEO output checklist

The repeatable process Claude follows for every transcript dropped into this
repo. Keeping it identical across posts is what makes the site's structured
data consistent and trustworthy to search engines.

## 1. Archive the source

Save the raw transcript verbatim to `transcripts/NN-short-slug.md` with a small
front-matter block recording where it came from. Never edit the raw file — it's
the audit trail.

## 2. Determine intent and primary keyword

Ask: what would someone type into Google to end up wanting this content?
Pick exactly one primary keyword, three to five secondary keywords, and note
the search intent (informational / commercial / transactional). Everything
downstream serves the primary keyword.

## 3. Choose a slug

Lowercase, hyphenated, keyword-bearing, under ~60 characters, no stop words
where avoidable, no dates. The slug is permanent — changing it later costs
rankings and requires a redirect.

## 4. Write the article

- One `<h1>`, matching the primary keyword but readable as a real headline.
- `<h2>` sections that map to distinct sub-questions a reader has.
- Primary keyword in the first 100 words, naturally — never stuffed.
- 1,200+ words for informational posts, unless the query deserves a short answer.
- A short "quick answer" paragraph near the top for featured-snippet eligibility.
- An FAQ section of 3–6 real questions, each answered in 40–60 words. These
  become the `FAQPage` schema entries and must match the schema word-for-word.
- Internal links to related posts on the site; external links to primary sources.
- Descriptive alt text for every image.

## 5. Build `meta.json`

- `title` under 60 characters, primary keyword near the front.
- `description` 140–155 characters, written to earn a click, not to describe.
- `canonical` set to the final absolute URL.
- OG and Twitter fields filled — these control how the link previews when shared.

## 6. Build `schema.jsonld`

Use an `@graph` array so multiple types share one script tag. Standard set:

- `Article` (or `BlogPosting`) — headline, dates, author, publisher, image.
- `FAQPage` — answers copied exactly from the article's FAQ section.
- `BreadcrumbList` — helps Google render the site hierarchy in results.
- `PodcastEpisode` / `VideoObject` — only when the source really is a podcast or
  video AND that media is embedded on the page.

Never describe content in schema that isn't visible on the page. Google treats
that as spam and it can trigger a manual action.

## 7. Validate

Parse the JSON to confirm it's syntactically valid, then run the published URL
through Google's Rich Results Test before considering the post done.

## 8. Attribute

If the transcript is someone else's content, the article must be framed as
commentary/summary with a prominent link to the original. Republishing a
rewritten transcript as original content risks both a copyright problem and a
duplicate-content penalty.
