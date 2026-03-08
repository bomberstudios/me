import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts'

export async function GET(context: { site: any }) {
  const posts = (await getCollection('blog')).sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  })

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    customData: `<image><url>${context.site}favicon.png</url><title>${SITE_TITLE}</title><link>${context.site}</link></image>`,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      content: post.rendered?.html,
      link: `/${post.id}/`
    }))
  })
}
