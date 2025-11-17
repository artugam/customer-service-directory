# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Customer Service Platform Directory** - a Next.js 16 application that helps businesses discover and compare customer service platforms. The app features a platform finder wizard with a sophisticated matching algorithm, TCO (Total Cost of Ownership) calculator, and comprehensive platform comparison tools.

## Development Commands

### Basic Commands
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Testing Individual Components
This is a Next.js application without test runners configured. To test changes:
1. Run `npm run dev` and navigate to the relevant page
2. For API routes: Test at `/api/platforms` or `/api/platforms/[id]`
3. For wizard: Visit `/find-platform`
4. For TCO calculator: Check platform detail pages

## Architecture

### Data Layer
The application uses a **JSON-based data architecture** with comprehensive Zod validation:
- **Data Source**: `/src/data/platforms.json` (not checked into git per convention)
- **Schema**: `/src/schemas/platform.schema.ts` - Comprehensive Zod schemas defining the entire platform structure
- **Validation**: All platform data is validated against the schema at API level
- **Type Safety**: TypeScript types are inferred from Zod schemas (`z.infer<typeof schema>`)

### API Architecture
- **Server-side APIs**: `/src/app/api/platforms/route.ts` for fetching all platforms
- **Individual platform API**: `/src/app/api/platforms/[id]/route.ts`
- **Server-side data fetching**: Use `getPlatformsServer()` and `getPlatformByIdServer()` from `/src/lib/platforms.ts` for better performance in Server Components
- **Client-side fetching**: Use `getPlatforms()` and `getPlatformById()` for client components

### Key Business Logic

#### 1. Platform Matching Algorithm (`/src/lib/matching-algorithm.ts`)
The wizard matching algorithm scores platforms 0-100 based on:
- Company size (25 points)
- Industry fit (20 points)
- Budget match (20 points)
- **Required integrations (15 points) - CRITICAL**: Missing required integrations results in -50 penalty
- Support volume (10 points)
- AI capabilities (5 points)
- Deployment type (3 points)
- Security certifications (2 points)

**Important**: The algorithm generates match reasons and concerns to explain recommendations to users.

#### 2. TCO Calculator (`/src/lib/tco-calculator.ts`)
Calculates true total cost including:
- Base subscription costs
- Add-on features
- Integration costs (premium integrations)
- API usage overages
- Data storage costs
- Implementation fees
- Training costs
- Migration costs (1-year and 3-year projections)

#### 3. Platform ID Generation
Platform IDs are generated from `trade_name`: lowercase with spaces replaced by hyphens (e.g., "Zendesk Support" → "zendesk-support"). See `generatePlatformId()` in `/src/lib/platforms.ts:72`.

### Component Structure
- **UI Components**: `/src/components/ui/` - Shadcn UI components (button, card, input, select, etc.)
- **Feature Components**: `/src/components/` - Platform cards, filters, search, wizard steps, etc.
- **Wizard Steps**: `/src/components/wizard-steps/` - Multi-step wizard components
- **Theme Support**: Dark/light mode via `next-themes` with ThemeProvider and ThemeToggle

### Type System
- **Platform Types**: `/src/types/platform.ts` - Re-exports types from Zod schema
- **Wizard Types**: `/src/types/wizard.ts` - Wizard-specific types (WizardAnswers, PlatformMatch)
- **TCO Types**: `/src/types/tco.ts` - TCO calculator types (TCOInputs, TCOBreakdown)
- **Type Inference**: All types are inferred from Zod schemas for single source of truth

## Styling

- **Framework**: Tailwind CSS 4
- **Component Library**: Shadcn UI + Radix UI primitives
- **Global Styles**: `/src/app/globals.css`
- **Path Alias**: `@/*` maps to `/src/*`
- **Utilities**: `/src/lib/utils.ts` contains `cn()` helper for class merging

## Important Patterns

### Adding New Platforms
1. Edit `/src/data/platforms.json` (must validate against schema)
2. Ensure all required fields match `/src/schemas/platform.schema.ts`
3. Include `suitability` and `risk_assessment` data for wizard matching
4. Add `pricing.hidden_costs` for TCO calculator accuracy

### Working with Platform Data
Always use the schema-validated functions:
```typescript
// Server Components (preferred)
import { getPlatformsServer } from "@/lib/platforms";
const platforms = await getPlatformsServer();

// Client Components
import { getPlatforms } from "@/lib/platforms";
const platforms = await getPlatforms();
```

### Schema Validation
The Zod schema at `/src/schemas/platform.schema.ts` is the single source of truth. All platform data must conform to:
- `platformSchema` - Individual platform structure
- `platformsDirectorySchema` - Top-level wrapper with `systems` array

### Matching Algorithm Customization
When adjusting the matching algorithm (`/src/lib/matching-algorithm.ts`):
- Maintain total weight sum close to 100 for accurate scoring
- Required integrations are critical - missing ones result in heavy penalties (-50 points)
- Use `generateMatchReasons()` and `generateConcerns()` to explain scores to users

## Metadata and SEO
- Central metadata generation: `/src/lib/metadata.ts` with `generateSEOMetadata()`
- Platform-specific metadata uses data from `seo_metadata` field in platform schema
- Sitemap: `/src/app/sitemap.ts`
- Robots: `/src/app/robots.ts`

## Configuration Files
- **TypeScript**: `tsconfig.json` with strict mode, path alias `@/*` → `./src/*`
- **Next.js**: `next.config.ts` (minimal config, relies on Next.js 16 defaults)
- **ESLint**: `eslint.config.mjs`
- **Tailwind**: PostCSS-based configuration (Tailwind CSS 4)

## Key Features
1. **Platform Finder Wizard** (`/src/app/find-platform/`) - Multi-step wizard with smart matching
2. **TCO Calculator** (`/src/components/tco-calculator.tsx`) - Expose real costs vs advertised pricing
3. **Business Case Exports** (`/src/lib/export-utils.ts`) - Generate comparison documents for stakeholders
4. **Compare View** (`/src/app/compare/`) - Side-by-side platform comparison
5. **Individual Platform Pages** (`/src/app/platform/[id]/`) - Detailed platform information

## Working with Server Components
This app heavily uses Next.js 16 Server Components:
- Most pages are Server Components by default
- Use `"use client"` only when needed (interactivity, hooks, browser APIs)
- Prefer `getPlatformsServer()` for server-side rendering (no API round-trip)
- API routes are for client-side fetching or external access
