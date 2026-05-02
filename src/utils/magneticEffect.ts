/**
 * Magnetic button effect.
 * Adapted from the frontend-ux-engineer.md patterns library.
 * Makes buttons attract toward the cursor within a threshold.
 */
import gsap from 'gsap';

export interface MagneticOptions {
  /** How strongly the element follows the cursor (0–1, default 0.35) */
  strength?: number;
  /** Activation radius in pixels beyond the element bounds (default 60) */
  threshold?: number;
}

/**
 * Attaches magnetic hover behavior to an element.
 * @param element - The element to make magnetic
 * @param options - Configuration
 * @returns Cleanup function to detach all listeners
 */
export function createMagneticEffect(
  element: HTMLElement,
  options: MagneticOptions = {}
): () => void {
  const { strength = 0.35, threshold = 60 } = options;

  const handleMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const distance = Math.sqrt(distX * distX + distY * distY);
    const maxDist = Math.max(rect.width, rect.height) / 2 + threshold;

    if (distance < maxDist) {
      gsap.to(element, {
        x: distX * strength,
        y: distY * strength,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  element.addEventListener('mousemove', handleMove);
  element.addEventListener('mouseleave', handleLeave);

  return () => {
    element.removeEventListener('mousemove', handleMove);
    element.removeEventListener('mouseleave', handleLeave);
    gsap.killTweensOf(element);
  };
}
