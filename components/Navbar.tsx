
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { Language, Content } from '../types';

interface NavbarProps {
  lang: Language;
  content: Content;
  setLang: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, content, setLang }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { path: '/', label: content.nav.home },
    { path: '/about', label: content.nav.about },
    { path: '/candidates', label: content.nav.candidates },
    { path: '/policies', label: content.nav.policy },
    { path: '/saranbot', label: content.nav.saranbot },
    { path: '/contact', label: content.nav.contact },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 md:px-12 md:py-6 transition-all duration-300 pointer-events-none">
        <div className="pointer-events-auto relative z-50">
           {/* Minimal Logo for Nav */}
          <NavLink to="/" className="flex items-center gap-3 group hover:opacity-80 transition-opacity">
            <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden border border-white/20 shadow-sm bg-white/5">
               <img 
                 src="https://img5.pic.in.th/file/secure-sv1/4FE8F300-95F8-4D47-87E6-A9EB644494D2.jpeg" 
                 alt="SR Logo" 
                 className="h-full w-full object-cover scale-150" 
               />
            </div>
            <span className="text-xl md:text-2xl font-serif font-bold tracking-tighter text-party-rose hidden sm:block">
              SR<span className="text-party-black text-sm ml-1 font-sans tracking-widest font-light uppercase opacity-60">Party</span>
            </span>
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="pointer-events-auto hidden md:flex items-center gap-6 bg-party-cream/80 backdrop-blur-xl px-6 py-3 rounded-full shadow-lg border border-white/40">
          <ul className="flex gap-8 text-sm font-medium text-party-black/70">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink to={link.path} className={({isActive}) => `hover:text-party-rose transition-colors ${isActive ? 'text-party-rose font-bold' : ''}`}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          
          <div className="h-4 w-[1px] bg-party-black/10"></div>
          
          <LanguageToggle currentLang={lang} onToggle={setLang} />
        </div>

        {/* Mobile Toggle */}
        <div className="pointer-events-auto md:hidden relative z-50 flex items-center gap-3">
             <LanguageToggle currentLang={lang} onToggle={setLang} />
             <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-white/50 backdrop-blur-md rounded-full shadow-sm text-party-black border border-white/40 active:scale-95 transition-transform"
             >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-party-cream/95 backdrop-blur-3xl z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out md:hidden ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center gap-8 text-2xl font-serif font-medium text-party-black">
             {navLinks.map((link) => (
              <li key={link.path} style={{ transitionDelay: '100ms' }} className={`${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-500`}>
                <NavLink to={link.path} className={({isActive}) => `block py-2 ${isActive ? 'text-party-rose' : ''}`}>
                  {link.label}
                </NavLink>
              </li>
            ))}
        </ul>

        {/* Decorative background element for menu */}
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-party-rose/10 rounded-full blur-[80px] pointer-events-none"></div>
      </div>
    </>
  );
};
