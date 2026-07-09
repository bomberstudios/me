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

export const OVERSHOOT = 1
export const MIN_WIDTH = 1
export const MAX_WIDTH = 4

export const hue = (speed: number, minSpeed: number, range: number) =>
  Math.round((1 - (speed - minSpeed) / range) * 240)

export function extend(s: { x1: number; y1: number; x2: number; y2: number }) {
  const dx = s.x2 - s.x1
  const dy = s.y2 - s.y1
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const ux = (dx / len) * OVERSHOOT
  const uy = (dy / len) * OVERSHOOT
  return { x1: s.x1 - ux, y1: s.y1 - uy, x2: s.x2 + ux, y2: s.y2 + uy }
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
