// NusaStat — small SVG chart helpers. No library, no network: every chart is
// drawn as inline SVG from the numbers in data.js.

export function fmtNum(value, decimals = 2) {
  // Avoid "-0" when rounding (e.g. -0,22 shown with 0 decimals).
  let v = value;
  if (Math.abs(v) < 0.5 * 10 ** -decimals) v = 0;
  return v.toLocaleString('id-ID', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function esc(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Vertical bar chart. points: [{year, value}], highlightLast marks the newest bar.
export function barChart(points, options = {}) {
  const width = options.width ?? 560;
  const height = options.height ?? 260;
  const padL = 52;
  const padR = 12;
  const padT = 14;
  const padB = 30;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const values = points.map((p) => p.value);
  const min = Math.min(0, ...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const y = (v) => padT + innerH - ((v - min) / span) * innerH;
  const slot = innerW / points.length;
  const barW = Math.min(44, slot * 0.62);
  const zeroY = y(0);

  let grid = '';
  const ticks = 4;
  for (let i = 0; i <= ticks; i++) {
    const v = min + (span * i) / ticks;
    const gy = y(v);
    grid += `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" stroke="#e3ddd0" stroke-width="1"/>`
      + `<text x="${padL - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#6b655a">${fmtNum(v, 0)}</text>`;
  }

  let bars = '';
  points.forEach((p, i) => {
    const cx = padL + slot * i + slot / 2;
    const yv = y(p.value);
    const last = i === points.length - 1;
    const fill = last ? '#c65a2e' : '#0e4d3a';
    const by = p.value >= 0 ? yv : zeroY;
    const h = Math.abs(zeroY - yv);
    // Negative bars hang below zero: label inside the bar, just under the
    // zero line, in white — below the bar it would hit the year labels.
    const labelY = p.value >= 0 ? by - 6 : zeroY + 16;
    const labelFill = p.value >= 0 ? '#14201b' : '#ffffff';
    bars += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${by.toFixed(1)}" width="${barW}" height="${Math.max(h, 2).toFixed(1)}" rx="3" fill="${fill}"/>`
      + `<text x="${cx.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${labelFill}">${fmtNum(p.value)}</text>`
      + `<text x="${cx.toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#6b655a">${p.year}</text>`;
  });

  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Grafik batang">${grid}${bars}</svg>`;
}

// Line chart with dots and value labels. points: [{year, value}].
export function lineChart(points, options = {}) {
  const width = options.width ?? 560;
  const height = options.height ?? 260;
  const padL = 52;
  const padR = 18;
  const padT = 22;
  const padB = 30;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const values = points.map((p) => p.value);
  let min = Math.min(...values);
  let max = Math.max(...values);
  const pad = (max - min) * 0.18 || 1;
  min -= pad;
  max += pad;
  const span = max - min || 1;
  const x = (i) => padL + (innerW * i) / (points.length - 1);
  const y = (v) => padT + innerH - ((v - min) / span) * innerH;

  let grid = '';
  const ticks = 4;
  for (let i = 0; i <= ticks; i++) {
    const v = min + (span * i) / ticks;
    const gy = y(v);
    grid += `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" stroke="#e3ddd0" stroke-width="1"/>`
      + `<text x="${padL - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#6b655a">${fmtNum(v, 0)}</text>`;
  }

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  let dots = '';
  points.forEach((p, i) => {
    dots += `<circle cx="${x(i).toFixed(1)}" cy="${y(p.value).toFixed(1)}" r="4.5" fill="#c65a2e" stroke="#fff" stroke-width="2"/>`
      + `<text x="${x(i).toFixed(1)}" y="${(y(p.value) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#14201b">${fmtNum(p.value)}</text>`
      + `<text x="${x(i).toFixed(1)}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#6b655a">${p.year}</text>`;
  });

  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="Grafik garis"><path d="${path}" fill="none" stroke="#0e4d3a" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${grid}${dots}</svg>`;
}

// Horizontal bar list for rankings (province comparisons). items: [{name, value, suffix}].
export function rankBars(items, options = {}) {
  const max = Math.max(...items.map((i) => i.value));
  const rows = items
    .map((item) => {
      const pct = Math.max((item.value / max) * 100, 2);
      return `<div class="rank-row"><span class="rank-name">${esc(item.name)}</span>`
        + `<span class="rank-track"><span class="rank-fill" style="width:${pct.toFixed(1)}%"></span></span>`
        + `<span class="rank-value">${fmtNum(item.value)}${item.suffix ?? ''}</span></div>`;
    })
    .join('');
  return `<div class="rank-bars">${rows}</div>`;
}
