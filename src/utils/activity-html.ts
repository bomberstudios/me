import type { CollectionEntry } from 'astro:content'
import { label } from '../loaders/gpx-utils'

function hue(speed: number, minSpeed: number, range: number) {
  return Math.round((1 - (speed - minSpeed) / range) * 240)
}

function lineWidth(speed: number, minSpeed: number, range: number) {
  const MIN_WIDTH = 1
  const MAX_WIDTH = 4
  const w = MIN_WIDTH + ((speed - minSpeed) / range) * (MAX_WIDTH - MIN_WIDTH)
  return Math.round(w * 10) / 10 * Math.random() * 2
}

function extend(s: { x1: number; y1: number; x2: number; y2: number }) {
  const OVERSHOOT = 1
  const dx = s.x2 - s.x1
  const dy = s.y2 - s.y1
  const len = Math.sqrt(dx * dx + dy * dy) || 1
  const ux = (dx / len) * OVERSHOOT
  const uy = (dy / len) * OVERSHOOT
  return { x1: s.x1 - ux, y1: s.y1 - uy, x2: s.x2 + ux, y2: s.y2 + uy }
}

export function activityToHtml(data: CollectionEntry<'activities'>['data']): string {
  const { distance, duration, avgSpeed, elevationGain, elevationLoss, activityType, svgSegments, viewBox } = data

  const speeds = svgSegments.map(s => s.speed)
  const minSpeed = Math.min(...speeds)
  const maxSpeed = Math.max(...speeds)
  const range = maxSpeed - minSpeed || 1
  const hasSpeed = speeds.some(s => s > 0)

  const lines = svgSegments.map(s => {
    const e = extend(s)
    const stroke = hasSpeed ? `hsl(${hue(s.speed, minSpeed, range)},60%,52%)` : '#ff6600'
    const width = hasSpeed ? lineWidth(s.speed, minSpeed, range) : 1
    return `<line x1="${e.x1}" y1="${e.y1}" x2="${e.x2}" y2="${e.y2}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" opacity="0.25"/>`
  }).join('')

  const svg = `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto">${lines}</svg>`

  const stats = [
    { label: 'Distance', value: `${distance} km` },
    { label: 'Time', value: `${duration} h` },
    { label: 'Avg speed', value: `${avgSpeed} km/h` },
    { label: 'Elev. gain', value: `+${elevationGain} m` },
    { label: 'Elev. loss', value: `−${elevationLoss} m` },
    { label: 'Activity', value: label(activityType) },
  ]

  const table = `<table style="width:100%;border-collapse:collapse;font-family:sans-serif">
  <tbody>
    ${stats.map(({ label, value }) => `<tr>
      <td style="padding:0.4rem 0.75rem;color:#888;white-space:nowrap">${label}</td>
      <td style="padding:0.4rem 0.75rem;font-weight:700;">${value}</td>
    </tr>`).join('\n    ')}
  </tbody>
</table>`

  return svg + table
}
