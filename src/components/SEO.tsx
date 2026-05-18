import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const BASE_URL = 'https://www.easydubbing.uk';

const SEO_DATA: Record<string, {
  title: string;
  description: string;
  keywords: string;
  lang: string;
  ogLocale: string;
}> = {
  en: {
    lang: 'en',
    ogLocale: 'en_US',
    title: 'Easy Dubbing | #1 AI Video Dubbing & Translation Studio',
    description: "The world's most powerful AI video dubbing studio. Clone professional voices, dub videos into 40+ languages in one click. Unlimited dubbing, no time limits. Try Easy Dubbing now.",
    keywords: 'AI dubbing, video dubbing, voice cloning, video translation, automatic dubbing, AI voice, dub videos, video localization, AI translator, dubbing software, easy dubbing, video dubbing studio, 40 languages dubbing',
  },
  fr: {
    lang: 'fr',
    ogLocale: 'fr_FR',
    title: 'Easy Dubbing | Studio de Doublage Vidéo IA N°1',
    description: "Le studio de doublage vidéo IA le plus puissant au monde. Clonez des voix professionnelles, doublez vos vidéos en 40+ langues en un clic. Doublage illimité sans limite de durée.",
    keywords: 'doublage IA, doublage vidéo, clonage vocal, traduction vidéo, doublage automatique, voix IA, logiciel doublage, studio doublage, easy dubbing, doublage 40 langues',
  },
  es: {
    lang: 'es',
    ogLocale: 'es_ES',
    title: 'Easy Dubbing | Estudio de Doblaje de Vídeo IA N°1',
    description: 'El estudio de doblaje de vídeo con IA más potente del mundo. Clona voces profesionales, dobla vídeos a más de 40 idiomas en un clic. Doblaje ilimitado sin límites de tiempo.',
    keywords: 'doblaje IA, doblaje de vídeo, clonación de voz, traducción de vídeo, doblaje automático, voz IA, software doblaje, easy dubbing, doblaje 40 idiomas',
  },
  it: {
    lang: 'it',
    ogLocale: 'it_IT',
    title: 'Easy Dubbing | Studio di Doppiaggio Video IA N°1',
    description: 'Lo studio di doppiaggio video IA più potente al mondo. Clona voci professionali, doppia video in 40+ lingue in un clic. Doppiaggio illimitato senza limiti di tempo.',
    keywords: 'doppiaggio IA, doppiaggio video, clonazione vocale, traduzione video, doppiaggio automatico, voce IA, software doppiaggio, easy dubbing, doppiaggio 40 lingue',
  },
  de: {
    lang: 'de',
    ogLocale: 'de_DE',
    title: 'Easy Dubbing | KI-Video-Synchronstudio Nr. 1',
    description: 'Das weltweit leistungsstärkste KI-Video-Synchronstudio. Klone professionelle Stimmen, synchronisiere Videos in 40+ Sprachen mit einem Klick. Unbegrenztes Dubbing ohne Zeitlimit.',
    keywords: 'KI Dubbing, Video Synchronisation, Stimmenklonen, Video Übersetzung, automatisches Dubbing, KI Stimme, Dubbing Software, Easy Dubbing, 40 Sprachen Dubbing',
  },
  ru: {
    lang: 'ru',
    ogLocale: 'ru_RU',
    title: 'Easy Dubbing | Студия ИИ-Дубляжа Видео №1',
    description: 'Самая мощная в мире студия ИИ-дубляжа видео. Клонируйте профессиональные голоса, дублируйте видео на 40+ языков в один клик. Безлимитный дубляж без ограничений по времени.',
    keywords: 'ИИ дубляж, дубляж видео, клонирование голоса, перевод видео, автоматический дубляж, ИИ голос, программа дубляжа, Easy Dubbing, дубляж 40 языков',
  },
  ar: {
    lang: 'ar',
    ogLocale: 'ar_SA',
    title: 'Easy Dubbing | أفضل استوديو دبلجة فيديو بالذكاء الاصطناعي',
    description: 'أقوى استوديو دبلجة فيديو بالذكاء الاصطناعي في العالم. استنسخ أصواتاً احترافية، ودبلج مقاطع الفيديو بأكثر من 40 لغة بنقرة واحدة. دبلجة غير محدودة بدون قيود زمنية.',
    keywords: 'دبلجة ذكاء اصطناعي, دبلجة فيديو, استنساخ صوت, ترجمة فيديو, دبلجة تلقائية, صوت ذكاء اصطناعي, برنامج دبلجة, easy dubbing, دبلجة 40 لغة',
  },
};

const HREFLANG_LANGS = ['en', 'fr', 'es', 'it', 'de', 'ru', 'ar'];

// JSON-LD structured data — SoftwareApplication schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Easy Dubbing',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Windows',
  url: BASE_URL,
  description: "The world's most powerful AI video dubbing studio. Clone professional voices, dub videos into 40+ languages in one click.",
  offers: [
    {
      '@type': 'Offer',
      price: '19',
      priceCurrency: 'EUR',
      name: 'Monthly Pro Pass',
    },
    {
      '@type': 'Offer',
      price: '69',
      priceCurrency: 'EUR',
      name: 'Annual Pro Pass',
    },
    {
      '@type': 'Offer',
      price: '99',
      priceCurrency: 'EUR',
      name: 'Lifetime Pro License',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1200',
    bestRating: '5',
  },
  image: `${BASE_URL}/og-image.png`,
  publisher: {
    '@type': 'Organization',
    name: 'OneHostingEurope',
    url: 'https://www.easydubbing.uk',
  },
};

export default function SEO() {
  const { i18n } = useTranslation();
  const lang = i18n.language as string;
  const seo = SEO_DATA[lang] || SEO_DATA['en'];

  return (
    <Helmet>
      {/* Core */}
      <html lang={seo.lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:locale" content={seo.ogLocale} />
      <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
      <meta property="og:url" content={BASE_URL} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Easy Dubbing" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />

      {/* Hreflang alternates */}
      {HREFLANG_LANGS.map(l => (
        <link key={l} rel="alternate" hrefLang={l} href={BASE_URL} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={BASE_URL} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
