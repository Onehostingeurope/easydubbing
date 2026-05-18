import { Play, Music, Video, Laptop, Cloud } from 'lucide-react';

export default function Partners() {
  const logos = [
    { name: 'Netflix', Icon: Play, color: 'group-hover:text-[#E50914]' },
    { name: 'Spotify', Icon: Music, color: 'group-hover:text-[#1ED760]' },
    { name: 'YouTube', Icon: Video, color: 'group-hover:text-[#FF0000]' },
    { name: 'Microsoft', Icon: Laptop, color: 'group-hover:text-[#00A4EF]' },
    { name: 'Adobe', Icon: Cloud, color: 'group-hover:text-[#FF0000]' }
  ];

  return (
    <section className="w-full py-20 border-t border-b border-white/5 relative overflow-hidden bg-black mt-20">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="max-w-[1280px] mx-auto px-6 mb-12 text-center">
        <p className="text-[#cfc2d7] opacity-50 text-sm uppercase tracking-[0.3em] font-bold">Trusted by creators & teams at</p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full flex overflow-hidden">
        {/* Massive Gradient Fades for Amazing Smooth Edges */}
        <div className="absolute top-0 left-0 w-32 md:w-[25vw] h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 md:w-[25vw] h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee flex items-center gap-32 md:gap-[15vw] shrink-0 whitespace-nowrap pl-32 md:pl-[15vw]">
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center gap-3 opacity-40 hover:opacity-100 transition-all duration-500 hover:scale-110 shrink-0 group cursor-default">
              <logo.Icon className={`w-8 h-8 transition-colors duration-500 text-white ${logo.color}`} />
              <span className={`text-xl font-bold tracking-tight text-white transition-colors duration-500 ${logo.color}`}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
