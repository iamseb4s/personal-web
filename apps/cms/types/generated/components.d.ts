import type { Schema, Struct } from '@strapi/strapi';

export interface ImageBodyImage extends Struct.ComponentSchema {
  collectionName: 'components_image_body_images';
  info: {
    displayName: 'body_image';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
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
      'image.body-image': ImageBodyImage;
      'text.text-block': TextTextBlock;
    }
  }
}
