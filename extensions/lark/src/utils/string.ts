export function trimTagsAndDecodeEntities(str: string): string {
  const withoutTags = str.replace(/<[^>]*>/g, "");
  return withoutTags
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}
