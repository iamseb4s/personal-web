import React, { JSX } from 'react';
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiMdx,
  SiGit,
  SiGithub,
  SiDocker,
  SiLinux,
  SiMarkdown,
  SiNodedotjs,
  SiVercel,
  SiPostgresql,
  SiStreamlit,
  SiPandas,
  SiScikitlearn,
  SiPlotly,
  SiGurobi,
  SiNumpy,
  SiScipy,
} from 'react-icons/si';
import { BrainCircuit } from 'lucide-react';
import CustomIcon from '@/components/icons/CustomIcons';

interface TechIconProps {
  name: string;
  className?: string;
}

const TechIcon = ({ name, className }: TechIconProps) => {
  const components: { [key: string]: JSX.Element } = {
    'next.js': <SiNextdotjs className={className} />,
    react: <SiReact className={className} />,
    'tailwind css': <SiTailwindcss className={className} />,
    typescript: <SiTypescript className={className} />,
    javascript: <SiJavascript className={className} />,
    python: <SiPython className={className} />,
    mdx: <SiMdx className={className} />,
    git: <SiGit className={className} />,
    github: <SiGithub className={className} />,
    docker: <SiDocker className={className} />,
    linux: <SiLinux className={className} />,
    markdown: <SiMarkdown className={className} />,
    'node.js': <SiNodedotjs className={className} />,
    vercel: <SiVercel className={className} />,
    postgresql: <SiPostgresql className={className} />,
    streamlit: <SiStreamlit className={className} />,
    pandas: <SiPandas className={className} />,
    'scikit-learn': <SiScikitlearn className={className} />,
    plotly: <SiPlotly className={className} />,
    gurobi: <SiGurobi className={className} />,
    numpy: <SiNumpy className={className} />,
    scipy: <SiScipy className={className} />,
    'ai tools': <BrainCircuit className={className} />,
  };

  const component = components[name.toLowerCase()];

  if (!component) {
    // Fallback to custom icons if not found in the main library
    return <CustomIcon name={name.toLowerCase()} className={className} />;
  }

  return component;
};

export default TechIcon;
