import { getCollection } from 'astro:content';

export async function getAllSNSContent() {
  const items = await getCollection('sns-content');
  return items.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getSNSContentByType(contentType: string) {
  const items = await getAllSNSContent();
  return items.filter((i) => i.data.contentType === contentType);
}

export async function getSNSContentByStatus(status: string) {
  const items = await getAllSNSContent();
  return items.filter((i) => i.data.status === status);
}

export async function getSNSContentByTopic(topic: string) {
  const items = await getAllSNSContent();
  return items.filter((i) => i.data.topic === topic);
}

export async function getSNSContentForMonth(year: number, month: number) {
  const items = await getAllSNSContent();
  return items.filter((i) => {
    const d = i.data.publishDate ?? i.data.date;
    return d.getFullYear() === year && d.getMonth() === month - 1;
  });
}

export function getUniqueTopics(items: { data: { topic: string } }[]): Map<string, number> {
  const topicCount = new Map<string, number>();
  for (const item of items) {
    topicCount.set(item.data.topic, (topicCount.get(item.data.topic) ?? 0) + 1);
  }
  return new Map([...topicCount.entries()].sort((a, b) => b[1] - a[1]));
}
