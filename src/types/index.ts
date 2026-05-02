export type PlatformType = 'web' | 'mobile' | 'desktop' | 'data';

export interface Project {
  id: string;
  title: string;
  description: string;
  details?: string;
  stack: string[];
  platform: PlatformType;
  imageUrl: string;
  galleryUrls?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Capability {
  title: string;
  description: string;
  platform: PlatformType;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}
