import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { createElement as h } from 'react'
import { renderOGImage } from '@utils/og'

export async function getStaticPaths() {
  const posts = await getCollection('blog')
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title },
  }))
}

export const GET: APIRoute = async ({ props }) => {
  const { title } = props

  const markup = h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%', height: '100%', padding: '60px', background: '#fff' } },
    h('div', { style: { display: 'flex', marginBottom: '24px' } },
      h('div', { style: { width: '128px', height: '128px', borderRadius: '50%', background: '#f60' } })
    ),
    h('div', { style: { display: 'flex', fontSize: '64px', fontWeight: 800, color: '#f60', lineHeight: 1.1, maxWidth: '1000px' } }, title),
    h('div', { style: { display: 'flex', marginTop: '32px', fontSize: '24px', color: '#737373' } }, 'ale.today')
  )

  return renderOGImage(markup)
}
