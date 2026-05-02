/**
 * Manual SplitText replacement (free alternative).
 * Wraps each word (or character) of a text node into <span> elements
 * so GSAP can stagger-animate them individually.
 */

export type SplitType = 'words' | 'chars' | 'lines';

export interface SplitResult {
  /** Array of created wrapper span elements */
  elements: HTMLSpanElement[];
  /** Reverts the split, restoring original text */
  revert: () => void;
}

/**
 * Splits the text content of an element into individually wrapped spans.
 * @param element - The target element whose text content will be split
 * @param type - How to split: 'words', 'chars', or 'lines'
 * @returns SplitResult with the wrapper elements and a revert function
 */
export function splitText(
  element: HTMLElement,
  type: SplitType = 'words'
): SplitResult {
  const original = element.innerHTML;
  const text = element.textContent || '';

  const elements: HTMLSpanElement[] = [];

  switch (type) {
    case 'chars': {
      const chars = text.split('');
      element.innerHTML = '';
      chars.forEach((char) => {
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.classList.add('split-char');
        element.appendChild(span);
        elements.push(span);
      });
      break;
    }

    case 'words': {
      const words = text.split(/\s+/);
      element.innerHTML = '';
      words.forEach((word, i) => {
        // Outer mask wrapper — clips the overflow
        const mask = document.createElement('span');
        mask.style.display = 'inline-block';
        mask.style.overflow = 'hidden';
        mask.style.verticalAlign = 'top';
        mask.classList.add('split-word-mask');

        // Inner word span — the element GSAP animates
        const span = document.createElement('span');
        span.style.display = 'inline-block';
        span.textContent = word;
        span.classList.add('split-word');

        mask.appendChild(span);
        element.appendChild(mask);

        if (i < words.length - 1) {
          element.appendChild(document.createTextNode(' '));
        }

        elements.push(span);
      });
      break;
    }

    case 'lines': {
      // Simplified: treat each <br> or newline as a line separator
      const lines = text.split(/\n/);
      element.innerHTML = '';
      lines.forEach((line) => {
        if (!line.trim()) return;
        const mask = document.createElement('span');
        mask.style.display = 'block';
        mask.style.overflow = 'hidden';
        mask.classList.add('split-line-mask');

        const span = document.createElement('span');
        span.style.display = 'block';
        span.textContent = line;
        span.classList.add('split-line');

        mask.appendChild(span);
        element.appendChild(mask);
        elements.push(span);
      });
      break;
    }
  }

  return {
    elements,
    revert: () => {
      element.innerHTML = original;
    },
  };
}
