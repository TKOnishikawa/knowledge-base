import { defineCollection, z } from 'astro:content';

const knowledge = defineCollection({
  type: 'content',
  schema: z.object({
    // === Required (5 fields: minimum for article creation) ===
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),

    // === AI metadata (recommended) ===
    summary: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    relatedSlugs: z.array(z.string()).optional(),

    // === Classification (optional) ===
    subcategory: z.string().optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),

    // === Lifecycle ===
    updated: z.date().optional(),
    draft: z.boolean().default(false),
    status: z.enum(['draft', 'published', 'archived', 'outdated']).default('published'),

    // === Provenance ===
    source: z.string().optional(),
    audience: z.enum(['self', 'team', 'public']).default('public'),
  }),
});

export const collections = { knowledge };
