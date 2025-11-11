import qs from 'qs';

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = '') {
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
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ''}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occurred please try again`);
  }
  const data = await response.json();
  return data;
}

export async function getProjectBySlugFromAPI(slug: string) {
  const data = await fetchAPI('/projects', {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      main_image: true,
      technologies: true,
      body: {
        populate: '*',
      },
    },
  });
  // The response for a filtered query is an array. We need to return the first element.
  if (data && data.data && data.data.length > 0) {
    return data.data[0];
  }
  return null;
}
