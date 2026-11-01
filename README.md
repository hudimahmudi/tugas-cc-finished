# Creator Content Pipeline Tracker

Web app untuk mengelola ide, produksi, publikasi, dan performa konten lintas platform.

## Teknologi

- Frontend: React, Vite, Tailwind CSS
- Backend: Express.js, Knex, MySQL
- API: `/api/v1`

## Menjalankan secara lokal

### 1. Siapkan database

Buat database MySQL kosong, misalnya `my-app-backend`, lalu salin `backend/.env.example` menjadi `backend/.env` dan sesuaikan nilainya:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=my-app-backend
JWT_SECRET=<secret-acak-minimal-32-karakter>
```

Buat secret lokal dengan Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Pasang dependensi dan jalankan migrasi dari folder backend:

```bash
cd backend
npm install
npm run migrate
```

Opsional, isi data demo:

```bash
npm run seed
```

Seeder mempertahankan data yang sudah ada dan hanya menambahkan akun, channel, atau konten demo yang belum tersedia. Akun demo: `creator@example.com` dengan password `password123`.

### 2. Jalankan backend

Dari folder `backend`, di terminal tersendiri:

```bash
npm run dev
```

API dan health check tersedia di `http://localhost:3000` dan `http://localhost:3000/api/v1/health`.

### 3. Jalankan frontend

Dari folder proyek utama, di terminal lain:

```bash
npm install
npm run dev
```

Buka URL yang ditampilkan Vite. Permintaan `/api` diteruskan ke backend lokal di port `3000`.

## Perintah pemeriksaan

Dari folder proyek utama:

```bash
npm run lint
npm run build
```

## Alur utama

- Daftar akun Creator atau masuk dengan akun yang tersimpan di database.
- Tambahkan channel sosial sebelum membuat konten.
- Buat ide, lalu lanjutkan tahap secara berurutan: scripting, recording, editing, ready, published.
- Konten tidak dapat dipublikasikan tanpa URL HTTP/HTTPS yang valid.
- Catat snapshot metrik untuk konten yang sudah tayang. Konten tayang tidak dapat diubah atau dihapus.
- Admin dapat melihat konten dan channel seluruh pengguna; Creator hanya melihat data miliknya sendiri.
- Editor dapat melihat seluruh konten milik para Creator (termasuk ide dan publikasi), tetapi hanya mengelola tahap produksi. Editor tidak melihat konten milik Admin atau Editor lain.
