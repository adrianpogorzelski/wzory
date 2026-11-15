import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const documents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/documents' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    subcategory: z.string().optional(),
    description: z.string(),
    groups: z
      .array(z.object({ id: z.string(), title: z.string(), description: z.string() }))
      .optional(),
    fields: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        type: z.enum(['text', 'date', 'person']).default('text'),
        placeholder: z.string().optional(),
        group: z.string().optional(),
      })
    ),
  }),
});

export const collections = { documents };