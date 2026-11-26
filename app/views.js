// NusaStat — page views. Each view is a pure function of the data in data.js
// plus a little local UI state (which chart is selected, how a table is sorted).
// main.js only routes; everything a visitor sees is built here.

import {
  SERIES, HEADLINES, PROFILE, ECONOMY, HUMAN,
  PROVINCES, DENSITY_JAVA, POVERTY_PROVINCES, POVERTY_COUNTS, SOURCES,
} from './data.js';
import { barChart, lineChart, rankBars, fmtNum } from './charts.js';

const state = {
  econChart: 'gdpGrowth',
  regionMetric: 'population',
  regionQuery: '',
  sort: { provinces: { key: 'pop', dir: -1 }, regions: { key: 'pop', dir: -1 } },
};

function sourceLine(text) {
  return `<p class="src">Sumber: ${text}</p>`;
}

function kpiCards() {
  return `<div class="kpi-grid">${HEADLINES.map((h) => `
    <article class="kpi"><p class="kpi-label">${h.label}</p>
    <p class="kpi-value">${h.value}</p>
    <p class="kpi-detail">${h.detail}</p>
    <p class="kpi-src">${h.source}</p></article>`).join('')}</div>`;
}

function pageHead(title, lede, source) {
  return `<div class="page-head"><h1>${title}</h1><p class="lede">${lede}</p>${source ? sourceLine(source) : ''}</div>`;
}

function chartCard(title, body, source) {
  return `<section class="chart-card"><h2>${title}</h2>${body}${source ? sourceLine(source) : ''}</section>`;
}

function sortArrow(table, key) {
  const s = state.sort[table];
  if (!s || s.key !== key) return '';
  return s.dir === 1 ? ' ▲' : ' ▼';
}

function sortedRows(rows, table) {
  const s = state.sort[table];
  if (!s) return rows;
  const copy = [...rows];
  copy.sort((a, b) => {
    const av = a[s.key];
    const bv = b[s.key];
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * s.dir;
    return String(av).localeCompare(String(bv), 'id') * s.dir;
  });
  return copy;
}

// ---------------- Overview ----------------

export function viewOverview() {
  const pop = SERIES.population;
  const growth = SERIES.gdpGrowth;
  const poverty = SERIES.poverty;
  const hdi = SERIES.hdi;
  return `
  ${pageHead('Indonesia dalam angka',
    'Satu tempat untuk membaca statistik resmi Indonesia: penduduk, ekonomi, kesehatan, pendidikan, dan perbandingan antarprovinsi — semuanya dengan sumber dan tahun yang jelas.',
    'Angka utama: BPS 2024–2025, APJII 2025. Seluruh dataset tercantum di halaman Data &amp; Sumber.')}
  ${kpiCards()}
  <div class="grid-2">
    ${chartCard('Penduduk terus bertambah', barChart(pop.values), pop.source)}
    ${chartCard('Pertumbuhan ekonomi kembali di atas 5%', lineChart(growth.values), growth.source)}
  </div>
  <section class="chart-card"><h2>Sekilas Indonesia</h2>
    <div class="fact-grid">${PROFILE.map((f) => `
      <div class="fact"><p class="fact-value">${f.value}</p><p class="fact-label">${f.label}</p>
      <p class="fact-src">${f.source}</p></div>`).join('')}</div>
  </section>
  <div class="grid-2">
    ${chartCard('Kemiskinan turun ke titik terendah dua dekade', lineChart(poverty.values), poverty.source + '. Maret 2025: 8,47% atau 23,85 juta jiwa.')}
    ${chartCard('Pembangunan manusia naik setiap tahun', lineChart(hdi.values), hdi.source + '. 2024: 75,02 (kategori Tinggi).')}
  </div>
  <section class="chart-card"><h2>Jelajahi datanya</h2>
    <nav class="explore">
      <a href="#/populasi">Populasi — siapa, di mana, dan seberapa terkoneksi →</a>
      <a href="#/ekonomi">Ekonomi — PDB, harga, kerja, dan kemiskinan →</a>
      <a href="#/kesehatan-pendidikan">Kesehatan &amp; Pendidikan — IPM dan sekolah →</a>
      <a href="#/daerah">Daerah — bandingkan 38 provinsi →</a>
      <a href="#/data">Data &amp; Sumber — dari mana setiap angka berasal →</a>
    </nav>
  </section>`;
}

// ---------------- Populasi ----------------

