import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { createHoverScramble } from '../utils/scrambleText';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Footer Section — "Let's Build"
 * Massive typography with underline reveal or scramble effect.
 * Social links with scramble on hover.
 */
const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const socialRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        });

        // Eyebrow and subtitle
        tl.from('.footer__eyebrow, .footer__sub', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
        });

        // Headline scale/clip reveal
        tl.from(
          headlineRef.current,
          {
            yPercent: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            clipPath: 'inset(0 0 100% 0)',
          },
          '-=0.4'
        );

        // Social row
        tl.from(
          '.footer__social-link',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.6'
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          '.footer__eyebrow, .footer__sub, .footer__social-link',
          { opacity: 1, y: 0 }
        );
        gsap.set(headlineRef.current, { opacity: 1, yPercent: 0, clipPath: 'none' });
      });
    },
    { scope: sectionRef }
  );

  // Scramble effect on social links
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const cleanups: (() => void)[] = [];
    socialRefs.current.forEach((link) => {
      if (link) cleanups.push(createHoverScramble(link));
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <footer ref={sectionRef} className="footer section" id="contact" data-cursor="mail">
      <div className="container footer__container">
        <p className="eyebrow footer__eyebrow">Ready to start?</p>

        <h2 ref={headlineRef} className="footer__headline">
          Let's build<br />
          something.
        </h2>

        <p className="footer__sub">
          Open to freelance, full-time, and interesting problems.
        </p>

        <div className="footer__socials">
          <a
            ref={(el) => { socialRefs.current[0] = el; }}
            href="mailto:lucassuotass@gmail.com"
            className="footer__social-link"
          >
            lucassuotass@gmail.com
          </a>
          <a
            ref={(el) => { socialRefs.current[1] = el; }}
            href="https://github.com/lucassuota"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
          >
            GitHub
          </a>
          <a
            ref={(el) => { socialRefs.current[2] = el; }}
            href="https://linkedin.com/in/lucas-suota-91b83b222"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__social-link"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
