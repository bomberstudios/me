import type { Loader } from 'astro/loaders'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { slugify } from './gpx-utils'

const ACTIVITY_DIR = 'src/content/activities'

export type { SvgSegment } from './gpx-utils'

export function gpxLoader(): Loader {
  return {
    name: 'gpx-loader',
    load: async ({ store, logger }) => {
      let files: string[]
      try {
        files = (await readdir(ACTIVITY_DIR)).filter(f => f.endsWith('.json'))
      } catch {
        logger.warn(`No activities directory found at ${ACTIVITY_DIR}`)
        return
      }

      for (const file of files) {
        const id = slugify(file)
        try {
          const json = await readFile(join(ACTIVITY_DIR, file), 'utf-8')
          const data = JSON.parse(json)
          data.date = new Date(data.date)
          store.set({ id, data })
        } catch (err) {
          logger.error(`Failed to load ${file}: ${err}`)
        }
      }
    },
  }
}
