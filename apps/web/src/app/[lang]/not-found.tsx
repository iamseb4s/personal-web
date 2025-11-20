import Link from 'next/link';
import { getNotFoundPageData } from '@/lib/strapi';
import { NavLink } from '@/types/strapi';

export default async function NotFound() {
  // Hardcode the language to the default locale to simplify
  const lang = 'es-419';
  const notFoundPageDataResponse = await getNotFoundPageData(lang);
  const data = notFoundPageDataResponse.data;

  const titleText = data.title;
  const messageText = data.message;
  const descriptiveText = data.description;
  const linkButton: NavLink | null = data.link_button;

  // Simplified home path, always points to root
  const homePath = '/';
  const buttonText = linkButton?.text;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
      <h1 className="font-sans text-6xl font-bold text-foreground sm:text-7xl">{titleText}</h1>
      <p className="mt-4 font-heading text-xl text-foreground/80 sm:text-2xl">{messageText}</p>
      {descriptiveText && <p className="mt-5 font-body text-md text-foreground/60 sm:text-lg">{descriptiveText}</p>}
      <Link
        href={homePath}
        className="mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-full font-mono text-lg transition-transform duration-300 ease-in-out hover:scale-105"
      >
        {buttonText}
      </Link>
    </div>
  );
}
