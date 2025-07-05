# Hoodie Store

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/fluffybird2323s-projects/v0-hoodie-store)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/rfdDEt8h1oQ)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Local Development

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account and project
- Stripe account (for payments)

### Environment Setup

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd Archie-st-jj
\`\`\`

2. Install dependencies:
\`\`\`bash
pnpm install
# or
npm install
\`\`\`

3. Create a `.env.local` file in the root directory with the following variables:
\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Optional: Google Translate API (for premium translation service)
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key
\`\`\`

### Database Setup

1. Set up your Supabase project and get your project URL and anon key
2. Run the database setup scripts in the `scripts/` directory:
   - `create-auth-tables.sql` - Creates authentication tables
   - `create-products-table.sql` - Creates products table
   - `create-admin-users.sql` - Creates admin user accounts
   - `add-sample-products.sql` - Adds sample product data

### Running the Application

1. Start the development server:
\`\`\`bash
pnpm dev
# or
npm run dev
\`\`\`

2. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Project Structure

\`\`\`
├── app/                    # Next.js app directory
│   ├── [locale]/          # Internationalized routes
│   ├── admin/             # Admin panel routes
│   ├── api/               # API routes
│   │   ├── translate/     # Google Translate API (premium)
│   │   ├── translate-deepl/ # DeepL API (premium)
│   │   └── translate-free/ # Free translation API
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature-specific components
├── lib/                  # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── supabase.ts       # Supabase client
│   ├── i18n/             # Internationalization
│   │   ├── enhanced-utils.ts      # DeepL + Free translation integration
│   │   ├── simple-enhanced-utils.ts # Free translation integration
│   │   ├── use-enhanced-dictionary.ts # React hooks for DeepL
│   │   └── use-simple-translation.ts # React hooks for free translation
│   ├── deepl-translate.ts         # DeepL API integration
│   ├── google-translate.ts        # Google Translate API
│   ├── free-translate.ts          # Free translation service
│   └── cart-context.tsx           # Shopping cart state
├── scripts/              # Database setup scripts
└── public/               # Static assets
\`\`\`

## Translation Services

### DeepL API (Primary - High Quality)
The app uses DeepL API as the primary translation service:
- **Higher quality translations** than Google Translate
- **500,000 characters/month free** with DeepL Free plan
- **Automatic caching** to reduce API calls
- **Usage statistics** available via API
- **Fallback to free service** if DeepL fails

### Free Translation Service (Fallback)
MyMemory API as a free fallback:
- **No API key required**
- **1000 words/day limit**
- **500 characters per request**
- **Automatic caching** to reduce API calls
- **Fallback translations** for common UI terms

### Premium Translation Service (Optional)
Google Translate API as an alternative:
- **Requires API key** (`GOOGLE_TRANSLATE_API_KEY`)
- **No character limits** (subject to Google's pricing)
- **Automatic fallback** to DeepL/free service if not configured

### Translation Priority Order:
1. **Static dictionaries** (fastest, most reliable)
2. **Fallback translations** (common UI terms)
3. **DeepL API** (highest quality)
4. **Free translation service** (MyMemory API)
5. **Original text** (if all else fails)

### Using Translation in Components

\`\`\`tsx
import { useEnhancedDictionary } from "@/lib/i18n/use-enhanced-dictionary"

function MyComponent() {
  const { t, isLoading, isDeepLTranslationAvailable } = useEnhancedDictionary(locale)
  
  const handleTranslate = async () => {
    const translatedText = await t("some.key", "Text to translate")
    // Will use DeepL first, then fallback to free service
  }
  
  return (
    <div>
      {isLoading ? "Translating..." : "Content"}
      {isDeepLTranslationAvailable && <span>✨ DeepL Available</span>}
    </div>
  )
}
\`\`\`

### Translation API Endpoints

- `GET /api/translate-deepl` - Check DeepL service status and usage
- `POST /api/translate-deepl` - Translate text using DeepL API
- `GET /api/translate-free` - Check free translation service status
- `POST /api/translate-free` - Translate text using free service
- `GET /api/translate` - Check Google Translate service status (if configured)
- `POST /api/translate` - Translate text using Google Translate (if configured)

## Deployment

Your project is live at:

**[https://vercel.com/fluffybird2323s-projects/v0-hoodie-store](https://vercel.com/fluffybird2323s-projects/v0-hoodie-store)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/rfdDEt8h1oQ](https://v0.dev/chat/projects/rfdDEt8h1oQ)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Deployment**: Vercel
- **Package Manager**: pnpm
- **Translation**: DeepL API (primary) + MyMemory API (fallback) + Google Translate API (optional)
- **Shopping Cart**: React Context + localStorage
