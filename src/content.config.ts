import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const documents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/documents' }),
  schema: z.object({
    title: z.string(),
    categories: z.array(z.string()).min(1),
    subcategory: z.string().optional(),
    description: z.string(),
    groups: z
      .array(z.object({ id: z.string(), title: z.string(), description: z.string() }))
      .optional(),
    fields: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        type: z.enum(['text', 'date', 'person', 'choice', 'list']).default('text'),
        placeholder: z.string().optional(),
        group: z.string().optional(),
        inputmode: z.enum(['text', 'numeric']).optional(),
        maxlength: z.number().optional(),
        options: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
        showWhen: z.string().optional(), // "idPola=wartość": pole widoczne tylko przy takim wyborze
        hint: z.string().optional()
      })
    ),
  }),
});

export const collections = { documents };