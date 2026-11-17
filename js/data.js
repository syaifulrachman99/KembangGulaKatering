/* ============================================================
   FILE UTAMA UNTUK EDIT KONTEN
   Ubah teks, harga, nomor WhatsApp, dan nama file foto di sini.
   Foto: taruh di folder images/, lalu tulis path-nya di "foto".
   Jika foto kosong ("") atau file tidak ada, tampil ikon emoji.
   ============================================================ */
window.CONFIG = {
  // Nomor WhatsApp: awali 62, tanpa + atau 0 (contoh: 6281234567890)
  whatsapp: "6281234567890",
  alamat: "Jl. Grand Senopati No. 88, Jakarta Selatan",
  jam: "Senin–Minggu, 08:00–20:00 WIB",

  // Foto latar hero (opsional). Disarankan 1920x1080, format JPG
  heroFoto: "images/hero.jpg",

  // Porsi cadangan untuk kalkulator tamu (0.1 = 10%)
  cadangan: 0.1,

  // Biaya layanan (pelayan, perlengkapan, transport) dan PPN, dalam persen. Isi 0 jika tidak dipakai
  layananPersen: 10,
  ppnPersen: 0,

  // Tingkat kehadiran (0.75 = 75% undangan hadir)
  kehadiran: [
    { nama: "Resepsi pernikahan", persen: 0.75 },
    { nama: "Corporate / seminar", persen: 0.85 },
    { nama: "Acara keluarga / syukuran", persen: 0.90 },
    { nama: "Acara terbuka", persen: 0.60 }
  ],

  // Paket layanan. "label" boleh dikosongkan. Foto disarankan 800x500
  paket: [
    { nama: "Royal Wedding", ikon: "💍", label: "Terpopuler", harga: 120000,
      deskripsi: "Prasmanan megah, live cooking, dekorasi meja bunga, dan pelayan khusus pengantin.",
      foto: "images/paket/wedding.jpg" },
    { nama: "Corporate Banquet", ikon: "🥂", label: "", harga: 85000,
      deskripsi: "Lunch box premium, coffee break, dan prasmanan formal lengkap dengan invoice resmi.",
      foto: "images/paket/corporate.jpg" },
    { nama: "Private Dining", ikon: "🍷", label: "", harga: 350000,
      deskripsi: "Menu 5 course dengan chef pribadi dan pelayanan penuh di rumah atau venue Anda.",
      foto: "images/paket/private.jpg" }
  ],

  // Menu unggulan. "harga" = harga per porsi (Rp). "pilih: true" = tercentang otomatis. Foto disarankan 600x400
  menu: [
    { nama: "Kambing Guling", ikon: "🍖", deskripsi: "Dimarinasi rempah Nusantara, dipanggang langsung di lokasi acara.", harga: 35000, pilih: true, foto: "images/menu/kambing-guling.jpg" },
    { nama: "Rendang Wagyu", ikon: "🥩", deskripsi: "Dimasak perlahan 8 jam dengan santan dan bumbu Minang yang meresap.", harga: 45000, pilih: true, foto: "images/menu/rendang-wagyu.jpg" },
    { nama: "Zuppa Soup", ikon: "🍲", deskripsi: "Sup krim ayam hangat dengan tutup pastry keemasan yang renyah.", harga: 20000, pilih: true, foto: "images/menu/zuppa-soup.jpg" },
    { nama: "Salmon En Croûte", ikon: "🐟", deskripsi: "Salmon panggang berbalut bayam creamy dan kulit pastry.", harga: 40000, pilih: false, foto: "images/menu/salmon.jpg" },
    { nama: "Mini Dessert", ikon: "🍰", deskripsi: "Tartlet buah, eclair cokelat, macaron, dan panna cotta mangga.", harga: 18000, pilih: true, foto: "images/menu/dessert.jpg" },
    { nama: "Botanical Mocktail", ikon: "🍹", deskripsi: "Minuman segar tanpa alkohol, diracik langsung oleh barista.", harga: 12000, pilih: false, foto: "images/menu/mocktail.jpg" }
  ],

  // Testimoni. Ganti dengan ulasan klien asli. Foto avatar opsional
  testimoni: [
    { nama: "Dian & Arya", acara: "Resepsi pernikahan", foto: "", teks: "Kambing gulingnya empuk dan dipuji semua tamu. Pelayannya sigap menjaga meja tetap rapi." },
    { nama: "Hendra R.", acara: "Corporate event", foto: "", teks: "Gala dinner untuk 800 peserta berjalan sempurna. Tepat waktu dan penataan buffet sangat rapi." },
    { nama: "Sheila L.", acara: "Private dinner", foto: "", teks: "Makan malam privat di rumah terasa seperti restoran fine dining. Sangat berkesan." }
  ]
};
