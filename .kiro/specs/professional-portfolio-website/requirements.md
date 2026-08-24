# Requirements Document

## Introduction

Website Portofolio Profesional adalah sebuah website yang dirancang untuk menampilkan karya, keterampilan, dan informasi profesional pengguna. Website ini dibangun dengan standar clean code engineering, mencakup arsitektur modular, design system yang konsisten, semantic HTML5, dan optimasi performa serta aksesibilitas.

**Catatan Khusus Proyek:**
- Biodata menggunakan data placeholder profesional yang dapat diganti sewaktu-waktu
- Galeri proyek dibagi menjadi dua kategori: Featured Projects (proyek kuliah yang diperbaiki) dan Upcoming Projects (slot coming-soon untuk proyek masa depan)

## Glossary

- **Portfolio_Website**: Sistem website yang menampilkan informasi profesional, proyek, dan kontak
- **Navigation_Bar**: Komponen UI untuk navigasi antar section dalam website
- **Project_Card**: Komponen UI yang menampilkan informasi satu proyek
- **Featured_Project_Card**: Komponen UI untuk menampilkan proyek kuliah yang sudah ada
- **Upcoming_Project_Card**: Komponen UI untuk menampilkan slot proyek coming-soon
- **Footer_Component**: Komponen UI di bagian bawah halaman yang berisi informasi kontak dan link
- **Design_System**: Konfigurasi terpusat untuk warna, tipografi, dan spacing menggunakan CSS Variables atau Tailwind config
- **Lazy_Loading**: Teknik optimasi yang menunda pemuatan gambar hingga diperlukan
- **Viewport**: Area tampilan browser pada perangkat tertentu
- **WCAG**: Web Content Accessibility Guidelines - standar aksesibilitas web internasional
- **Project_Parser**: Komponen yang mem-parse file konfigurasi proyek menjadi objek Project
- **Project_Formatter**: Komponen yang memformat objek Project menjadi file konfigurasi
- **Placeholder_Data**: Data tiruan profesional yang digunakan untuk biodata sementara

## Requirements

### Requirement 1: Arsitektur Modular

**User Story:** Sebagai developer, saya ingin memisahkan komponen UI ke dalam file terpisah, agar kode mudah dirawat dan dikembangkan.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL memisahkan Navigation_Bar ke dalam file terpisah dengan ekstensi yang sesuai dengan teknologi yang digunakan
2. THE Portfolio_Website SHALL memisahkan Featured_Project_Card ke dalam file terpisah dengan ekstensi yang sesuai dengan teknologi yang digunakan
3. THE Portfolio_Website SHALL memisahkan Upcoming_Project_Card ke dalam file terpisah dengan ekstensi yang sesuai dengan teknologi yang digunakan
4. THE Portfolio_Website SHALL memisahkan Footer_Component ke dalam file terpisah dengan ekstensi yang sesuai dengan teknologi yang digunakan
5. THE Portfolio_Website SHALL menyimpan Navigation_Bar, Featured_Project_Card, Upcoming_Project_Card, dan Footer_Component dalam direktori khusus komponen yang terpisah dari file halaman utama
6. THE Portfolio_Website SHALL mengekspor setiap komponen sehingga dapat diimpor oleh file lain
7. WHEN Navigation_Bar, Featured_Project_Card, Upcoming_Project_Card, atau Footer_Component diimpor ke halaman utama, THE Portfolio_Website SHALL merender komponen tersebut tanpa error
8. WHEN kode dalam satu komponen diubah, THE Portfolio_Website SHALL tetap dapat merender komponen lain tanpa perlu modifikasi pada komponen lain tersebut

### Requirement 2: Design System Global

**User Story:** Sebagai developer, saya ingin menggunakan design system terpusat untuk warna, font, dan spacing, agar konsistensi visual terjaga di seluruh website.

#### Acceptance Criteria

