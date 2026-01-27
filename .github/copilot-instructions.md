# Copilot Instructions for xops-hub-spark

## Project Overview
X-Ops Hub Spark is a React-based community platform for tech events, workshops, and networking. Built with **Vite + React 18 + TypeScript + shadcn-ui + Tailwind CSS**.

## Architecture & Key Patterns

### Routing & Page Structure
- **Router**: React Router v6 with BrowserRouter at app root ([App.tsx](src/App.tsx))
- **Pages**: Located in `src/pages/` - each page exported as a component (e.g., Index.tsx, Events.tsx, About.tsx)
- **Route setup**: Add all custom routes ABOVE the catch-all `*` route in App.tsx to avoid 404 errors
- **Layout wrapper**: Most pages wrap content with Layout component ([Layout.tsx](src/components/layout/Layout.tsx)) which provides Navbar + Footer + tech-grid background

### Component Organization
- **UI Components**: `src/components/ui/` contains shadcn-ui primitives (button, card, dialog, etc.) - **DO NOT manually edit** these, regenerate via shadcn-cli if needed
- **Layout Components**: `src/components/layout/` for structural elements (Navbar, Footer)
- **Custom Components**: Domain-specific components alongside their usage pages
- **NavLink wrapper**: Custom [NavLink.tsx](src/components/NavLink.tsx) provides React Router + Tailwind styling integration

### Styling & Theme System
- **Tailwind CSS**: Primary styling approach - use `cn()` utility to merge Tailwind classes safely
- **Color system**: HSL-based CSS variables defined in index.css for theme colors (--border, --input, --primary, etc.)
- **Class merging**: Always use `cn()` from `@/lib/utils` when combining dynamic + static classes to avoid conflicts
- **Glass morphism**: Layout uses "glass" and "tech-grid" custom classes for visual styling

### Data & State Management
- **React Query**: TanStack React Query v5 for server state, configured in App.tsx as QueryClientProvider
- **Local state**: Use `useState` for UI state (see Navbar mobile menu pattern)
- **Forms**: react-hook-form + zod for validation (see package.json dependencies)

### UI Library Dependencies
- **Radix UI**: Unstyled, accessible components (accordion, dialog, popover, tabs, etc.)
- **Lucide React**: Icon library (ArrowRight, Code2, Users, Calendar, etc.)
- **Sonner**: Toast notifications (imported in App.tsx as secondary Toaster)
- **Recharts**: Data visualization for charts

## Development Workflows

### Local Development
```bash
npm run dev          # Start Vite dev server (port 8080, HMR enabled)
npm run build        # Production build to dist/
npm run build:dev    # Development build
npm run lint         # Run ESLint on all TS/TSX files
npm run test         # Run Vitest once
npm run test:watch   # Watch mode for tests
npm run preview      # Preview production build locally
```

### Import Aliases
- Use `@/` prefix for src imports (configured in vite.config.ts and tsconfig.json)
- Example: `import Layout from "@/components/layout/Layout"`

### Testing Setup
- **Framework**: Vitest with jsdom environment
- **Setup**: [src/test/setup.ts](src/test/setup.ts) includes Testing Library DOM matchers and matchMedia mock
- **Pattern**: Tests in same directory as components with `.test.ts` or `.spec.ts` suffix
- **Reference**: [src/test/example.test.ts](src/test/example.test.ts)

## Code Standards & Conventions

### TypeScript Configuration
- **Loose mode**: `noImplicitAny: false`, `strictNullChecks: false` to favor developer velocity
- **Unused variables**: Disabled in ESLint config (rule off)
- **Props interfaces**: Define at component scope, e.g., `interface LayoutProps { children: ReactNode }`

### Component Patterns
1. **Functional components**: All components are function-based with TypeScript
2. **Export style**: `export default ComponentName` - not named exports (except UI primitives)
3. **forwardRef pattern**: Use for custom wrapper components that need ref forwarding (see NavLink.tsx)
4. **Props typing**: Export interface named `{ComponentName}Props` when used in multiple places

### Styling Patterns
- **Utility-first**: Prefer Tailwind classes over CSS files
- **CSS files**: Used only for global styles (index.css) and component-specific animations (App.css)
- **Custom CSS classes**: "glass", "tech-grid", "nav-link" defined in index.css - reuse across pages
- **Responsive**: Use Tailwind breakpoints (md:, lg:) - see Navbar responsive navigation example

### File Naming
- **React components**: PascalCase (Navbar.tsx, Layout.tsx)
- **Utilities/hooks**: camelCase (use-mobile.tsx, utils.ts, setup.ts)
- **Types**: Inline in component file with Props suffix convention

## External Dependencies & Integration Points

### Key Libraries to Know
- **@hookform/resolvers**: Form validation bridge between react-hook-form and zod
- **embla-carousel**: Carousel functionality (imported in package.json)
- **next-themes**: Theme switching support (dark mode ready)
- **vaul**: Drawer component functionality
- **react-resizable-panels**: Layout resizable panels
- **date-fns + react-day-picker**: Date selection components

### API/Data Integration
- React Query is configured for server data - use `useQuery` hooks for async operations
- No backend API calls visible in current codebase - add via React Query when integrating API

## Common Development Tasks

### Adding a New Page
1. Create component in `src/pages/{PageName}.tsx`
2. Import in [App.tsx](src/App.tsx) and add Route before catch-all
3. Wrap content in Layout component for consistent navbar/footer
4. Link from navigation via [Navbar.tsx](src/components/layout/Navbar.tsx)

### Adding UI Components from shadcn
1. Use shadcn-cli: `npx shadcn-ui@latest add [component-name]`
2. Components auto-generate in `src/components/ui/`
3. Import and use in pages/components

### Creating Custom Forms
- Import form primitives from `@/components/ui/form`
- Use react-hook-form for state management
- Add zod schema for validation in same file

### Mobile Responsiveness
- Reference [Navbar.tsx](src/components/layout/Navbar.tsx) for mobile menu pattern
- Use `hidden md:flex` for desktop-only sections
- Test with Vite dev tools mobile viewport
