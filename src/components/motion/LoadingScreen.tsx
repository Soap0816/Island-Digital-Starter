interface LoadingScreenProps {
  label: string;
}

/**
 * Brief branded intro on the first page load. Pure CSS (see `.loading-screen`
 * in globals.css) so it animates before hydration and never blocks clicks.
 * It only appears on full page loads; client-side navigation keeps the layout mounted.
 */
export function LoadingScreen({ label }: LoadingScreenProps) {
  return (
    <div
      aria-hidden="true"
      className="loading-screen pointer-events-none fixed inset-0 z-100 flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="loading-screen__mark text-display text-2xl md:text-3xl">{label}</span>
        <span className="block h-px w-24 overflow-hidden bg-border">
          <span className="loading-screen__bar block h-full w-full bg-accent" />
        </span>
      </div>
    </div>
  );
}
