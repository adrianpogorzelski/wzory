import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const documents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/documents' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    description: z.string(),
    fields: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        type: z.enum(['text', 'date']).default('text'),
        placeholder: z.string().optional(),
      })
    ),
  }),
});

export const collections = { documents };