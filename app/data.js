// NusaStat — data Indonesia. Every figure below was checked against an official
// publication before it was written here (BPS, Bank Indonesia, APJII, Dukcapil).
// Each series carries its source and the year it describes; nothing here is
// estimated by us. Figures we could not verify were left out on purpose.

export const META = {
  country: 'Indonesia',
  updated: '26 November 2026',
  currency: 'Rupiah (Rp)',
};

// National time series. value is the figure for that year.
export const SERIES = {
  population: {
    label: 'Jumlah penduduk',
    unit: 'juta jiwa',
    source: 'BPS, Proyeksi Penduduk Indonesia 2020–2050 (pertengahan tahun)',
    note: '2025 adalah proyeksi BPS.',
    values: [
      { year: 2020, value: 270.2 },
      { year: 2021, value: 272.68 },
      { year: 2022, value: 275.77 },
      { year: 2023, value: 278.7 },
      { year: 2024, value: 281.6 },
      { year: 2025, value: 284.44 },
    ],
  },
  gdpGrowth: {
    label: 'Pertumbuhan ekonomi (PDB)',
    unit: '% per tahun',
    source: 'BPS, Berita Resmi Statistik PDB',
    note: 'Pertumbuhan PDB harga konstan (c-to-c).',
    values: [
      { year: 2020, value: -2.07 },
      { year: 2021, value: 3.7 },
      { year: 2022, value: 5.31 },
      { year: 2023, value: 5.05 },
      { year: 2024, value: 5.03 },
      { year: 2025, value: 5.11 },
    ],
  },
  inflation: {
    label: 'Inflasi tahunan (IHK, y-on-y Desember)',
    unit: '%',
    source: 'BPS via Bank Indonesia, Target Inflasi',
    note: 'Target inflasi pemerintah 2024–2025: 2,5% ± 1%.',
    values: [
      { year: 2020, value: 1.68 },
      { year: 2021, value: 1.87 },
      { year: 2022, value: 5.51 },
      { year: 2023, value: 2.61 },
      { year: 2024, value: 1.57 },
      { year: 2025, value: 2.92 },
    ],
  },
  poverty: {
    label: 'Penduduk miskin',
    unit: '% penduduk',
    source: 'BPS, Profil Kemiskinan di Indonesia (Susenas Maret)',
    note: 'Persentase penduduk miskin tiap Maret.',
    values: [
      { year: 2020, value: 9.78 },
      { year: 2021, value: 10.14 },
      { year: 2022, value: 9.54 },
      { year: 2023, value: 9.36 },
      { year: 2024, value: 9.03 },
      { year: 2025, value: 8.47 },
    ],
  },
  unemployment: {
    label: 'Tingkat Pengangguran Terbuka (TPT)',
    unit: '% angkatan kerja',
    source: 'BPS, Sakernas Agustus',
    note: 'TPT tiap Agustus; 7,47 juta penganggur pada Agustus 2024.',
    values: [
      { year: 2020, value: 7.07 },
      { year: 2021, value: 6.49 },
      { year: 2022, value: 5.86 },
      { year: 2023, value: 5.32 },
      { year: 2024, value: 4.91 },
      { year: 2025, value: 4.85 },
    ],
  },
  hdi: {
    label: 'Indeks Pembangunan Manusia (IPM)',
    unit: 'skala 0–100',
    source: 'BPS, Berita Resmi Statistik IPM',
    note: 'Kategori “Tinggi” sejak 2022.',
    values: [
      { year: 2020, value: 71.94 },
      { year: 2021, value: 72.29 },
      { year: 2022, value: 73.77 },
      { year: 2023, value: 74.39 },
      { year: 2024, value: 75.02 },
      { year: 2025, value: 75.9 },
    ],
  },
  literacy: {
    label: 'Angka melek aksara (15 tahun ke atas)',
    unit: '% penduduk',
    source: 'BPS, Susenas (tabel Angka Melek Aksara)',
    note: 'Penduduk 15+ yang dapat membaca dan menulis.',
    values: [
      { year: 2021, value: 96.04 },
      { year: 2022, value: 96.35 },
      { year: 2023, value: 96.53 },
      { year: 2024, value: 96.67 },
      { year: 2025, value: 97.1 },
    ],
  },
  internet: {
    label: 'Penetrasi internet',
    unit: '% penduduk',
    source: 'APJII, Survei Penetrasi Internet Indonesia',
    note: '2024: 221,56 juta pengguna; 2025: 229,43 juta pengguna.',
    values: [
      { year: 2022, value: 77.01 },
      { year: 2023, value: 78.19 },
      { year: 2024, value: 79.5 },
      { year: 2025, value: 80.66 },
    ],
  },
};

