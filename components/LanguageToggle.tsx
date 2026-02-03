import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle }) => {
  return (
    <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full p-1 border border-party-rose/20 shadow-sm">
      <button
        onClick={() => onToggle(Language.TH)}
        className={`px-3 py-1 text-xs font-sans font-medium rounded-full transition-all duration-300 ${
          currentLang === Language.TH 
            ? 'bg-party-rose text-white shadow-md' 
            : 'text-party-rose/70 hover:text-party-rose'
        }`}
      >
        TH
      </button>
      <button
        onClick={() => onToggle(Language.EN)}
        className={`px-3 py-1 text-xs font-sans font-medium rounded-full transition-all duration-300 ${
          currentLang === Language.EN 
            ? 'bg-party-rose text-white shadow-md' 
            : 'text-party-rose/70 hover:text-party-rose'
        }`}
      >
        EN
      </button>
    </div>
  );
};