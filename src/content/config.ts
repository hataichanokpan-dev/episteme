import { defineCollection, z } from 'astro:content';

const courses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    chapter: z.number().optional(),
    course: z.string(),
    author: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  courses,
};
