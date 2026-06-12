/** Build normalized SVG line/area paths for chart series */
export function buildLineChart(series, labels, opts = {}) {
  const w = opts.width ?? 100
  const h = opts.height ?? 48
  const pad = opts.padding ?? 6
  const all = series.flatMap((s) => s.values)
  const min = Math.min(...all) * 0.92
  const max = Math.max(...all) * 1.05
  const range = max - min || 1
  const step = labels.length > 1 ? (w - pad * 2) / (labels.length - 1) : 0

  const rendered = series.map((s) => {
    const points = s.values.map((v, i) => ({
      x: pad + i * step,
      y: h - pad - ((v - min) / range) * (h - pad * 2),
      v
    }))
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ')
    const area = `${path} L${points[points.length - 1].x.toFixed(2)},${h} L${points[0].x.toFixed(2)},${h} Z`
    return { ...s, points, path, area }
  })

  return { labels, rendered, min: Math.round(min), max: Math.round(max), w, h }
}