// Headline indicators shown on the dashboard. Each names its source and year.
export const HEADLINES = [
  { label: 'Penduduk', value: '281,6 jt', detail: 'pertengahan 2024', source: 'BPS, 2024' },
  { label: 'PDB', value: 'Rp22.139 T', detail: 'harga berlaku, 2024', source: 'BPS, 2024' },
  { label: 'PDB per kapita', value: 'US$4.960', detail: 'Rp78,6 juta, 2024', source: 'BPS, 2024' },
  { label: 'Pertumbuhan ekonomi', value: '5,03%', detail: 'tahun 2024', source: 'BPS, 2024' },
  { label: 'IPM', value: '75,02', detail: 'kategori Tinggi, 2024', source: 'BPS, 2024' },
  { label: 'Penduduk miskin', value: '8,47%', detail: '23,85 juta jiwa, Mar 2025', source: 'BPS, 2025' },
];

// Profile facts about the country (geography and settlement).
export const PROFILE = [
  { label: 'Luas daratan', value: '1.890.180 km²', source: 'BPS, 2025' },
  { label: 'Jumlah pulau', value: '17.380', source: 'BPS, 2025' },
  { label: 'Bahasa daerah', value: '718', source: 'BPS, 2025' },
  { label: 'Provinsi', value: '38', source: 'BPS, 2024' },
  { label: 'Penduduk di Pulau Jawa', value: '55,9%', source: 'Dukcapil Kemendagri, Sem. I 2024' },
  { label: 'Pengguna internet', value: '229,4 jt', detail: '80,66% penduduk, 2025', source: 'APJII, 2025' },
];

// Economy detail figures.
export const ECONOMY = {
  gdpNominal: [
    { year: 2024, value: 22139, text: 'Rp22.139 triliun' },
    { year: 2025, value: 23821.1, text: 'Rp23.821,1 triliun' },
  ],
  gdpPerCapita: [
    { year: 2024, rupiah: 'Rp78,6 juta', usd: 'US$4.960,3' },
    { year: 2025, rupiah: 'Rp83,7 juta', usd: 'US$5.083,4' },
  ],
  povertyLine: { value: 'Rp609.160', detail: 'per kapita per bulan, Maret 2025', source: 'BPS, 2025' },
  extremePoverty: { value: '0,85%', detail: '2,38 juta jiwa, Maret 2025 (garis Bank Dunia US$2,15/hari)', source: 'BPS, 2025' },
  povertyUrbanRural: [
    { area: 'Perkotaan', value: 6.73 },
    { area: 'Perdesaan', value: 11.03 },
  ],
  labour: {
    tpak: { value: '70,63%', detail: 'Tingkat Partisipasi Angkatan Kerja, Agustus 2024', source: 'BPS Sakernas, 2024' },
    informal: { value: '57,95%', detail: 'pekerja di sektor informal, Agustus 2024', source: 'BPS Sakernas, 2024' },
    workingAge: { value: '215,37 jt', detail: 'penduduk usia kerja (15+), Agustus 2024', source: 'BPS Sakernas, 2024' },
  },
};

