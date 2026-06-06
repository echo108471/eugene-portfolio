import React from "react";

/**
 * Static-by-default layout wrappers.
 *
 * The design system keeps exactly one animated moment — the project card
 * "staging" on hover (see globals.css `.stage-card`). Everything else is
 * deliberately still: restraint reads as confidence. These components used to
 * wrap content in framer-motion `motion.div`s with no variants, which shipped
 * an animation runtime for zero motion. They are plain elements now — same API,
 * no dependency.
 */

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function Reveal({ children, ...props }: DivProps) {
  return <div {...props}>{children}</div>;
}

export function Stagger({ children, ...props }: DivProps) {
  return <div {...props}>{children}</div>;
}

export function MotionChild({ children, ...props }: DivProps) {
  return <div {...props}>{children}</div>;
}
