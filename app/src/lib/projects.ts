import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export function getAllProjects() {
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as {
        title: string;
        description: string;
        technologies: string[];
        status: 'completed' | 'writing';
        date: string;
      }),
    };
  });

  // Sort projects: completed first, then by date descending
  return allProjectsData.sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') {
      return -1;
    }
    if (a.status !== 'completed' && b.status === 'completed') {
      return 1;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getProjectBySlug(slug: string) {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data,
    content,
  };
}
