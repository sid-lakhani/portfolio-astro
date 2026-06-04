import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		category: z.enum(['fullstack', 'cli', 'ml', 'client', 'os']),
		year: z.number(),
		featured: z.boolean().default(false),
		tags: z.array(z.string()),
		github: z.string().url().optional(),
		live: z.string().url().optional(),
		cover: z.string().optional(),
		ratio: z.string().optional(),
		description: z.string(),
		order: z.number().optional(),
	}),
});

const blogs = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blogs' }),
	schema: z.object({
		title: z.string(),
		slug: z.string(),
		description: z.string(),
		date: z.string(), // ISO date string e.g. "2026-06-04"
		tags: z.array(z.string()),
		cover: z.string().optional(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { projects, blogs };
