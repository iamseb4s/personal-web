import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/mdx-components";
import { ActionButtons } from "@/components/ui/ActionButtons";
import {
  getProjectBySlugFromAPI,
  getStrapiURL,
  getAvailableLocales,
  getProjectPageData,
  getGlobalData,
  getNotFoundPageData,
} from "@/lib/strapi";
import readingTime from "reading-time";
import {
  GlobalData,
  ProjectPageData,
  Locale,
  NotFoundPageData,
  TextBlockComponent,
  BodyImageComponent,
  DynamicZoneComponent,
} from "@/types/strapi";
import { TrackedInternalLink } from "@/components/ui/TrackedInternalLink";
import { generateSeoMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string; lang: string }>;
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const [project, localesData, globalData] = await Promise.all([
    getProjectBySlugFromAPI(slug, lang),
    getAvailableLocales(),
    getGlobalData(lang),
  ]);

  const globalProps: GlobalData = globalData.data;
  const siteLogoUrl = globalProps.site_logo?.url;

  if (!project) {
    const notFoundPageData = await getNotFoundPageData(lang);
    const notFoundPageProps: NotFoundPageData = notFoundPageData.data;
    
    // SEO Priority for Not Found: 1. Specific 404 SEO -> 2. Specific 404 CMS content (title/description)
    if (notFoundPageProps.seo) {
      return generateSeoMetadata({
        seo: notFoundPageProps.seo,
        path: `/projects/${slug}`, // conceptual path for the 404 page context
        global: {
          site_brand_name: globalProps.site_brand_name,
          site_logo: globalProps.site_logo,
        },
      });
    }

    // Fallback to specific 404 page content from CMS if no SEO component
    const metadata: Metadata = {
      title: `${notFoundPageProps.title} | ${globalProps.site_brand_name}`,
      description: notFoundPageProps.description,
    };

    if (siteLogoUrl) {
      metadata.icons = {
        icon: getStrapiURL(siteLogoUrl),
      };
    }

    return metadata;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:4100";

  const alternates: { [key: string]: string } = {};
  (localesData as Locale[]).forEach((locale: Locale) => {
    const localePath = locale.isDefault ? "" : `/${locale.code}`;
    alternates[locale.code] = `${siteUrl}${localePath}/projects/${slug}`;
  });

  const seoData = project.seo || {
    id: 0,
    metaTitle: project.title,
    metaDescription: project.description || "",
    metaImage: project.main_image || undefined,
    openGraph: {
      id: 0,
      ogTitle: project.title,
      ogDescription: project.description || "",
      ogImage: project.main_image || undefined,
    }
  };

  return generateSeoMetadata({
    seo: seoData,
    path: `/projects/${slug}`,
    global: {
      site_brand_name: globalProps.site_brand_name,
      site_logo: globalProps.site_logo,
    },
    alternates,
  });
}

// The main page component
export default async function ProjectPage({ params }: PageProps) {
  const { slug, lang } = await params;
  const [project, projectPageData, localesData] = await Promise.all([
    getProjectBySlugFromAPI(slug, lang),
    getProjectPageData(lang),
    getAvailableLocales(),
  ]);

  if (!project) {
    notFound();
  }

  const projectPageProps: ProjectPageData = projectPageData.data;
  const defaultLocaleComponent =
    (localesData as Locale[]).find((l: Locale) => l.isDefault)?.code ||
    "es-419";

  const homePath = lang === defaultLocaleComponent ? "/" : `/${lang}`;
  const projectsPath =
    lang === defaultLocaleComponent ? "/#projects" : `/${lang}/#projects`;

  // --- Render Dynamic Zone Content ---
  const renderDynamicZone = (body: DynamicZoneComponent[]) => {
    if (!body || body.length === 0) return null;

    const totalMarkdownContent = body
      .filter(
        (c): c is TextBlockComponent => c.__component === "text.text-block"
      )
      .map((c) => c.content)
      .join("\n\n");
    const readingTimeText = `${Math.ceil(
      readingTime(totalMarkdownContent).minutes
    )} ${projectPageProps.reading_time_suffix}`;

    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8 text-sm text-foreground/70 font-mono">
          <Link href={homePath} className="flex items-center gap-2 group">
            {projectPageProps.author_avatar?.url && (
              <Image
                src={getStrapiURL(projectPageProps.author_avatar.url)}
                alt={
                  projectPageProps.author_avatar.alternativeText ||
                  projectPageProps.author_name
                }
                width={28}
                height={28}
                className="rounded-full bg-foreground/10 p-1"
              />
            )}
            <span className="group-hover:underline">
              {projectPageProps.author_name}
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span>{readingTimeText}</span>
            <span className="sm:inline">•</span>
            {project.created && (
              <time dateTime={project.created}>
                {new Date(project.created).toLocaleDateString(lang, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </div>
        </div>

        <ActionButtons
          repoUrl={project.repo_url}
          liveDemoUrl={project.live_demo}
          className="flex justify-center mt-5 gap-6"
          liveDemoText={
            projectPageProps.action_button_texts?.live_demo_button_text
          }
          repoText={projectPageProps.action_button_texts?.repo_button_text}
          liveDemoTextShort={
            projectPageProps.action_button_texts?.live_demo_button_text_short
          }
          repoTextShort={
            projectPageProps.action_button_texts?.repo_button_text_short
          }
          trackingLocation="project_page"
        />

        <div className="mx-auto max-w-full mt-20 mb-10">
          {body.map((component, index) => {
            if (component.__component === "text.text-block") {
              return (
                <div key={index} className="mb-6">
                  <MDXRemote
                    source={component.content}
                    components={mdxComponents}
                  />
                </div>
              );
            } else if (
              component.__component === "image.body-image" &&
              component.image
            ) {
              return (
                <div
                  key={index}
                  className="my-8 text-center"
                  style={{
                    width: `${component.width || 100}%`,
                    margin: "2rem auto",
                  }}
                >
                  <Image
                    src={getStrapiURL(component.image.url)}
                    alt={
                      component.image.alternativeText ||
                      component.caption ||
                      project.title
                    }
                    width={component.image.width}
                    height={component.image.height}
                    className="rounded-lg shadow-md mx-auto"
                  />
                  {component.caption && (
                    <p className="mt-2 text-sm text-foreground/70 italic">
                      {component.caption}
                    </p>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      </>
    );
  };
  // ---

  const hasHeroImage = !!project.main_image && project.show_hero_image;

  return (
    <article>
      {hasHeroImage && project.main_image && (
        <div className="relative h-0 sm:h-40 md:h-60 w-full [mask-image:linear-gradient(to_bottom,black_5%,transparent_100%)]">
          <Image
            src={getStrapiURL(project.main_image.url)}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="container mx-auto max-w-screen-md lg:max-w-4xl px-4">
        <div
          className={`${ 
            hasHeroImage ? "mt-14" : "mt-16 sm:mt-24"
          } mb-12 text-center md:px-10`}
        >
          <h1 className="font-sans text-5xl sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
        </div>

        {renderDynamicZone(project.body)}

        <div className="mt-20 mb-20 text-center">
          <TrackedInternalLink
            href={projectsPath}
            target="projects"
            location="project_page"
            label={projectPageProps.back_button_text}
            additionalEventData={{ project_slug: project.slug }}
            className="text-sm md:text-lg font-mono relative group text-foreground transition-colors"
          >
            {projectPageProps.back_button_text}
            <span className="absolute -bottom-1 left-[18px] md:left-[22px] w-9/10 h-px bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center "></span>
          </TrackedInternalLink>
        </div>
      </div>
    </article>
  );
}
