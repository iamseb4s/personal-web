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
  SiNumpy,
  SiScipy,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiApachespark,
  SiJupyter,
  SiLooker,
  SiOpenai,
  SiOpencv,
  SiN8N,
  SiDvc,
  SiGeopandas,
  SiMlflow,
  SiCloudflare,
  SiPytorch,
  SiTensorflow,
  SiKeras,
  SiFastapi,
  SiHuggingface,
  SiGooglegemini,
  SiGithubcopilot,
  SiClaude,
  SiApacheairflow,
  SiDbt,
  SiSnowflake,
  SiDatabricks,
  SiGooglebigquery,
  SiAmazonredshift,
  SiApachekafka,
  SiApacheflink,
  SiTableau,
  SiLangchain,
  SiSupabase,
  SiSqlite,
} from 'react-icons/si';
import { VscVscode } from "react-icons/vsc";
import { FaAws } from "react-icons/fa";
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
    numpy: <SiNumpy className={className} />,
    scipy: <SiScipy className={className} />,
    'ai tools': <BrainCircuit className={className} />,
    vscode: <VscVscode className={className} />,
    mysql: <SiMysql className={className} />,
    mongodb: <SiMongodb className={className} />,
    redis: <SiRedis className={className} />,
    spark: <SiApachespark className={className} />,
    jupyter: <SiJupyter className={className} />,
    looker: <SiLooker className={className} />,
    openai: <SiOpenai className={className} />,
    opencv: <SiOpencv className={className} />,
    n8n: <SiN8N className={className} />,
    dvc: <SiDvc className={className} />,
    geopandas: <SiGeopandas className={className} />,
    mlflow: <SiMlflow className={className} />,
    aws: <FaAws className={className} />,
    cloudflare: <SiCloudflare className={className} />,
    pytorch: <SiPytorch className={className} />,
    tensorflow: <SiTensorflow className={className} />,
    keras: <SiKeras className={className} />,
    fastapi: <SiFastapi className={className} />,
    'hugging face': <SiHuggingface className={className} />,
    gemini: <SiGooglegemini className={className} />,
    copilot: <SiGithubcopilot className={className} />,
    claude: <SiClaude className={className} />,
    airflow: <SiApacheairflow className={className} />,
    dbt: <SiDbt className={className} />,
    snowflake: <SiSnowflake className={className} />,
    databricks: <SiDatabricks className={className} />,
    bigquery: <SiGooglebigquery className={className} />,
    redshift: <SiAmazonredshift className={className} />,
    kafka: <SiApachekafka className={className} />,
    flink: <SiApacheflink className={className} />,
    tableau: <SiTableau className={className} />,
    langchain: <SiLangchain className={className} />,
    supabase: <SiSupabase className={className} />,
    sqlite: <SiSqlite className={className} />,
  };

  const component = components[name.toLowerCase()];

  if (!component) {
    // Fallback to custom icons if not found in the main library
    return <CustomIcon name={name.toLowerCase()} className={className} />;
  }

  return component;
};

export default TechIcon;
