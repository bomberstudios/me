import rss from '@astrojs/rss'
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts'
import { getMergedPosts } from '@utils/content'

export async function GET(context: { site: any }) {
  const siteURL = context.site
  const all = await getMergedPosts()

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: siteURL,
    customData: `<image><url>${siteURL}/favicon.png</url><title>${SITE_TITLE}</title><link>${siteURL}</link></image>`,
    items: all.map((entry) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.description,
      link: `/${entry.id}/`
    }))
  })
}
