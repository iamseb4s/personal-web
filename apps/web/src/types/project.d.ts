import { StrapiMedia } from './strapi';

export interface StrapiTechnology {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  technologies: StrapiTechnology[];
  finished: boolean;
  created: string;
  repo_url?: string;
  live_demo?: string | null;
  main_image: StrapiMedia | null;
}
