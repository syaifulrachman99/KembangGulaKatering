/* Logika halaman. Biasanya tidak perlu diedit; ubah konten di js/data.js */
const C = window.CONFIG;
const $ = id => document.getElementById(id);
const rp = n => 'Rp ' + n.toLocaleString('id-ID');
const wa = (t = '') => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(t)}`;

// Muat foto; jika gagal/kosong, biarkan fallback (emoji/gradasi)
function foto(el, src, alt, cls) {
  if (!src) return;
  const i = new Image();
  i.alt = alt || '';
  if (cls) i.className = cls;
  i.onload = () => { if (!cls) el.textContent = ''; el.prepend(i); };
  i.src = src;
}

// Hero
const hero = $('hero');
const hi = new Image();
hi.onload = () => {
  hero.classList.add('has-photo');
  hero.style.backgroundImage = `linear-gradient(rgba(8,7,7,.6),rgba(8,7,7,.92)),url(${C.heroFoto})`;
};
if (C.heroFoto) hi.src = C.heroFoto;

// Paket
$('paketGrid').innerHTML = C.paket.map(p => `
  <div class="card rv">${p.label ? `<span class="tag">${p.label}</span>` : ''}
    <div class="ppic"></div><div class="ic">${p.ikon}</div>
    <h3>${p.nama}</h3><p>${p.deskripsi}</p>
    <div class="price">Mulai ${rp(p.harga)} / pax</div></div>`).join('');
document.querySelectorAll('#paketGrid .ppic').forEach((e, i) => foto(e, C.paket[i].foto, C.paket[i].nama));

// Menu
$('menuGrid').innerHTML = C.menu.map(m => `
  <div class="card dish rv"><div class="pic">${m.ikon}</div>
    <div class="body"><h3>${m.nama}</h3><p>${m.deskripsi}</p></div></div>`).join('');
document.querySelectorAll('#menuGrid .pic').forEach((e, i) => foto(e, C.menu[i].foto, C.menu[i].nama));

// Testimoni
$('testiGrid').innerHTML = C.testimoni.map(t => `
  <div class="card rv"><div class="stars">★★★★★</div>
    <p class="quote">“${t.teks}”</p>
    <div class="who"><span class="av"></span>${t.nama}<small>${t.acara}</small></div></div>`).join('');
document.querySelectorAll('#testiGrid .av').forEach((e, i) => foto(e, C.testimoni[i].foto, C.testimoni[i].nama, 'avatar'));

// Kontak & tautan WhatsApp
$('kontakInfo').textContent = `${C.jam} · ${C.alamat}`;
document.querySelectorAll('[data-wa]').forEach(a => a.href = wa(a.dataset.wa));

// Isi pilihan
$('pkg').innerHTML = C.paket.map(p => `<option value="${p.harga}">${p.nama} (${rp(p.harga)})</option>`).join('');
$('rate').innerHTML = C.kehadiran.map(k => `<option value="${k.persen}">${k.nama} (±${Math.round(k.persen * 100)}%)</option>`).join('');

// Kalkulator biaya
function calc() {
  const n = +$('pax').value, t = +$('pkg').value * n;
  $('paxv').textContent = n.toLocaleString('id-ID');
  $('total').textContent = rp(t);
  const a = $('wa');
  a.href = wa(`Halo Royal Prestige, saya ingin penawaran untuk ${n} tamu (estimasi ${rp(t)})`);
  a.target = '_blank';
}
$('pkg').onchange = calc; $('pax').oninput = calc;

// Pilih menu & rincian biaya
var manualQty = false;
$('pickList').innerHTML = C.menu.map((m, i) => `
  <label class="pick"><input type="checkbox" data-i="${i}" ${m.pilih ? 'checked' : ''}>
    <span class="n">${m.ikon} ${m.nama}</span><span class="h">${rp(m.harga)} / porsi</span></label>`).join('');
function syncQty() { if (!manualQty) { $('qty').value = porsi; rincian(); } }
function rincian() {
  const q = Math.max(0, +$('qty').value || 0);
  const sel = [...document.querySelectorAll('#pickList input:checked')].map(e => C.menu[e.dataset.i]);
  const per = sel.reduce((s, m) => s + m.harga, 0), sub = per * q;
  const lay = Math.round(sub * C.layananPersen / 100), ppn = Math.round((sub + lay) * C.ppnPersen / 100), tot = sub + lay + ppn;
  const row = (a, b, cls = '') => `<div class="r ${cls}"><span>${a}</span><b>${b}</b></div>`;
  let h = sel.map(m => row(`${m.nama} (${rp(m.harga)} × ${q.toLocaleString('id-ID')})`, rp(m.harga * q))).join('');
  if (!sel.length) h = row('Belum ada menu dipilih', '-');
  h += row('Harga menu per porsi', rp(per), 'sep') + row('Subtotal menu', rp(sub));
  if (C.layananPersen) h += row(`Biaya layanan (${C.layananPersen}%)`, rp(lay));
  if (C.ppnPersen) h += row(`PPN (${C.ppnPersen}%)`, rp(ppn));
  $('tbl').innerHTML = h;
  $('rTotal').textContent = rp(tot);
  $('rPer').textContent = q ? `≈ ${rp(Math.round(tot / q))} per porsi, termasuk biaya layanan${C.ppnPersen ? ' dan PPN' : ''}` : '';
  const lines = sel.map(m => `- ${m.nama}: ${rp(m.harga)}/porsi`).join('\n');
  $('waRinci').href = wa(`Halo Royal Prestige, saya ingin penawaran katering:\nJumlah porsi: ${q}\nMenu:\n${lines || '-'}\nEstimasi total: ${rp(tot)}`);
}
$('qty').addEventListener('input', () => { manualQty = true; rincian(); });
$('pickList').addEventListener('change', rincian);

// Kalkulator tamu
let porsi = 0;
function tamu() {
  const n = Math.max(0, +$('inv').value || 0), orang = n * (+$('per').value);
  const h = Math.round(orang * (+$('rate').value));
  porsi = Math.ceil(h * (1 + C.cadangan));
  syncQty();
  const lo = Math.round(h * .92), hi = Math.min(orang, Math.round(h * 1.08));
  $('rInv').textContent = orang.toLocaleString('id-ID');
  $('rHadir').textContent = h.toLocaleString('id-ID');
  $('rPorsi').textContent = porsi.toLocaleString('id-ID');
  $('rPorsiLabel').textContent = `Porsi katering disarankan (hadir + ${Math.round(C.cadangan * 100)}% cadangan)`;
  $('rRange').textContent = `Perkiraan rentang kehadiran: ${lo.toLocaleString('id-ID')} – ${hi.toLocaleString('id-ID')} orang`;
}
['inv', 'per', 'rate'].forEach(i => $(i).addEventListener('input', tamu));
$('useBtn').onclick = () => {
  $('pax').value = Math.min(2000, Math.max(50, Math.round(porsi / 50) * 50));
  calc();
  manualQty = false; syncQty();
  $('rincian').scrollIntoView({ behavior: 'smooth' });
};
tamu(); calc();

// Animasi muncul saat scroll
const els = document.querySelectorAll('.rv');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
  els.forEach((e, i) => { e.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(e); });
} else els.forEach(e => e.classList.add('in'));
