import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { splitText } from '../utils/textSplit';
import { createMagneticEffect } from '../utils/magneticEffect';
import './Hero.css';

/**
 * Hero Section — "The Signal"
 * Full-screen off-white canvas with massive kinetic typography.
 * Abstract SVG morphing in background, word-by-word headline reveal.
 * Magnetic CTA buttons.
 */
const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Split headline into words for stagger animation
        if (!headlineRef.current) return;
        const split = splitText(headlineRef.current, 'words');

        // Master timeline — orchestrated entrance
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          delay: 0.3,
        });

        // 1. SVG shape fades in
        tl.from(svgRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          ease: 'power2.out',
        });

        // 2. Eyebrow slides up
        tl.from(
          eyebrowRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.8'
        );

        // 3. Headline words stagger in from below (masked reveal)
        tl.from(
          split.elements,
          {
            yPercent: 110,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.35'
        );

        // 4. Sub-tagline fades in
        tl.from(
          subRef.current,
          {
            y: 16,
            opacity: 0,
            duration: 0.5,
          },
          '-=0.3'
        );

        // 5. CTA buttons scale in
        tl.from(
          [ctaPrimaryRef.current, ctaSecondaryRef.current],
          {
            y: 16,
            opacity: 0,
            scale: 0.92,
            duration: 0.5,
            stagger: 0.1,
          },
          '-=0.2'
        );

        // Background SVG continuous morph animation
        gsap.to(svgRef.current, {
          rotation: 360,
          duration: 40,
          repeat: -1,
          ease: 'none',
        });

        // Pulsing scale on the SVG
        gsap.to(svgRef.current, {
          scale: 1.15,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        return () => split.revert();
      });

      // Reduced motion: everything visible, no animation
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [
            svgRef.current,
            eyebrowRef.current,
            headlineRef.current,
            subRef.current,
            ctaPrimaryRef.current,
            ctaSecondaryRef.current,
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
      });
    },
    { scope: sectionRef }
  );

  // Magnetic effect on CTA buttons (desktop only)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const cleanups: (() => void)[] = [];
    if (ctaPrimaryRef.current)
      cleanups.push(createMagneticEffect(ctaPrimaryRef.current));
    if (ctaSecondaryRef.current)
      cleanups.push(
        createMagneticEffect(ctaSecondaryRef.current, { strength: 0.25 })
      );
    return () => cleanups.forEach((fn) => fn());
  }, []);

  const handleScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="hero section--dark" id="hero">
      {/* Abstract background SVG shape */}
      <svg
        ref={svgRef}
        className="hero__bg-shape"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent-cta)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="var(--bg-secondary)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <path
          d="M400 50C550 50 700 150 730 300C760 450 680 600 550 680C420 760 250 730 150 620C50 510 50 350 120 230C190 110 300 50 400 50Z"
          fill="url(#hero-gradient)"
        />
        <path
          d="M420 120C530 100 660 190 680 320C700 450 620 560 500 610C380 660 260 600 200 490C140 380 180 250 280 180C340 140 370 130 420 120Z"
          fill="url(#hero-gradient)"
          opacity="0.5"
        />
      </svg>

      <div className="hero__content container">
        <p ref={eyebrowRef} className="eyebrow hero__eyebrow">
          Lucas · Software Developer
        </p>

        <h1 ref={headlineRef} className="hero__headline">
          Building solutions for everyday problems.
        </h1>

        <p ref={subRef} className="hero__sub">
          React · React Native · TypeScript · Electron · SQL · Supabase
        </p>

        <div className="hero__ctas">
          <a
            ref={ctaPrimaryRef}
            href="#work"
            className="btn btn--primary"
            onClick={(e) => handleScroll(e, '#work')}
          >
            View my work <span className="btn__arrow">→</span>
          </a>
          <a
            ref={ctaSecondaryRef}
            href="#contact"
            className="btn btn--ghost"
            onClick={(e) => handleScroll(e, '#contact')}
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
