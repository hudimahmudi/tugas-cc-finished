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

Seeder mempertahankan data yang sudah ada, menambahkan akun/channel/konten demo yang belum tersedia, dan melengkapi penugasan serta detail yang masih kosong pada konten demo. Akun demo: Creator `creator@example.com` dan Editor `editor@example.com`, keduanya dengan password `password123`. Pendaftaran publik mendukung role Creator dan Editor; role Admin hanya dapat diberikan oleh administrator.

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

- Daftar akun Creator atau Editor, atau masuk dengan akun yang tersimpan di database.
- Tambahkan channel sosial sebelum membuat konten.
- Creator mengelola ide, scripting, dan checklist produksi sebelum Recording; setelah itu Creator hanya dapat melihat progres dan checklist Editor selama Recording dan Editing & review.
- Editor hanya melihat konten yang ditugaskan kepadanya, mengerjakan editing & review, lalu mengirim konten ke Ready.
- Creator dapat menyimpan creator review notes di konten Ready tanpa mengubah status; Editor yang ditugaskan dapat membaca catatan tersebut.
- Creator dapat mengunggah file konten mentah sebelum Recording, dan Editor dapat mengunduhnya. Editor mengunggah file draft (video, gambar, PDF, Word, atau teks, maksimal 100 MB) beserta editor review notes sebelum mengirim konten ke Ready.
- File upload disimpan pada `backend/uploads` dan metadata filenya disimpan di database; jalankan migrasi (`npm run migrate` dari folder `backend`) setelah memperbarui aplikasi.
- Creator dapat mengembalikan konten Ready ke tahap sebelumnya untuk revisi; Editor dapat mengembalikan Editing ke Recording. Admin dapat mengatur tahap workflow. Konten Published terkunci dan tidak dapat diubah atau dikembalikan ke tahap sebelumnya.
- Creator memeriksa konten Ready dan menyetujui publikasi dengan memasukkan URL publik yang valid.
- Konten tidak dapat dipublikasikan tanpa URL HTTP/HTTPS yang valid.
- Catat snapshot metrik bertanggal untuk konten yang sudah tayang dan lihat riwayat snapshotnya. Konten tayang tidak dapat diubah atau dihapus.
- Admin dapat melihat konten dan channel seluruh pengguna; Creator hanya melihat data miliknya sendiri.
- Editor hanya dapat melihat konten Creator yang ditugaskan kepadanya. Editor dapat menandai checklist Creator selesai selama Recording dan Editing & review, tetapi tidak dapat mengubah brief atau nama tugas checklist, mengakses konten yang ditugaskan ke editor lain, atau menerbitkan konten.
