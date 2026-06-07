export interface SvgSegment {
  x1: number
  y1: number
  x2: number
  y2: number
  speed: number
  ele: number
  hr: number | null
}

export function label(type: string): string {
  switch (type) {
    case 'hiking': return 'Hiking'
    case 'gravel_cycling': return 'Gravel Cycling'
    case 'e_bike_mountain': return 'eMTB'
    case 'mountain_biking': return 'MTB'
    case 'running': return 'Running'
    case 'treadmill_running': return 'Treadmill Running'
    case 'trail_running': return 'Trail Running'
    case 'strength_training': return 'Strength Training'
    case 'hiit': return 'HIIT'
    default: return type.charAt(0).toUpperCase() + type.slice(1)
  }
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
