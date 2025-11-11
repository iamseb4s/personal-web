import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/mdx-components';
import ActionButtons from '@/components/ui/ActionButtons';
import { fetchAPI, getProjectBySlugFromAPI, getStrapiURL } from '@/lib/strapi';
import readingTime from 'reading-time';

// Generate static paths for all projects
export async function generateStaticParams() {
  const projects = await fetchAPI('/projects');
  return projects.data.map((project: { slug: string }) => ({
    slug: project.slug,
  }));
}

type PageProps = {
  params: Promise<{ slug: string }>; // params is a promise
};

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; // Await params here
  const project = await getProjectBySlugFromAPI(slug);
  if (!project) {
    return {
      title: 'Project Not Found'
    }
  }
  return {
    title: `${project.title} | iamsebas.dev`,
    description: project.description,
  };
}

// The main page component
export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params; // Await params here
  const project = await getProjectBySlugFromAPI(slug);

  if (!project) {
    notFound();
  }

  // --- Render Dynamic Zone Content ---
  const renderDynamicZone = (body: any[]) => {
    if (!body || body.length === 0) return null;

    // Calculate total markdown content for reading time
    const totalMarkdownContent = body
      .filter((component: any) => component.__component === 'text.text-block')
      .map((component: any) => component.content)
      .join('\n\n');
    const readingTimeText = `${Math.ceil(readingTime(totalMarkdownContent).minutes)} min de lectura`;

    return (
      <>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8 text-sm text-foreground/70 font-mono">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/sebas_icon.svg"
              alt="iamsebas.dev logo"
              width={28}
              height={28}
              className="rounded-full bg-foreground/10 p-1"
            />
            <span className="group-hover:underline">iamsebas.dev</span>
          </Link>
          <div className="flex items-center gap-4">
            <span>{readingTimeText}</span>
            <span className="sm:inline">•</span>
            {project.created && (
              <time dateTime={project.created}>
                {new Date(project.created).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
          </div>
        </div>

        <ActionButtons
          repoUrl={project.repo_url}
          liveDemoUrl={project.live_demo}
          className="flex justify-center mt-5 gap-6"
        />

        <div className="mx-auto max-w-full mt-20 mb-10">
          {body.map((component: any, index: number) => {
            if (component.__component === 'text.text-block') {
              return (
                <div key={index} className="mb-6">
                  <MDXRemote source={component.content} components={mdxComponents} />
                </div>
              );
            } else if (component.__component === 'image.body-image') {
              const imageUrl = component.image
                ? getStrapiURL(component.image.url)
                : null;
              const imageAlt = component.image?.alternativeText || component.caption || project.title;
              const imageWidth = component.width || 100;

              return imageUrl ? (
                <div key={index} className="my-8 text-center" style={{ width: `${imageWidth}%`, margin: '2rem auto' }}>
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    width={component.image.width}
                    height={component.image.height}
                    className="rounded-lg shadow-md"
                  />
                  {component.caption && (
                    <p className="mt-2 text-sm text-foreground/70 italic">{component.caption}</p>
                  )}
                </div>
              ) : null;
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
      {hasHeroImage && (
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
        <div className={`${hasHeroImage ? 'mt-14' : 'mt-16 sm:mt-24'} mb-12 text-center md:px-10`}>
          <h1 className="font-sans text-5xl sm:text-5xl lg:text-6xl">{project.title}</h1>
        </div>

        {renderDynamicZone(project.body)}

        <div className="mt-20 mb-20 text-center">
          <Link
              href="/#projects"
              className="text-sm md:text-lg font-mono relative group text-foreground transition-colors"
            >
              &larr; Back to All Projects
              <span className="absolute -bottom-1 left-[18px] md:left-[22px] w-9/10 h-px bg-foreground transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center "></span>
            </Link>
        </div>
      </div>
    </article>
  );
}