export function viewPopulation() {
  const pop = SERIES.population;
  const net = SERIES.internet;
  const lit = SERIES.literacy;
  const rows = sortedRows(PROVINCES, 'provinces');
  return `
  ${pageHead('Populasi',
    '281,6 juta jiwa pada pertengahan 2024 — negara keempat terpadat di dunia. Lebih dari separuhnya tinggal di Pulau Jawa, dan 8 dari 10 penduduk sudah memakai internet.',
    pop.source)}
  <div class="grid-2">
    ${chartCard('Jumlah penduduk, 2020–2025 (juta jiwa)', barChart(pop.values), pop.source + '. ' + pop.note)}
    ${chartCard('Penetrasi internet, 2022–2025 (%)', lineChart(net.values), net.source + '. ' + net.note)}
  </div>
  <section class="chart-card"><h2>Sepuluh provinsi terpadat, 2024</h2>
    <p class="hint">Klik judul kolom untuk mengurutkan tabel.</p>
    <div class="table-wrap"><table class="data-table">
      <thead><tr>
        <th data-table="provinces" data-key="name">Provinsi${sortArrow('provinces', 'name')}</th>
        <th data-table="provinces" data-key="island">Pulau${sortArrow('provinces', 'island')}</th>
        <th data-table="provinces" data-key="pop" class="num">Penduduk (juta)${sortArrow('provinces', 'pop')}</th>
        <th data-table="provinces" data-key="share" class="num">Pangsa (%)${sortArrow('provinces', 'share')}</th>
      </tr></thead>
      <tbody>${rows.map((r) => `<tr><td>${r.name}</td><td>${r.island}</td><td class="num">${fmtNum(r.pop)}</td><td class="num">${fmtNum(r.share)}</td></tr>`).join('')}</tbody>
    </table></div>
    ${sourceLine('BPS, Statistical Yearbook of Indonesia 2024. Tiga provinsi di Jawa — Jawa Barat, Jawa Timur, Jawa Tengah — menampung 46,2% penduduk Indonesia.')}
  </section>
  <div class="grid-2">
    ${chartCard('Melek aksara makin merata', lineChart(lit.values), lit.source + '. Penduduk 15 tahun ke atas yang dapat membaca dan menulis.')}
    <section class="chart-card"><h2>Kepadatan di Pulau Jawa, 2024</h2>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Provinsi</th><th class="num">Jiwa per km²</th></tr></thead>
        <tbody>${DENSITY_JAVA.map((d) => `<tr><td>${d.name}</td><td class="num">${d.value.toLocaleString('id-ID')}</td></tr>`).join('')}</tbody>
      </table></div>
      ${sourceLine('BPS, 2024. DKI Jakarta 16.165 jiwa/km² — provinsi terpadat di Indonesia.')}
    </section>
  </div>`;
}

// ---------------- Ekonomi ----------------

const ECON_OPTIONS = [
  { key: 'gdpGrowth', label: 'Pertumbuhan ekonomi (%)' },
  { key: 'inflation', label: 'Inflasi tahunan (%)' },
  { key: 'poverty', label: 'Penduduk miskin (%)' },
  { key: 'unemployment', label: 'Pengangguran terbuka (%)' },
];

