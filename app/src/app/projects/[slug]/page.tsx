import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  return {
    title: `${project.frontmatter.title} | Sebas Nolasco`,
    description: project.frontmatter.description,
  };
}

const ProjectPage = ({ params }: { params: { slug: string } }) => {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-screen-lg px-4 py-16 sm:py-24">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black sm:text-5xl md:text-6xl">{project.frontmatter.title}</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{project.frontmatter.description}</p>
      </div>

      <div className="mx-auto max-w-prose">
        <MDXRemote source={project.content} />
      </div>

      <div className="mt-12 text-center">
        <Link href="/#projects" className="text-sm font-medium hover:underline">
          &larr; Back to All Projects
        </Link>
      </div>
    </article>
  );
};

export default ProjectPage;