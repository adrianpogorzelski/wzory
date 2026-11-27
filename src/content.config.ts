import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const documents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/documents' }),
  schema: z.object({
    title: z.string(),
    categories: z.array(z.string()).min(1),
    description: z.string(),
    calculator: z.string().optional(), // nazwa kalkulatora z src/utils/calculators.ts
    groups: z
      .array(z.object({ id: z.string(), title: z.string(), description: z.string() }))
      .optional(),
    fields: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        type: z.enum(['text', 'date', 'person', 'choice', 'list', 'checkbox', 'note']).default('text'),
        placeholder: z.string().optional(),
        group: z.string().optional(),
        inputmode: z.enum(['text', 'numeric']).optional(),
        maxlength: z.number().optional(),
        options: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
        showWhen: z.string().optional(), // "pole=a,b" albo kilka warunków po średniku: "pole=a;inne=b"
        hint: z.string().optional(),
        default: z.enum(['today']).optional(), // domyślna wartość pola daty
        optional: z.boolean().optional(),      // puste pole nie jest zgłaszane jako brak
        checked: z.boolean().optional(),       // dla checkboxa: domyślnie zaznaczony
      })
    ),
  }),
});

export const collections = { documents };