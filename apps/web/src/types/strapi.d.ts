// apps/web/src/types/strapi.d.ts

// A. General Purpose Interfaces
export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface SharedOpenGraph {
  id: number;
  ogDescription: string;
  ogImage?: StrapiMedia;
  ogTitle: string;
  ogType?: string;
  ogUrl?: string;
}

export interface SharedSeo {
  id: number;
  canonicalURL?: string;
  keywords?: string;
  metaDescription: string;
  metaImage?: StrapiMedia;
  metaRobots?: string;
  metaTitle: string;
  metaViewport?: string;
  openGraph?: SharedOpenGraph;
  structuredData?: object;
}

export interface NavLink {
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
  id: number;
  name: string;
  code: string;
  isDefault: boolean;
}

// Interfaces for Dynamic Zone Components
export interface TextBlockComponent {
  __component: "text.text-block";
  content: string;
}
export interface BodyImageComponent {
  __component: "image.body-image";
  image: {
    url: string;
    width: number;
    height: number;
    alternativeText?: string;
  } | null;
  caption?: string;
  width?: number;
}
export type DynamicZoneComponent = TextBlockComponent | BodyImageComponent;


// B. Single Type Interfaces
export interface GlobalData {
  id: number;
  site_brand_name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  site_logo: StrapiMedia | null;
  default_seo: SharedSeo | null;
}

export interface HeaderData {
  id: number;
  display_text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  nav_links: NavLink[];
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
  copyright_author_link: NavLink | null;
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
  author_avatar: StrapiMedia | null;
  action_button_texts: ActionButtonTextsComponent | null;
}

export interface NotFoundPageData {
  id: number;
  title: string;
  message: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  seo: SharedSeo | null;
  link_button: NavLink | null;
}

// C. Dynamic Zone Section Interfaces
export interface HeroSection {
  id: number;
  __component: 'sections.hero';
  greeting: string;
  description: string;
  typewriter_text: string;
  day_image: StrapiMedia | null;
  night_image: StrapiMedia | null;
  internal_link_button: NavLink | null;
  external_link_button: ExternalLinkComponent | null;
}

export interface ProjectsFeedSection {
  id: number;
  __component: 'sections.projects-feed';
  title: string;
  wip_text: string;
  project_default_image: StrapiMedia | null;
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
  seo: SharedSeo | null;
  sections: HomePageSection[];
}