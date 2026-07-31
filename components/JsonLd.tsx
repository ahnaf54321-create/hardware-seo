/**
 * Injects JSON-LD structured data into a page.
 *
 * Works in both the Next.js App Router and Pages Router. Next.js hoists
 * <script type="application/ld+json"> into the document correctly, so this
 * can be rendered anywhere in the tree.
 *
 * Usage:
 *   import JsonLd from "@/components/JsonLd";
 *   import schema from "@/content/posts/my-post/schema.jsonld";
 *
 *   <JsonLd data={schema} />
 */

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped below to prevent a closing </script>
      // sequence inside any string value from breaking out of the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
