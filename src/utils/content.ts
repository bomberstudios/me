import { getCollection } from 'astro:content'

interface PostEntry {
  id: string
  data: { title: string; date: Date; description?: string }
}

export async function getMergedPosts(): Promise<PostEntry[]> {
  const [blog, activities] = await Promise.all([
    getCollection('blog'),
    getCollection('activities')
  ])
  return ([...blog, ...activities] as PostEntry[]).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  )
}
