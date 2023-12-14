import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  schema: z.object({
    date: z.string(),
    title: z.string(),
    thumbnail: z.string(),
    description: z.string(),
  }),
});

export const collections = { posts };
