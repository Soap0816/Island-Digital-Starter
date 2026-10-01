import type { ReactNode } from "react";

import { PageTransition } from "@/components/motion";
import { siteConfig } from "@/data/site";

/* Templates remount on every navigation, so the page transition replays per route. */
export default function Template({ children }: { children: ReactNode }) {
  if (!siteConfig.features.pageTransitions) return children;
  return <PageTransition>{children}</PageTransition>;
}
