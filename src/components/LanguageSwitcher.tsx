import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'fr', label: 'Français', flag: 'https://flagcdn.com/w40/fr.png' },
  { code: 'es', label: 'Español', flag: 'https://flagcdn.com/w40/es.png' },
  { code: 'it', label: 'Italiano', flag: 'https://flagcdn.com/w40/it.png' },
  { code: 'de', label: 'Deutsch', flag: 'https://flagcdn.com/w40/de.png' },
  { code: 'ru', label: 'Русский', flag: 'https://flagcdn.com/w40/ru.png' }
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-bold"
      >
        <img src={currentLanguage.flag} alt={currentLanguage.label} className="w-5 h-auto rounded-sm shadow-sm" />
        <span className="hidden md:block uppercase tracking-widest text-[10px]">{currentLanguage.code}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-48 bg-[#0a0a0a] backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl z-50 overflow-hidden"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                    i18n.language === lang.code 
                    ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <img src={lang.flag} alt={lang.label} className="w-5 h-auto rounded-sm" />
                  <span className="text-sm font-bold">{lang.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
