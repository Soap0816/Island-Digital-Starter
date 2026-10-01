import { motion } from "motion/react";

const elements = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  figure: motion.figure,
  p: motion.p,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
};

export type MotionElement = keyof typeof elements;

/*
 * Motion components that reveal wrappers can render as, via their `as` prop.
 * Typed as motion.div so props stay simple; we only use attributes all of them share.
 */
export const motionElements = elements as Record<MotionElement, typeof motion.div>;
