# Gallery: Show uploads to everyone (Vercel Blob)

Gallery uploads are now stored **on the server** so every visitor sees the same images.

## One-time setup on Vercel

1. Open your project on [Vercel](https://vercel.com) → **Storage** tab.
2. Click **Create Database** / **Connect Store** → choose **Blob**.
3. Create a new Blob store (e.g. name: `gallery`).
4. Vercel will add the env var **`BLOB_READ_WRITE_TOKEN`** to your project automatically.

Redeploy (or push a commit) so the API routes use this token.

## Local development

To test uploads locally with Blob:

```bash
vercel env pull
```

This pulls env vars (including `BLOB_READ_WRITE_TOKEN`) into `.env.local`. Then run `npm run dev` and upload from the admin panel.

## Behavior

- **Admin upload** (Gallery → Upload Images): Images are sent to `/api/gallery/upload` and stored in Vercel Blob. The gallery index is updated so all users see the new images.
- **Public gallery** (`/gallery`): Fetches the list from `/api/gallery`. If Blob is configured, it shows the server list; otherwise it falls back to seed/local data.
- **Without Blob**: If you don’t add a Blob store, uploads still work only in your browser (saved in localStorage). Add Blob to make changes visible to everyone.
