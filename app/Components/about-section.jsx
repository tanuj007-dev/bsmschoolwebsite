export default function AboutUsSection() {
  return (
    <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/aboutusbanner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center text-white px-4">
        <span className="block text-[#D4AF37] font-bold tracking-[0.2em] text-sm md:text-base mb-4 uppercase animate-fade-in-up">
          Discover Our Legacy
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up delay-100">
          About Us
        </h1>
        <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6 rounded-full animate-fade-in-up delay-200"></div>
        <p className="font-sans text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-300">
          Nurturing minds, building character, and shaping the leaders of tomorrow.
        </p>
      </div>
    </section>
  );
}