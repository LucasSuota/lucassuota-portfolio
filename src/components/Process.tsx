import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { processSteps } from '../data/projects';
import './Process.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Process Section — "How I Work"
 * Subtle surface background with large decorative numerals.
 * Sequential reveal on scroll.
 */
const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Heading reveal
        gsap.from('.process__header', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });

        // Steps stagger
        const steps = listRef.current?.querySelectorAll('.process__item');
        if (steps) {
          gsap.from(steps, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 75%',
            },
          });

          // Animate the large numbers specifically
          steps.forEach((step) => {
            const num = step.querySelector('.process__number');
            gsap.from(num, {
              x: -30,
              opacity: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
              },
            });
          });
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.process__header, .process__item, .process__number', {
          opacity: 1,
          y: 0,
          x: 0,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="process section section--muted" id="process">
      <div className="container process__container">
        <div className="process__header">
          <p className="eyebrow">Methodology</p>
          <h2 className="process__heading">How I Work</h2>
        </div>

        <ul ref={listRef} className="process__list">
          {processSteps.map((step) => (
            <li key={step.number} className="process__item">
              <span className="process__number" aria-hidden="true">
                {step.number}
              </span>
              <div className="process__content">
                <h3 className="process__title">{step.title}</h3>
                <p className="process__desc">{step.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Process;
