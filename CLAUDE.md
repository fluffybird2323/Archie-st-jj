# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an e-commerce storefront built with Next.js 15, TypeScript, and Supabase. It features:
- Internationalization (i18n) with 7 languages
- Dynamic product catalog from Supabase
- Admin panel at `/realadmin` for product management
- Shopping cart with localStorage persistence
- Responsive design with Tailwind CSS and Radix UI components

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Run linting
npm run lint
```

## Architecture

### Routing Structure
- **`/[locale]/*`**: All user-facing pages are locale-prefixed (e.g., `/en/`, `/zh-CN/`)
- **`/realadmin`**: Admin panel (bypasses locale routing)
- **`/api/*`**: API routes for backend operations
- **Middleware**: Handles automatic locale detection and routing

### Key Directories
- **`app/`**: Next.js App Router pages and API routes
- **`components/`**: Reusable React components
- **`lib/`**: Core utilities and business logic
  - `supabase.ts`: Database client and product operations
  - `i18n/`: Translation system with free and premium options
  - `cart-context.tsx`: Global cart state management
- **`scripts/`**: SQL scripts for database setup

### Database Integration
The app uses Supabase PostgreSQL with a `products` table. Key operations:
- `getProducts()`: Fetch all products
- `getProductBySlug(slug)`: Get single product
- `createProduct()`, `updateProduct()`, `deleteProduct()`: Admin CRUD operations

Products support color-image mapping where each color variant can reference a specific product image by index.

### Translation System
Three-tier translation system:
1. **Static dictionaries**: Pre-translated common UI text
2. **Free translation**: MyMemory API (1000 words/day, no key required)
3. **Premium translation**: Google Translate API (optional, requires API key)

Use the `useEnhancedDictionary` hook in components for automatic translation with fallbacks.

### Authentication
Simple localStorage-based admin authentication:
- Login: `admin@artiestudio.org` / `admin123`
- Session stored in `localStorage.admin_authenticated`

## Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Optional for premium features
STRIPE_SECRET_KEY=your_stripe_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
GOOGLE_TRANSLATE_API_KEY=your_google_api_key
```

## Common Tasks

### Adding a new product
1. Navigate to `/realadmin` and login
2. Click "Add Product" and fill the form
3. For color variants, specify the image index (0-based) for each color

### Modifying translations
1. Static translations: Edit files in `lib/i18n/dictionaries/`
2. Dynamic translations are cached and will use free service automatically

### Running database migrations
```bash
# From Supabase SQL editor, run scripts in order:
scripts/create-auth-tables.sql
scripts/create-products-table.sql
scripts/add-sample-products.sql
```

## Key Patterns

### Component Structure
- Use existing UI components from `components/ui/`
- Follow the design system patterns in `lib/design-system.ts`
- Maintain TypeScript strict mode compliance

### State Management
- Cart state: Use `CartContext` from `lib/cart-context.tsx`
- Product data: Fetch server-side when possible, client-side with `getProducts()`
- Locale: Managed by middleware and available via `params.locale`

### Error Handling
- Supabase operations return empty arrays/null on error (no exceptions thrown)
- Translation failures gracefully fall back to English text
- Missing environment variables log warnings but don't crash the app