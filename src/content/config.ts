import { defineCollection, z } from 'astro:content';

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    chapter: z.number().optional(),
    course: z.string(),
    author: z.string().optional(),
    order: z.number().optional(),
    emoji: z.string().optional().default('📖'),
    topics: z.array(z.string()).optional().default([]),
  }),
});

export const collections = {
  courses,
};
