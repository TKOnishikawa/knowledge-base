export interface ContentTypeDef {
  label: string;
  icon: string;
  color: string;
}

export const contentTypes: Record<string, ContentTypeDef> = {
  'x-post':  { label: 'X Post',     icon: '𝕏', color: '#1DA1F2' },
  'youtube': { label: 'YouTube',    icon: '▶', color: '#FF0000' },
  'article': { label: 'HP Article', icon: '📄', color: '#d4782f' },
  'idea':    { label: 'Idea',       icon: '💡', color: '#f59e0b' },
  'log':     { label: 'Log',        icon: '📋', color: '#9898ae' },
};

export function getContentTypeDef(key: string): ContentTypeDef {
  return contentTypes[key] ?? { label: key, icon: '?', color: '#9898ae' };
}

export const templateTypes: Record<string, { label: string; day: string; color: string }> = {
  practice: { label: 'Practice（実践記録）', day: 'Monday',    color: '#34d399' },
  insight:  { label: 'Insight（知見共有）',  day: 'Wednesday', color: '#4a7dff' },
  candid:   { label: 'Candid（本音・裏話）', day: 'Friday',    color: '#a78bfa' },
};

export const statusConfig: Record<string, { label: string; color: string }> = {
  idea:      { label: 'IDEA',      color: '#f59e0b' },
  draft:     { label: 'DRAFT',     color: '#a78bfa' },
  ready:     { label: 'READY',     color: '#22d3ee' },
  published: { label: 'PUBLISHED', color: '#34d399' },
  reviewed:  { label: 'REVIEWED',  color: '#4a7dff' },
};

// Reference list (not enforced by Zod — free-form string in schema)
export const topicSuggestions = [
  'HP制作', '原価管理', 'DX', 'AI活用', 'BQ/データ',
  'コーチング', '起業', 'SNS運用', 'ノーコード', 'その他',
];
