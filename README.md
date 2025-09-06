# Personal Portfolio - Sebas

Welcome to the official repository of my personal portfolio. This project is a modern, responsive, and animated website built from scratch to showcase my skills and projects as a software developer.

## ✨ Features

- **Modern Tech Stack:** Built with Next.js 14 (App Router), React, and TypeScript.
- **Dynamic Theming:** Light and Dark mode support, implemented with `next-themes`.
- **Rich Content:** Project details are managed using MDX, allowing for a mix of Markdown and custom React components.
- **Smooth Animations:** Engaging user experience with animations powered by `framer-motion`.
- **Responsive Design:** Styled with Tailwind CSS for a perfect look on all devices.
- **Containerized Environment:** Fully containerized with Docker for consistent and easy setup.

## 🛠️ Technologies Used

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Content Management:** [MDX](https://mdxjs.com/)
- **Containerization:** [Docker](https://www.docker.com/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop/)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Create the environment file:**
    Duplicate the example environment file and fill in the required values.
    ```sh
    cp .env.example .env
    ```

3.  **Build and run the Docker container:**
    This command will build the Docker image and start the service in the background.
    ```sh
    docker-compose up --build -d
    ```

4.  **Access the application:**
    The portfolio is now running and accessible at [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

The project is organized with a root directory containing Docker configurations and the main application folder `app/`.

```
./
├── app/                   # Main Next.js project folder
│   ├── public/              # Static assets (images, icons)
│   ├── src/
│   │   ├── app/             # Next.js routes and pages
│   │   ├── components/      # Reusable React components
│   │   ├── content/         # MDX files for portfolio projects
│   │   └── lib/             # Helper functions and utilities
│   ├── next.config.ts       # Next.js configuration
│   ├── package.json         # Project dependencies and scripts
│   └── postcss.config.mjs   # PostCSS configuration (for Tailwind CSS)
├── .env.example           # Environment variable template
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile.dev         # Dockerfile for the development environment
└── .gitignore             # Files and folders ignored by Git
```

## 📜 Available Scripts

Scripts can be run inside the running Docker container.

-   **Run the development server:**
    ```sh
    docker-compose exec dev-web npm run dev
    ```

-   **Run linters and formatters:**
    ```sh
    docker-compose exec dev-web npm run lint
    ```

-   **Build for production:**
    ```sh
    docker-compose exec dev-web npm run build
    ```