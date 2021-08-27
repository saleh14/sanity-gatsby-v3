export default function resolveProductionUrl(document) {
  console.log({ documentSlug: document && document.slug });
  return `https://preview-sanitygatsbyv3main11892.gtsb.io/blog/${document.slug.current}`;
}
