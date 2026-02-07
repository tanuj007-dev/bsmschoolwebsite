"use client";

import Image from "next/image";

const HeaderHero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[520px] xl:h-[580px]">
        <Image
          src="/bannernewrachna.png"
          alt="Hero Banner"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default HeaderHero;
