import { getCollection } from 'astro:content';

export async function getPublishedArticles() {
  const articles = await getCollection('knowledge', ({ data }) => {
    return !data.draft && data.status !== 'archived';
  });
  return articles.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getArticlesByCategory(category: string) {
  const articles = await getPublishedArticles();
  return articles.filter((a) => a.data.category === category);
}

export async function getArticlesByTag(tag: string) {
  const articles = await getPublishedArticles();
  return articles.filter((a) => a.data.tags.includes(tag));
}

export async function getRelatedArticles(slugs: string[] | undefined) {
  if (!slugs || slugs.length === 0) return [];
  const all = await getPublishedArticles();
  return all.filter((a) => slugs.includes(a.id));
}
