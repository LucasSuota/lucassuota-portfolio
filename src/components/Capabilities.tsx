import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { capabilities } from '../data/projects';
import type { PlatformType } from '../types';
import './Capabilities.css';

gsap.registerPlugin(ScrollTrigger);

const ACCENT_MAP: Record<PlatformType, string> = {
  web: 'var(--accent-cta)',
  mobile: 'var(--accent-olive)',
  desktop: 'var(--accent-sand)',
  data: 'var(--text-muted)',
};

const PLATFORM_ICON: Record<PlatformType, string> = {
  web: '⚡',
  mobile: '📲',
  desktop: '💻',
  data: '🗃️',
};

const PLATFORM_ICON_BG: Record<PlatformType, string> = {
  web: 'linear-gradient(135deg, rgba(196,149,106,0.15), rgba(196,149,106,0.05))',
  mobile: 'linear-gradient(135deg, rgba(107,112,89,0.15), rgba(107,112,89,0.05))',
  desktop: 'linear-gradient(135deg, rgba(166,149,124,0.15), rgba(166,149,124,0.05))',
  data: 'linear-gradient(135deg, rgba(157,161,164,0.15), rgba(157,161,164,0.05))',
};

/**
 * Capabilities Strip — "The Range"
 * Horizontal scroll section on desktop, vertical cards on mobile.
 * Dark background with floating colorful orbs.
 */
const Capabilities = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: horizontal scroll
      mm.add('(min-width: 769px) and (prefers-reduced-motion: no-preference)', () => {
        const track = trackRef.current;
        if (!track) return;

        const cards = track.querySelectorAll('.cap-card');
        const totalScrollWidth = track.scrollWidth - window.innerWidth;

        // Horizontal scroll via ScrollTrigger pin
        gsap.to(track, {
          x: -totalScrollWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${totalScrollWidth}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Stagger cards opacity
        cards.forEach((card, i) => {
          gsap.from(card, {
            opacity: 0.3,
            scale: 0.95,
            scrollTrigger: {
              trigger: card,
              containerAnimation: gsap.getById?.('horizontal') || undefined,
              start: 'left 80%',
              end: 'left 30%',
              scrub: true,
            },
            delay: i * 0.02,
          });
        });

        // Floating orbs
        const orbs = orbsRef.current?.querySelectorAll('.cap-orb');
        orbs?.forEach((orb, i) => {
          gsap.to(orb, {
            y: `${20 + i * 10}`,
            x: `${10 + i * 5}`,
            duration: 3 + i,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      });

      // Mobile: simple vertical stagger
      mm.add('(max-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.from('.cap-card', {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.cap-card', { opacity: 1, y: 0, scale: 1 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="capabilities section section--dark">
      {/* Floating decorative orbs */}
      <div ref={orbsRef} className="cap-orbs" aria-hidden="true">
        <div className="cap-orb cap-orb--green" />
        <div className="cap-orb cap-orb--purple" />
        <div className="cap-orb cap-orb--orange" />
      </div>

      <div className="cap-header container">
        <p className="eyebrow">What I Deliver</p>
        <h2 className="cap-heading">The Range</h2>
      </div>

      <div ref={trackRef} className="cap-track mt-10">
        {capabilities.map((cap, i) => (
          <div
            key={i}
            className={`cap-card cap-card--step-${i}`}
            style={{ '--cap-accent': ACCENT_MAP[cap.platform] } as React.CSSProperties}
          >
            <div
              className="cap-card__icon"
              style={{ background: PLATFORM_ICON_BG[cap.platform] }}
            >
              {PLATFORM_ICON[cap.platform]}
            </div>
            <div className="cap-card__step-number" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3 className="cap-card__title">{cap.title}</h3>
            <p className="cap-card__desc">{cap.description}</p>
            <div
              className="cap-card__accent-strip"
              style={{ backgroundColor: ACCENT_MAP[cap.platform] }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Capabilities;