1. THE Design_System SHALL mendefinisikan minimal 6 kategori warna (primary, secondary, neutral, success, warning, error, background) dalam CSS Variables atau Tailwind configuration
2. THE Design_System SHALL mendefinisikan minimal 5 ukuran font yang berbeda dalam CSS Variables atau Tailwind configuration
3. THE Design_System SHALL mendefinisikan minimal 8 nilai spacing yang berbeda dalam CSS Variables atau Tailwind configuration
4. THE Design_System SHALL mencakup dokumentasi yang berisi nama token, nilai token, dan contoh penggunaan untuk setiap design token
5. WHEN nilai design token diubah dalam konfigurasi, THE Portfolio_Website SHALL menerapkan perubahan di semua komponen yang menggunakan token tersebut tanpa memerlukan perubahan kode komponen

### Requirement 3: Semantic HTML5

**User Story:** Sebagai developer, saya ingin menggunakan semantic HTML5, agar struktur dokumen jelas dan meningkatkan SEO serta aksesibilitas.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL menggunakan tag `<header>` untuk bagian header halaman
2. THE Portfolio_Website SHALL menggunakan satu tag `<main>` untuk konten utama halaman
3. THE Portfolio_Website SHALL menggunakan tag `<section>` untuk setiap bagian konten yang memiliki heading dan tema tersendiri
4. THE Portfolio_Website SHALL menggunakan tag `<footer>` untuk bagian footer halaman
5. THE Portfolio_Website SHALL menggunakan tag `<nav>` untuk Navigation_Bar
6. THE Portfolio_Website SHALL menggunakan tag `<article>` untuk setiap Featured_Project_Card dan Upcoming_Project_Card
7. THE Portfolio_Website SHALL menggunakan tag `<div>` hanya untuk styling atau layout wrapper yang tidak memiliki makna semantik
8. IF semantic tag yang sesuai tersedia untuk suatu konten, THEN THE Portfolio_Website SHALL menggunakan semantic tag tersebut daripada tag `<div>`

### Requirement 4: Optimasi Gambar dengan Lazy Loading

**User Story:** Sebagai pengguna, saya ingin halaman website memuat dengan cepat, agar pengalaman browsing lebih baik terutama pada koneksi lambat.

#### Acceptance Criteria

1. WHEN gambar berada di luar viewport dengan jarak lebih dari 200px dari tepi viewport, THE Portfolio_Website SHALL menunda pemuatan gambar tersebut
2. WHEN pengguna scroll hingga gambar berada dalam jarak 200px dari tepi viewport, THE Portfolio_Website SHALL memulai pemuatan gambar tersebut
3. THE Portfolio_Website SHALL menerapkan lazy loading pada semua gambar dalam Featured_Project_Card
4. THE Portfolio_Website SHALL menerapkan lazy loading pada semua gambar dekoratif yang tidak berada dalam viewport awal
5. WHEN gambar sedang dimuat, THE Portfolio_Website SHALL menampilkan placeholder dengan dimensi yang sama dengan gambar target
6. THE Portfolio_Website SHALL memuat gambar yang berada dalam viewport awal saat halaman pertama kali dimuat tanpa lazy loading
7. IF pemuatan gambar gagal setelah 10 detik, THEN THE Portfolio_Website SHALL menampilkan placeholder dengan indikasi error
8. WHEN lazy loading diaktifkan pada gambar, THE Portfolio_Website SHALL mempertahankan layout halaman tanpa pergeseran konten

### Requirement 5: Desain Responsif

**User Story:** Sebagai pengguna mobile dan tablet, saya ingin website tampil dengan baik di perangkat saya, agar saya dapat melihat portofolio dengan nyaman.

#### Acceptance Criteria

