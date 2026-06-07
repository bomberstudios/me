import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { XMLParser } from 'fast-xml-parser'

const SVG_SIZE = 400
const SVG_PADDING = 20
const MAX_POINTS = 900

function label(type) {
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

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.asin(Math.sqrt(a))
}

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

function formatDate(d) {
  const month = d.toLocaleDateString('en-US', { month: 'long' })
  return `${month} ${ordinal(d.getDate())}, ${d.getFullYear()}`
}

function formatDuration(ms) {
  const totalMinutes = Math.floor(ms / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}:${String(minutes).padStart(2, '0')}`
}

function parseTrackPoints(gpx) {
  const trk = gpx['trk']
  const tracks = Array.isArray(trk) ? trk : trk ? [trk] : []
  const points = []

  for (const track of tracks) {
    const seg = track['trkseg']
    const segments = Array.isArray(seg) ? seg : seg ? [seg] : []
    for (const segment of segments) {
      const trkpt = segment['trkpt']
      const pts = Array.isArray(trkpt) ? trkpt : trkpt ? [trkpt] : []
      for (const pt of pts) {
        const lat = parseFloat(String(pt['@_lat'] ?? 0))
        const lon = parseFloat(String(pt['@_lon'] ?? 0))
        const ele = parseFloat(String(pt['ele'] ?? 0))
        const time = pt['time'] ? new Date(String(pt['time'])) : new Date(0)
        if (!isNaN(lat) && !isNaN(lon)) {
          points.push({ lat, lon, ele, time })
        }
      }
    }
  }
  return points
}

function generateSvgSegments(points) {
  const empty = { svgSegments: [], viewBox: `0 0 ${SVG_SIZE} ${SVG_SIZE}` }
  if (points.length < 2) return empty

  const step = Math.max(1, Math.floor(points.length / MAX_POINTS))
  const sampled = points.filter((_, i) => i % step === 0)

  const meanLat = sampled.reduce((s, p) => s + p.lat, 0) / sampled.length
  const cosLat = Math.cos((meanLat * Math.PI) / 180)

  const scaled = sampled.map(p => ({ x: p.lon * cosLat, y: p.lat, time: p.time, ele: p.ele }))

  const minX = Math.min(...scaled.map(p => p.x))
  const maxX = Math.max(...scaled.map(p => p.x))
  const minY = Math.min(...scaled.map(p => p.y))
  const maxY = Math.max(...scaled.map(p => p.y))

  const rangeX = maxX - minX || 1
  const rangeY = maxY - minY || 1

  const aspectRatio = rangeX / rangeY
  const svgW = aspectRatio >= 1 ? SVG_SIZE : Math.round(SVG_SIZE * aspectRatio)
  const svgH = aspectRatio >= 1 ? Math.round(SVG_SIZE / aspectRatio) : SVG_SIZE
  const innerW = svgW - SVG_PADDING * 2
  const innerH = svgH - SVG_PADDING * 2

  const toSvgX = (x) => ((x - minX) / rangeX) * innerW + SVG_PADDING
  const toSvgY = (y) => (1 - (y - minY) / rangeY) * innerH + SVG_PADDING

  const MAX_SPEED = 120
  const rawSpeeds = sampled.map((p, i) => {
    if (i === 0) return 0
    const prev = sampled[i - 1]
    const dist = haversineKm(prev.lat, prev.lon, p.lat, p.lon)
    const dt = (p.time.getTime() - prev.time.getTime()) / 3600000
    return dt > 0 ? Math.min(dist / dt, MAX_SPEED) : 0
  })

  const WINDOW = 5
  const speeds = rawSpeeds.map((_, i) => {
    const half = Math.floor(WINDOW / 2)
    const from = Math.max(0, i - half)
    const to = Math.min(rawSpeeds.length - 1, i + half)
    const sum = rawSpeeds.slice(from, to + 1).reduce((a, b) => a + b, 0)
    return sum / (to - from + 1)
  })

  const svgSegments = []
  for (let i = 1; i < sampled.length; i++) {
    svgSegments.push({
      x1: Math.round(toSvgX(scaled[i - 1].x) * 10) / 10,
      y1: Math.round(toSvgY(scaled[i - 1].y) * 10) / 10,
      x2: Math.round(toSvgX(scaled[i].x) * 10) / 10,
      y2: Math.round(toSvgY(scaled[i].y) * 10) / 10,
      speed: Math.round(speeds[i] * 10) / 10,
      ele: Math.round((scaled[i - 1].ele + scaled[i].ele) / 2),
    })
  }

  return { svgSegments, viewBox: `0 0 ${svgW} ${svgH}` }
}

async function main() {
  const sourceDir = process.argv[2] || 'data/activities'
  const destDir = 'src/content/activities'

  await mkdir(destDir, { recursive: true })

  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' })

  let files
  try {
    files = (await readdir(sourceDir)).filter(f => f.endsWith('.gpx'))
  } catch {
    console.error(`No GPX files found in ${sourceDir}`)
    process.exit(1)
  }

  if (files.length === 0) {
    console.log(`No .gpx files found in ${sourceDir}`)
    return
  }

  for (const file of files) {
    try {
      const xml = await readFile(join(sourceDir, file), 'utf-8')
      const parsed = parser.parse(xml)
      const gpx = parsed['gpx']

      const points = parseTrackPoints(gpx)
      if (points.length < 2) {
        console.warn(`${file}: not enough track points, skipping`)
        continue
      }

      let distance = 0
      let elevationGain = 0
      let elevationLoss = 0
      for (let i = 1; i < points.length; i++) {
        distance += haversineKm(
          points[i - 1].lat, points[i - 1].lon,
          points[i].lat, points[i].lon
        )
        const diff = points[i].ele - points[i - 1].ele
        if (diff > 0) elevationGain += diff
        else elevationLoss += Math.abs(diff)
      }

      const validTimes = points.map(p => p.time).filter(t => t.getFullYear() > 2000)
      const date = validTimes.length > 0 ? validTimes[0] : new Date()

      const MOVING_SPEED_THRESHOLD = 1
      let movingTime = 0
      for (let i = 1; i < points.length; i++) {
        const dt = points[i].time.getTime() - points[i - 1].time.getTime()
        if (dt <= 0) continue
        const segDist = haversineKm(points[i - 1].lat, points[i - 1].lon, points[i].lat, points[i].lon)
        const speed = segDist / (dt / 3600000)
        if (speed >= MOVING_SPEED_THRESHOLD) {
          movingTime += dt
        }
      }
      const duration = movingTime
      const avgSpeed = duration > 0 ? distance / (duration / 3600000) : 0

      const trk = gpx['trk']
      const firstTrack = Array.isArray(trk) ? trk[0] : trk
      const activityType = String(firstTrack?.['type'] ?? 'activity').toLowerCase()

      const { svgSegments, viewBox } = generateSvgSegments(points)

      const output = {
        title: `Activity: ${label(activityType)} on ${formatDate(date)}`,
        date: date.toISOString(),
        activityType,
        label: label(activityType),
        distance: Math.round(distance * 10) / 10,
        duration: formatDuration(duration),
        avgSpeed: Math.round(avgSpeed * 10) / 10,
        elevationGain: Math.round(elevationGain),
        elevationLoss: Math.round(elevationLoss),
        svgSegments,
        viewBox,
      }

      const outName = file.replace(/\.gpx$/i, '.json')
      await writeFile(join(destDir, outName), JSON.stringify(output, null, 2))
      console.log(`  ${file} -> ${outName}`)
    } catch (err) {
      console.error(`Failed to process ${file}: ${err}`)
    }
  }
}

main()
