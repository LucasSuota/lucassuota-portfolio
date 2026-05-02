import type { Project, Capability, ProcessStep } from '../types';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Concrete Management System',
    description:
      'Track, generate reports, and get detailed data on concrete specimens.',
    details: 'Dealing with hundreds of concrete speciments might get a little confusing and handling different files for each group of speciments is not really an option. Concrete Management System saves all your concrete specimens data in a secure and organized way, and allows you to generate reports in a few clicks.',
    stack: ['React', 'TypeScript', 'Electron', 'SQLite'],
    platform: 'desktop',
    imageUrl: '/projects-photos/concrete-app.webp',
    galleryUrls: [
      '/projects-photos/Concrete Management App/1.webp',
      '/projects-photos/Concrete Management App/2.webp',
      '/projects-photos/Concrete Management App/3.webp',
      '/projects-photos/Concrete Management App/4.webp',
      '/projects-photos/Concrete Management App/5.webp',
      '/projects-photos/Concrete Management App/6.webp',
      '/projects-photos/Concrete Management App/7.webp',
      '/projects-photos/Concrete Management App/8.webp',
    ],
    featured: true,
  },
  {
    id: 'project-3',
    title: 'SPT - Standard Penetration Test - Application',
    description:
      'Desktop application for managing SPT tests following the Brazilian Norm (NBR).',
    details: 'The necessity of following the rules exactly, there was the need for an app to make reports at a 1:100 scale. This is a must for the normative. It is not achievable using spreadsheet apps, since they work with pixels instead of cm.',
    stack: ['React', 'TypeScript', 'Electron', 'SQLite'],
    platform: 'desktop',
    imageUrl: '/projects-photos/Spt App/1.webp',
    galleryUrls: [
      '/projects-photos/Spt App/1.webp',
      '/projects-photos/Spt App/2.webp',
    ],
    featured: true,
  },
  {
    id: 'project-2',
    title: 'ProQuality Engenharia Website',
    description:
      'SEO Best Practices, Custom Design for a Construction Engineering company.',
    details: 'ProQuality Engenharia is a material lab company based in Paraná, Brazil. The necessity of an website and a portfolio to display their services and expertise was a must.',
    stack: ['React', 'NextJs', 'TypeScript', 'FramerMotion'],
    platform: 'web',
    imageUrl: '/projects-photos/proquality-website.webp',
    featured: false,
  },
];

export const capabilities: Capability[] = [
  {
    title: 'Highly Interactive UIs',
    description:
      'Complex animations, custom interactions, React + GSAP + gesture-driven interfaces',
    platform: 'web',
  },
  {
    title: 'Cross-Platform Mobile',
    description:
      'One codebase, two platforms — iOS & Android with native-feel performance',
    platform: 'mobile',
  },
  {
    title: 'Desktop Applications',
    description:
      'Electron-powered apps with native OS integration, offline support, and system-level access',
    platform: 'desktop',
  },
  {
    title: 'Real-Time Features',
    description:
      'Supabase subscriptions, live cursors, collaborative experiences',
    platform: 'web',
  },
  {
    title: 'Type-Safe Architecture',
    description:
      'End-to-end TypeScript — from DB schema to UI props, zero runtime surprises',
    platform: 'data',
  },
  {
    title: 'Database Design',
    description:
      'SQL schemas, RLS policies, migrations, normalized relational data models',
    platform: 'data',
  },
  {
    title: 'Auth & Authorization',
    description:
      'Supabase Auth, row-level security, role-based access patterns',
    platform: 'data',
  },
  {
    title: 'Performance Engineering',
    description:
      'Bundle optimization, lazy loading, Core Web Vitals tuned to green',
    platform: 'web',
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Understand',
    description: 'Business goals, user needs, technical constraints',
  },
  {
    number: '02',
    title: 'Architect',
    description: 'Tech decisions before touching code',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Iterative, typed, tested, animated',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Documented, deployed, handed off clean',
  },
];
