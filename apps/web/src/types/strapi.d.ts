// apps/web/src/types/strapi.d.ts

// A. General Purpose Interfaces
export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface SEOComponent {
  id: number;
  page_title: string;
  page_description: string;
}

export interface NavLinkComponent {
  id: number;
  text: string;
  target_id: string;
}

export interface ExternalLinkComponent {
  id: number;
  text: string;
  url: string;
}

export interface ActionButtonTextsComponent {
  id: number;
  live_demo_button_text: string;
  live_demo_button_text_short: string;
  repo_button_text: string;
  repo_button_text_short: string;
}

export interface Locale {
  code: string;
  isDefault: boolean;
}

// B. Single Type Interfaces
export interface GlobalData {
  id: number;
  site_brand_name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  site_logo: StrapiMedia;
  default_seo: SEOComponent;
}

export interface HeaderData {
  id: number;
  display_text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  nav_links: NavLinkComponent[];
}

export interface FooterData {
  id: number;
  copyright_prefix: string;
  copyright_suffix: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  external_links: ExternalLinkComponent[];
  copyright_author_link: NavLinkComponent;
}

export interface ProjectPageData {
  id: number;
  author_name: string;
  reading_time_suffix: string;
  back_button_text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  author_avatar: StrapiMedia;
  action_button_texts: ActionButtonTextsComponent;
}

// C. Dynamic Zone Section Interfaces
export interface HeroSection {
  id: number;
  __component: 'sections.hero';
  greeting: string;
  description: string;
  typewriter_text: string;
  day_image: StrapiMedia;
  night_image: StrapiMedia;
  internal_link_button: NavLinkComponent;
  external_link_button: ExternalLinkComponent;
}

export interface ProjectsFeedSection {
  id: number;
  __component: 'sections.projects-feed';
  title: string;
  wip_text: string;
  project_default_image: StrapiMedia;
}

export interface StackSection {
  id: number;
  __component: 'sections.stack';
  title: string;
}

export type HomePageSection = HeroSection | ProjectsFeedSection | StackSection;

export interface HomePageData {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  seo: SEOComponent;
  sections: HomePageSection[];
}
