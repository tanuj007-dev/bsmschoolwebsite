/**
 * Seed gallery data (used when Blob is not configured or index is empty).
 * Uses full HTTPS URLs so images work on Vercel and any deployment (no reliance on public/gallery).
 * Bump SEED_VERSION to force re-seed for all users when gallery content changes.
 */
export const GALLERY_SEED_VERSION = 10;

const categories = ["Events", "Sports", "Campus", "Academic", "Cultural", "Other"];
const titles = [
  "Annual Day Celebration", "Sports Meet Highlights", "Campus Life", "Academic Excellence",
  "Cultural Fest", "School Moments", "Student Achievements", "Festival Celebrations",
  "Classroom Moments", "Playground Fun", "Special Occasions",
  "Learning in Action", "Art & Creativity", "Memorable Day",
  "School Pride", "Together We Shine", "BSM Memories",
];
const descs = [
  "A spectacular vibrant evening.", "Champions in the making.", "A perfect learning environment.",
  "Where curiosity meets excellence.", "Celebrating diversity and talent.", "Capturing precious moments.",
  "Dedication and hard work.", "Joy and togetherness.", "Inspiring young minds.", "Building lasting memories.",
];

// Stable placeholder images that work on Vercel (no dependency on public/gallery).
const SEED_IMAGE_IDS = [1015, 1018, 1022, 1024, 1025, 1039, 1043, 1044, 1049];
const SEED_IMAGE_BASE = "https://picsum.photos/id";

export const seedGallery = SEED_IMAGE_IDS.map((id, i) => ({
  src: `${SEED_IMAGE_BASE}/${id}/800/600`,
  category: categories[i % categories.length],
  title: titles[i % titles.length],
  desc: descs[i % descs.length],
  createdAt: new Date().toISOString(),
}));

export const DEFAULT_GALLERY_CATEGORIES = [
  "Events",
  "Sports",
  "Campus",
  "Academic",
  "Cultural",
  "Other",
];
