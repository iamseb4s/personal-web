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

export async function getGlobalData(locale: string) {
  const query = qs.stringify({
    populate: {
      site_logo: {
        fields: ['url', 'alternativeText'],
      },
      default_seo: {
        fields: ['page_title', 'page_description'],
      },
    },
    locale,
  });

  const data = await fetchAPI(`/global?${query}`);
  return data;
}

export async function getHeaderData(locale: string) {
  const query = qs.stringify({
    populate: {
      nav_links: {
        fields: ['text', 'target_id'],
      },
    },
    locale,
  });

  const data = await fetchAPI(`/header?${query}`);
  return data;
}

export async function getFooterData(locale: string) {
  const query = qs.stringify({
    populate: {
      external_links: {
        fields: ['text', 'url'],
      },
      copyright_author_link: {
        fields: ['text', 'target_id'],
      },
    },
    locale,
  });

  const data = await fetchAPI(`/footer?${query}`);
  return data;
}

export async function getProjectPageData(locale: string) {
  const query = qs.stringify({
    populate: {
      action_button_texts: {
        fields: ['live_demo_button_text', 'live_demo_button_text_short', 'repo_button_text', 'repo_button_text_short'],
      },
      author_avatar: {
        fields: ['url', 'alternativeText'],
      },
    },
    locale,
  });

  const data = await fetchAPI(`/project-page?${query}`);
  return data;
}

export async function getHomePageData(locale: string) {
  const query = qs.stringify({
    populate: {
      seo: {
        populate: '*',
      },
      sections: {
        on: {
          'sections.hero': {
            populate: {
              internal_link_button: true,
              external_link_button: true,
              day_image: { fields: ['url', 'alternativeText'] },
              night_image: { fields: ['url', 'alternativeText'] },
            }
          },
          'sections.projects-feed': {
            populate: {
              project_default_image: { fields: ['url'] }
            }
          },
          'sections.stack': {
            populate: '*'
          },
        },
      },
    },
    locale,
  });

  const data = await fetchAPI(`/home-page?${query}`);
  return data;
}
