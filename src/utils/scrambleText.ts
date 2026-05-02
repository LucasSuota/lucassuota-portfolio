/**
 * Custom ScrambleText replacement (free alternative to GSAP Club plugin).
 * Character-by-character scramble reveal effect.
 */

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*';

export interface ScrambleOptions {
  /** Duration in milliseconds (default: 800) */
  duration?: number;
  /** Characters to use for scrambling */
  chars?: string;
  /** Callback when complete */
  onComplete?: () => void;
}

/**
 * Scramble-reveals text in an element character by character.
 * @param element - Target element to animate
 * @param finalText - The text to reveal (defaults to element's current text)
 * @param options - Configuration options
 * @returns cleanup function to cancel the animation
 */
export function scrambleText(
  element: HTMLElement,
  finalText?: string,
  options: ScrambleOptions = {}
): () => void {
  const {
    duration = 800,
    chars = SCRAMBLE_CHARS,
    onComplete,
  } = options;

  const text = finalText || element.textContent || '';
  const length = text.length;
  const startTime = performance.now();
  let animationId: number;

  function update() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // How many characters are "resolved" at this point
    const resolvedCount = Math.floor(progress * length);

    let result = '';
    for (let i = 0; i < length; i++) {
      if (text[i] === ' ') {
        result += ' ';
      } else if (i < resolvedCount) {
        result += text[i];
      } else {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    element.textContent = result;

    if (progress < 1) {
      animationId = requestAnimationFrame(update);
    } else {
      element.textContent = text;
      onComplete?.();
    }
  }

  animationId = requestAnimationFrame(update);

  return () => {
    cancelAnimationFrame(animationId);
    element.textContent = text;
  };
}

/**
 * Hook-friendly scramble that scrambles on hover and restores on leave.
 * Attach to an element's mouseenter/mouseleave events.
 */
export function createHoverScramble(element: HTMLElement): () => void {
  const originalText = element.textContent || '';
  let cleanup: (() => void) | null = null;

  const handleEnter = () => {
    if (cleanup) cleanup();
    cleanup = scrambleText(element, originalText, { duration: 500 });
  };

  const handleLeave = () => {
    if (cleanup) cleanup();
    cleanup = null;
    element.textContent = originalText;
  };

  element.addEventListener('mouseenter', handleEnter);
  element.addEventListener('mouseleave', handleLeave);

  // Return cleanup function
  return () => {
    element.removeEventListener('mouseenter', handleEnter);
    element.removeEventListener('mouseleave', handleLeave);
    if (cleanup) cleanup();
  };
}
