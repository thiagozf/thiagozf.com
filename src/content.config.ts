import { glob } from 'astro/loaders'
import { defineCollection, reference, z } from 'astro:content'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: () =>
    z.object({
      title: z
        .string()
        .max(
          60,
          'Title should be 60 characters or less for optimal Open Graph display.',
        ),
      description: z
        .string()
        .max(
          155,
          'Description should be 155 characters or less for optimal Open Graph display.',
        ),
      author: reference('authors'),
      date: z.coerce.date(),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
    }),
})

const authors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/authors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
      bio: z.string().optional(),
      email: z.string().email().optional(),
      website: z.string().url().optional(),
      twitter: z.string().url().optional(),
      github: z.string().url().optional(),
      linkedin: z.string().url().optional(),
      discord: z.string().url().optional(),
    }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: () =>
    z.object({
      name: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()),
      link: z.string().url(),
      active: z.boolean().optional().default(true),
    }),
})

export const collections = { blog, authors, projects }
