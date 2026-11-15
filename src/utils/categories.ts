import type { CollectionEntry } from 'astro:content';

// "Prawo pracy" → "prawo-pracy", "Łączność" → "lacznosc"
export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/ł/g, 'l')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export interface Category {
  name: string;
  slug: string;
  count: number;
}

export function getCategories(docs: CollectionEntry<'documents'>[]): Category[] {
  const map = new Map<string, Category>();
  for (const doc of docs) {
    const name = doc.data.category;
    const slug = slugify(name);
    const entry = map.get(slug);
    if (entry) entry.count++;
    else map.set(slug, { name, slug, count: 1 });
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name, 'pl'));
}