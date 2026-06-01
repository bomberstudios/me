import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts'
import { activityToHtml } from '../utils/activity-html'

export async function GET(context: { site: any }) {
  const siteURL = context.site
  const blog = await getCollection('blog')
  const activities = await getCollection('activities')
  const all = [...blog, ...activities].sort((a, b) =>
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: siteURL,
    customData: `<image><url>${siteURL}/favicon.png</url><title>${SITE_TITLE}</title><link>${siteURL}</link></image>`,
    items: all.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: 'description' in entry.data ? entry.data.description : undefined,
      content: entry.collection === 'activities'
        ? activityToHtml(entry.data)
        : ('rendered' in entry ? entry.rendered?.html : undefined),
      link: `/${entry.id}/`
    }))
  })
}
