import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        features: 'Features',
        howItWorks: 'How it Works',
        pricing: 'Pricing',
        activate: 'Activate License',
        getStarted: 'Get Started'
      },
      hero: {
        badge: 'Powered by Advanced AI',
        title: 'Translate Videos',
        desc: "The world's most powerful AI Video Dubbing Studio. Professional voice cloning and 40+ languages in one click.",
        cta: 'Get Lifetime Pro'
      },
      pricing: {
        offer: 'Limited Time Offer',
        title: 'Lifetime Pro License',
        feat1: 'Unlimited Local Processing',
        feat2: 'Hardware-Locked Security',
        feat3: 'High-Fidelity Voice Cloning',
        feat4: 'Lifetime Free Updates',
        launch: 'LIMITED TIME LAUNCH OFFER'
      },
      footer: {
        copy: '© 2026 Easy Dubbing AI. All rights reserved. Developed by OneHostingEurope'
      }
    }
  },
  fr: {
    translation: {
      nav: {
        features: 'Fonctionnalités',
        howItWorks: 'Comment ça marche',
        pricing: 'Tarifs',
        activate: 'Activer la licence',
        getStarted: 'Commencer'
      },
      hero: {
        badge: 'Propulsé par une IA Avancée',
        title: 'Traduisez vos Vidéos',
        desc: "Le studio de doublage IA le plus puissant au monde. Clonage de voix professionnel et plus de 40 langues en un clic.",
        cta: 'Obtenir Pro à Vie'
      },
      pricing: {
        offer: 'Offre Limitée',
        title: 'Licence Pro à Vie',
        feat1: 'Traitement Local Illimité',
        feat2: 'Sécurité Verrouillée par Matériel',
        feat3: 'Clonage de Voix Haute Fidélité',
        feat4: 'Mises à Jour Gratuites à Vie',
        launch: 'OFFRE DE LANCEMENT LIMITÉE'
      },
      footer: {
        copy: '© 2026 Easy Dubbing AI. Tous droits réservés. Développé par OneHostingEurope'
      }
    }
  },
  es: {
    translation: {
      nav: {
        features: 'Funcionalidades',
        howItWorks: 'Cómo funciona',
        pricing: 'Precios',
        activate: 'Activar Licencia',
        getStarted: 'Empezar'
      },
      hero: {
        badge: 'Impulsado por IA Avanzada',
        title: 'Traduce tus Videos',
        desc: "El estudio de doblaje por IA más potente del mundo. Clonación de voz profesional y más de 40 idiomas en un clic.",
        cta: 'Obtener Pro de por Vida'
      },
      pricing: {
        offer: 'Oferta por Tiempo Limitado',
        title: 'Licencia Pro de por Vida',
        feat1: 'Procesamiento Local Ilimitado',
        feat2: 'Seguridad Bloqueada por Hardware',
        feat3: 'Clonación de Voz de Alta Fidelidad',
        feat4: 'Actualizaciones Gratuitas de por Vida',
        launch: 'OFERTA DE LANZAMIENTO LIMITADA'
      },
      footer: {
        copy: '© 2026 Easy Dubbing AI. Todos los derechos reservados. Desarrollado por OneHostingEurope'
      }
    }
  },
  it: {
    translation: {
      nav: {
        features: 'Caratteristiche',
        howItWorks: 'Come funziona',
        pricing: 'Prezzi',
        activate: 'Attiva Licenza',
        getStarted: 'Inizia Ora'
      },
      hero: {
        badge: 'Potenziato da IA Avanzata',
        title: 'Traduci i tuoi Video',
        desc: "Lo studio di doppiaggio IA più potente al mondo. Clonazione vocale professionale e oltre 40 lingue in un clic.",
        cta: 'Ottieni Pro a Vita'
      },
      pricing: {
        offer: 'Offerta a Tempo Limitato',
        title: 'Licenza Pro a Vita',
        feat1: 'Elaborazione Locale Illimitata',
        feat2: 'Sicurezza Bloccata dall\'Hardware',
        feat3: 'Clonazione Vocale ad Alta Fedeltà',
        feat4: 'Aggiornamenti Gratuiti a Vita',
        launch: 'OFFERTA DI LANCIO LIMITATA'
      },
      footer: {
        copy: '© 2026 Easy Dubbing AI. Tutti i diritti riservati. Sviluppato da OneHostingEurope'
      }
    }
  },
  de: {
    translation: {
      nav: {
        features: 'Funktionen',
        howItWorks: 'Wie es funktioniert',
        pricing: 'Preise',
        activate: 'Lizenz Aktivieren',
        getStarted: 'Jetzt Starten'
      },
      hero: {
        badge: 'Unterstützt durch Fortgeschrittene KI',
        title: 'Videos Übersetzen',
        desc: "Das weltweit leistungsstärkste KI-Video-Synchronstudio. Professionelles Stimmencloning und über 40 Sprachen mit einem Klick.",
        cta: 'Lifetime Pro Sichern'
      },
      pricing: {
        offer: 'Befristetes Angebot',
        title: 'Lifetime Pro Lizenz',
        feat1: 'Unbegrenzte Lokale Verarbeitung',
        feat2: 'Hardware-gebundene Sicherheit',
        feat3: 'High-Fidelity Stimmencloning',
        feat4: 'Kostenlose Lifetime-Updates',
        launch: 'LIMITIERTES EINFÜHRUNGSANGEBOT'
      },
      footer: {
        copy: '© 2026 Easy Dubbing AI. Alle Rechte vorbehalten. Entwickelt von OneHostingEurope'
      }
    }
  },
  ru: {
    translation: {
      nav: {
        features: 'Функции',
        howItWorks: 'Как это работает',
        pricing: 'Цены',
        activate: 'Активировать лицензию',
        getStarted: 'Начать'
      },
      hero: {
        badge: 'На базе передового ИИ',
        title: 'Переводите видео',
        desc: " Самая мощная в мире студия ИИ-дубляжа видео. Профессиональное клонирование голоса и 40+ языков в один клик.",
        cta: 'Получить пожизненный Pro'
      },
      pricing: {
        offer: 'Ограниченное предложение',
        title: 'Пожизненная лицензия Pro',
        feat1: 'Безлимитная локальная обработка',
        feat2: 'Аппаратная защита',
        feat3: 'Высокоточное клонирование голоса',
        feat4: 'Пожизненные бесплатные обновления',
        launch: 'ОГРАНИЧЕННОЕ ПРЕДЛОЖЕНИЕ К ЗАПУСКУ'
      },
      footer: {
        copy: '© 2026 Easy Dubbing AI. Все права защищены. Разработано OneHostingEurope'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