1. WHEN Viewport berukuran 320px hingga 767px (mobile), THE Portfolio_Website SHALL menampilkan semua konten dalam satu kolom dengan lebar 100% dari viewport
2. WHEN Viewport berukuran 768px hingga 1023px (tablet), THE Portfolio_Website SHALL menampilkan layout dengan maksimal 2 kolom untuk konten proyek
3. WHEN Viewport berukuran 1024px ke atas (desktop), THE Portfolio_Website SHALL menampilkan layout dengan 3 kolom atau lebih untuk konten proyek
4. WHEN Viewport berukuran 767px atau kurang, THE Navigation_Bar SHALL menampilkan menu hamburger yang dapat dibuka dan ditutup
5. WHEN Viewport berukuran 320px atau kurang, THE Portfolio_Website SHALL tidak menampilkan horizontal scroll
6. THE Portfolio_Website SHALL menggunakan unit responsif (rem, em, atau persen) untuk semua ukuran font, padding, dan margin
7. WHEN orientasi perangkat berubah dari portrait ke landscape atau sebaliknya, THE Portfolio_Website SHALL menyesuaikan layout dalam waktu kurang dari 300ms
8. THE Portfolio_Website SHALL memastikan semua elemen interaktif memiliki ukuran minimal 44x44 piksel pada viewport mobile

### Requirement 6: Aksesibilitas Dasar

**User Story:** Sebagai pengguna dengan kebutuhan aksesibilitas, saya ingin website dapat digunakan dengan baik, agar saya dapat mengakses informasi portofolio dengan mudah.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL memiliki rasio kontras warna minimal 4.5:1 untuk teks berukuran kurang dari 18pt atau kurang dari 14pt bold sesuai WCAG AA
2. THE Portfolio_Website SHALL memiliki rasio kontras warna minimal 3:1 untuk teks berukuran 18pt atau lebih, atau 14pt bold atau lebih, sesuai WCAG AA
3. THE Portfolio_Website SHALL menyediakan atribut `alt` yang mendeskripsikan konten atau fungsi gambar untuk semua gambar konten (non-dekoratif)
4. THE Portfolio_Website SHALL menyediakan atribut `alt=""` (kosong) untuk semua gambar dekoratif
5. THE Portfolio_Website SHALL memastikan semua elemen interaktif (link, button, form input) dapat dicapai menggunakan tombol Tab
6. THE Portfolio_Website SHALL memastikan semua elemen interaktif dapat dioperasikan menggunakan keyboard (Enter untuk aktivasi, Arrow keys untuk navigasi menu)
7. WHEN elemen interaktif menerima fokus keyboard, THE Portfolio_Website SHALL menampilkan indikator fokus dengan rasio kontras minimal 3:1 terhadap background
8. THE Portfolio_Website SHALL tidak mengunci fokus keyboard dalam satu region tanpa menyediakan cara keluar menggunakan keyboard
9. THE Portfolio_Website SHALL menggunakan heading hierarchy yang benar dengan satu h1 di halaman dan tidak melompati level heading (h1 → h2 → h3, bukan h1 → h3)
10. THE Portfolio_Website SHALL menyediakan skip link yang dapat difokus dengan keyboard untuk melompati Navigation_Bar ke konten utama
11. WHEN pengguna menggunakan screen reader, THE Portfolio_Website SHALL menyediakan label ARIA (aria-label atau aria-labelledby) yang mendeskripsikan fungsi elemen untuk semua elemen interaktif yang tidak memiliki label teks visible

### Requirement 7: Struktur Konten Portofolio dengan Placeholder Data

