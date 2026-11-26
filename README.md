[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/DavidTimoteus/national-statistics-site-01/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/DavidTimoteus/national-statistics-site-01/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# NusaStat — Statistik Indonesia

Situs statistik nasional Indonesia yang berjalan sepenuhnya offline dari berkas
statis: tanpa build step, tanpa CDN, tanpa font eksternal, tanpa satu pun
network request. Dibangun untuk kompetisi make.fun
`best-national-statistics-site-20261126-0539`.

## Isi situs

- **Beranda (#/)** — kartu indikator utama (penduduk, PDB, IPM, kemiskinan),
  grafik penduduk dan pertumbuhan ekonomi, serta sekilas profil Indonesia.
- **Populasi (#/populasi)** — tren penduduk 2020–2025, 10 provinsi terpadat
  (tabel bisa diurutkan), kepadatan Pulau Jawa, penetrasi internet, melek aksara.
- **Ekonomi (#/ekonomi)** — PDB dan PDB per kapita, pemilih indikator untuk
  grafik tren (pertumbuhan, inflasi, kemiskinan, pengangguran), kemiskinan
  kota vs desa, pasar kerja.
- **Kesehatan & Pendidikan (#/kesehatan-pendidikan)** — IPM dan komponennya,
  melek aksara, partisipasi sekolah, IPM menurut provinsi.
- **Daerah (#/daerah)** — peringkat provinsi (penduduk / kemiskinan /
  jumlah penduduk miskin), tabel provinsi yang bisa diurutkan dan dicari,
  kemiskinan tertinggi dan terendah.
- **Data & Sumber (#/data)** — semua dataset beserta penerbit dan tahunnya,
  plus catatan metode.

## Sumber data

Semua angka berasal dari publikasi resmi dan dicantumkan sumber + tahunnya di
samping angka: **BPS** (penduduk, PDB, inflasi, kemiskinan, pengangguran, IPM,
melek aksara), **Bank Indonesia** (target inflasi), **APJII** (pengguna
internet), dan **Ditjen Dukcapil Kemendagri** (sebaran penduduk). Tidak ada
angka karangan; angka yang belum terverifikasi tidak dipakai.

## Menjalankan

Sajikan `app/` dengan server statis apa pun, lalu buka `index.html`:

```sh
node --run serve  # bila tersedia, atau:
python3 -m http.server --directory app 8080
```

## Screenshot

`shots.mjs` (di luar repo entri) mengambil 4 render asli dengan headless
Chromium: beranda desktop, ekonomi desktop, daerah desktop, dan beranda
ukuran HP. Masing-masing ≤ 256 KiB; yang pertama menurut nama adalah cover.

## Menyerahkan (hand-in)

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` menyalin `app/` dan `screenshots/` ke direktori output dan menulis
`dossier.json` lewat `buildDossier` dari `vendor/makefun-frontend.ts`
(salinan kit yang tidak diubah).

## Lisensi

MIT — lihat `LICENSE`.
