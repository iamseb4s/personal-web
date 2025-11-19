import qs from 'qs';

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = '') {
  if (path.startsWith('http')) {
    return path;
  }
  const strapiUrl =
    typeof window === 'undefined'
      ? process.env.STRAPI_INTERNAL_URL
      : process.env.NEXT_PUBLIC_STRAPI_API_URL;

  return `${strapiUrl || 'http://localhost:1337'}${path}`;
}

/**
 * Helper to make GET requests to Strapi API
 * @param {string} path Path of the API route
 * @param {object} urlParamsObject URL params object, will be stringified
 * @param {object} options Options passed to fetch
 * @returns {Promise} Parsed API call response
 */
export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  // Merge default and user options
  const mergedOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    cache: 'no-store',
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ''}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);
  const data = await response.json();

  // Handle response
  if (!response.ok) {
    // Log more details for debugging
    console.error(`Error fetching ${requestUrl}: ${response.status} ${response.statusText}`);
    throw new Error(`An error occurred please try again`);
  }
  
  return data;
}

// New function to fetch available locales from Strapi
export async function getAvailableLocales() {
  const data = await fetchAPI('/i18n/locales');
  return data;
}

export async function getProjectBySlugFromAPI(slug: string, locale: string) {
  const query = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      main_image: {
        fields: ['url'],
      },
      technologies: {
        fields: ['name'],
      },
      body: {
        on: {
          'image.body-image': {
            populate: {
              image: {
                fields: ['url', 'width', 'height'],
              },
            },
          },
          'text.text-block': {
            fields: ['content'],
          },
        },
      },
    },
    locale,
  });

  const data = await fetchAPI(`/projects?${query}`);

  // The response for a filtered query is an array. We need to return the first element.
  if (data && data.data && data.data.length > 0) {
    return data.data[0];
  }
  return null;
}

export async function getHomePageContent(locale: string) {
  const query = qs.stringify({
    populate: {
      hero_day_image: {
        fields: ['url', 'alternativeText', 'width', 'height'],
      },
      hero_night_image: {
        fields: ['url', 'alternativeText', 'width', 'height'],
      },
      project_default_image: {
        fields: ['url', 'alternativeText', 'width', 'height'],
      },
      // Populate all other text fields
      fields: [
        'site_title',
        'social_link_github',
        'social_link_linkedin',
        'social_link_email',
        'header_nav_home',
        'header_nav_projects',
        'hero_greeting',
        'hero_description',
        'hero_button_1',
        'hero_button_2',
        'hero_typewriter',
        'projects_section_title',
        'stack_section_title',
        'footer_built_by_prefix',
        'footer_author_name',
        'footer_built_by_suffix',
        'project_reading_time_suffix',
        'project_back_button_text',
        'project_live_demo_button_text',
        'project_repo_button_text',
        'project_wip_text',
        'project_live_demo_button_text_short',
        'project_repo_button_text_short',
        'site_logo_alt_text',
        'site_logo_text',
        'site_metadata_title',
      ],
    },
    locale,
  });

  const data = await fetchAPI(`/home-page?${query}`);
  return data;
}
