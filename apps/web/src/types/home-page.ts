interface Image {
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

export interface HomePageProps {
  site_title: string;
  project_default_image: Image;
  social_link_github: string;
  social_link_linkedin: string;
  social_link_email: string;
  header_nav_home: string;
  header_nav_projects: string;
  hero_greeting: string;
  hero_description: string;
  hero_button_1: string;
  hero_button_2: string;
  hero_day_image: Image;
  hero_night_image: Image;
  hero_typewriter: string;
  projects_section_title: string;
  stack_section_title?: string; // Optional
  footer_built_by_prefix: string;
  footer_author_name: string;
  footer_built_by_suffix: string;
  project_reading_time_suffix: string;
  project_back_button_text: string;
  project_live_demo_button_text: string;
  project_repo_button_text: string;
  project_wip_text: string;
  project_live_demo_button_text_short: string;
  project_repo_button_text_short: string;
  site_logo_alt_text: string;
  site_logo_text: string;
  site_metadata_title: string;
}
