import { useTranslation } from 'react-i18next';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  country: string;
  flag: string;
  avatar: string;
  stars: number;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  { id:1,  name:'Lucas Martin',      role:'YouTube Creator',        country:'France',        flag:'🇫🇷', avatar:'https://i.pravatar.cc/100?img=1',  stars:5, text:'Easy Dubbing changed my entire content strategy. I went from 20k to 500k subscribers after dubbing in 6 languages. The voice cloning is absolutely indistinguishable from my real voice.' },
  { id:2,  name:'Sofia Rodriguez',   role:'Film Director',          country:'Spain',         flag:'🇪🇸', avatar:'https://i.pravatar.cc/100?img=5',  stars:5, text:'I dubbed my entire short film into 8 languages in one afternoon. The quality stunned everyone at the festival. Easy Dubbing is professional-grade, period.' },
  { id:3,  name:'James Wilson',      role:'Online Educator',        country:'UK',            flag:'🇬🇧', avatar:'https://i.pravatar.cc/100?img=8',  stars:5, text:'My online courses now reach students in Russia, Germany, and the Middle East. Revenue tripled. This is the best investment I\'ve ever made in my business.' },
  { id:4,  name:'Yuki Tanaka',       role:'Content Marketer',       country:'Japan',         flag:'🇯🇵', avatar:'https://i.pravatar.cc/100?img=11', stars:5, text:'Incredible accuracy in voice cloning. My Japanese audience thought it was me speaking! The emotion and intonation is perfect. 10/10 no hesitation.' },
  { id:5,  name:'Ahmed Al-Rashid',   role:'Business Coach',         country:'UAE',           flag:'🇦🇪', avatar:'https://i.pravatar.cc/100?img=12', stars:5, text:'The Arabic dubbing quality is exceptional. I reached 2 million Arabic-speaking viewers in just 3 months. The ROI is simply astronomical.' },
  { id:6,  name:'Marie Dubois',      role:'Documentary Maker',      country:'Belgium',       flag:'🇧🇪', avatar:'https://i.pravatar.cc/100?img=16', stars:5, text:'My documentaries are now distributed across 12 countries. Easy Dubbing handles all localization. It would have cost me €50,000 with a studio — this costs almost nothing.' },
  { id:7,  name:'Marco Bianchi',     role:'Podcast Host',           country:'Italy',         flag:'🇮🇹', avatar:'https://i.pravatar.cc/100?img=19', stars:5, text:'Il clonaggio vocale è assolutamente straordinario. Il mio pubblico non riesce a distinguere il doppiaggio dalla mia voce reale. Prodotto incredibile!' },
  { id:8,  name:'Dmitry Volkov',     role:'Tech Reviewer',          country:'Russia',        flag:'🇷🇺', avatar:'https://i.pravatar.cc/100?img=22', stars:5, text:'Мой YouTube-канал вырос с 10k до 800k подписчиков после дубляжа на 5 языков. Easy Dubbing — это революция в контент-производстве.' },
  { id:9,  name:'Emma Thompson',     role:'Language Teacher',       country:'Australia',     flag:'🇦🇺', avatar:'https://i.pravatar.cc/100?img=25', stars:5, text:'I created entire language learning courses in 7 languages using my own voice clone. Students love it and can\'t believe it\'s AI. Absolutely magical technology.' },
  { id:10, name:'Carlos Herrera',    role:'Marketing Agency CEO',   country:'Mexico',        flag:'🇲🇽', avatar:'https://i.pravatar.cc/100?img=28', stars:5, text:'We dub 30+ client videos per week with Easy Dubbing. It replaced an entire team of voiceover artists. Our margins went from 20% to 75%. Game-changing.' },
  { id:11, name:'Lena Müller',       role:'Corporate Trainer',      country:'Germany',       flag:'🇩🇪', avatar:'https://i.pravatar.cc/100?img=31', stars:5, text:'Die Sprachklonierung ist auf professionellem Niveau. Unsere Schulungsvideos werden jetzt in 9 Sprachen angeboten. Easy Dubbing ist die Zukunft.' },
  { id:12, name:'Priya Sharma',      role:'Wellness Influencer',    country:'India',         flag:'🇮🇳', avatar:'https://i.pravatar.cc/100?img=34', stars:5, text:'My Hindi, Tamil and Telugu audiences finally get content in their language! The voice feels 100% authentic. I went viral in India thanks to Easy Dubbing.' },
  { id:13, name:'Oliver Brown',      role:'E-learning Developer',   country:'Canada',        flag:'🇨🇦', avatar:'https://i.pravatar.cc/100?img=37', stars:5, text:'Built 200+ courses across 8 languages using Easy Dubbing. The unlimited processing is a game-changer — no quotas, no limits, just pure output.' },
  { id:14, name:'Fatima Zahra',      role:'News Journalist',        country:'Morocco',       flag:'🇲🇦', avatar:'https://i.pravatar.cc/100?img=40', stars:5, text:'Je produis maintenant des reportages en 4 langues simultanément. La qualité du doublage arabe est spectaculaire. Easy Dubbing mérite 100 étoiles.' },
  { id:15, name:'Andrei Popescu',    role:'Film Producer',          country:'Romania',       flag:'🇷🇴', avatar:'https://i.pravatar.cc/100?img=43', stars:5, text:'We dubbed our entire 2-hour feature film in 6 languages in one weekend. What used to cost us €40,000 now costs a monthly subscription. Unbelievable.' },
  { id:16, name:'Mei Lin',           role:'Fashion Vlogger',        country:'China',         flag:'🇨🇳', avatar:'https://i.pravatar.cc/100?img=46', stars:5, text:'My international fashion brand exploded after I started dubbing content in English, French and Spanish. Easy Dubbing made me a global creator overnight.' },
  { id:17, name:'Ibrahim Hassan',    role:'Religious Educator',     country:'Egypt',         flag:'🇪🇬', avatar:'https://i.pravatar.cc/100?img=49', stars:5, text:'الجودة الصوتية مذهلة. يظن مستمعوني أنني أتحدث بالفعل بلغتهم. Easy Dubbing أداة لا غنى عنها لكل منشئ محتوى.' },
  { id:18, name:'Hannah Schmidt',    role:'Fitness Trainer',        country:'Austria',       flag:'🇦🇹', avatar:'https://i.pravatar.cc/100?img=52', stars:5, text:'My workout programs now reach 40+ countries. The voice quality is flawless — my clients in France, Spain and Italy all think it\'s professionally dubbed.' },
  { id:19, name:'Paolo Ricci',       role:'Startup Founder',        country:'Italy',         flag:'🇮🇹', avatar:'https://i.pravatar.cc/100?img=55', stars:5, text:'We localized our entire product demo library (80 videos) in one day. Investors were amazed we could pitch in 6 languages. Raised €2M. Thank you Easy Dubbing!' },
  { id:20, name:'Sophie Laurent',    role:'Children\'s Author',     country:'France',        flag:'🇫🇷', avatar:'https://i.pravatar.cc/100?img=57', stars:5, text:'Mes livres audio pour enfants sont maintenant disponibles en 7 langues. La voix clonée capture parfaitement la chaleur et l\'émotion. Les parents adorent!' },
  { id:21, name:'Kevin O\'Brien',    role:'Sports Commentator',     country:'Ireland',       flag:'🇮🇪', avatar:'https://i.pravatar.cc/100?img=59', stars:5, text:'I dub my football analysis content into German, French and Spanish. My audience went from 5,000 to 180,000. The commentary voice cloning is spot on.' },
  { id:22, name:'Nadia Kowalski',    role:'Travel Blogger',         country:'Poland',        flag:'🇵🇱', avatar:'https://i.pravatar.cc/100?img=61', stars:5, text:'Moje filmy podróżnicze docierają teraz do 12 krajów. Jakość klonowania głosu jest niesamowita — nikt nie wierzy, że to AI. Rewolucja w tworzeniu treści!' },
  { id:23, name:'Ravi Patel',        role:'Tech Entrepreneur',      country:'India',         flag:'🇮🇳', avatar:'https://i.pravatar.cc/100?img=63', stars:5, text:'Our SaaS tutorial videos are now available in 10 languages. Customer acquisition cost dropped by 60% when we started localizing. Easy Dubbing paid for itself 100x.' },
  { id:24, name:'Clara Fernandez',   role:'Dance Instructor',       country:'Brazil',        flag:'🇧🇷', avatar:'https://i.pravatar.cc/100?img=65', stars:5, text:'Minha escola de dança online agora tem alunos em 15 países! O Easy Dubbing dublou todos os meus cursos em inglês, espanhol e francês. Perfeito!' },
  { id:25, name:'Thomas Eriksson',   role:'Game Streamer',          country:'Sweden',        flag:'🇸🇪', avatar:'https://i.pravatar.cc/100?img=67', stars:5, text:'I translate my gaming content into 5 languages simultaneously. My international community grew by 300% in 3 months. The voice feels 100% natural.' },
  { id:26, name:'Aisha Diallo',      role:'NGO Director',           country:'Senegal',       flag:'🇸🇳', avatar:'https://i.pravatar.cc/100?img=9',  stars:5, text:'Our awareness campaigns now reach French, English and Arabic-speaking Africa. Easy Dubbing amplified our impact tenfold. Truly a tool for good.' },
  { id:27, name:'Mikael Bergström',  role:'Documentary Producer',   country:'Finland',       flag:'🇫🇮', avatar:'https://i.pravatar.cc/100?img=13', stars:5, text:'Three award-winning documentaries, 8 languages each. Zero dubbing studios involved. Easy Dubbing is now our standard production workflow.' },
  { id:28, name:'Isabella Costa',    role:'Lifestyle Creator',      country:'Portugal',      flag:'🇵🇹', avatar:'https://i.pravatar.cc/100?img=17', stars:5, text:'Os meus vídeos de lifestyle chegam agora a 20 países. A clonagem de voz é indistinguível. O Easy Dubbing transformou completamente o meu negócio.' },
  { id:29, name:'Chen Wei',          role:'Business Analyst',       country:'Taiwan',        flag:'🇹🇼', avatar:'https://i.pravatar.cc/100?img=20', stars:5, text:'Our financial education channel now operates in English, Japanese, and Korean. Revenue multiplied by 5x in 6 months. Absolutely worth every euro.' },
  { id:30, name:'Valentina Ruiz',    role:'Chef & Food Creator',    country:'Colombia',      flag:'🇨🇴', avatar:'https://i.pravatar.cc/100?img=23', stars:5, text:'My cooking channel went from local to global overnight. Dubbing in English and French opened doors I never imagined. Easy Dubbing is magic for creators.' },
  { id:31, name:'Aleksandr Petrov',  role:'Engineering YouTuber',   country:'Russia',        flag:'🇷🇺', avatar:'https://i.pravatar.cc/100?img=26', stars:5, text:'Дублирую технический контент на 6 языков. Качество безупречно — даже носители языка думают, что это оригинальная озвучка. Невероятный продукт!' },
  { id:32, name:'Amara Okafor',      role:'Fashion Designer',       country:'Nigeria',       flag:'🇳🇬', avatar:'https://i.pravatar.cc/100?img=29', stars:5, text:'My African fashion brand now has audiences in France, UK and the US. Easy Dubbing gave me a truly international voice. Incredible technology!' },
  { id:33, name:'Jan Novak',         role:'Journalist',             country:'Czech Republic',flag:'🇨🇿', avatar:'https://i.pravatar.cc/100?img=32', stars:5, text:'Our news portal now publishes in 5 languages daily. Easy Dubbing handles all video content. The speed and quality are unmatched in the industry.' },
  { id:34, name:'Leila Ahmadi',      role:'Psychologist & Coach',   country:'Iran',          flag:'🇮🇷', avatar:'https://i.pravatar.cc/100?img=35', stars:5, text:'My mental health videos now help people in 8 countries. The Arabic and English voice cloning captures my warmth perfectly. Truly life-changing technology.' },
  { id:35, name:'Bruno Santos',      role:'Music Producer',         country:'Brazil',        flag:'🇧🇷', avatar:'https://i.pravatar.cc/100?img=38', stars:5, text:'I explain music theory in 5 languages to my 2 million subscribers. The voice cloning maintains my energy and enthusiasm perfectly. Unreal technology.' },
  { id:36, name:'Natalie Fontaine',  role:'Corporate L&D Manager',  country:'Switzerland',   flag:'🇨🇭', avatar:'https://i.pravatar.cc/100?img=41', stars:5, text:'We localized 500+ corporate training videos across 4 languages in one month. Traditional localization would have taken 2 years. Easy Dubbing is a miracle.' },
  { id:37, name:'Kenji Watanabe',    role:'Anime Reviewer',         country:'Japan',         flag:'🇯🇵', avatar:'https://i.pravatar.cc/100?img=44', stars:5, text:'My anime review channel now covers English, French and Spanish audiences. The voice cloning keeps my unique style intact. My international fanbase exploded.' },
  { id:38, name:'Sara Al-Zahrawi',   role:'Interior Designer',      country:'Kuwait',        flag:'🇰🇼', avatar:'https://i.pravatar.cc/100?img=47', stars:5, text:'مشاهدو قناتي في تصميم الديكور تضاعفوا بعد الدبلجة باللغات الأوروبية. جودة الصوت احترافية 100%. Easy Dubbing هو المستقبل.' },
  { id:39, name:'Felix Wagner',      role:'Software Developer',     country:'Germany',       flag:'🇩🇪', avatar:'https://i.pravatar.cc/100?img=50', stars:5, text:'Meine Coding-Tutorials erreichen jetzt weltweit Entwickler. Die Stimmklonierung ist verblüffend authentisch. Ich kann es nur jedem empfehlen.' },
  { id:40, name:'Chiara Romano',     role:'Yoga Instructor',        country:'Italy',         flag:'🇮🇹', avatar:'https://i.pravatar.cc/100?img=53', stars:5, text:'Le mie lezioni di yoga ora raggiungono studenti in 10 paesi. Il clonaggio vocale trasmette perfettamente la calma e la serenità. Tecnologia straordinaria!' },
  { id:41, name:'Alex Johnson',      role:'Real Estate Agent',      country:'USA',           flag:'🇺🇸', avatar:'https://i.pravatar.cc/100?img=56', stars:5, text:'Dubbed all my property tour videos in Spanish and French. Closed 3 international deals in one month. Easy Dubbing paid for my annual subscription 50x over.' },
  { id:42, name:'Zoé Mercier',       role:'Political Commentator',  country:'France',        flag:'🇫🇷', avatar:'https://i.pravatar.cc/100?img=58', stars:5, text:'Mes analyses politiques touchent maintenant un public international de 500 000 personnes. La voix clonée est absolument parfaite. Outil indispensable!' },
  { id:43, name:'Michael Osei',      role:'Motivational Speaker',   country:'Ghana',         flag:'🇬🇭', avatar:'https://i.pravatar.cc/100?img=60', stars:5, text:'My motivational content reaches Africa, Europe and America in 5 languages. Easy Dubbing captures my passion and energy like no other tool. Simply the best.' },
  { id:44, name:'Elena Vassiliev',   role:'Language Coach',         country:'Bulgaria',      flag:'🇧🇬', avatar:'https://i.pravatar.cc/100?img=62', stars:5, text:'I teach 6 languages on YouTube and Easy Dubbing helps me produce content in all of them. My channel grew from 8k to 250k subscribers this year. Incredible!' },
  { id:45, name:'Diego Morales',     role:'Football Coach',         country:'Argentina',     flag:'🇦🇷', avatar:'https://i.pravatar.cc/100?img=64', stars:5, text:'Mis tutoriales de fútbol llegan ahora a jugadores de Europa y África. La clonación de voz es perfecta. Easy Dubbing es la herramienta definitiva para creadores.' },
  { id:46, name:'Anna Korhonen',     role:'Children\'s Educator',  country:'Finland',       flag:'🇫🇮', avatar:'https://i.pravatar.cc/100?img=66', stars:5, text:'My educational videos for children are now available in 6 languages. Parents love that the voice sounds warm and genuine. Easy Dubbing is magic for educators.' },
  { id:47, name:'Ricardo Lima',      role:'Cryptocurrency Analyst', country:'Portugal',      flag:'🇵🇹', avatar:'https://i.pravatar.cc/100?img=68', stars:5, text:'Minha análise de cripto agora é consumida por 300k pessoas em 8 países. O Easy Dubbing transformou meu alcance global. Ferramenta absolutamente essencial.' },
  { id:48, name:'Katarzyna Nowak',   role:'Beauty & Makeup Artist', country:'Poland',        flag:'🇵🇱', avatar:'https://i.pravatar.cc/100?img=70', stars:5, text:'Moje tutoriale makijażu mają teraz widzów w 15 krajach. Klonowanie głosu brzmi absolutnie naturalnie. Easy Dubbing to najlepsza inwestycja w mojej karierze.' },
  { id:49, name:'Samuel Oduya',      role:'Tech Journalist',        country:'Kenya',         flag:'🇰🇪', avatar:'https://i.pravatar.cc/100?img=3',  stars:5, text:'African tech news now reaches global audiences in English, French and Arabic. Easy Dubbing helped us 10x our viewership in 90 days. Exceptional product.' },
  { id:50, name:'Giulia Ferrari',    role:'Fashion Journalist',     country:'Italy',         flag:'🇮🇹', avatar:'https://i.pravatar.cc/100?img=6',  stars:5, text:'La mia rivista di moda digitale raggiunge ora lettori in 8 paesi. La qualità del doppiaggio è a livello professionale. Easy Dubbing è rivoluzionario!' },
];

