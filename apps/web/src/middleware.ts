import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAvailableLocales, getProjectBySlugFromAPI } from './lib/strapi';

async function getLocaleConfig() {
  const localesData = await getAvailableLocales();
  const locales = localesData.map((locale: { code: string }) => locale.code);
  const defaultLocale = localesData.find((locale: { isDefault: boolean }) => locale.isDefault)?.code || 'es-419';
  return { locales, defaultLocale };
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip static files
  if (pathname.includes('.')) {
    return;
  }

  const { locales, defaultLocale } = await getLocaleConfig();

  // --- Project redirection logic (runs first) ---
  const projectPathWithLocaleRegex = /^\/([a-z]{2}(?:-[A-Z0-9]+)?)\/projects\/(.+)/;
  const matchWithLocale = pathname.match(projectPathWithLocaleRegex);

  if (matchWithLocale) {
    const lang = matchWithLocale[1];
    const slug = matchWithLocale[2];
    if (locales.includes(lang)) {
      const project = await getProjectBySlugFromAPI(slug, lang);
      if (!project) {
        const url = request.nextUrl.clone();
        url.pathname = `/${lang}`;
        return NextResponse.redirect(url);
      }
    }
  }

  const projectPathWithoutLocaleRegex = /^\/projects\/(.+)/;
  const matchWithoutLocale = pathname.match(projectPathWithoutLocaleRegex);

  if (matchWithoutLocale) {
    const slug = matchWithoutLocale[1];
    const project = await getProjectBySlugFromAPI(slug, defaultLocale);
    if (!project) {
      const url = request.nextUrl.clone();
      url.pathname = `/`;
      return NextResponse.redirect(url);
    }
  }
  // ---

  // Default locale handling
  const pathnameHasLocale = locales.some(
    (locale: string) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
