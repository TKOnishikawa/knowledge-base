export interface CategoryDef {
  label: string;
  labelJa: string;
  color: string;
  subcategories: string[];
}

export const taxonomy: Record<string, CategoryDef> = {
  business: {
    label: 'Business',
    labelJa: '経営・ビジネス',
    color: '#34d399',
    subcategories: ['創業', '税務', '法務', '営業', '経理', '保険', '融資'],
  },
  tech: {
    label: 'Technology',
    labelJa: 'テクノロジー',
    color: '#4a7dff',
    subcategories: ['GCP', 'BigQuery', 'Python', 'Web', 'Infrastructure', 'Astro'],
  },
  data: {
    label: 'Data & Analytics',
    labelJa: 'データ分析',
    color: '#22d3ee',
    subcategories: ['SQL', 'Visualization', 'Sheets', 'Dashboard'],
  },
  ai: {
    label: 'AI & Automation',
    labelJa: 'AI・自動化',
    color: '#a78bfa',
    subcategories: ['Claude', 'Prompt', 'MCP', 'Agent', 'Grok'],
  },
  career: {
    label: 'Career',
    labelJa: 'キャリア',
    color: '#f472b6',
    subcategories: ['転職', '独立', 'スキル', 'ネットワーク'],
  },
  notes: {
    label: 'Notes',
    labelJa: '雑記',
    color: '#9898ae',
    subcategories: [],
  },
};

export function getCategoryDef(key: string): CategoryDef {
  return taxonomy[key] ?? { label: key, labelJa: key, color: '#9898ae', subcategories: [] };
}

export function getAllTags(articles: { data: { tags: string[] } }[]): Map<string, number> {
  const tagCount = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.data.tags) {
      tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1);
    }
  }
  return new Map([...tagCount.entries()].sort((a, b) => b[1] - a[1]));
}