export function viewEconomy() {
  const series = SERIES[state.econChart];
  const useLine = state.econChart !== 'gdpGrowth';
  const chart = useLine ? lineChart(series.values) : barChart(series.values);
  return `
  ${pageHead('Ekonomi',
    'PDB Rp22.139 triliun pada 2024 dengan pertumbuhan 5,03%. Inflasi 2024 tercatat 1,57% — terendah sejak 1958 — sementara kemiskinan dan pengangguran terus menurun.',
    'BPS, 2024–2025; Bank Indonesia untuk inflasi.')}
  <div class="kpi-grid cols-4">
    <article class="kpi"><p class="kpi-label">PDB 2024</p><p class="kpi-value">Rp22.139 T</p><p class="kpi-detail">2025: Rp23.821,1 T</p><p class="kpi-src">BPS, 2024–2025</p></article>
    <article class="kpi"><p class="kpi-label">PDB per kapita 2024</p><p class="kpi-value">US$4.960</p><p class="kpi-detail">Rp78,6 juta; 2025: US$5.083</p><p class="kpi-src">BPS, 2024–2025</p></article>
    <article class="kpi"><p class="kpi-label">Inflasi 2024</p><p class="kpi-value">1,57%</p><p class="kpi-detail">target pemerintah 2,5% ± 1%</p><p class="kpi-src">BPS / Bank Indonesia</p></article>
    <article class="kpi"><p class="kpi-label">Garis kemiskinan</p><p class="kpi-value">Rp609.160</p><p class="kpi-detail">per kapita per bulan, Mar 2025</p><p class="kpi-src">BPS, 2025</p></article>
  </div>
  <section class="chart-card"><h2>Tren ekonomi, 2020–2025</h2>
    <label class="control">Pilih indikator
      <select id="econ-chart">${ECON_OPTIONS.map((o) => `<option value="${o.key}"${o.key === state.econChart ? ' selected' : ''}>${o.label}</option>`).join('')}</select>
    </label>
    <div id="econ-chart-area">${chart}</div>
    ${sourceLine(series.source + ' ' + series.note)}
  </section>
  <div class="grid-2">
    <section class="chart-card"><h2>Kemiskinan kota vs desa, Maret 2025</h2>
      ${rankBars(ECONOMY.povertyUrbanRural.map((r) => ({ name: r.area, value: r.value, suffix: '%' })))}
      <p class="src">Sumber: BPS, Profil Kemiskinan Maret 2025. Nasional 8,47%; kemiskinan ekstrem 0,85% (2,38 juta jiwa).</p>
    </section>
    <section class="chart-card"><h2>Pasar kerja, Agustus 2024</h2>
      <div class="fact-grid">
        <div class="fact"><p class="fact-value">${ECONOMY.labour.tpak.value}</p><p class="fact-label">Partisipasi angkatan kerja</p><p class="fact-src">BPS Sakernas</p></div>
        <div class="fact"><p class="fact-value">${ECONOMY.labour.informal.value}</p><p class="fact-label">Pekerja informal</p><p class="fact-src">BPS Sakernas</p></div>
        <div class="fact"><p class="fact-value">${ECONOMY.labour.workingAge.value}</p><p class="fact-label">Penduduk usia kerja (15+)</p><p class="fact-src">BPS Sakernas</p></div>
        <div class="fact"><p class="fact-value">4,91%</p><p class="fact-label">TPT Agustus 2024 (7,47 jt penganggur)</p><p class="fact-src">BPS Sakernas</p></div>
      </div>
      <p class="src">Sumber: BPS, Sakernas Agustus 2024. TPT turun dari 7,07% pada Agustus 2020.</p>
    </section>
  </div>`;
}

// ---------------- Kesehatan & Pendidikan ----------------

export function viewHealth() {
  const hdi = SERIES.hdi;
  const lit = SERIES.literacy;
  return `
  ${pageHead('Kesehatan & Pendidikan',
    'IPM Indonesia 75,02 pada 2024 — kategori Tinggi — dan naik lagi ke 75,90 pada 2025. Umur harapan hidup 74,15 tahun; hampir semua pemuda kini melek huruf.',
    'BPS, Berita Resmi Statistik IPM 2024–2025.')}
  <div class="kpi-grid cols-4">
    <article class="kpi"><p class="kpi-label">IPM 2024</p><p class="kpi-value">75,02</p><p class="kpi-detail">2025: 75,90</p><p class="kpi-src">BPS, 2024–2025</p></article>
    <article class="kpi"><p class="kpi-label">Umur harapan hidup</p><p class="kpi-value">74,15 th</p><p class="kpi-detail">2025: 74,47 tahun</p><p class="kpi-src">BPS, 2024–2025</p></article>
    <article class="kpi"><p class="kpi-label">Harapan lama sekolah</p><p class="kpi-value">13,12 th</p><p class="kpi-detail">2025: 13,30 tahun</p><p class="kpi-src">BPS, 2024–2025</p></article>
    <article class="kpi"><p class="kpi-label">Melek aksara (15+)</p><p class="kpi-value">96,67%</p><p class="kpi-detail">2025: 97,10%</p><p class="kpi-src">BPS, 2024–2025</p></article>
  </div>
  <div class="grid-2">
    ${chartCard('IPM, 2020–2025', lineChart(hdi.values), hdi.source)}
    ${chartCard('Melek aksara (15+), 2021–2025 (%)', lineChart(lit.values), lit.source)}
  </div>
  <div class="grid-2">
    <section class="chart-card"><h2>Komponen IPM</h2>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th>Komponen</th><th class="num">2024</th><th class="num">2025</th></tr></thead>
        <tbody>
          <tr><td>Umur harapan hidup saat lahir</td><td class="num">${fmtNum(HUMAN.lifeExpectancy[1].value)} th</td><td class="num">${fmtNum(HUMAN.lifeExpectancy[2].value)} th</td></tr>
          <tr><td>Harapan lama sekolah</td><td class="num">${fmtNum(HUMAN.expectedSchooling[0].value)} th</td><td class="num">${fmtNum(HUMAN.expectedSchooling[1].value)} th</td></tr>
          <tr><td>Rata-rata lama sekolah</td><td class="num">—</td><td class="num">${fmtNum(HUMAN.meanSchooling[0].value)} th</td></tr>
          <tr><td>Pengeluaran riil per kapita (disesuaikan)</td><td class="num">${HUMAN.realExpenditure.value}/th</td><td class="num">—</td></tr>
        </tbody>
      </table></div>
      <p class="src">Sumber: BPS, 2024–2025. Rata-rata lama sekolah 2024 tidak kami cantumkan karena belum terverifikasi dari rilis resmi.</p>
    </section>
    <section class="chart-card"><h2>IPM menurut provinsi, 2024</h2>
      ${rankBars(HUMAN.hdiByProvince.map((r) => ({ name: r.province, value: r.value })))}
      ${sourceLine('BPS, 2024. Tertinggi DKI Jakarta 84,15; terendah Papua Pegunungan 54,43 — selisih hampir 30 poin.')}
    </section>
  </div>
  <section class="chart-card"><h2>Sekolah dan literasi</h2>
    <div class="fact-grid">
      <div class="fact"><p class="fact-value">${HUMAN.youthLiteracy.value}</p><p class="fact-label">Melek huruf pemuda 15–24 th, 2024</p><p class="fact-src">BPS</p></div>
      ${HUMAN.schoolParticipation.map((s) => `<div class="fact"><p class="fact-value">${fmtNum(s.value)}%</p><p class="fact-label">Partisipasi sekolah ${s.group}, 2024</p><p class="fact-src">BPS</p></div>`).join('')}
    </div>
    <p class="src">Sumber: BPS, Statistik Pemuda Indonesia 2024 dan Susenas 2024. Satu dari empat penduduk usia 16–18 tahun belum bersekolah.</p>
  </section>`;
}

