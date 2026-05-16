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
        getStarted: 'Get Started',
        security: 'Security'
      },
      hero: {
        badge: 'Powered by Advanced AI',
        title: 'Translate Videos',
        desc: "The world's most powerful AI Video Dubbing Studio. Professional voice cloning and 40+ languages in one click.",
        cta: 'Get Lifetime Pro'
      },
      features: {
        title: 'Unmatched AI Technology',
        subtitle: 'Built for creators, filmmakers, and global brands to dissolve language barriers instantly.',
        feat1Title: 'Instant Translation',
        feat1Desc: '40+ languages supported with zero delay and perfect accuracy. Localize your content in seconds.',
        feat2Title: 'Pro Voice Cloning',
        feat2Desc: 'Keep your unique tone and emotion across any language effortlessly. Captured with high fidelity.'
      },
      security: {
        title: 'Safe & Verified Installation',
        desc: 'Easy Dubbing is developed by OneHostingEurope. As an independent AI studio, our software might trigger a Windows "SmartScreen" warning during the first installation. This is normal for new professional software. Our code is 100% clean and virus-free.',
        step1: 'If the blue window appears, click "More Info".',
        step2: 'Click "Run Anyway" to start your Pro translation experience.',
        verified: 'Verified Clean',
        ssl: 'SSL Encrypted',
        fips: 'FIPS Compliant'
      },
      howItWorks: {
        title: 'How it Works',
        step1Title: 'Purchase License',
        step1Desc: 'Get your activation key via PayPal instantly after payment.',
        step2Title: 'Install the App',
        step2Desc: 'Run the professional Windows installer on your PC and activate.',
        step3Title: 'Start Dubbing',
        step3Desc: 'Upload a video, choose a language, and let the AI do the magic.'
      },
      pricing: {
        offer: 'Limited Time Offer',
        title: 'Lifetime Pro License',
        feat1: 'Unlimited Local Processing',
        feat2: 'Hardware-Locked Security',
        feat3: 'High-Fidelity Voice Cloning',
        feat4: 'Lifetime Free Updates',
        launch: 'LIMITED TIME LAUNCH OFFER',
        bestValue: 'Best Value',
        annualTitle: 'Annual Pro Pass',
        annualBill: 'Billed Yearly',
        annualFeat1: 'Unlimited Local Processing',
        annualFeat2: 'Priority Email Support',
        annualFeat3: '40+ Languages Supported',
        annualFeat4: 'Cancel Anytime',
        annualUnit: '/ year',
        monthlyTitle: 'Monthly Pro Pass',
        monthlyBill: 'Billed Monthly',
        monthlyFeat1: 'Unlimited Local Processing',
        monthlyFeat2: 'Basic Support',
        monthlyFeat3: '40+ Languages Supported',
        monthlyFeat4: 'Cancel Anytime',
        monthlyUnit: '/ mo'
      },
      footer: {
        copy: '© 2026 Easy Dubbing AI. All rights reserved. Developed by OneHostingEurope',
        trusted: 'Trusted by 10,000+ Global Creators'
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
        getStarted: 'Commencer',
        security: 'Sécurité'
      },
      hero: {
        badge: 'Propulsé par une IA Avancée',
        title: 'Traduisez vos Vidéos',
        desc: "Le studio de doublage IA le plus puissant au monde. Clonage de voix professionnel et plus de 40 langues en un clic.",
        cta: 'Obtenir Pro à Vie'
      },
      features: {
        title: 'Technologie IA Inégalée',
        subtitle: 'Conçu pour les créateurs et les marques mondiales afin de briser instantanément les barrières linguistiques.',
        feat1Title: 'Traduction Instantanée',
        feat1Desc: 'Plus de 40 langues supportées avec une précision parfaite. Localisez votre contenu en quelques secondes.',
        feat2Title: 'Clonage de Voix Pro',
        feat2Desc: 'Conservez votre ton et votre émotion unique dans n’importe quelle langue sans effort.'
      },
      security: {
        title: 'Installation Sûre et Vérifiée',
        desc: 'Easy Dubbing est développé par OneHostingEurope. En tant que studio IA indépendant, notre logiciel peut déclencher un avertissement Windows "SmartScreen" lors de la première installation. C\'est normal pour un nouveau logiciel professionnel. Notre code est 100% propre.',
        step1: 'Si la fenêtre bleue apparaît, cliquez sur "Plus d\'infos".',
        step2: 'Cliquez sur "Exécuter quand même" pour commencer.',
        verified: 'Vérifié Propre',
        ssl: 'Chiffré SSL',
        fips: 'Conforme FIPS'
      },
      howItWorks: {
        title: 'How it Works',
        step1Title: 'Acheter une Licence',
        step1Desc: 'Recevez votre clé d’activation via PayPal immédiatement après le paiement.',
        step2Title: 'Installer l’App',
        step2Desc: 'Lancez l’installateur professionnel sur votre PC et activez votre clé.',
        step3Title: 'Commencer le Doublage',
        step3Desc: 'Téléchargez une vidéo, choisissez une langue et laissez l’IA faire la magie.'
      },
      pricing: {
        offer: 'Offre Limitée',
        title: 'Licence Pro à Vie',
        feat1: 'Traitement Local Illimité',
        feat2: 'Sécurité Verrouillée par Matériel',
        feat3: 'Clonage de Voix Haute Fidélité',
        feat4: 'Mises à Jour Gratuites à Vie',
        launch: 'OFFRE DE LANCEMENT LIMITÉE',
        bestValue: 'Meilleure Valeur',
        annualTitle: 'Pass Pro Annuel',
        annualBill: 'Facturé Annuellement',
        annualFeat1: 'Traitement Local Illimité',
        annualFeat2: 'Support Email Prioritaire',
        annualFeat3: 'Plus de 40 Langues Supportées',
        annualFeat4: 'Annulez à tout moment',
        annualUnit: '/ an',
        monthlyTitle: 'Pass Pro Mensuel',
        monthlyBill: 'Facturé Mensuellement',
        monthlyFeat1: 'Traitement Local Illimité',
        monthlyFeat2: 'Support de Base',
        monthlyFeat3: 'Plus de 40 Langues Supportées',
        monthlyFeat4: 'Annulez à tout moment',
        monthlyUnit: '/ mois'
      },
      footer: {
        copy: '© 2026 Easy Dubbing AI. Tous droits réservés. Développé par OneHostingEurope',
        trusted: 'Approuvé par plus de 10 000 créateurs mondiaux'
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
        getStarted: 'Empezar',
        security: 'Seguridad'
      },
      hero: {
        badge: 'Impulsado por IA Avanzada',
        title: 'Traduce tus Videos',
        desc: "El estudio de doblaje por IA más potente del mundo. Clonación de voz profesional y más de 40 idiomas en un clic.",
        cta: 'Obtener Pro de por Vida'
      },
      features: {
        title: 'Tecnología de IA Inigualable',
        subtitle: 'Creado para creadores y marcas globales para disolver las barreras del idioma al instante.',
        feat1Title: 'Traducción Instantánea',
        feat1Desc: 'Más de 40 idiomas compatibles con precisión perfecta. Localice su contenido en segundos.',
        feat2Title: 'Clonación de Voz Pro',
        feat2Desc: 'Mantenga su tono y emoción únicos en cualquier idioma sin esfuerzo.'
      },
      security: {
        title: 'Instalación Segura y Verificada',
        desc: 'Easy Dubbing es desarrollado por OneHostingEurope. Como estudio de IA independiente, nuestro software puede activar una advertencia de Windows "SmartScreen" durante la primera instalación. Esto es normal. Nuestro código es 100% limpio.',
        step1: 'Si aparece la ventana azul, haga clic en "Más información".',
        step2: 'Haga clic en "Ejecutar de todos modos" para comenzar.',
        verified: 'Verificado Limpio',
        ssl: 'Cifrado SSL',
        fips: 'Cumple FIPS'
      },
      howItWorks: {
        title: 'Cómo funciona',
        step1Title: 'Comprar Licencia',
        step1Desc: 'Obtenga su clave de activación a través de PayPal al instante después del pago.',
        step2Title: 'Instalar la Aplicación',
        step2Desc: 'Ejecute el instalador profesional en su PC y actívelo.',
        step3Title: 'Empezar a Doblar',
        step3Desc: 'Sube un video, elige un idioma y deja que la IA haga la magia.'
      },
      pricing: {
        offer: 'Oferta por Tiempo Limitado',
        title: 'Licencia Pro de por Vida',
        feat1: 'Procesamiento Local Ilimitado',
        feat2: 'Seguridad Bloqueada por Hardware',
        feat3: 'Clonación de Voz de Alta Fidelidad',
        feat4: 'Actualizaciones Gratuitas de por Vida',
        launch: 'OFERTA DE LANZAMIENTO LIMITADA',
        bestValue: 'Mejor Valor',
        annualTitle: 'Pase Pro Anual',
        annualBill: 'Facturado Anualmente',
        annualFeat1: 'Procesamiento Local Ilimitado',
        annualFeat2: 'Soporte por Correo Prioritario',
        annualFeat3: 'Más de 40 Idiomas Soportados',
        annualFeat4: 'Cancela en cualquier momento',
        annualUnit: '/ año',
        monthlyTitle: 'Pase Pro Mensuel',
        monthlyBill: 'Facturado Mensualmente',
        monthlyFeat1: 'Procesamiento Local Ilimitado',
        monthlyFeat2: 'Soporte Básico',
        monthlyFeat3: 'Más de 40 Idiomas Soportados',
        monthlyFeat4: 'Cancela en cualquier momento',
        monthlyUnit: '/ mes'
      },
      footer: {
        copy: '© 2026 Easy Dubbing AI. Todos los derechos reservados. Desarrollado por OneHostingEurope',
        trusted: 'Con la confianza de más de 10.000 creadores globales'
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
        getStarted: 'Inizia Ora',
        security: 'Sicurezza'
      },
      hero: {
        badge: 'Potenziato da IA Avanzata',
        title: 'Traduci i tuoi Video',
        desc: "Lo studio di doppiaggio IA più potente al mondo. Clonazione vocale professionale e oltre 40 lingue in un clic.",
        cta: 'Ottieni Pro a Vita'
      },
      features: {
        title: 'Tecnologia IA Ineguagliabile',
        subtitle: 'Costruito per creatori e marchi globali per dissolvere istantaneamente le barriere linguistiche.',
        feat1Title: 'Traduzione Istantanea',
        feat1Desc: 'Oltre 40 lingue supportate con precisione perfetta. Localizza i tuoi contenuti in pochi secondi.',
        feat2Title: 'Clonazione Vocale Pro',
        feat2Desc: 'Mantieni il tuo tono e la tua emozione unici in qualsiasi lingua senza sforzo.'
      },
      security: {
        title: 'Installazione Sicura e Verificata',
        desc: 'Easy Dubbing è sviluppato da OneHostingEurope. Come studio IA indipendente, il nostro software potrebbe attivare un avviso Windows "SmartScreen" durante la prima installazione. È normale. Il nostro codice è pulito al 100%.',
        step1: 'Se appare la finestra blu, clicca su "Ulteriori informazioni".',
        step2: 'Clicca su "Esegui comunque" per iniziare.',
        verified: 'Verificato Pulito',
        ssl: 'Criptato SSL',
        fips: 'Conforme FIPS'
      },
      howItWorks: {
        title: 'Come funziona',
        step1Title: 'Acquista Licenza',
        step1Desc: 'Ottieni istantaneamente la tua chiave di attivazione tramite PayPal dopo il pagamento.',
        step2Title: 'Installa l’App',
        step2Desc: 'Esegui l’installer professionale sul tuo PC e attiva la licenza.',
        step3Title: 'Inizia il Doppiaggio',
        step3Desc: 'Carica un video, scegli una lingua e lascia che l’IA faccia la magia.'
      },
      pricing: {
        offer: 'Offerta a Tempo Limitato',
        title: 'Licenza Pro a Vita',
        feat1: 'Elaborazione Locale Illimitata',
        feat2: 'Sicurezza Bloccata dall\'Hardware',
        feat3: 'Clonazione Vocale ad Alta Fedeltà',
        feat4: 'Aggiornamenti Gratuiti a Vita',
        launch: 'OFFERTA DI LANCIO LIMITATA',
        bestValue: 'Miglior Valore',
        annualTitle: 'Pass Pro Annuale',
        annualBill: 'Fatturato Annualmente',
        annualFeat1: 'Elaborazione Locale Illimitata',
        annualFeat2: 'Supporto Email Prioritario',
        annualFeat3: 'Oltre 40 Lingue Supportate',
        annualFeat4: 'Annulla in qualsiasi momento',
        annualUnit: '/ anno',
        monthlyTitle: 'Pass Pro Mensile',
        monthlyBill: 'Fatturato Mensilmente',
        monthlyFeat1: 'Elaborazione Locale Illimitata',
        monthlyFeat2: 'Supporto di Base',
        monthlyFeat3: 'Oltre 40 Lingue Supportate',
        monthlyFeat4: 'Annulla in qualsiasi momento',
        monthlyUnit: '/ mese'
      },
      footer: {
        copy: '© 2026 Easy Dubbing AI. Tutti i diritti riservati. Sviluppato da OneHostingEurope',
        trusted: 'Scelto da oltre 10.000 creatori globali'
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
        getStarted: 'Jetzt Starten',
        security: 'Sicherheit'
      },
      hero: {
        badge: 'Unterstützt durch Fortgeschrittene KI',
        title: 'Videos Übersetzen',
        desc: "Das weltweit leistungsstärkste KI-Video-Synchronstudio. Professionelles Stimmencloning und über 40 Sprachen mit einem Klick.",
        cta: 'Lifetime Pro Sichern'
      },
      features: {
        title: 'Unübertroffene KI-Technologie',
        subtitle: 'Entwickelt für Creator und globale Marken, um Sprachbarrieren sofort aufzulösen.',
        feat1Title: 'Sofortige Übersetzung',
        feat1Desc: 'Über 40 Sprachen werden mit perfekter Genauigkeit unterstützt. Lokalisieren Sie Ihre Inhalte in Sekunden.',
        feat2Title: 'Pro Stimmen-Cloning',
        feat2Desc: 'Behalten Sie Ihren einzigartigen Ton und Ihre Emotionen in jeder Sprache mühelos bei.'
      },
      security: {
        title: 'Sichere und Verifizierte Installation',
        desc: 'Easy Dubbing wird von OneHostingEurope entwickelt. Als unabhängiges KI-Studio kann unsere Software bei der Erstinstallation eine Windows "SmartScreen"-Warnung auslösen. Das ist normal. Unser Code ist 100% sauber.',
        step1: 'Wenn das blaue Fenster erscheint, klicken Sie auf "Weitere Informationen".',
        step2: 'Klicken Sie auf "Trotzdem ausführen", um zu starten.',
        verified: 'Verifiziert Sauber',
        ssl: 'SSL-Verschlüsselt',
        fips: 'FIPS-konform'
      },
      howItWorks: {
        title: 'Wie es funktioniert',
        step1Title: 'Lizenz kaufen',
        step1Desc: 'Erhalten Sie Ihren Aktivierungsschlüssel sofort nach der Zahlung über PayPal.',
        step2Title: 'App installieren',
        step2Desc: 'Führen Sie den professionellen Windows-Installer auf Ihrem PC aus und aktivieren Sie ihn.',
        step3Title: 'Synchronisation starten',
        step3Desc: 'Video hochladen, Sprache wählen und die KI die Magie wirken lassen.'
      },
      pricing: {
        offer: 'Befristetes Angebot',
        title: 'Lifetime Pro Lizenz',
        feat1: 'Unbegrenzte Lokale Verarbeitung',
        feat2: 'Hardware-gebundene Sicherheit',
        feat3: 'High-Fidelity Stimmencloning',
        feat4: 'Kostenlose Lifetime-Updates',
        launch: 'LIMITIERTES EINFÜHRUNGSANGEBOT',
        bestValue: 'Bester Wert',
        annualTitle: 'Jahres-Pro-Pass',
        annualBill: 'Jährliche Abrechnung',
        annualFeat1: 'Unbegrenzte Lokale Verarbeitung',
        annualFeat2: 'Prioritärer E-Mail-Support',
        annualFeat3: 'Über 40 Sprachen unterstützt',
        annualFeat4: 'Jederzeit kündbar',
        annualUnit: '/ Jahr',
        monthlyTitle: 'Monats-Pro-Pass',
        monthlyBill: 'Monatliche Abrechnung',
        monthlyFeat1: 'Unbegrenzte Lokale Verarbeitung',
        monthlyFeat2: 'Basis-Support',
        monthlyFeat3: 'Über 40 Sprachen unterstützt',
        monthlyFeat4: 'Jederzeit kündbar',
        monthlyUnit: '/ Monat'
      },
      footer: {
        copy: '© 2026 Easy Dubbing AI. Alle Rechte vorbehalten. Entwickelt von OneHostingEurope',
        trusted: 'Vertraut von über 10.000 globalen Creatorn'
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
        getStarted: 'Начать',
        security: 'Безопасность'
      },
      hero: {
        badge: 'На базе передового ИИ',
        title: 'Переводите видео',
        desc: " Самая мощная в мире студия ИИ-дубляжа видео. Профессиональное клонирование голоса и 40+ языков в один клик.",
        cta: 'Получить пожизненный Pro'
      },
      features: {
        title: 'Непревзойденная технология ИИ',
        subtitle: 'Создано для авторов и мировых брендов для мгновенного преодоления языковых барьеров.',
        feat1Title: 'Мгновенный перевод',
        feat1Desc: 'Поддержка 40+ языков с идеальной точностью. Локализуйте свой контент за считанные секунды.',
        feat2Title: 'Про клонирование голоса',
        feat2Desc: 'Сохраняйте свой уникальный тон и эмоции на любом языке без усилий.'
      },
      security: {
        title: 'Безопасная установка',
        desc: 'Easy Dubbing разработан OneHostingEurope. Как независимая студия, наше ПО может вызвать предупреждение "SmartScreen" при первой установке. Это нормально. Наш код на 100% чист.',
        step1: 'Если появится синее окно, нажмите "Подробнее".',
        step2: 'Нажмите "Выполнить в любом случае", чтобы начать.',
        verified: 'Проверено',
        ssl: 'SSL Шифрование',
        fips: 'Соответствует FIPS'
      },
      howItWorks: {
        title: 'Как это работает',
        step1Title: 'Купить лицензию',
        step1Desc: 'Мгновенно получите ключ активации через PayPal после оплаты.',
        step2Title: 'Установить приложение',
        step2Desc: 'Запустите профессиональный установщик на своем ПК и активируйте его.',
        step3Title: 'Начать дубляж',
        step3Desc: 'Загрузите видео, выберите язык и позвольте ИИ творить магию.'
      },
      pricing: {
        offer: 'Ограниченное предложение',
        title: 'Пожизненная лицензия Pro',
        feat1: 'Безлимитная локальная обработка',
        feat2: 'Аппаратная защита',
        feat3: 'Высокоточное клонирование голоса',
        feat4: 'Пожизненные бесплатные обновления',
        launch: 'ОГРАНИЧЕННОЕ ПРЕДЛОЖЕНИЕ К ЗАПУСКУ',
        bestValue: 'Лучшая цена',
        annualTitle: 'Годовой Pro-пакет',
        annualBill: 'Оплата раз в год',
        annualFeat1: 'Безлимитная локальная обработка',
        annualFeat2: 'Приоритетная поддержка по email',
        annualFeat3: 'Поддержка 40+ языков',
        annualFeat4: 'Отмена в любое время',
        annualUnit: '/ год',
        monthlyTitle: 'Месячный Pro-пакет',
        monthlyBill: 'Оплата раз в месяц',
        monthlyFeat1: 'Безлимитная локальная обработка',
        monthlyFeat2: 'Базовая поддержка',
        monthlyFeat3: 'Поддержка 40+ языков',
        monthlyFeat4: 'Отмена в любое время',
        monthlyUnit: '/ мес'
      },
      footer: {
        copy: '© 2026 Easy Dubbing AI. Все права защищены. Разработано OneHostingEurope',
        trusted: 'Доверяют более 10 000 авторов по всему миру'
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
