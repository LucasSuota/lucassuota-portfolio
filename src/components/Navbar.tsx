import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { createHoverScramble } from '../utils/scrambleText';
import { createMagneticEffect } from '../utils/magneticEffect';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
];

/**
 * Floating pill navigation bar.
 * Glass morphism background, scroll-aware border/shadow.
 * Scramble text on link hover, magnetic "Hire me" button.
 * Collapses to hamburger on mobile.
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Scroll listener — toggle scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scramble effect on desktop nav links
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const cleanups: (() => void)[] = [];
    linkRefs.current.forEach((link) => {
      if (link) cleanups.push(createHoverScramble(link));
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  // Magnetic effect on CTA button
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!ctaRef.current) return;
    return createMagneticEffect(ctaRef.current, { strength: 0.3 });
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.from('.mobile-menu__link', {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.15,
      });
    } else {
      document.body.style.overflow = '';
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
    }
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <>
      <nav
        ref={navRef}
        className={`nav-pill ${scrolled ? 'nav-pill--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="#" className="nav-pill__brand">
          Lucas · Dev
        </a>

        <div className="nav-pill__links">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => { linkRefs.current[i] = el; }}
              href={link.href}
              className="nav-pill__link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          ref={ctaRef}
          href="#contact"
          className="btn btn--primary nav-pill__cta"
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Contact me <span className="btn__arrow">→</span>
        </a>

        <button
          className={`nav-toggle ${mobileOpen ? 'nav-toggle--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
          <span className="nav-toggle__bar" />
        </button>
      </nav>

      {/* Mobile Full-screen Menu */}
      <div
        ref={mobileMenuRef}
        className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mobile-menu__link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          className="btn btn--primary"
          onClick={(e) => handleNavClick(e, '#contact')}
          style={{ marginTop: '1rem' }}
        >
          Hire me <span className="btn__arrow">→</span>
        </a>
      </div>
    </>
  );
};

export default Navbar;