// ---------------- Daerah ----------------

const REGION_OPTIONS = [
  { key: 'population', label: 'Penduduk terbanyak (juta jiwa, 2024)' },
  { key: 'povertyRate', label: 'Tingkat kemiskinan tertinggi (%, Mar 2025)' },
  { key: 'povertyCount', label: 'Jumlah penduduk miskin terbanyak (juta jiwa, Mar 2025)' },
];

function regionRankData() {
  if (state.regionMetric === 'povertyRate') {
    return POVERTY_PROVINCES.slice(0, 10).map((r) => ({ name: r.name, value: r.value, suffix: '%' }));
  }
  if (state.regionMetric === 'povertyCount') {
    return POVERTY_COUNTS.map((r) => ({ name: r.name, value: r.value, suffix: ' jt' }));
  }
  return PROVINCES.map((r) => ({ name: r.name, value: r.pop, suffix: ' jt' }));
}

export function viewRegions() {
  const q = state.regionQuery.trim().toLowerCase();
  let rows = sortedRows(PROVINCES, 'regions');
  if (q) rows = rows.filter((r) => r.name.toLowerCase().includes(q) || r.island.toLowerCase().includes(q));
  const lowest = [...POVERTY_PROVINCES].slice(-3).reverse();
  return `
  ${pageHead('Daerah',
    'Indonesia itu tidak seragam: tiga provinsi di Jawa menampung hampir separuh penduduk, sementara kemiskinan tertinggi terkonsentrasi di timur. Bandingkan provinsi-provinsi di bawah ini.',
    'BPS, 2024–2025.')}
  <section class="chart-card"><h2>Peringkat provinsi</h2>
    <label class="control">Pilih ukuran
      <select id="region-metric">${REGION_OPTIONS.map((o) => `<option value="${o.key}"${o.key === state.regionMetric ? ' selected' : ''}>${o.label}</option>`).join('')}</select>
    </label>
    <div id="region-rank-area">${rankBars(regionRankData())}</div>
    ${sourceLine(state.regionMetric === 'population' ? 'BPS, Statistical Yearbook of Indonesia 2024.' : 'BPS, Profil Kemiskinan Maret 2025.')}
  </section>
  <section class="chart-card"><h2>Sepuluh provinsi terpadat, 2024</h2>
    <label class="control">Cari provinsi atau pulau
      <input id="region-search" type="search" placeholder="mis. Jawa, Sumatera…" value="${state.regionQuery.replace(/"/g, '&quot;')}">
    </label>
    <p class="hint">Klik judul kolom untuk mengurutkan tabel.</p>
    <div class="table-wrap"><table class="data-table">
      <thead><tr>
        <th data-table="regions" data-key="name">Provinsi${sortArrow('regions', 'name')}</th>
        <th data-table="regions" data-key="island">Pulau${sortArrow('regions', 'island')}</th>
        <th data-table="regions" data-key="pop" class="num">Penduduk (juta)${sortArrow('regions', 'pop')}</th>
        <th data-table="regions" data-key="share" class="num">Pangsa (%)${sortArrow('regions', 'share')}</th>
      </tr></thead>
      <tbody>${rows.length ? rows.map((r) => `<tr><td>${r.name}</td><td>${r.island}</td><td class="num">${fmtNum(r.pop)}</td><td class="num">${fmtNum(r.share)}</td></tr>`).join('') : '<tr><td colspan="4">Tidak ada provinsi yang cocok dengan pencarian.</td></tr>'}</tbody>
    </table></div>
    ${sourceLine('BPS, Statistical Yearbook of Indonesia 2024.')}
  </section>
  <div class="grid-2">
    <section class="chart-card"><h2>Kemiskinan tertinggi, Maret 2025</h2>
      ${rankBars(POVERTY_PROVINCES.slice(0, 8).map((r) => ({ name: r.name, value: r.value, suffix: '%' })))}
      ${sourceLine('BPS, Profil Kemiskinan Maret 2025. Nasional: 8,47%.')}
    </section>
    <section class="chart-card"><h2>Kemiskinan terendah, Maret 2025</h2>
      ${rankBars(lowest.map((r) => ({ name: r.name, value: r.value, suffix: '%' })))}
      ${sourceLine('BPS, Profil Kemiskinan Maret 2025. Bali terendah: 3,72%.')}
    </section>
  </div>`;
}

