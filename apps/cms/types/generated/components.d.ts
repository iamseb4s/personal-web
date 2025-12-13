import type { Schema, Struct } from '@strapi/strapi';

export interface ButtonsActionButtonTexts extends Struct.ComponentSchema {
  collectionName: 'components_buttons_action_button_texts';
  info: {
    displayName: 'Action Button Texts';
  };
  attributes: {
    live_demo_button_text: Schema.Attribute.String;
    live_demo_button_text_short: Schema.Attribute.String;
    repo_button_text: Schema.Attribute.String;
    repo_button_text_short: Schema.Attribute.String;
  };
}

export interface ImageBodyImage extends Struct.ComponentSchema {
  collectionName: 'components_image_body_images';
  info: {
    displayName: 'body_image';
    icon: 'picture';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    width: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<100>;
  };
}

export interface LinkExternalLink extends Struct.ComponentSchema {
  collectionName: 'components_link_external_links';
  info: {
    displayName: 'ExternalLink';
    icon: 'link';
  };
  attributes: {
    text: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface LinkNavLink extends Struct.ComponentSchema {
  collectionName: 'components_link_nav_links';
  info: {
    displayName: 'NavLink';
    icon: 'hashtag';
  };
  attributes: {
    target_id: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
    icon: 'apps';
  };
  attributes: {
    day_image: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    description: Schema.Attribute.Text;
    external_link_button: Schema.Attribute.Component<
      'link.external-link',
      false
    >;
    greeting: Schema.Attribute.String;
    internal_link_button: Schema.Attribute.Component<'link.nav-link', false>;
    night_image: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    typewriter_text: Schema.Attribute.Text;
  };
}

export interface SectionsProjectsFeed extends Struct.ComponentSchema {
  collectionName: 'components_sections_projects_feeds';
  info: {
    displayName: 'Projects Feed';
    icon: 'apps';
  };
  attributes: {
    project_default_image: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
    wip_text: Schema.Attribute.String;
  };
}

export interface SectionsStack extends Struct.ComponentSchema {
  collectionName: 'components_sections_stacks';
  info: {
    displayName: 'Stack';
    icon: 'apps';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 25;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface TextTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_text_text_blocks';
  info: {
    displayName: 'text_block';
    icon: 'pencil';
  };
  attributes: {
    content: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'buttons.action-button-texts': ButtonsActionButtonTexts;
      'image.body-image': ImageBodyImage;
      'link.external-link': LinkExternalLink;
      'link.nav-link': LinkNavLink;
      'sections.hero': SectionsHero;
      'sections.projects-feed': SectionsProjectsFeed;
      'sections.stack': SectionsStack;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
      'text.text-block': TextTextBlock;
    }
  }
}
