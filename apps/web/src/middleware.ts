import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAvailableLocales } from './lib/strapi';

async function getLocaleConfig() {
  const localesData = await getAvailableLocales();
  const locales = localesData.map((locale: { code: string }) => locale.code);
  const defaultLocale = localesData.find((locale: { isDefault: boolean }) => locale.isDefault)?.code || 'es-419';
  return { locales, defaultLocale };
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // If the pathname includes a dot, it's likely a static file, so do nothing.
  if (pathname.includes('.')) {
    return;
  }

  const { locales, defaultLocale } = await getLocaleConfig();

  // Check if the pathname already has a locale prefix.
  const pathnameHasLocale = locales.some(
    (locale: string) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return; // If the locale is already in the path, do nothing.
  }

  // If no locale is present, rewrite the path to include the default locale.
  // This makes the default language accessible at the root URL.
  // e.g., a request to /projects -> /es-419/projects
  return NextResponse.rewrite(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
