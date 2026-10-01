/* Shown while a route segment streams in (e.g. a page that fetches CMS data). */
export default function Loading() {
  return (
    <div role="status" className="flex flex-1 items-center justify-center py-32">
      <span aria-hidden className="size-8 animate-spin rounded-full border-2 border-border border-t-accent" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
