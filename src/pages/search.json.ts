import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const documents = await getCollection('documents');

  const items = documents.map((doc) => ({
    title: doc.data.title,
    description: doc.data.description,
    categories: doc.data.categories,
    url: `/documents/${doc.id}`,
  }));

  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json' },
  });
};