// ---------------- Data & Sumber ----------------

export function viewData() {
  return `
  ${pageHead('Data & Sumber',
    'Setiap angka di situs ini berasal dari publikasi resmi. Tabel di bawah mencantumkan dataset, penerbit, dan tahunnya — tidak ada angka tanpa sumber, tidak ada angka karangan.',
    '')}
  <section class="chart-card"><h2>Semua dataset</h2>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>Dataset</th><th>Penerbit</th><th>Keterangan</th><th>Tahun</th></tr></thead>
      <tbody>${SOURCES.map((s) => `<tr><td>${s.dataset}</td><td>${s.publisher}</td><td>${s.detail}</td><td>${s.year}</td></tr>`).join('')}</tbody>
    </table></div>
  </section>
  <section class="chart-card"><h2>Metode dan catatan</h2>
    <ul class="notes">
      <li>Angka penduduk adalah proyeksi pertengahan tahun BPS (Proyeksi Penduduk Indonesia 2020–2050); angka 2025 masih proyeksi.</li>
      <li>Inflasi adalah perubahan IHK year-on-year per Desember, sesuai rilis BPS dan tabel target Bank Indonesia.</li>
      <li>Kemiskinan dihitung BPS dari Susenas; garis kemiskinan Maret 2025 adalah Rp609.160 per kapita per bulan.</li>
      <li>IPM memakai metode baru BPS (kesehatan, pendidikan, pengeluaran riil yang disesuaikan).</li>
      <li>Pengguna internet berasal dari Survei Penetrasi Internet APJII, bukan dari BPS.</li>
      <li>Situs ini tidak mengambil data apa pun dari internet saat dibuka: semua angka tersimpan di berkas situs sendiri.</li>
    </ul>
    <p class="src">Terakhir diperbarui: 26 November 2026. NusaStat bukan situs resmi pemerintah dan tidak berafiliasi dengan BPS.</p>
  </section>`;
}

// ---------------- Controls ----------------

export function bindControls(root, rerender) {
  const econSelect = root.querySelector('#econ-chart');
  if (econSelect) {
    econSelect.addEventListener('change', () => {
      state.econChart = econSelect.value;
      rerender();
    });
  }
  const regionSelect = root.querySelector('#region-metric');
  if (regionSelect) {
    regionSelect.addEventListener('change', () => {
      state.regionMetric = regionSelect.value;
      rerender();
    });
  }
  const search = root.querySelector('#region-search');
  if (search) {
    search.addEventListener('input', () => {
      state.regionQuery = search.value;
      const pos = search.selectionStart;
      rerender();
      const again = root.querySelector('#region-search');
      if (again) {
        again.focus();
        again.setSelectionRange(pos, pos);
      }
    });
  }
  root.querySelectorAll('th[data-table]').forEach((th) => {
    th.addEventListener('click', () => {
      const table = th.dataset.table;
      const key = th.dataset.key;
      const s = state.sort[table];
      if (s.key === key) s.dir = -s.dir;
      else {
        s.key = key;
        s.dir = typeof PROVINCES[0][key] === 'number' ? -1 : 1;
      }
      rerender();
    });
  });
}