// Human development detail figures.
export const HUMAN = {
  lifeExpectancy: [
    { year: 2023, value: 73.93 },
    { year: 2024, value: 74.15 },
    { year: 2025, value: 74.47 },
  ],
  expectedSchooling: [
    { year: 2024, value: 13.12 },
    { year: 2025, value: 13.3 },
  ],
  meanSchooling: [{ year: 2025, value: 9.07 }],
  realExpenditure: { value: 'Rp12,34 jt', detail: 'pengeluaran riil per kapita per tahun (disesuaikan), 2024; naik Rp442 ribu dari 2023', source: 'BPS, 2024' },
  youthLiteracy: { value: '99,79%', detail: 'angka melek huruf pemuda (15–24 tahun), 2024', source: 'BPS, 2024' },
  schoolParticipation: [
    { group: 'Usia 7–12 tahun', value: 99.19 },
    { group: 'Usia 16–18 tahun', value: 74.64 },
  ],
  hdiByProvince: [
    { province: 'DKI Jakarta', value: 84.15 },
    { province: 'DI Yogyakarta', value: 81.62 },
    { province: 'Kepulauan Riau', value: 79.89 },
    { province: 'Kalimantan Timur', value: 78.79 },
    { province: 'Bali', value: 78.63 },
    { province: 'Indonesia (nasional)', value: 75.02 },
    { province: 'Papua Pegunungan', value: 54.43 },
  ],
};

// Provinces: 10 largest by population, BPS 2024 (Statistical Yearbook of Indonesia 2024).
export const PROVINCES = [
  { name: 'Jawa Barat', island: 'Jawa', pop: 50.35, share: 17.88 },
  { name: 'Jawa Timur', island: 'Jawa', pop: 41.81, share: 14.85 },
  { name: 'Jawa Tengah', island: 'Jawa', pop: 37.89, share: 13.46 },
  { name: 'Sumatera Utara', island: 'Sumatera', pop: 15.59, share: 5.54 },
  { name: 'Banten', island: 'Jawa', pop: 12.43, share: 4.41 },
  { name: 'DKI Jakarta', island: 'Jawa', pop: 10.68, share: 3.79 },
  { name: 'Sulawesi Selatan', island: 'Sulawesi', pop: 9.46, share: 3.36 },
  { name: 'Lampung', island: 'Sumatera', pop: 9.42, share: 3.34 },
  { name: 'Sumatera Selatan', island: 'Sumatera', pop: 8.8, share: 3.13 },
  { name: 'Riau', island: 'Sumatera', pop: 6.7, share: 2.38 },
];

// Population density in Java's six provinces, BPS 2024 (jiwa per km²).
export const DENSITY_JAVA = [
  { name: 'DKI Jakarta', value: 16165 },
  { name: 'Jawa Barat', value: 1359 },
  { name: 'Banten', value: 1329 },
  { name: 'DI Yogyakarta', value: 1193 },
  { name: 'Jawa Tengah', value: 1104 },
  { name: 'Jawa Timur', value: 870 },
];

// Poverty rate by province, March 2025, BPS (Susenas).
export const POVERTY_PROVINCES = [
  { name: 'Papua Pegunungan', value: 30.03 },
  { name: 'Papua Tengah', value: 28.9 },
  { name: 'Papua Barat', value: 20.66 },
  { name: 'Papua Selatan', value: 19.71 },
  { name: 'Papua', value: 19.16 },
  { name: 'Nusa Tenggara Timur', value: 18.6 },
  { name: 'Papua Barat Daya', value: 17.95 },
  { name: 'Maluku', value: 15.38 },
  { name: 'Gorontalo', value: 13.24 },
  { name: 'Aceh', value: 12.33 },
  { name: 'Bengkulu', value: 12.08 },
  { name: 'DI Yogyakarta', value: 10.23 },
  { name: 'Jawa Timur', value: 9.5 },
  { name: 'Sumatera Utara', value: 7.36 },
  { name: 'Jawa Barat', value: 7.02 },
  { name: 'Banten', value: 5.63 },
  { name: 'Kalimantan Utara', value: 5.54 },
  { name: 'Sumatera Barat', value: 5.35 },
  { name: 'Kalimantan Tengah', value: 5.19 },
  { name: 'Kalimantan Timur', value: 5.17 },
  { name: 'Kepulauan Bangka Belitung', value: 5.0 },
  { name: 'Kepulauan Riau', value: 4.44 },
  { name: 'DKI Jakarta', value: 4.28 },
  { name: 'Kalimantan Selatan', value: 3.84 },
  { name: 'Bali', value: 3.72 },
];

