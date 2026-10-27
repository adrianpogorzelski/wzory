import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const documents = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/documents" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    slug: z.string(),
  }),
});

export const collections = {
  documents,
};