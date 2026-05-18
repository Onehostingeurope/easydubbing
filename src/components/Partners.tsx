export default function Partners() {
  const logos = [
    { name: 'Spotify', img: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@2024.04/logos/spotify.svg' },
    { name: 'Netflix', img: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@2024.04/logos/netflix.svg' },
    { name: 'YouTube', img: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@2024.04/logos/youtube.svg' },
    { name: 'Microsoft', img: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@2024.04/logos/microsoft.svg' },
    { name: 'Twitch', img: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@2024.04/logos/twitch.svg' },
    { name: 'Adobe', img: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@2024.04/logos/adobe.svg' },
    { name: 'TikTok', img: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@2024.04/logos/tiktok.svg' },
    { name: 'Google', img: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@2024.04/logos/google.svg' },
    { name: 'Meta', img: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@2024.04/logos/meta.svg' },
    { name: 'Amazon', img: 'https://cdn.jsdelivr.net/gh/gilbarbara/logos@2024.04/logos/amazon.svg' },
  ];

  return (
    <section className="w-full py-20 border-t border-b border-white/5 relative overflow-hidden bg-black mt-20">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="max-w-[1280px] mx-auto px-6 mb-12 text-center">
        <p className="text-[#cfc2d7] opacity-50 text-sm uppercase tracking-[0.3em] font-bold">Trusted by creators & teams at</p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full flex overflow-hidden group">
        {/* Gradient Fades for Smooth Edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee flex items-center gap-24 shrink-0 whitespace-nowrap pl-24">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110 shrink-0">
              <img 
                src={logo.img} 
                alt={logo.name} 
                className="h-8 md:h-10 w-auto object-contain brightness-0 invert hover:brightness-100 hover:invert-0 transition-all duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
