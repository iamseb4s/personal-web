import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAvailableLocales } from './lib/strapi'; // Assuming getAvailableLocales is accessible here

const PUBLIC_FILE = /\.(.*)$/; // Files

async function getLocales() {
  try {
    const localesData = await getAvailableLocales();
    const locales = localesData.map((locale: { code: string }) => locale.code);
    const defaultLocale = localesData.find((locale: { isDefault: boolean }) => locale.isDefault)?.code || locales[0];
    return { locales, defaultLocale };
  } catch (error) {
    console.error('Failed to fetch locales, falling back to defaults:', error);
    // Fallback in case the API is down
    return { locales: ['en', 'es-419'], defaultLocale: 'es-419' };
  }
}

export async function middleware(request: NextRequest) {
  const { locales, defaultLocale } = await getLocales();

  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return; // Already has a locale, do nothing
  }

  // Rewrite / to /<defaultLocale>
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // Skip public files
  if (PUBLIC_FILE.test(pathname)) {
    return;
  }
  
  // Get locale from browser headers
  const acceptLanguage = request.headers.get('accept-language');
  const browserLang = acceptLanguage ? acceptLanguage.split(',')[0].toLowerCase() : defaultLocale;

  // Find the best matching locale
  const matchedLocale = locales.find(lang => browserLang.startsWith(lang.split('-')[0]));
  const locale = matchedLocale || defaultLocale;

  // Redirect if no locale found
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Exclude folders
};
