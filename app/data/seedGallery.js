/**
 * Seed gallery data (used to initialize localStorage when empty).
 * IDs are assigned in the store when seeding.
 * Bump SEED_VERSION to force re-seed for all users when gallery content changes.
 */
export const GALLERY_SEED_VERSION = 9;

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

const galleryFiles = [
  "IMG-20260103-WA0012.jpg.webp",
  "IMG-20260103-WA0013.jpg.webp",
  "IMG-20260103-WA0014.jpg.webp",
  "IMG-20260103-WA0015.jpg.webp",
  "IMG-20260103-WA0016.jpg.webp",
  "IMG-20260103-WA0017.jpg.webp",
  "IMG-20260103-WA0018.jpg.webp",
  "IMG-20260103-WA0028.jpg.webp",
  "IMG-20260103-WA0037.jpg.webp",
];

export const seedGallery = galleryFiles.map((filename, i) => ({
  src: `/gallery/${filename}`,
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