// Largest counts of poor people by province, March 2025, BPS.
export const POVERTY_COUNTS = [
  { name: 'Jawa Timur', value: 3.88 },
  { name: 'Jawa Barat', value: 3.65 },
  { name: 'Jawa Tengah', value: 3.37 },
  { name: 'Sumatera Utara', value: 1.14 },
  { name: 'Nusa Tenggara Timur', value: 1.09 },
  { name: 'Banten', value: 0.77 },
  { name: 'Aceh', value: 0.7 },
  { name: 'Sulawesi Selatan', value: 0.7 },
];

// Every dataset the site shows, for the Data & Sources page.
export const SOURCES = [
  { dataset: 'Jumlah penduduk 2020–2025', publisher: 'BPS', detail: 'Proyeksi Penduduk Indonesia 2020–2050; pertengahan tahun; 2025 proyeksi', year: '2024–2025' },
  { dataset: 'PDB dan PDB per kapita 2024–2025', publisher: 'BPS', detail: 'Berita Resmi Statistik PDB Triwulan IV-2024 dan 2025', year: '2024–2025' },
  { dataset: 'Pertumbuhan ekonomi 2020–2025', publisher: 'BPS', detail: 'PDB harga konstan, c-to-c', year: '2020–2025' },
  { dataset: 'Inflasi tahunan 2020–2025', publisher: 'BPS / Bank Indonesia', detail: 'IHK y-on-y Desember; target 2,5% ± 1%', year: '2020–2025' },
  { dataset: 'Penduduk miskin 2020–2025', publisher: 'BPS', detail: 'Profil Kemiskinan, Susenas Maret; garis kemiskinan Rp609.160/kapita/bulan (Mar 2025)', year: '2020–2025' },
  { dataset: 'Pengangguran (TPT) 2020–2025', publisher: 'BPS', detail: 'Sakernas Agustus; TPAK 70,63% dan pekerja informal 57,95% (Agu 2024)', year: '2020–2025' },
  { dataset: 'IPM dan komponennya 2020–2025', publisher: 'BPS', detail: 'Berita Resmi Statistik IPM; UHH, harapan lama sekolah, rata-rata lama sekolah, pengeluaran riil', year: '2020–2025' },
  { dataset: 'IPM menurut provinsi 2024', publisher: 'BPS', detail: 'IPM provinsi 2024; tertinggi DKI Jakarta 84,15, terendah Papua Pegunungan 54,43', year: '2024' },
  { dataset: 'Penduduk menurut provinsi 2024', publisher: 'BPS', detail: 'Statistical Yearbook of Indonesia 2024; 10 provinsi terbesar', year: '2024' },
  { dataset: 'Kepadatan penduduk Pulau Jawa 2024', publisher: 'BPS', detail: 'Penduduk, laju pertumbuhan, distribusi, dan kepadatan menurut provinsi', year: '2024' },
  { dataset: 'Kemiskinan menurut provinsi, Maret 2025', publisher: 'BPS', detail: 'Profil Kemiskinan Maret 2025; Susenas', year: '2025' },
  { dataset: 'Angka melek aksara 2021–2025', publisher: 'BPS', detail: 'Susenas; penduduk 15 tahun ke atas; pemuda 99,79% (2024)', year: '2021–2025' },
  { dataset: 'Partisipasi sekolah 2024', publisher: 'BPS', detail: 'APS usia 7–12 tahun 99,19%; usia 16–18 tahun 74,64%', year: '2024' },
  { dataset: 'Pengguna internet 2022–2025', publisher: 'APJII', detail: 'Survei Penetrasi Internet Indonesia; 229,43 juta pengguna (2025)', year: '2022–2025' },
  { dataset: 'Sebaran penduduk menurut pulau', publisher: 'Ditjen Dukcapil Kemendagri', detail: 'Data Kependudukan Bersih Semester I 2024; Jawa 55,93%', year: '2024' },
  { dataset: 'Luas daratan, pulau, bahasa daerah', publisher: 'BPS', detail: 'Data kewilayahan Indonesia', year: '2025' },
];
