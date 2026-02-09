/**
 * Seed gallery data (used to initialize localStorage when empty).
 * IDs are assigned in the store when seeding.
 */
export const seedGallery = [
  {
    src: "/gallery/event1.png",
    category: "Events",
    title: "Annual Day 2025",
    desc: "A spectacular vibrant evening.",
    createdAt: new Date().toISOString(),
  },
  {
    src: "/gallery/event2.png",
    category: "Sports",
    title: "Annual Sports Meet",
    desc: "Champions in the making.",
    createdAt: new Date().toISOString(),
  },
  {
    src: "/gallery/event3.png",
    category: "Campus",
    title: "Serene Campus View",
    desc: "A perfect learning environment.",
    createdAt: new Date().toISOString(),
  },
];

export const DEFAULT_GALLERY_CATEGORIES = [
  "Events",
  "Sports",
  "Campus",
  "Academic",
  "Cultural",
  "Other",
];
