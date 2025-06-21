
# EcoMart Inventory – Next.js + Supabase

## Quick Setup

### Prerequisites

- **Node.js** 18+
- **npm** atau **yarn**
- **Supabase Project** (https://app.supabase.com/)

---

### 1. Clone & Install

```bash
git clone https://github.com/Spoopage/UAS-Client-Side-Programming.git
cd UAS-Client-Side-Programming
npm install
````

---

### 2. Supabase Setup

1. **Buat project di Supabase**

2. Ambil:

   * **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   * **Anon Key**   → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Buat file `.env.local` di root:**

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Buat table:**

   * `users` (id, email, username, password, role)
   * `products` (id, nama\_produk, harga\_satuan, quantity)

5. **Aktifkan Auth** (Email sign-in)

6. **Atur RLS policy** di table users dan products

---

### 3. Jalankan Aplikasi

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

### 4. Login

* **Admin**: email & password sesuai data pada Supabase
* **User**: email & password sesuai data pada Supabase

---

### 5. Deploy ke Vercel

1. Push ke GitHub
2. Import ke Vercel, atur environment variable
3. Deploy

---

## Key Dependencies

* Next.js
* React
* Supabase JS
* Tailwind CSS

---

## Troubleshooting

* **CSS error:**

  ```bash
  rm -rf .next && npm run dev
  ```

* **Supabase error:**
  Pastikan env & policy sudah benar

---
