export interface SearchItem {
  title: string;
  description: string;
  category: string;
  url: string;
}

// małe litery, bez polskich znaków
export const normalize = (s: string) =>
  s.toLowerCase().replace(/ł/g, 'l').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

// prosty "stemming": ucinamy końcówki, żeby umowy/umowa czy pracę/pracy się znajdowały
const stem = (t: string) => (t.length > 5 ? t.slice(0, -2) : t.length > 3 ? t.slice(0, -1) : t);

export function search(items: SearchItem[], query: string, limit = 8): SearchItem[] {
  const tokens = normalize(query).split(/\s+/).filter(Boolean).map(stem);
  if (!tokens.length) return [];

  return items
    .map((item) => {
      const title = normalize(item.title);
      const rest = normalize(`${item.description} ${item.category}`);
      let score = 0;
      for (const t of tokens) {
        if (title.includes(t)) score += 3;        // trafienie w tytule waży więcej
        else if (rest.includes(t)) score += 1;
        else return { item, score: 0 };           // każdy wpisany wyraz musi gdzieś wystąpić
      }
      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, 'pl'))
    .slice(0, limit)
    .map((r) => r.item);
}