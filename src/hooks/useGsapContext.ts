import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { RefObject } from 'react';

/**
 * Enhanced useGSAP hook that automatically wraps everything in matchMedia
 * to handle reduced-motion accessible fallbacks, ensuring compliance
 * with the frontend-ux-engineer spec.
 */
export function useAccessibleGSAP(
  animationCallback: (context: gsap.Context, mm: gsap.MatchMedia) => void,
  fallbackCallback?: (context: gsap.Context) => void,
  dependencies: unknown[] = [],
  scope?: RefObject<Element>
) {
  useGSAP(
    (context) => {
      const mm = gsap.matchMedia();

      // Full animation branch
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        animationCallback(context, mm);
      });

      // Reduced motion branch (fallback)
      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (fallbackCallback) {
          fallbackCallback(context);
        } else {
          // If no explicit fallback provided, we just do nothing.
          // In practice, initial states should be visible in CSS
          // and GSAP just overrides them.
        }
      });

      return () => mm.revert();
    },
    { dependencies, scope }
  );
}
