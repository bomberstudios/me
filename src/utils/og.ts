import { readFileSync } from 'fs'
import { join } from 'path'
import satori from 'satori'
import sharp from 'sharp'

const fontData = readFileSync(
  join(process.cwd(), 'public/fonts/BricolageGrotesque-Bold.ttf')
)

const fonts = [
  {
    name: 'Bricolage Grotesque',
    data: fontData,
    weight: 700 as const,
    style: 'normal' as const
  }
]

export async function renderOGImage(
  jsx: Parameters<typeof satori>[0]
): Promise<Response> {
  const svg = await satori(jsx, { width: 1200, height: 630, fonts })
  const png = await sharp(Buffer.from(svg)).png().toBuffer()
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' }
  })
}
