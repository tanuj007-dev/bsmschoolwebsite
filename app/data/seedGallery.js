/**
 * Gallery is now Blob-only. No static/seed images.
 * DEFAULT_GALLERY_CATEGORIES is used by admin UI (filters, dropdowns).
 */
export const DEFAULT_GALLERY_CATEGORIES = [
  "Events",
  "Sports",
  "Campus",
  "Academic",
  "Cultural",
  "Other",
];

/** Empty — gallery content comes only from Vercel Blob (admin uploads). */
export const seedGallery = [];
