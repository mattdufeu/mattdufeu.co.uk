# AI Coding Instructions for mattdufeu.co.uk

## Architecture Overview

This is a **Next.js 15 blog** using the App Router architecture with:

- **Contentlayer2** for MDX-based content management (blog posts in `data/blog/`, authors in `data/authors/`)
- **Tailwind CSS 4** for styling (v4.x uses `@tailwindcss/postcss` instead of traditional config files)
- **TypeScript** with path aliases (`@/components`, `@/data`, `@/layouts`)
- **Pliny** library for common blog features (analytics, comments, search, newsletter)

The blog content lives in `data/` while the app structure follows Next.js App Router patterns in `app/`.

## Critical Build & Dev Workflows

### Development

```bash
yarn dev  # Runs with INIT_CWD=$PWD for Contentlayer compatibility
```

### Production Build

```bash
yarn build  # Builds Next.js + runs postbuild script for RSS generation
```

**Important:** The build uses `cross-env INIT_CWD=$PWD` to set working directory for Contentlayer. This is required for Contentlayer to find content files correctly.

### Post-build Process

After Next.js build completes, `scripts/postbuild.mjs` runs to:

1. Generate RSS feed via `scripts/rss.mjs`
2. Uses `NODE_OPTIONS='--experimental-json-modules'` to import JSON modules

### Bundle Analysis

```bash
yarn analyze  # Builds with @next/bundle-analyzer enabled
```

## Content Management with Contentlayer

### Document Types

- **Blog**: `data/blog/**/*.mdx` - Blog posts with frontmatter (title, date, tags, summary, etc.)
- **Authors**: `data/authors/**/*.mdx` - Author profiles

### Frontmatter Fields (Blog)

Required: `title`, `date`
Optional: `tags`, `projects`, `lastmod`, `draft`, `summary`, `images`, `authors`, `layout`, `bibliography`, `canonicalUrl`

### Build-time Content Processing

Contentlayer config (`contentlayer.config.ts`) does two critical things on build success:

1. **Tag counting**: Scans all blog posts, counts tag occurrences, writes to `app/tag-data.json`
2. **Search index**: Generates `public/search.json` for kbar search if enabled in siteMetadata

### MDX Plugin Pipeline

Remark plugins (markdown → markdown):

- `remarkExtractFrontmatter`, `remarkGfm`, `remarkCodeTitles`, `remarkMath`, `remarkImgToJsx`, `remarkAlert`

Rehype plugins (HTML processing):

- `rehypeSlug`, `rehypeAutolinkHeadings` (prepends link icons to headings)
- `rehypeKatex` + `rehypeKatexNoTranslate` (math rendering)
- `rehypeCitation` (bibliography support, reads from `data/`)
- `rehypePrismPlus` (syntax highlighting with line numbers, default language: `js`)
- `rehypePresetMinify`

## Project Conventions & Patterns

### Path Aliases (tsconfig.json)

```typescript
"@/components/*" → "components/*"
"@/data/*" → "data/*"
"@/layouts/*" → "layouts/*"
"contentlayer/generated" → "./.contentlayer/generated"
```

### Layout System

Three post layouts in `layouts/`:

- **PostLayout**: Default 2-column layout with sidebar (author info, tags)
- **PostSimple**: Simplified single-column layout
- **PostBanner**: Features banner image at top

Two listing layouts:

- **ListLayout**: V1 style with search bar
- **ListLayoutWithTags**: V2 style with tags sidebar (currently used)

Specify layout in frontmatter: `layout: PostSimple` (defaults to PostLayout if omitted)

### Component Patterns

#### MDX Components

Custom components available in MDX files are defined in `components/MDXComponents.tsx`:

- `Image` - Next.js optimized images
- `TOCInline` - Table of contents
- `a` → `CustomLink` - Internal link handling
- `pre` → `Pre` - Code blocks with copy button
- `table` → `TableWrapper` - Responsive table wrapper
- `BlogNewsletterForm` - Newsletter subscription

#### Route Structure

- `/blog` - Blog listing (paginated, 5 posts per page)
- `/blog/[...slug]` - Individual blog posts
- `/tags/[tag]` - Tag-filtered posts
- `/projects/[project]` - Project pages
- `/about` - About page

### Site Configuration

**Critical file**: `data/siteMetadata.js` - PlinyConfig with:

- Site metadata (title, description, URLs)
- Analytics config (Umami via env var `NEXT_UMAMI_ID`)
- Comments config (Giscus, currently commented out)
- Search provider (kbar)
- Newsletter provider (currently disabled)

### Security Headers

`next.config.js` defines strict CSP. **When adding external services**, update:

- `script-src` for external scripts
- `connect-src` for API calls
- `frame-src` for iframes

Currently allows: `giscus.app`, `analytics.umami.is`, `cloud.umami.is`

## Known Issues & Quirks

### Dependency Version Locks

- `@headlessui/react` locked to `2.2.7` - versions > 2.2.7 cause rehydration issues in `MobileNav.tsx`

### Contentlayer Generated Types

Types are generated in `.contentlayer/generated/` and imported as:

```typescript
import { allBlogs, type Blog, type Authors } from 'contentlayer/generated'
```

### Styling System

**Tailwind v4** uses `@tailwindcss/postcss` plugin instead of traditional `tailwind.config.js`. Custom styles in:

- `css/tailwind.css` - Global Tailwind imports
- `css/prism.css` - Code block syntax theme (customizable)

### Font Optimization

Uses `next/font/google` with Space Grotesk font loaded in `app/layout.tsx`:

```typescript
const space_grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
```

## Common Tasks

### Adding a Blog Post

1. Create `data/blog/your-post.mdx`
2. Add frontmatter (at minimum: `title`, `date`)
3. Contentlayer auto-generates types and search index on next build/dev

### Adding Custom MDX Components

1. Create component in `components/`
2. Export it (default export) to avoid Next.js issues
3. Add to `components/MDXComponents.tsx` exports
4. Use in any `.mdx` file

### Modifying Markdown Processing

Edit `contentlayer.config.ts` → `mdx.remarkPlugins` or `mdx.rehypePlugins` array

### Updating Site Metadata

Edit `data/siteMetadata.js` (not TypeScript, JavaScript config file)

## Development Environment

- **Package Manager**: Yarn 4.10.3 (Berry) via `packageManager` field
- **Node Version**: Not specified (works with modern Node LTS)
- **Lint/Format**: ESLint + Prettier (auto-runs on git commit via husky + lint-staged)

Run `yarn lint` to auto-fix linting issues across `app/`, `components/`, `layouts/`, etc.
