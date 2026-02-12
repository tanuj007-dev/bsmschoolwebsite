"use client";

import { useParams } from "next/navigation";

export default function ProgramDetailsPage() {
  const { slug } = useParams();

  const programsData = [
    {
      slug: "modern-school-campus",
      title: "Modern School Campus",
      videos: [
        "/schoolcampus.mp4",
      
      
      ],
      description:
        "A spacious and well-planned campus designed to provide a vibrant academic atmosphere with modern infrastructure and green surroundings.",
    },
    {
      slug: "secure-safe-campus",
      title: "Secure & Safe Campus",
      videos: [
        "/boyswashroom.MP4",
        "/girlswashroom.MP4",
        
       
      ],
      description:
        "24/7 CCTV surveillance, disciplined environment and dedicated staff ensuring complete safety and peace of mind for students and parents.",
    },
    {
      slug: "sports-physical-education",
      title: "Sports & Physical Education",
      videos: [
        "/playground.mp4",
        "/playzonekids.mp4",

      
      ],
      description:
        "Comprehensive indoor and outdoor sports facilities encouraging teamwork, discipline and overall physical development.",
    },
    {
      slug: "smart-classrooms",
      title: "Smart Classrooms",
      videos: [
        "",
        
      ],
      description:
        "Digitally equipped classrooms with smart boards and interactive learning tools to enhance engagement and academic excellence.",
    },
    {
      slug: "well-stocked-library",
      title: "Well-Stocked Library",
      videos: [
        "/library.mp4",
     
      ],
      description:
        "A rich collection of academic books, reference materials and digital resources fostering reading habits and independent learning.",
    },
    {
      slug: "advanced-physics-laboratory",
      title: "Advanced Physics Laboratory",
      videos: [
        "/physicsroom.mp4",
      ],
      description:
        "Fully equipped physics lab with modern apparatus to help students explore scientific principles through practical experiments.",
    },
    {
      slug: "modern-chemistry-laboratory",
      title: "Modern Chemistry Laboratory",
      videos: [
        "/chemistrylab.mp4",
      ],
      description:
        "Safe and well-maintained chemistry lab enabling hands-on experiments and deeper understanding of chemical concepts.",
    },
    {
      slug: "biology-life-science-lab",
      title: "Biology & Life Science Lab",
      videos: [
        "/bio_lab.mp4",
      ],
      description:
        "Interactive biology lab with models and specimens helping students understand life sciences in a practical way.",
    },
    {
      slug: "medical-first-aid-room",
      title: "Medical & First Aid Room",
      videos: [
        "/medicalroom.mp4",
      ],
      description:
        "On-campus medical assistance and first aid facilities to ensure immediate care and student well-being.",
    },
    {
      slug: "childrens-play-area",
      title: "Children's Play Area",
      videos: [
         "/playground.mp4",
        "/playzonekids.mp4",,
      ],
      description:
        "Safe and joyful play area designed especially for young learners to promote fun, creativity and social interaction.",
    },
    {
      slug: "music-performing-arts-room",
      title: "Music & Performing Arts Room",
      videos: [
        "/musicroom.mp4",
        "/musicroom2.mp4",

      ],
      description:
        "Dedicated music and performing arts room encouraging creativity, rhythm and artistic talent among students.",
    },

{
  slug: "dance-performing-arts-room",
  title: "Dance & Performing Arts Room",
  videos: [
    "/danceroom1.mp4",
    "/danceroom2.mp4",
    "/danceroom3.mp4",
    "/danceroom4.mp4",
    "/danceroom5.mp4",
   
  ],
  description:
    "A vibrant and spacious dance and performing arts room equipped with full-length mirrors, wooden flooring and a professional sound system, providing students with the perfect environment to explore classical, contemporary and modern dance forms while building confidence and stage presence.",
},









  ];

  const program = programsData.find((item) => item.slug === slug);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
        Program Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#7A0C0C] mb-12 font-serif text-center">
          {program.title}
        </h1>

        {/* Instagram Style Video Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-14">
  {program.videos.map((videoSrc, index) => (
    <div
      key={index}
      className="rounded-2xl overflow-hidden shadow-2xl bg-black aspect-[9/16] hover:scale-105 transition-transform duration-500"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        controls
        className="w-full h-full object-contain bg-black"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  ))}
</div>



        {/* Description */}
        <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          {program.description}
        </p>

      </div>
    </div>
  );
}
