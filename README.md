# Knowledge Base

Personal knowledge portal powered by Astro + GitHub Pages.

## Tech Stack
- **Astro 5.x** - Static site generator
- **Content Collections** - Type-safe article metadata (Zod)
- **GitHub Pages** - Hosting (auto-deploy via GitHub Actions)

## Development

```bash
npm install
npm run dev      # localhost:4321
npm run build    # Production build
```

## Adding Articles

Create a new `.md` file in `src/content/knowledge/`:

```yaml
---
title: "Article Title"
description: "Short description"
date: 2026-02-20
category: business
tags: [tag1, tag2]
draft: false
---

Article content here...
```

Push to `main` branch to auto-deploy.

## AI Manifest

`ai-manifest.json` is auto-generated at build time with all article metadata.
Claude Code can read this single file to understand the entire knowledge base.
