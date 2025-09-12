import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  return {
    title: `${project.frontmatter.title} | iamsebas.dev`,
    description: project.frontmatter.description,
  };
}

const ProjectPage = ({ params }: { params: { slug: string } }) => {
  const project = getProjectBySlug(params.slug);
  const components = useMDXComponents({});

  if (!project) {
    notFound();
  }

  // Calculate reading time
  const wordsPerMinute = 200;
  const numberOfWords = project.content.split(/\s+/).length;
  const readingTime = Math.ceil(numberOfWords / wordsPerMinute);

  // Format date
  const formattedDate = new Date(project.frontmatter.date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const hasHeroImage = project.frontmatter.hero_image === true;

  return (
    <article>
      {hasHeroImage && (
        <div className="relative h-0 sm:h-40 md:h-60 w-full [mask-image:linear-gradient(to_bottom,black_5%,transparent_100%)]">
          <Image
            src={project.frontmatter.main_image || '/project_default.png'}
            alt={project.frontmatter.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="container mx-auto max-w-screen-md lg:max-w-4xl px-4">
        <div className={`${hasHeroImage ? 'mt-14' : 'mt-16 sm:mt-24'} mb-12 text-center md:px-10`}>
          <h1 className="font-sans text-5xl sm:text-5xl lg:text-6xl">{project.frontmatter.title}</h1>
        </div>

        <div className="mb-20 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-8 text-sm text-foreground/70 font-mono">
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
            <span>{`${readingTime} min de lectura`}</span>
            <span className="sm:inline">•</span>
            <time dateTime={project.frontmatter.date}>{formattedDate}</time>
          </div>
        </div>

        <div className="mx-auto max-w-full mb-10">
          <MDXRemote source={project.content} components={components} />
        </div>

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
};

export default ProjectPage;