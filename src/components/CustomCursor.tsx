import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

/**
 * Custom cursor that replaces the default cursor on non-touch devices.
 * Follows the mouse with GSAP quickSetter for 60fps performance.
 * Expands on interactive elements, morphs state based on hover targets.
 */
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // GSAP quickSetters for high-perf updates
    const setCursorX = gsap.quickSetter(cursor, 'x', 'px');
    const setCursorY = gsap.quickSetter(cursor, 'y', 'px');
    const setFollowerX = gsap.quickSetter(follower, 'x', 'px');
    const setFollowerY = gsap.quickSetter(follower, 'y', 'px');

    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      setCursorX(mouseX);
      setCursorY(mouseY);
    };

    // Follower ring trails with lerp via GSAP ticker
    const followerPos = { x: 0, y: 0 };
    const onTick = () => {
      followerPos.x += (mouseX - followerPos.x) * 0.12;
      followerPos.y += (mouseY - followerPos.y) * 0.12;
      setFollowerX(followerPos.x);
      setFollowerY(followerPos.y);
    };

    gsap.ticker.add(onTick);
    window.addEventListener('mousemove', onMove);

    // Hover state handlers — expand cursor on interactive elements
    const interactiveSelectors =
      'a, button, .card, [data-cursor="pointer"]';
    const footerSelector = '[data-cursor="mail"]';

    const handleEnter = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.25, ease: 'power2.out' });
      gsap.to(follower, { scale: 1.8, duration: 0.35, ease: 'power2.out' });
    };

    const handleLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.25, ease: 'power2.out' });
      gsap.to(follower, { scale: 1, duration: 0.35, ease: 'power2.out' });
    };

    const handleFooterEnter = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.25, ease: 'power2.out' });
      gsap.to(follower, {
        scale: 2.5,
        duration: 0.35,
        ease: 'power2.out',
        backgroundColor: 'rgba(10, 228, 72, 0.15)',
      });
    };

    const handleFooterLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.25, ease: 'power2.out' });
      gsap.to(follower, {
        scale: 1,
        duration: 0.35,
        ease: 'power2.out',
        backgroundColor: 'transparent',
      });
    };

    // Use event delegation on body for dynamic elements
    const bindHoverListeners = () => {
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.addEventListener('mouseenter', handleEnter);
        el.addEventListener('mouseleave', handleLeave);
      });
      document.querySelectorAll(footerSelector).forEach((el) => {
        el.addEventListener('mouseenter', handleFooterEnter);
        el.addEventListener('mouseleave', handleFooterLeave);
      });
    };

    // Bind initially and re-bind on DOM changes
    bindHoverListeners();
    const observer = new MutationObserver(bindHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(onTick);
      observer.disconnect();
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
      document.querySelectorAll(footerSelector).forEach((el) => {
        el.removeEventListener('mouseenter', handleFooterEnter);
        el.removeEventListener('mouseleave', handleFooterLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor-dot" aria-hidden="true" />
      <div ref={followerRef} className="cursor-follower" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
