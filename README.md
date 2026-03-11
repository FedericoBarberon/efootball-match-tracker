# eFootball Match Tracker Frontend

A React-based frontend application for tracking eFootball matches and teams,
built with a clean architecture approach.

## Features

- **Dashboard**: View match history, general statistics, and player standings
- **Match Management**: Create, view, and delete matches with filtering
  capabilities
- **Team Management**: Create, edit, archive/unarchive, and delete teams
- **Data Export**: Download match data as CSV
- **Responsive UI**: Built with TailwindCSS for a modern, responsive design
- **Clean Architecture**: Organized into domain, application, infrastructure,
  and presentation layers

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **Tanstack Query** - Data fetching and state management
- **Wouter** - Lightweight routing
- **PapaParse** - CSV parsing for data export
- **React Hot Toast** - Notifications
- **React Icons** - Icon library

## Installation

1. Ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/)
   installed
2. Clone the repository
3. Navigate to the frontend directory: `cd frontend`
4. Install dependencies: `pnpm install`

## Usage

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Linting

```bash
pnpm lint
```

## Project Structure

```
src/
├── application/          # Application layer
│   ├── commands.ts       # Application commands
│   ├── dto/              # Data Transfer Objects
│   └── orchestrators/    # Business logic orchestrators
├── core/                 # Core utilities
├── domain/               # Domain layer
│   ├── match/            # Match domain
│   └── team/             # Team domain
├── infra/                # Infrastructure layer
│   ├── localStorage/     # Local storage repositories
│   └── memory/           # In-memory repositories
└── presentation/         # Presentation layer
    ├── components/       # Reusable UI components
    ├── pages/            # Page components
    ├── queries/          # TanstackQuery hooks
    └── utils/            # Presentation utilities
```

## Architecture

This project follows Clean Architecture principles:

- **Domain**: Contains business entities, value objects, and repository
  interfaces
- **Application**: Contains use cases, commands, and orchestrators
- **Infrastructure**: Contains repository implementations and external concerns
- **Presentation**: Contains UI components, pages, and React-specific code