**User Story:** Sebagai pengunjung website, saya ingin melihat informasi yang terorganisir dengan baik, agar saya dapat memahami latar belakang dan karya pemilik portofolio.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL menampilkan section hero dengan nama placeholder dan tagline profesional di urutan pertama
2. THE Portfolio_Website SHALL menampilkan section tentang diri (about) dengan deskripsi placeholder profesional maksimal 500 karakter di urutan kedua
3. THE Portfolio_Website SHALL menampilkan section daftar proyek yang dibagi menjadi dua kategori di urutan ketiga
4. THE Portfolio_Website SHALL menampilkan sub-section "Featured Projects" untuk proyek kuliah yang sudah ada
5. THE Portfolio_Website SHALL menampilkan sub-section "Upcoming Projects" untuk slot proyek coming-soon
6. THE Portfolio_Website SHALL menampilkan section keterampilan (skills) dengan daftar teknologi di urutan keempat
7. THE Portfolio_Website SHALL menampilkan section kontak dengan data placeholder (email, nomor telepon, atau link media sosial) di urutan kelima
8. WHEN Featured_Project_Card diklik, THE Portfolio_Website SHALL menampilkan detail proyek dalam modal atau halaman terpisah
9. WHEN Upcoming_Project_Card diklik, THE Portfolio_Website SHALL menampilkan pesan "Coming Soon" tanpa membuka modal detail
10. WHEN detail proyek ditampilkan, THE Portfolio_Website SHALL menampilkan judul proyek
11. WHEN detail proyek ditampilkan, THE Portfolio_Website SHALL menampilkan deskripsi proyek
12. WHEN detail proyek ditampilkan, THE Portfolio_Website SHALL menampilkan daftar teknologi yang digunakan dalam proyek
13. WHEN detail proyek ditampilkan, THE Portfolio_Website SHALL menampilkan minimal satu gambar proyek
14. WHEN tidak ada featured project yang tersedia, THE Portfolio_Website SHALL menampilkan pesan "Belum ada featured project" pada sub-section Featured Projects
15. THE Portfolio_Website SHALL menampilkan minimal 3 slot Upcoming_Project_Card dengan visual "Coming Soon"

### Requirement 8: Performa Loading

**User Story:** Sebagai pengguna, saya ingin website memuat dengan cepat, agar saya tidak perlu menunggu lama untuk melihat konten.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL memuat First Contentful Paint (FCP) dalam waktu kurang dari 2 detik pada koneksi 3G (dengan bandwidth 400kbps, latency 400ms, dan packet loss 0%)
2. THE Portfolio_Website SHALL memuat Largest Contentful Paint (LCP) dalam waktu kurang dari 2.5 detik pada koneksi 3G (dengan bandwidth 400kbps, latency 400ms, dan packet loss 0%)
3. THE Portfolio_Website SHALL memiliki Total Blocking Time (TBT) kurang dari 300ms pada koneksi 3G (dengan bandwidth 400kbps, latency 400ms, dan packet loss 0%)
4. THE Portfolio_Website SHALL memiliki Cumulative Layout Shift (CLS) kurang dari 0.1 pada koneksi 3G (dengan bandwidth 400kbps, latency 400ms, dan packet loss 0%)
5. THE Portfolio_Website SHALL memiliki ukuran total file CSS kurang dari 50KB setelah minification dan gzip
6. THE Portfolio_Website SHALL memiliki ukuran total file JavaScript kurang dari 100KB setelah minification dan gzip
7. WHEN gambar dimuat pada viewport mobile (320-767px), THE Portfolio_Website SHALL memuat versi gambar dengan lebar maksimal 800px
8. WHEN gambar dimuat pada viewport tablet (768-1023px), THE Portfolio_Website SHALL memuat versi gambar dengan lebar maksimal 1200px
9. WHEN gambar dimuat pada viewport desktop (1024px+), THE Portfolio_Website SHALL memuat versi gambar dengan lebar maksimal 1920px
10. IF halaman gagal memuat dalam 30 detik, THEN THE Portfolio_Website SHALL menampilkan pesan error timeout kepada pengguna

### Requirement 9: Parser dan Serializer Konten Proyek

**User Story:** Sebagai developer, saya ingin memuat data proyek dari file konfigurasi, agar konten dapat dikelola secara terpisah dari kode.

#### Acceptance Criteria

