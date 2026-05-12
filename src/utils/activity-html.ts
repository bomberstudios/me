import type { CollectionEntry } from 'astro:content'

const typeLabel: Record<string, string> = {
  cycling: 'Cycling',
  running: 'Running',
  hiking: 'Hiking',
  walking: 'Walking',
  swimming: 'Swimming',
  e_bike_mountain: 'eMTB',
}

export function activityToHtml(data: CollectionEntry<'activities'>['data']): string {
  const { distance, duration, avgSpeed, elevationGain, elevationLoss, activityType, svgSegments, viewBox } = data
  const label = typeLabel[activityType] ?? activityType.charAt(0).toUpperCase() + activityType.slice(1)

  const speeds = svgSegments.map(s => s.speed)
  const minSpeed = Math.min(...speeds)
  const maxSpeed = Math.max(...speeds)
  const range = maxSpeed - minSpeed || 1
  const hasSpeed = speeds.some(s => s > 0)
  const hue = (speed: number) => Math.round((1 - (speed - minSpeed) / range) * 240)

  const lines = svgSegments.map(s => {
    const stroke = hasSpeed ? `hsl(${hue(s.speed)},60%,52%)` : '#ff6600'
    return `<line x1="${s.x1}" y1="${s.y1}" x2="${s.x2}" y2="${s.y2}" stroke="${stroke}" stroke-width="3" stroke-linecap="round"/>`
  }).join('')

  const svg = `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;background:#111;border-radius:6px;margin:0 0 1.5rem">${lines}</svg>`

  const stats = [
    { label: 'Distance', value: `${distance} km` },
    { label: 'Time', value: `${duration} h` },
    { label: 'Avg speed', value: `${avgSpeed} km/h` },
    { label: 'Elev. gain', value: `+${elevationGain} m` },
    { label: 'Elev. loss', value: `−${elevationLoss} m` },
    { label: 'Activity', value: label },
  ]

  const table = `<table style="width:100%;border-collapse:collapse;font-family:sans-serif">
  <tbody>
    ${stats.map(({ label, value }) => `<tr>
      <td style="padding:0.4rem 0.75rem;color:#888;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap">${label}</td>
      <td style="padding:0.4rem 0.75rem;font-weight:700;font-size:1.1rem">${value}</td>
    </tr>`).join('\n    ')}
  </tbody>
</table>`

  return svg + table
}
