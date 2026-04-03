# Mevyn Frontend

The frontend for the Mevyn media body website -- a platform for publishing blog posts, managing series, showcasing events, and introducing the team. Built with React and backed by a REST API.

## Prerequisites

- **Node.js** 18 or later
- **Mevyn Backend** API running (defaults to `http://localhost:3000`)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Yogyaahuja1/Mevyn-Frontend.git
cd Mevyn-Frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env if your backend runs on a different URL

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173`.

## Available Scripts

| Command             | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start Vite dev server with hot reload    |
| `npm run build`     | Production build to `dist/`              |
| `npm run preview`   | Serve the production build locally       |
| `npm run lint`      | Run ESLint across the project            |

## Tech Stack

- **React 19** -- UI library
- **Vite 8** -- Build tool and dev server
- **Tailwind CSS v4** -- Utility-first styling with AMOLED dark mode
- **TipTap** -- Rich text editor for blog post authoring
- **React Router v7** -- Client-side routing
- **Axios** -- HTTP client with JWT interceptor
- **lucide-react** -- Icon library
- **clsx + tailwind-merge** -- Conditional class name utility

## Developer Documentation

See [CLAUDE.md](./CLAUDE.md) for detailed developer documentation including project structure, component map, coding conventions, and backend API reference.
