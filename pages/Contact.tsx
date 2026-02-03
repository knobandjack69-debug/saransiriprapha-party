
import React from 'react';
import { Content } from '../types';
import { Instagram } from 'lucide-react';
import { SRLogo } from '../components/SRLogo';

interface ContactProps {
  content: Content;
}

// Custom TikTok Icon as Lucide doesn't have one
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.13 1.15-.14 2.3-.14 3.45 0 1.61-.35 3.23-1.07 4.67-1.12 2.22-3.41 3.73-5.86 3.94-2.49.21-5.11-.74-6.68-2.69-1.57-1.95-1.99-4.71-1.07-7.04.89-2.26 3.08-3.9 5.5-4.16.14-.02.28-.02.42-.03v4.12c-.08.02-.16.04-.24.06-1.14.24-2.15.98-2.65 2.02-.54 1.12-.49 2.52.12 3.59.58 1.02 1.65 1.7 2.82 1.78 1.13.08 2.32-.41 2.97-1.34.42-.62.59-1.38.59-2.14V.02z"/>
  </svg>
);

export const Contact: React.FC<ContactProps> = ({ content }) => {
  const t = content.contactPage;

  const socialLinks = [
    { 
      Icon: Instagram, 
      color: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]',
      url: 'https://www.instagram.com/sarun.siriprapha/',
      label: 'Instagram'
    },
    { 
      Icon: TikTokIcon, 
      color: 'bg-party-black',
      url: 'https://www.tiktok.com/@sarun.siriprapha?_r=1&_t=ZS-93bWySw770C',
      label: 'TikTok'
    }
  ];

  return (
    <div className="min-h-screen bg-party-cream pt-32 pb-24 px-6 md:px-12 font-sans relative overflow-hidden flex flex-col items-center">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-party-rose/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-party-black/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-[fadeIn_1s_ease-out]">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-party-black mb-6 tracking-tight">
               {t.title}
            </h1>
            <p className="text-lg md:text-2xl text-party-black/60 max-w-2xl mx-auto leading-relaxed font-light">
               {t.subtitle}
            </p>
        </div>

        {/* Branding & Socials Container */}
        <div className="flex flex-col items-center w-full animate-[slideUp_1s_ease-out_0.3s]">
            
            {/* Branding Logo */}
            <div className="mb-16 transform hover:scale-105 transition-transform duration-700">
                <SRLogo />
            </div>

            <div className="w-full flex flex-col items-center">
                <div className="w-20 h-1 bg-party-rose mb-12 rounded-full opacity-30"></div>
                
                <h3 className="text-sm font-black text-party-rose mb-10 uppercase tracking-[0.5em]">
                    {t.socialTitle}
                </h3>
                
                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {socialLinks.map(({ Icon, color, url, label }, idx) => (
                        <a 
                            key={idx} 
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center gap-4"
                        >
                            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-[2.5rem] ${color} text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <Icon />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-party-black/40 group-hover:text-party-rose transition-colors">
                                {label}
                            </span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Footer Tag */}
            <div className="mt-32 text-center">
               <p className="text-[11px] font-bold text-party-black/20 uppercase tracking-[0.6em] border-t border-party-black/5 pt-8">
                  Sarunsiriprapha Party • No Drama Spirit
               </p>
            </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
