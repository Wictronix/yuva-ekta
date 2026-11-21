"use client";

import { LazyMotion } from "framer-motion";

// Components use the lightweight `m.*`; animation features load in a separate chunk.
// `strict` throws if anyone imports full `motion.*`, which would re-add ~30 KB to every page.
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
