# GrubHub -> Blinkit Clone Migration

This project has been migrated from a legacy MERN stack to a high-performance **Monorepo** using **Next.js 14**, **NestJS**, and **PostgreSQL**.

## Architecture

The project uses [Turborepo](https://turbo.build/repo) to manage the following workspaces:

- `apps/web`: Frontend Application (Next.js 14, Tailwind CSS, Shadcn/UI, Zustand)
- `apps/api`: Backend API (NestJS, Prisma ORM, Passport JWT)
- `packages/database`: Shared Database Schema (Prisma) and Seed scripts
- `legacy/`: Archived implementation of the original MERN stack

## Features Implemented

### Frontend (`apps/web`)

- **Blinkit-Style UI**: Fast, mobile-first design with animated interactions.
- **Location-Based**: Auto-detects location to fetch nearest store inventory.
- **Dynamic Cart**: Slide-over Cart Drawer with persistence.
- **Search**: Global search with type-ahead filtering.
- **Auth**: Login UI integrated with backend JWT.
- **Profile**: Order history and live status tracking.

### Backend (`apps/api`)

- **Catalog Service**: PostGIS-ready store finder and product management.
- **Cart Service**: Server-side cart locking logic.
- **Order Service**: Transactional order placement and inventory deduction.
- **Auth Service**: JWT-based authentication.

## Getting Started

### Prerequisites

- **Node.js**: Version 18.17.0 or higher (Required for Next.js 14).
- **PostgreSQL**: Running locally or via Docker (Port 5432).

### Installation

```bash
# Install dependencies for all workspaces
npm install
```

### Database Setup

Since Docker might be unavailable, perform manual setup:

1.  Create a PostgreSQL database named `grubhub`.
2.  Update `packages/database/.env` with your credentials.
3.  Push schema and seed data:
    ```bash
    cd packages/database
    npx prisma db push
    npx ts-node seed.ts
    ```

### Running the App

To run both Frontend and Backend concurrently:

```bash
npm run dev
# or
turbo dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:3001](http://localhost:3001)

## Known Issues

- **Node 16**: If you see build errors, upgrade Node.js.
- **Database Connection**: If the API crashes, ensure Postgres is running and `DATABASE_URL` is correct.
