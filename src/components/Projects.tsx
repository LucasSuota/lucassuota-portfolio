import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '../data/projects';
import type { PlatformType, Project } from '../types';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const ACCENT_MAP: Record<PlatformType, string> = {
  web: 'var(--accent-cta)',
  mobile: 'var(--accent-olive)',
  desktop: 'var(--accent-sand)',
  data: 'var(--text-muted)',
};

const PLATFORM_LABEL: Record<PlatformType, string> = {
  web: 'Web',
  mobile: 'Mobile',
  desktop: 'Desktop',
  data: 'Backend',
};

const TAG_CLASS_MAP: Record<PlatformType, string> = {
  web: 'tag--web',
  mobile: 'tag--mobile',
  desktop: 'tag--desktop',
  data: 'tag--data',
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const openGallery = (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    if (project.galleryUrls && project.galleryUrls.length > 0) {
      setActiveProject(project);
      setActivePhotoIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      window.open(project.imageUrl, '_blank');
    }
  };

  const closeGallery = () => {
    setActiveProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextPhoto = () => {
    if (!activeProject || !activeProject.galleryUrls) return;
    setActivePhotoIndex((prev) => (prev + 1) % activeProject.galleryUrls!.length);
  };

  const prevPhoto = () => {
    if (!activeProject || !activeProject.galleryUrls) return;
    setActivePhotoIndex((prev) =>
      prev === 0 ? activeProject.galleryUrls!.length - 1 : prev - 1
    );
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.projects__heading, .eyebrow', {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        });

        const showcases = listRef.current?.querySelectorAll('.project-showcase');
        if (showcases) {
          showcases.forEach((showcase) => {
            gsap.from(showcase, {
              y: 60,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: showcase,
                start: 'top 85%',
              },
            });
          });
        }
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.projects__heading, .eyebrow, .project-showcase', {
          opacity: 1,
          y: 0,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <>
      <section ref={sectionRef} className="projects section" id="work">
        <div className="container">
          <div className="projects__header">
            <p className="eyebrow">Selected Work</p>
            <h2 className="projects__heading">The Output</h2>
          </div>

          <div ref={listRef} className="projects__list">
            {projects.map((project) => (
              <article
                key={project.id}
                className="project-showcase"
                style={{ '--card-accent': ACCENT_MAP[project.platform] } as React.CSSProperties}
              >
                {/* Left Side: Clickable Image */}
                <a
                  href={project.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="project-showcase__visual"
                  onClick={(e) => openGallery(e, project)}
                >
                  <div className="project-showcase__image-wrapper">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="project-showcase__image"
                      loading="lazy"
                    />
                    <div className="project-showcase__overlay">
                      <span className="project-showcase__view-btn">
                        {project.galleryUrls ? 'View Gallery' : 'View Image'}
                      </span>
                    </div>
                  </div>
                </a>

                {/* Right Side: Content */}
                <div className="project-showcase__content">
                  <div className="project-showcase__meta">
                    <span className={`tag ${TAG_CLASS_MAP[project.platform]}`}>
                      {PLATFORM_LABEL[project.platform]}
                    </span>
                  </div>

                  <h3 className="project-showcase__title">{project.title}</h3>

                  <div className="project-showcase__details">
                    <p className="project-showcase__subtitle">{project.description}</p>

                    {project.details && (
                      <div className="project-showcase__info">
                        <h4 className="project-showcase__info-label">How it was built</h4>
                        <p className="project-showcase__info-text">
                          {project.details}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="project-showcase__stack">
                    {project.stack.map((tech) => (
                      <span key={tech} className="project-showcase__tech">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel Modal */}
      {activeProject && activeProject.galleryUrls && (
        <div className="carousel-modal">
          <button className="carousel-modal__close" onClick={closeGallery}>
            ×
          </button>

          <button className="carousel-modal__nav carousel-modal__nav--prev" onClick={prevPhoto}>
            ‹
          </button>

          <div className="carousel-modal__content">
            <img
              src={activeProject.galleryUrls[activePhotoIndex]}
              alt={`${activeProject.title} screenshot ${activePhotoIndex + 1}`}
              className="carousel-modal__image"
            />
            <div className="carousel-modal__counter">
              {activePhotoIndex + 1} / {activeProject.galleryUrls.length}
            </div>
          </div>

          <button className="carousel-modal__nav carousel-modal__nav--next" onClick={nextPhoto}>
            ›
          </button>
        </div>
      )}
    </>
  );
};

export default Projects;