// Split into 3 rows
const ROW1 = TESTIMONIALS.slice(0, 17);
const ROW2 = TESTIMONIALS.slice(17, 34);
const ROW3 = TESTIMONIALS.slice(34, 50);

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: stars }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const t = item;
  return (
    <div className="flex-shrink-0 w-80 bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-2xl p-5 mx-3 hover:border-purple-500/30 hover:bg-white/[0.07] transition-all duration-300 group">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/30 group-hover:border-purple-500/60 transition-all"
          loading="lazy"
        />
        <div className="min-w-0">
          <p className="text-white font-bold text-sm truncate">{t.name}</p>
          <p className="text-white/40 text-[11px] truncate">{t.role} · {t.flag} {t.country}</p>
        </div>
      </div>
      <StarRating stars={t.stars} />
      <p className="text-white/70 text-[12px] leading-relaxed mt-2 line-clamp-4">{t.text}</p>
    </div>
  );
}

function MarqueeRow({ items, reverse = false, speed = 40 }: { items: Testimonial[]; reverse?: boolean; speed?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <TestimonialCard key={`${item.id}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { t } = useTranslation();
  return (
    <section className="py-32 overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-16 text-center">
        <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20 tracking-widest uppercase mb-4">
          {t('testimonials.badge')}
        </span>
        <h2 className="font-['Plus_Jakarta_Sans'] text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          {t('testimonials.title').split('Love Easy Dubbing').length > 1 ? (
            <>{t('testimonials.title').split('Love Easy Dubbing')[0]}<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Love Easy Dubbing</span></>
          ) : t('testimonials.title')}
        </h2>
        <p className="text-white/50 mt-4 text-lg max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
      </div>

      {/* 3 rows of infinite scrolling */}
      <div className="space-y-4 select-none">
        <MarqueeRow items={ROW1} reverse={false} speed={50} />
        <MarqueeRow items={ROW2} reverse={true}  speed={65} />
        <MarqueeRow items={ROW3} reverse={false} speed={55} />
      </div>

      {/* Left/right gradient fade */}
      <div className="pointer-events-none absolute top-0 left-0 w-40 h-full bg-gradient-to-r from-[#050505] to-transparent z-10" />
      <div className="pointer-events-none absolute top-0 right-0 w-40 h-full bg-gradient-to-l from-[#050505] to-transparent z-10" />
    </section>
  );
}
