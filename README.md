# WeChat Lucky Money Covers

A lightweight, SEO-optimized lucky money cover collection page built with Lit
web components.

## Tech Stack

- **Lit** 3.1.2 - Fast, lightweight web components (~5KB)
- **Vite** 6.0.3 - Modern build tool with HMR
- **Pure CSS** - Self-contained styles inside Shadow DOM, no external CSS
  framework needed

## Features

- 🧧 70+ curated WeChat lucky money covers
- 📱 Mobile-first responsive grid layout
- 🔍 Full SEO optimization (meta tags, Open Graph, Twitter Cards)
- 🤖 GEO-ready (JSON-LD structured data, FAQ schema, semantic HTML)
- ♿ Accessible (ARIA labels, keyboard navigation, screen reader support)
- 🕷️ `<noscript>` fallback with full link list for search engine crawlers
- 📋 Copy-to-clipboard with fallback for older browsers
- 🔗 WeChat browser auto-detection for seamless redeem experience
- 📄 robots.txt + sitemap.xml included
- ⚡ Optimized build with disabled source maps

## Project Structure

```
/
├── index.html          # Entry HTML with SEO meta, JSON-LD, noscript fallback
├── src/
│   └── main.ts         # Lit component with embedded styles
├── public/
│   ├── favicon.svg     # Red envelope favicon
│   ├── robots.txt      # Search engine crawler rules
│   └── sitemap.xml     # XML sitemap
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## SEO & GEO Checklist

- [x] `<title>` with primary keywords
- [x] `<meta description>` with compelling summary
- [x] `<meta keywords>` with relevant terms
- [x] `<link rel="canonical">` for URL normalization
- [x] Open Graph tags for social sharing
- [x] Twitter Card tags
- [x] JSON-LD `CollectionPage` structured data
- [x] JSON-LD `FAQPage` structured data
- [x] Semantic HTML (`<h1>`, `<main>`, `<article>`, `<nav>`, `<footer>`)
- [x] ARIA labels and roles
- [x] `<noscript>` fallback with full content
- [x] robots.txt
- [x] sitemap.xml
- [x] Preconnect and DNS prefetch hints

---

Built with ❤️ using Lit
