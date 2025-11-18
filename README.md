# Personal Portfolio - A Headless Monorepo Showcase

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/) [![Strapi](https://img.shields.io/badge/Strapi-5.31-8F75FF?logo=strapi)](https://strapi.io/) [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/) [![Docker](https://img.shields.io/badge/Docker-gray?logo=docker)](https://www.docker.com/)

### 🌐 [View Live Demo](https://iamsebas.dev)

This repository contains the source code for my personal portfolio, meticulously crafted not just as a gallery of my work, but as a testament to modern, high-standard web development practices. The project emphasizes performance, developer experience (DX), and architectural robustness, built on a foundation of the latest industry-standard technologies. It has been architected as a **headless monorepo** to showcase a clear separation of concerns between the frontend presentation layer and the backend content management system.

## Core Philosophy

- **Headless Architecture:** The frontend (Next.js) is completely decoupled from the backend (Strapi CMS). This allows for independent development, scaling, and deployment of the presentation layer and the content management system.
- **Monorepo Structure:** Both the Next.js and Strapi applications reside within a single repository, managed as distinct services. This simplifies dependency management and cross-application consistency.
- **Developer Experience (DX):** A fully containerized multi-service environment using Docker Compose ensures a consistent and hassle-free setup. Strict linting, formatting, and TypeScript configurations are enforced to maintain code quality.
- **Performance & Scalability:** The architecture is designed for performance, with an optimized Next.js frontend consuming a powerful Strapi API. Multi-stage Docker builds create lean, secure production images.

## 🏛️ Architectural Deep Dive

This project is a collection of deliberate engineering decisions to build a scalable and maintainable web application.

### 1. Application Structure (Monorepo)

The project is organized into two primary applications under the `/apps` directory:

- **`/apps/web`:** A modern Next.js application responsible for the presentation layer (UI). It fetches all content from the Strapi API at runtime.
- **`/apps/cms`:** A powerful Strapi v5 application that serves as the headless Content Management System. It exposes a robust API for projects, technologies, and other content.

### 2. Containerization Strategy (Docker)

The entire lifecycle is containerized using Docker and Docker Compose, orchestrating the multi-service environment.

- **Development (`docker-compose.dev.yml`):** Starts both `dev-web` and `dev-cms` services with hot-reloading enabled through volume mounts for a fast feedback loop.
- **Staging & Production (`docker-compose.staging.yml`, `docker-compose.prod.yml`):** Use multi-stage Docker builds to create lean, secure, and optimized production images. Bind mounts are used to ensure data persistence for the CMS database and uploads.

### 3. Content & Data Pipeline

- **Strapi CMS:** All content, including global UI text, project details, dynamic page components, and images, is managed through the Strapi admin panel.
- **Next.js Data Fetching:** The Next.js application uses a dedicated library (`/apps/web/src/lib/strapi.ts`) to communicate with the Strapi API. Data fetching is centralized and performed server-side at runtime, ensuring content is always up-to-date without requiring a rebuild of the frontend.

## 🛠️ Technology Stack

| Category              | Technology                                                              |
| --------------------- | ----------------------------------------------------------------------- |
| **Frontend (Web)**    | [Next.js](https://nextjs.org/) (v15.5), [React](https://react.dev/) (v19) |
| **Backend (CMS)**     | [Strapi](https://strapi.io/) (v5.31)                                    |
| **Language**          | [TypeScript](https://www.typescriptlang.org/) (v5)                      |
| **Styling**           | [Tailwind CSS](https://tailwindcss.com/) (v4)                           |
| **Containerization**  | [Docker](https://www.docker.com/) & Docker Compose                    |
| **Linting**           | [ESLint](https://eslint.org/) (v9)                                      |

## 📂 Project Structure

```
./
├── apps/
│   ├── cms/                  # Strapi Headless CMS application
│   └── web/                  # Next.js Frontend application
│       ├── public/             # Static assets (images, fonts)
│       ├── src/
│       │   ├── app/            # Next.js App Router: routes and pages
│       │   ├── components/     # Reusable React components (UI, layout, sections)
│       │   ├── lib/            # Core logic, data fetching
│       │   └── types/          # Shared TypeScript types
│       ├── next.config.ts      # Next.js configuration
│       └── ...
├── backup.sh                   # Script to backup Strapi databases
├── docker-compose.dev.yml      # Development environment configuration
├── docker-compose.staging.yml  # Staging environment configuration
├── docker-compose.prod.yml     # Production environment configuration
└── README.md
```

## 🚀 Setup Guide

This guide explains how to set up the local multi-service development environment.

1. **Clone the repository:**

    ```sh
    git clone https://github.com/iamseb4s/personal-web.git
    cd personal-web
    ```

2. **Configure Environment Variables:**
    Copy the `.env.example` files for both applications and fill in the required values.

    ```sh
    cp apps/web/.env.example apps/web/.env.development
    cp apps/cms/.env.example apps/cms/.env.development
    ```

3. **Build and run the development containers:**
    This command builds the Docker images and starts the `dev-web` and `dev-cms` services.

    ```sh
    docker compose -f docker-compose.dev.yml up --build -d
    ```

4. **Access the applications:**
    - **Web App:** [http://localhost:4100](http://localhost:4100)
    - **Strapi Admin:** [http://localhost:4101/admin](http://localhost:4101/admin)

## 🚢 CI/CD & Release Strategy

This project employs a robust CI/CD strategy to ensure code quality, stability, and predictable releases. The workflow is designed to catch errors early and provide high confidence before deploying to production.

### Key Features

- **PR Quality Gate:** Every pull request to the `main` branch automatically triggers a workflow that performs linting, type-checking, building, and security audits for both applications.
- **Multi-Environment Workflow:** The project utilizes three distinct environments, each with a specific purpose:
  - **Development:** A local, containerized environment for feature development with hot-reloading.
  - **Staging:** A production-like environment for verifying release candidates before the final deployment. It uses the production build to ensure an accurate test.
  - **Production:** The live user-facing environment, deployed automatically from tagged releases on the `main` branch.
- **Release-Based Deployments:** Production deployments are automated and triggered exclusively by the creation of a new GitHub Release on a tagged commit.

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