1. WHEN file konfigurasi proyek valid dengan semua field required (id, title, description, technologies, imageUrl, isFeatured) disediakan, THE Project_Parser SHALL mem-parse file tersebut menjadi objek Project
2. THE Project object SHALL memiliki field `isFeatured` boolean untuk membedakan Featured Projects dan Upcoming Projects
3. WHEN file konfigurasi tidak ditemukan di lokasi yang ditentukan, THE Project_Parser SHALL mengembalikan error "File tidak ditemukan: [path]"
4. WHEN file konfigurasi memiliki field required yang hilang, THE Project_Parser SHALL mengembalikan error yang menyebutkan nama field yang hilang dan lokasi error dalam file
5. WHEN file konfigurasi memiliki ukuran lebih dari 1 MB, THE Project_Parser SHALL mengembalikan error "Ukuran file melebihi batas maksimal 1 MB"
6. IF parsing tidak selesai dalam 5 detik, THEN THE Project_Parser SHALL menghentikan proses dan mengembalikan error timeout
7. THE Project_Formatter SHALL memformat objek Project kembali menjadi file konfigurasi yang valid dengan semua field required
8. FOR ALL objek Project yang memiliki semua field required dengan nilai yang sama, mem-parse kemudian mem-format kemudian mem-parse kembali SHALL menghasilkan objek dengan nilai field required yang identik (round-trip property)
9. THE Portfolio_Website SHALL memuat data proyek dari file yang ditentukan oleh environment variable PROJECT_CONFIG_PATH, atau dari "./data/projects.json" jika environment variable tidak diset, saat inisialisasi

### Requirement 10: Validasi Kualitas Kode

**User Story:** Sebagai developer, saya ingin memastikan kode tetap bersih dan konsisten, agar maintainability terjaga dalam jangka panjang.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL menggunakan linter (ESLint atau equivalent) yang menghasilkan report dalam format yang dapat di-parse (JSON atau XML) untuk memeriksa kualitas kode JavaScript/TypeScript
2. THE Portfolio_Website SHALL menggunakan linter (Stylelint atau equivalent) yang menghasilkan report dalam format yang dapat di-parse (JSON atau XML) untuk memeriksa kualitas kode CSS/SCSS
3. WHEN linter dijalankan dan menemukan error, THE Portfolio_Website build process SHALL menampilkan daftar error dengan nama file, nomor baris, dan deskripsi error
4. IF linter menemukan error dengan severity "error", THEN THE Portfolio_Website build process SHALL exit dengan exit code non-zero (misalnya 1)
5. THE Portfolio_Website SHALL mengikuti convention penamaan kebab-case untuk nama file dan camelCase untuk nama fungsi dan variabel
6. THE Portfolio_Website SHALL memiliki JSDoc atau TypeDoc comment dengan minimal deskripsi, parameter, dan return value untuk semua fungsi dan komponen yang exported
7. WHEN test coverage dijalankan untuk fungsi utility dan helper, THE Portfolio_Website SHALL memiliki minimal 70% line coverage
8. IF test coverage kurang dari 70% untuk fungsi utility dan helper, THEN THE Portfolio_Website test script SHALL exit dengan exit code non-zero dan menampilkan report coverage
9. THE Portfolio_Website build process SHALL menjalankan linter sebelum build selesai
10. IF build process dijalankan dengan environment variable CI=true, THEN linter SHALL dijalankan dengan mode strict yang memperlakukan warning sebagai error

### Requirement 11: Placeholder Data Management

**User Story:** Sebagai developer, saya ingin menggunakan data placeholder yang profesional, agar website dapat ditampilkan dengan konten realistis sambil menunggu data final.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL menyimpan placeholder data dalam file konfigurasi terpisah (./data/placeholder.json)
2. THE Placeholder_Data SHALL mencakup nama profesional placeholder
3. THE Placeholder_Data SHALL mencakup tagline profesional placeholder
4. THE Placeholder_Data SHALL mencakup deskripsi about profesional dengan 300-500 karakter
5. THE Placeholder_Data SHALL mencakup daftar skills placeholder (minimal 5 teknologi)
6. THE Placeholder_Data SHALL mencakup informasi kontak placeholder (email, phone, social media links)
7. THE Portfolio_Website SHALL memuat Placeholder_Data dari file konfigurasi saat tidak ada data aktual
8. WHEN Placeholder_Data digunakan, THE Portfolio_Website SHALL menampilkan indicator visual bahwa data adalah placeholder (opsional)
