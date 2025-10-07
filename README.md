# Personal Portfolio - A Showcase of Modern Web Engineering

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/) [![React](https://img.shields.io/badge/React-19.1-blue?logo=react)](https://react.dev/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-cyan?logo=tailwind-css)](https://tailwindcss.com/)

### 🌐 [View Live Demo](https://iamsebas.dev)

This repository contains the source code for my personal portfolio, meticulously crafted not just as a gallery of my work, but as a testament to modern, high-standard web development practices. The project emphasizes performance, developer experience (DX), and architectural robustness, built on a foundation of the latest industry-standard technologies.

## Core Philosophy

- **Bleeding-Edge Technology:** Leverages the latest stable versions of Next.js (v15.5), React (v19), and Tailwind CSS (v4) to build a future-proof and performant application.
- **Architectural Integrity:** Prioritizes a clean, scalable, and maintainable architecture with a clear separation of concerns.
- **Developer Experience (DX):** A fully containerized development environment with Docker ensures a consistent and hassle-free setup. Strict linting, formatting, and TypeScript configurations are enforced to maintain code quality.
- **Performance First:** Optimized for speed through modern frameworks, a multi-stage production build, and efficient content pipelines.

## 🏛️ Architectural Deep Dive

This project is more than a simple website; it's a collection of deliberate engineering decisions.

### 1. Containerization Strategy (Docker)

The entire development and production lifecycle is containerized, providing consistency and eliminating "it works on my machine" issues.

- **Development (`Dockerfile.dev`):** A dedicated development environment with hot-reloading enabled through volume mounts, ensuring a fast and efficient feedback loop.
- **Production (`Dockerfile.prod`):** A multi-stage Docker build is used to create a lean, secure, and optimized production image. This process involves:
    1. A `builder` stage to install all dependencies and build the application.
    2. A `runner` stage that copies only the essential build artifacts (`.next`, `public`, `package.json`) and installs *only* production dependencies using `npm ci --omit=dev`. This dramatically reduces the final image size and attack surface.

### 2. Content Pipeline (MDX)

Project and blog content is managed through a decoupled and efficient MDX-based pipeline.

- **Source:** Content is written in `.mdx` files with YAML frontmatter for metadata.
- **Data Layer (`/lib`):** A dedicated data-fetching layer reads the MDX files from the filesystem. It uses `gray-matter` to parse the frontmatter and separate it from the main content.
- **Rendering:** On the page, `next-mdx-remote` is used to render the MDX content string. This approach is highly performant as it avoids server-side compilation of components, sending only the necessary data to the client.

### 3. Styling System

The styling is built on a modern, utility-first foundation that is both powerful and maintainable.

- **Tailwind CSS v4.1:** Utilizes the latest version, operating without an explicit `tailwind.config.ts` file and leveraging its new engine for improved performance.
- **CSS Variable-Based Theming:** Light and Dark modes are implemented in `globals.css` using CSS variables. This allows for dynamic, real-time theme switching without page reloads and is fully compatible with Tailwind's `theme()` function.

### 4. Code Quality & Type Safety

- **TypeScript Strict Mode:** The project enforces TypeScript's `strict: true` mode, ensuring maximum type safety and reducing runtime errors.
- **ESLint:** A strict ESLint configuration (`eslint: 9`) is in place to maintain a consistent and high-quality codebase.

## 🛠️ Technology Stack

| Category          | Technology                                                              |
| ----------------- | ----------------------------------------------------------------------- |
| **Framework**     | [Next.js](https://nextjs.org/) (v15.5.2)                                |
| **UI Library**    | [React](https://react.dev/) (v19.1.0)                                   |
| **Language**      | [TypeScript](https://www.typescriptlang.org/) (v5)                      |
| **Styling**       | [Tailwind CSS](https://tailwindcss.com/) (v4.1)                         |
| **Animations**    | [Framer Motion](https://www.framer.com/motion/)                         |
| **Theming**       | [next-themes](https://github.com/pacocoursey/next-themes)               |
| **Content**       | [MDX](https://mdxjs.com/) with `next-mdx-remote` & `gray-matter`        |
| **Containerization**| [Docker](https://www.docker.com/) & Docker Compose                    |
| **Linting**       | [ESLint](https://eslint.org/) (v9)                                      |

## 📂 Project Structure

The project follows a feature-oriented structure with a clear separation of concerns.

```
./
├── app/                        # Main Next.js project folder
│   ├── public/                 # Static assets (images, fonts)
│   ├── src/
│   │   ├── app/                # Next.js App Router: routes and pages
│   │   ├── components/         # Reusable React components (UI, layout, sections)
│   │   ├── content/            # MDX content files for projects
│   │   └── lib/                # Core logic, data fetching, site metadata
│   ├── next.config.ts          # Next.js configuration
│   ├── package.json            # Project dependencies and scripts
│   └── tsconfig.json           # TypeScript configuration
├── docker-compose.dev.yml      # Development environment configuration
├── Dockerfile.dev              # Dockerfile for development
├── docker-compose.staging.yml  # Staging environment configuration
├── docker-compose.prod.yml     # Production environment configuration
└── Dockerfile.prod             # Multi-stage Dockerfile for production
```

## 🚀 Setup Guide

This is a quick reference for setting up the local development environment.

  1. **Clone the repository:**

  ```sh
  git clone https://github.com/iamseb4s/personal-web.git
  cd personal-web
  ```

  2. **Build and run the development container:**
    This command builds the Docker image and starts the `dev-web` service in the background.

  ```sh
  docker compose -f docker-compose.dev.yml up --build -d
  ```

  3. **Access the application:**
    The portfolio is now running in development mode and is accessible at [http://localhost:3030](http://localhost:3030).

## 🚢 CI/CD & Release Strategy

This project employs a robust CI/CD strategy to ensure code quality, stability, and predictable releases. The workflow is designed to catch errors early and provide high confidence before deploying to production.

### Key Features

- **PR Quality Gate:** Every pull request to the `main` branch automatically triggers a workflow that performs linting, type-checking, building, and security audits. Merging is blocked until all checks pass, ensuring the `main` branch is always in a deployable state.

- **Multi-Environment Workflow:** The project utilizes three distinct environments, each with a specific purpose:
  - **Development:** A local, containerized environment for feature development with hot-reloading.
  - **Staging:** A production-like environment for verifying release candidates before the final deployment. It uses the production build to ensure an accurate test.
  - **Production:** The live user-facing environment, deployed automatically from tagged releases on the `main` branch.

- **Release-Based Deployments:** Production deployments are automated and triggered exclusively by the creation of a new GitHub Release on a tagged commit. This provides a clear, auditable history of what version is deployed and when.

<details>
<summary><strong>View Step-by-Step Release Checklist</strong></summary>

1. Open PR from `develop` to `main`. Wait for `Main Branch - Quality Check` workflow to pass.
2. Merge PR into `main`.
3. From `main`, create and push a release candidate tag (e.g., `git tag v1.1.0-rc.1` && `git push --tags`).
4. On GitHub, publish a **pre-release** using the new RC tag.
5. Verify in staging environment:

  ```sh
  git switch --detach v1.1.0-rc.1
  docker compose -f docker-compose.staging.yml up -d --build
  ```

- Check on `http://localhost:4200`.

6. Once verified, create and push the final tag from `main` (e.g., `git tag v1.1.0` && `git push --tags`).
7. On GitHub, publish a new **full release** (ensure "pre-release" is unchecked) to trigger the production deployment.

</details>
