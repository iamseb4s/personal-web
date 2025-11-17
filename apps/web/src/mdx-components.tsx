import type { MDXComponents } from "mdx/types";
import CustomImage from "@/components/ui/CustomImage";

// This file is required to use MDX in the `app` directory.

export const mdxComponents: MDXComponents = {
    // Main heading (e.g., # Title)
    h1: ({ children }) => (
      <h1 className="font-heading font-bold text-4xl lg:text-5xl mt-8 mb-8">{children}</h1>
    ),
    // Secondary heading (e.g., ## Subtitle)
    h2: ({ children }) => (
      <h2 className="font-heading font-bold text-3xl lg:text-4xl mt-8 mb-6">{children}</h2>
    ),
    // Tertiary heading (e.g., ### Section)
    h3: ({ children }) => (
      <h3 className="font-heading font-bold text-2xl lg:text-3xl mt-8 mb-4">{children}</h3>
    ),
    // Paragraph text
    p: ({ children }) => (
      <p className="font-body mb-6 leading-loose text-md sm:text-lg lg:text-lg text-justify">
        {children}
      </p>
    ),
    // Unordered list (e.g., * list item)
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 my-6 pl-4 font-body leading-loose text-md sm:text-lg lg:text-lg">
        {children}
      </ul>
    ),
    // Ordered list (e.g., 1. list item)
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 my-6 pl-4 font-body leading-loose text-md sm:text-lg lg:text-lg">
        {children}
      </ol>
    ),
    // Link component (e.g., [link text](url))
    a: ({ children, ...props }) => (
      <a
        className="text-primary underline hover:text-primary/80 transition-colors font-body leading-loose text-md sm:text-lg lg:text-lg"
        {...props}
      >
        {children}
      </a>
    ),
    // Blockquote (e.g., > quoted text)
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary bg-primary/25 dark:bg-primary/10 p-4 my-6 italic leading-loose text-md sm:text-lg lg:text-lg text-justify mx-4 [&>p:last-child]:mb-0 [&>p]:font-body">
        {children}
      </blockquote>
    ),
    // Horizontal Rule (e.g., ---)
    hr: () => <hr className="border-t border-foreground/20 my-8" />,
    // Code block (e.g., ```js ... ```)
    pre: ({ children }) => (
      <pre className="font-mono bg-muted text-muted-foreground rounded-md p-4 my-6 text-sm sm:text-md lg:text-md">
        {children}
      </pre>
    ),
    // Inline code (e.g., `const x = 1;`)
    code: ({ children }) => (
      <code className="font-mono bg-muted/60 text-muted-foreground dark:bg-muted rounded-sm px-1.5 py-1 text-sm sm:text-md lg:text-md">
        {children}
      </code>
    ),
    // Custom Image Component
    CustomImage,
};

export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
