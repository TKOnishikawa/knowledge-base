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

    // === Maturity & Actionability ===
    maturity: z.enum(['seed', 'memo', 'draft', 'published']).default('published'),
    actionability: z.enum(['reference', 'actionable', 'explore']).optional(),
    tools_mentioned: z.array(z.string()).optional(),
    session_context: z.string().optional(),

    // === Lifecycle ===
    updated: z.date().optional(),
    draft: z.boolean().default(false),
    status: z.enum(['draft', 'published', 'archived', 'outdated']).default('published'),

    // === Provenance ===
    source: z.string().optional(),
    audience: z.enum(['self', 'team', 'public']).default('public'),
  }),
});

// SNS Content collection — actual production artifacts (posts, scripts, metrics, logs)
// Distinction: knowledge/ = strategy/analysis, sns-content/ = operational records
const snsContent = defineCollection({
  type: 'content',
  schema: z.object({
    // === Required (6 fields: minimum input) ===
    title: z.string(),
    description: z.string().max(200),
    contentType: z.enum(['x-post', 'youtube', 'article', 'idea', 'log']),
    date: z.date(),
    status: z.enum(['idea', 'draft', 'ready', 'published', 'reviewed']).default('idea'),
    topic: z.string(),

    // === Classification ===
    tags: z.array(z.string()).default([]),
    keywords: z.array(z.string()).optional(),
    publishDate: z.date().optional(),

    // === Content lineage ===
    sourceSlug: z.string().optional(),
    derivedSlugs: z.array(z.string()).optional(),

    // === X-post specific ===
    templateType: z.enum(['practice', 'insight', 'candid']).optional(),
    tweetUrl: z.string().url().optional(),

    // === YouTube specific ===
    youtubeUrl: z.string().url().optional(),
    durationMinutes: z.number().optional(),
    productionPipeline: z.array(z.string()).optional(),

    // === Article specific ===
    articleUrl: z.string().url().optional(),
    seoKeywords: z.array(z.string()).optional(),

    // === Metrics (manual entry) ===
    metrics: z.object({
      impressions: z.number().optional(),
      engagements: z.number().optional(),
      notes: z.string().optional(),
    }).optional(),

    // === Production tracking ===
    timeSpentMinutes: z.number().optional(),
    learnings: z.string().optional(),

    // === Assets (linked files, Before/After, etc.) ===
    assets: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
      type: z.enum(['html', 'image', 'video', 'document']).default('document'),
    })).optional(),

    // === AI metadata ===
    summary: z.string().optional(),
    tools_mentioned: z.array(z.string()).optional(),
    session_context: z.string().optional(),
    source: z.string().optional(),
  }),
});

export const collections = { knowledge, 'sns-content': snsContent };
