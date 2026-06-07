import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { gpxLoader } from './loaders/gpx-loader';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional()
  })
})

const activities = defineCollection({
  loader: gpxLoader(),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    activityType: z.string(),
    label: z.string(),
    distance: z.number(),
    duration: z.string(),
    avgSpeed: z.number(),
    elevationGain: z.number(),
    elevationLoss: z.number(),
    svgSegments: z.array(z.object({
      x1: z.number(), y1: z.number(),
      x2: z.number(), y2: z.number(),
      speed: z.number(),
      ele: z.number(),
      hr: z.number().nullable(),
    })),
    viewBox: z.string(),
  })
})

export const collections = { blog, activities };
