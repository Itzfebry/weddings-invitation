# Dokumentasi Proyek — Undangan Pernikahan Digital Febry & Sasha

## Ringkasan

Proyek ini adalah undangan pernikahan digital berbasis web untuk menyampaikan informasi acara dengan cara yang personal dan interaktif. Pengunjung membuka halaman undangan, mengisi nama (opsional), lalu melihat rangkaian cerita pasangan, album foto, hitung mundur, detail acara, dan salam penutup.

Antarmuka dirancang dengan nuansa editorial-romantis bertema bunga lily dan warna pink. Animasi digunakan untuk membangun suasana, sementara informasi penting tetap disajikan sebagai konten halaman yang dapat dibaca dan dijelajahi.

## Tujuan dan inti MVP

MVP (Minimum Viable Product) berfokus pada kebutuhan inti berikut:

1. **Menyambut tamu** melalui opening screen dan transisi menuju undangan.
2. **Mempersonalisasi sapaan** dengan nama yang dimasukkan tamu.
3. **Menyampaikan cerita pasangan** melalui tiga bab perjalanan.
4. **Menampilkan album foto** yang dapat dijelajahi.
5. **Menyediakan informasi acara**: tanggal, waktu, lokasi, dan alamat.
6. **Menghitung mundur** menuju tanggal acara.
7. **Memberikan penutup yang hangat** berupa ucapan terima kasih dan doa.
8. **Menyediakan musik latar** dengan kontrol putar/jeda.
9. **Mendukung perangkat mobile dan desktop** dengan tata letak responsif.

### Di luar cakupan MVP saat ini

- RSVP atau konfirmasi kehadiran yang tersimpan ke server.
- Database, akun pengguna, atau dashboard admin.
- Pengelolaan daftar tamu dari CMS.
- Pengiriman undangan melalui email/WhatsApp secara otomatis.
- Penyimpanan nama tamu setelah halaman ditutup.

Nama tamu hanya dipakai selama sesi halaman berjalan; aplikasi tidak mengirim atau menyimpan nama tersebut ke backend.

## Alur pengguna

1. Tamu melihat layar pembuka dengan nama pasangan dan tombol **Get in**.
2. Tamu memasukkan nama pada kartu personalisasi; pengisian boleh dilewati.
3. Setelah formulir dikirim, undangan dibuka dan musik dicoba untuk diputar.
4. Tamu menjelajahi halaman dengan menggulir: hero, cerita, album, hitung mundur, detail acara, dan kartu penutup.
5. Tombol ikon musik tetap tersedia untuk mematikan atau menyalakan musik.

> Pemutaran audio bergantung pada kebijakan browser. Aplikasi memulai audio melalui aksi kirim formulir yang dilakukan pengguna; jika browser menolak autoplay, kontrol musik tetap dapat digunakan.

## Fitur dan pengalaman

### Layar pembuka

- Komposisi nama pasangan dan foto dengan zoom sinematik.
- GSAP mengatur urutan kemunculan teks dan elemen visual.
- Tombol **Get in** membuka formulir nama tamu.

### Hero dan kartu undangan

- Sapaan menggunakan nama tamu bila tersedia.
- Pesan undangan utama dalam bahasa Inggris.
- Foto pasangan dan tombol untuk menuju detail acara.
- Ornamen bunga, orbit, dan kilau bergerak sebagai aksen visual.

### Cerita pasangan

Tiga bab yang menceritakan pertemuan saat magang, proses bertumbuh bersama, dan pertunangan keluarga pada 1 Januari 2030.

### Album perjalanan

- Album menggunakan aset `potret1.png` dan `potret2.png`.
- Tamu dapat berpindah foto dan memilih thumbnail.
- Keterangan/caption di atas foto tidak ditampilkan.

### Hitung mundur dan detail acara

- Hitung mundur diarahkan ke 30 Mei 2030 pukul 08.00 WIB.
- Informasi acara mencakup tanggal, waktu, Maldives, dan Four Seasons Resort Maldives.

### Salam dan penutup

Kartu penutup menyapa tamu, menyampaikan terima kasih dan doa, serta mencantumkan nama pasangan dan lokasi/tanggal.

### Musik

Musik latar menggunakan berkas lokal `lagu.mp3`, diputar berulang dengan volume yang dibatasi. Kontrol menggunakan ikon musik dengan label aksesibel untuk status putar/jeda.

## Teknologi dan library

| Teknologi/library | Kegunaan dalam proyek |
|---|---|
| React 19 | Membangun antarmuka berbasis komponen dan mengelola state tampilan. |
| TypeScript 5 | Menambahkan pemeriksaan tipe untuk komponen, props, dan data undangan. |
| Vite 7 | Menyediakan server pengembangan dan proses build untuk produksi. |
| Framer Motion 12 | Transisi antartampilan, animasi elemen saat masuk viewport, dan interaksi mikro. |
| GSAP 3 | Timeline opening, animasi hero, dan animasi berbasis scroll. |
| GSAP ScrollTrigger | Menjalankan reveal saat bagian halaman memasuki viewport. |
| Three.js | Membuat latar dekoratif interaktif dengan tekstur lily dan kelopak. |
| `react-image-gallery` | Menyediakan galeri foto, navigasi slide, dan thumbnail. |

