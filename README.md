# Kembang Gula Catering — Website

## Struktur folder
```
royal-prestige-catering/
├── index.html        Kerangka halaman
├── css/style.css     Tampilan (warna ada di bagian :root paling atas)
├── js/data.js        ✏️ EDIT DI SINI: teks, harga, harga menu per porsi, WhatsApp, nama foto
├── js/main.js        Logika halaman (jarang perlu diubah)
└── images/
    ├── hero.jpg      Foto latar utama (opsional, 1920x1080)
    ├── paket/        wedding.jpg, corporate.jpg, private.jpg (800x500)
    ├── menu/         kambing-guling.jpg, rendang-wagyu.jpg, zuppa-soup.jpg,
    │                 salmon.jpg, dessert.jpg, mocktail.jpg (600x400)
    └── testimoni/    foto avatar klien (opsional, persegi)
```

## Cara ganti foto
1. Siapkan foto (JPG, idealnya di bawah 300 KB agar cepat dimuat).
2. Beri nama sesuai daftar di atas lalu taruh di folder `images/...`, menimpa file lama.
3. Atau pakai nama lain, lalu ubah path-nya di `js/data.js` pada kolom `foto`.
4. Jika foto tidak ada, otomatis tampil ikon emoji.

## Cara edit konten
Buka `js/data.js`: ganti nomor WhatsApp, alamat, harga, deskripsi paket, menu, dan testimoni.
Tambah menu baru dengan menyalin satu baris `{ nama: ..., ikon: ..., deskripsi: ..., foto: ... }`.

## Harga menu & biaya layanan
Di `js/data.js`: ubah `harga` (per porsi) di tiap menu, `pilih: true/false` untuk menu yang tercentang awal,
serta `layananPersen` dan `ppnPersen` untuk biaya layanan dan pajak.

## Cara ganti warna
Buka `css/style.css`, ubah `--gold`, `--gold2`, `--bg` di blok `:root` paling atas.

## Cara menjalankan
Klik dua kali `index.html` untuk membukanya di browser. Untuk online, unggah seluruh folder ke hosting
(Netlify, Vercel, GitHub Pages, atau hosting biasa) tanpa mengubah susunannya.
