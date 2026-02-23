# Product Detail Page Architecture

This module implements a high-performance, SEO-friendly Product Detail Page (PDP) using Next.js App Router.

## Key Architectural Decisions

### 1. Hybrid Data Fetching Strategy

We use a **Server Component** (`page.tsx`) as the data layer.

- **Primary Source**: Database (`db.product.findUnique`).
- **Fallback Source**: Static Data (`lib/data.ts`).
- **Reasoning**: This ensures the application is robust for demos even if the database isn't fully seeded, while being production-ready for real data.
- **Benefit**: Zero client-side waterfalls for initial data load. SEO meta tags can be generated on the server.

### 2. Client-Side Interactivity (`ProductClient.tsx`)

We separate the interactive UI into a **Client Component**.

- **State Management**: Handles image gallery switching, variant selection, and quantity updates locally.
- **Cart Integration**: Connects directly to the global Zustand store (`useCart`) for optimistic UI updates.
- **Performance**: Heavy interactivity is isolated, keeping the server component lightweight.

### 3. Modern UI/UX Patterns

- **Visual Hierarchy**: Implemented a "Zepto/Blinkit" style layout with vertical thumbnails and clear pricing.
- **Mobile Optimization**: Added a sticky footer for the "Add to Cart" action to improve conversion rates on small screens.
- **Micro-interactions**: Added flying cart animations and hover zoom effects for a premium feel.
- **Glassmorphism**: Used subtly in badges and the coupons section.

## best Practices Followed

- **Slug Decoding**: Properly decoding URI components to handle complex product names.
- **Graceful Error Handling**: Replaced generic 404s with a custom "Product Not Found" empty state.
- **Responsive Design**: Mobile-first approach with distinct layouts for phone vs desktop.
- **Type Safety**: TypeScript interfaces used for props and data structures.