### Aksesibilitas gerak

Animasi utama memperhatikan preferensi `prefers-reduced-motion`. Jika pengunjung meminta pengurangan gerak melalui sistem operasi/browser, animasi terkait dikurangi atau dinonaktifkan.

## Struktur kode

```text
src/
├── App.tsx                     # Mengatur layar pembuka, state nama, dan musik
├── components/
│   ├── OpeningScreen.tsx       # Opening dan formulir nama tamu
│   ├── InvitationCard.tsx      # Hero/kartu undangan personal
│   ├── GuestNameInput.tsx      # Form personalisasi nama tamu
│   ├── Story.tsx               # Cerita pasangan
│   ├── WeddingGallery.tsx      # Galeri potret
│   ├── Countdown.tsx           # Hitung mundur acara
│   ├── EventDetails.tsx        # Detail acara
│   ├── ClosingBlessing.tsx     # Salam, doa, dan footer
│   ├── HeroScene.tsx           # Latar Three.js
│   ├── LilyParallax.tsx        # Elemen lily pada opening
│   ├── MusicButton.tsx         # Kontrol musik
│   ├── FloralOverlay.tsx       # Ornamen section
│   ├── WeddingMotifs.tsx       # Motif cerita dan galeri
│   └── FloatingBackground.tsx  # Latar dekoratif global
├── data/
│   └── wedding.ts              # Data pasangan, acara, dan cerita
├── hooks/
│   ├── useCountdown.ts         # Logika hitung mundur
│   └── useMusic.ts             # Inisialisasi dan kontrol audio
├── pages/
│   └── Invitation.tsx          # Menyusun urutan bagian undangan
├── types/
│   └── invitation.ts           # Tipe data undangan dan tamu
└── index.css                   # Tema, layout, responsivitas, dan animasi CSS
```

## Data acara dan konfigurasi

Data pasangan, tanggal dan lokasi acara, target hitung mundur, serta copy cerita dipusatkan di `src/data/wedding.ts`. Komponen section membaca data tersebut agar tanggal, nama, dan lokasi yang ditampilkan tetap konsisten. Tipe domain berada di `src/types/invitation.ts`; komposisi halaman berada di `src/pages/Invitation.tsx`.

Untuk mengubah tanggal, waktu, alamat, nama, atau naskah:

1. Perbarui data dan teks pada komponen terkait.
2. Periksa format tanggal beserta zona waktunya.
3. Jalankan build produksi untuk memeriksa TypeScript dan bundling.
4. Tinjau ulang tampilan mobile dan desktop sebelum deployment.

## Menjalankan secara lokal

Persyaratan: Node.js dan npm yang kompatibel dengan versi Vite pada proyek.

```bash
npm install
npm run dev
```

Server pengembangan Vite akan menampilkan alamat lokal di terminal.

### Build dan preview produksi

```bash
npm run build
npm run preview
```

Perintah build menjalankan `tsc -b` lalu `vite build`. Hasil produksi berada di direktori `dist/`.

Repository ini belum mengonfigurasi runner unit test atau lint script khusus; `npm run build` menjadi pemeriksaan otomatis utama untuk TypeScript dan bundling produksi.

## Deployment

Proyek telah digunakan dengan Vercel. Untuk deployment Vite standar, konfigurasi build adalah:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install` (atau perintah instalasi yang digunakan pipeline proyek)

Jika repository terhubung ke Vercel, perubahan yang di-push ke branch deployment dapat memicu deployment otomatis sesuai pengaturan project Vercel. Periksa status deployment dan URL production di dashboard Vercel setelah push.

## Batasan dan pertimbangan operasional

- Informasi acara masih berupa data statis di source code; belum ada CMS/admin.
- Form nama hanya mengubah personalisasi tampilan, bukan RSVP.
- Audio dapat diblokir oleh pengaturan autoplay browser; ikon musik memberi kontrol manual.
- Foto dan musik dibundel sebagai aset lokal sehingga ukuran aset ikut memengaruhi unduhan awal.
- Build saat ini dapat menampilkan peringatan Vite mengenai ukuran chunk JavaScript di atas 500 kB. Build tetap berhasil; code splitting dapat menjadi optimasi lanjutan.

## Hak cipta dan aset

© 2026 Mochammad Ginata Febryansyah.

Aset visual dan audio berada di `src/components/images/`. Pastikan hak penggunaan dan izin distribusi seluruh foto, ilustrasi, serta musik telah dimiliki sebelum undangan dipublikasikan secara luas.
