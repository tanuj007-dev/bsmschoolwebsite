# B.S.M. Admin Panel – Setup & Usage

Frontend-only admin panel for managing **blogs** and **gallery images**. No backend; all data is stored in the browser (localStorage).

---

## Quick Start

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Run the app**:
   ```bash
   npm run dev
   ```

3. **Open the admin panel**:
   - URL: [http://localhost:3000/admin](http://localhost:3000/admin)
   - You will be redirected to **Login** if not authenticated.

4. **Log in** with demo credentials:
   - **Username:** `admin`
   - **Password:** `admin123`

---

## Demo Credentials

Default credentials are:

- **Username:** `admin`
- **Password:** `admin123`

To override (e.g. for production demo), create a `.env.local` file:

```env
NEXT_PUBLIC_ADMIN_USER=your_username
NEXT_PUBLIC_ADMIN_PASS=your_password
```

Restart the dev server after changing env.

---

## Features

| Feature | Description |
|--------|-------------|
| **Login** | `/admin/login` – Username/password; session stored in localStorage + cookie for proxy. |
| **Dashboard** | `/admin/dashboard` – Overview and quick links to blogs & gallery. |
| **Manage Blogs** | `/admin/blogs` – List, add, edit, delete. Rich text (TipTap), cover image, slug, excerpt, publish date. |
| **Add Blog** | `/admin/blogs/add` – New post with live preview. |
| **Edit Blog** | `/admin/blogs/edit/[id]` – Edit existing post. |
| **Manage Gallery** | `/admin/gallery` – List images by category, edit title/desc/category, delete. |
| **Upload Images** | `/admin/gallery/upload` – Upload images (stored as Base64 in localStorage). |
| **Settings** | `/admin/settings` – Light / Dark / System theme. |

---

## Route Protection

- **Proxy** protects all `/admin/*` routes except `/admin/login`.
- If the session cookie is missing, users are redirected to `/admin/login`.
- Session duration: **24 hours** (configurable in `app/utils/constants.js`).

---

## Data Storage

- **Blogs:** `localStorage` key `bsm_admin_blogs`
- **Gallery:** `localStorage` key `bsm_admin_gallery`
- **Auth:** `localStorage` key `bsm_admin_auth` + cookie `bsm_admin_session`
- **Theme:** `localStorage` key `bsm_admin_theme`

On first load, if blogs or gallery are empty, **seed data** is written from `app/data/seedBlogs.js` and `app/data/seedGallery.js`.

---

## Public Site Integration

- **Blogs:** The main site’s blog list and blog detail pages read from the same store (localStorage). Content you add or edit in the admin appears on the public `/blogs` and `/blogs/[id]` pages.
- **Gallery:** The public `/gallery` page uses the same gallery store. Uploaded or edited images show there.

Data is **per browser**. Clearing localStorage or using another device/browser will show seed or empty data until you log in and manage content again.

---

## Project Structure (Admin)

```
app/
  admin/
    login/page.jsx          # Login page
    dashboard/page.jsx      # Dashboard home
    blogs/
      page.jsx              # List blogs
      add/page.jsx          # Add blog (with rich text + preview)
      edit/[id]/page.jsx   # Edit blog
    gallery/
      page.jsx              # List & edit/delete images
      upload/page.jsx       # Upload (Base64)
    settings/page.jsx      # Theme (light/dark/system)
    layout.jsx              # Admin shell (sidebar for non-login)
    components/
      AdminSidebar.jsx
      RichTextEditor.jsx    # TipTap client-only
  store/
    authStore.js
    blogStore.js
    galleryStore.js
    themeStore.js
  hooks/
    useAuth.js
    useBlogs.js
    useGallery.js
  utils/
    constants.js
    storage.js
  data/
    seedBlogs.js
    seedGallery.js
proxy.js               # Protects /admin/*
```

---

## Deployment (Vercel)

- No backend or env vars required for basic use.
- Optional: set `NEXT_PUBLIC_ADMIN_USER` and `NEXT_PUBLIC_ADMIN_PASS` in Vercel for custom demo credentials.
- **Static export:** If you use `output: 'export'`, ensure middleware and client-side auth still run; the app is designed to work with default Next.js deployment (no static export required).

---

## Tech Stack

- **Next.js** (App Router)
- **Tailwind CSS**
- **Zustand** (state)
- **TipTap** (rich text editor)
- **Framer Motion** (animations)
- **localStorage** (persistence)

---

## Tips for Beginners

- **Sidebar:** Use “Manage Blogs” to see all posts, “Add Blog” to create one. Use “Manage Gallery” and “Upload Images” for the gallery.
- **Cover image:** In add/edit blog, use a full URL path (e.g. `/images/blog/blog-1.png`) or an external URL. For gallery, uploads are stored as Base64.
- **Slug:** Auto-generated from the title; you can edit it. Used for SEO-friendly URLs if you later add slug-based routes.
- **Theme:** Change in Settings; preference is saved in localStorage and applied site-wide.
