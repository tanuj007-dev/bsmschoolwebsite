/**
 * Seed blog data (used to initialize localStorage when empty).
 * Matches the shape expected by the admin panel and public blog pages.
 * IDs are assigned in the store when seeding.
 */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export const seedBlogs = [
  {
    slug: "best-school-gurgaon-overall-development",
    title: "Best School in Gurgaon for Overall Development | Why BSM",
    image: "/images/blog/blog-1.webp",
    date: { day: "22", month: "Jan", year: "2026" },
    category: "Academics",
    author: "Admin",
    readTime: "5 min read",
    excerpt:
      "Discover how our holistic approach shapes the leaders of tomorrow through balanced education covering academics, sports, and arts.",
    content: `<p>Education is not just about academic excellence; it is about holistic development that shapes a child's personality, confidence, and perspective. At B.S.M Public School, we believe in nurturing students beyond textbooks.</p><h3>Why Holistic Development Matters?</h3><p>Our curriculum is designed to balance these aspects effectively, ensuring that every child discovers their unique potential.</p>`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "top-preschool-gurgaon",
    title: "Top Preschool in Gurgaon | Why Choose BSM",
    image: "/images/blog/blog-2.webp",
    date: { day: "20", month: "Jan", year: "2026" },
    category: "Preschool",
    author: "Early Years Head",
    readTime: "4 min read",
    excerpt:
      "Starting early is key. Learn why our preschool program is rated the best in the region for nurturing young minds.",
    content: `<p>The early years of a child's life are the most critical for brain development. At B.S.M Public School, our preschool program is designed to provide a safe, nurturing, and stimulating environment.</p><h3>Play-Based Learning</h3><p>We believe that children learn best through play.</p>`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: "school-admissions-open-gurgaon-2026",
    title: "School Admissions Open in Gurgaon 2026-27 | Complete Guide",
    image: "/images/blog/blog-3.webp",
    date: { day: "16", month: "Jan", year: "2026" },
    category: "Admissions",
    author: "Admission Office",
    readTime: "6 min read",
    excerpt:
      "A comprehensive step-by-step guide to securing your child's future at B.S.M Public School for the upcoming session.",
    content: `<p>Admissions for the academic session 2026-27 are now open at B.S.M Public School.</p><h3>Admission Process Timeline</h3><ol><li>Registration</li><li>Interaction</li><li>Documentation</li><li>Confirmation</li></ol>`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/** Generate slug from title if not provided. */
export function createSlug(title) {
  return slugify(title || "untitled");
}
