import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { taxonomy } from '../data/taxonomy';
import { contentTypes as snsContentTypes } from '../data/sns-taxonomy';

export const GET: APIRoute = async () => {
  const articles = await getCollection('knowledge', ({ data }) => !data.draft);
  const snsItems = await getCollection('sns-content');

  const byCategory: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  for (const a of articles) {
    byCategory[a.data.category] = (byCategory[a.data.category] ?? 0) + 1;
    const s = a.data.status ?? 'published';
    byStatus[s] = (byStatus[s] ?? 0) + 1;
  }

  const sorted = articles.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const manifest = {
    _meta: {
      description:
        'ナレッジベースのAI向けメタデータ。Claude Codeはこのファイルを最初に読むこと。',
      generated: new Date().toISOString(),
      baseUrl: 'https://tkonishikawa.github.io/knowledge-base/',
      localPath: 'c:\\Users\\takao\\OneDrive\\ドキュメント\\GitHub\\knowledge-base',
    },
    stats: {
      totalArticles: articles.length,
      byCategory,
      byStatus,
      recentlyUpdated: sorted.slice(0, 5).map((a) => a.id),
    },
    articles: sorted.map((a) => ({
      slug: a.id.replace(/\.md$/, ''),
      title: a.data.title,
      description: a.data.description,
      summary: a.data.summary ?? null,
      category: a.data.category,
      subcategory: a.data.subcategory ?? null,
      tags: a.data.tags,
      keywords: a.data.keywords ?? [],
      date: a.data.date.toISOString().split('T')[0],
      updated: a.data.updated?.toISOString().split('T')[0] ?? null,
      status: a.data.status ?? 'published',
      maturity: a.data.maturity ?? 'published',
      actionability: a.data.actionability ?? null,
      tools_mentioned: a.data.tools_mentioned ?? [],
      session_context: a.data.session_context ?? null,
      series: a.data.series ?? null,
      seriesOrder: a.data.seriesOrder ?? null,
      relatedSlugs: a.data.relatedSlugs ?? [],
      filePath: `src/content/knowledge/${a.id}.md`,
    })),
    snsContent: (() => {
      const snsByType: Record<string, number> = {};
      const snsByStatus: Record<string, number> = {};
      for (const s of snsItems) {
        snsByType[s.data.contentType] = (snsByType[s.data.contentType] ?? 0) + 1;
        snsByStatus[s.data.status] = (snsByStatus[s.data.status] ?? 0) + 1;
      }
      const snsSorted = [...snsItems].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
      return {
        stats: {
          total: snsItems.length,
          byType: snsByType,
          byStatus: snsByStatus,
        },
        items: snsSorted.map((s) => ({
          slug: s.id.replace(/\.md$/, ''),
          title: s.data.title,
          contentType: s.data.contentType,
          status: s.data.status,
          topic: s.data.topic,
          date: s.data.date.toISOString().split('T')[0],
          tags: s.data.tags,
          templateType: s.data.templateType ?? null,
          metrics: s.data.metrics ?? null,
          filePath: `src/content/sns-content/${s.id}`,
        })),
      };
    })(),
    taxonomy,
    snsContentTypes,
    howToUse: {
      findByCategory: 'articles配列をcategoryでフィルタ',
      findByKeyword: 'keywordsとtagsを合わせて検索',
      readArticle: 'filePathのMarkdownファイルをReadツールで読む',
      createArticle:
        'src/content/knowledge/ にMarkdownファイルを作成。必須: title, description, date, category, tags',
      createSNSContent:
        'src/content/sns-content/{type}/ にMarkdownファイルを作成。必須: title, description, contentType, date, status, topic',
    },
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};
