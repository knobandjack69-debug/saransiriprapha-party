import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { Content } from '../types';
import { Shield, Sparkles, Sun } from 'lucide-react';

interface AboutProps {
  content: Content;
}

// Reusable Scroll Reveal Component
const ScrollReveal = ({ children, className = "", delay = 0 }: { children?: ReactNode; className?: string; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const About: React.FC<AboutProps> = ({ content }) => {
  const t = content.aboutPage;

  return (
    <div className="w-full min-h-screen relative font-sans">
      
      {/* 1. FIXED PARALLAX BACKGROUND */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://img2.pic.in.th/IMG_4023.jpeg')" 
        }}
      >
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-party-black/70 via-party-black/50 to-party-black/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* 2. SCROLLABLE CONTENT */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center pt-32 pb-24 px-6 md:px-12 overflow-x-hidden">
        
        {/* Title Section */}
        <div className="text-center mb-24 max-w-7xl mx-auto px-4">
           <ScrollReveal>
             <h1 
               className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white drop-shadow-2xl leading-tight mb-4 text-balance"
               style={{ textWrap: 'balance' } as React.CSSProperties}
             >
                {t.title}
             </h1>
           </ScrollReveal>
           <ScrollReveal delay={200}>
              <div className="w-32 h-1 bg-party-rose mx-auto mb-6 rounded-full shadow-[0_0_20px_rgba(185,56,71,0.8)]"></div>
              <p className="text-xl md:text-3xl text-party-cream/90 font-light font-serif tracking-wider italic">
                 "{t.subtitle}"
              </p>
           </ScrollReveal>
        </div>

        {/* Introduction Glass Card */}
        <ScrollReveal className="w-full max-w-5xl mb-24">
           <div className="p-8 md:p-12 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-center relative overflow-hidden group">
               {/* Decorative Gradient Blob */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-party-rose/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 group-hover:bg-party-rose/30 transition-colors duration-1000"></div>
               
               <p className="relative z-10 text-lg md:text-2xl text-white/90 leading-relaxed font-light">
                  {t.intro}
               </p>
           </div>
        </ScrollReveal>

        {/* Features Section: Definitions */}
        <div className="w-full max-w-6xl mb-32">
           <ScrollReveal className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-party-rose to-party-cream drop-shadow-lg mb-2">
                 {t.defTitle}
              </h2>
           </ScrollReveal>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               
               {/* Card 1: Refuge */}
               <ScrollReveal delay={100} className="h-full">
                  <div className="h-full p-8 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 hover:border-party-rose/50 shadow-lg hover:shadow-[0_0_30px_rgba(185,56,71,0.2)] transition-all duration-500 hover:-translate-y-2 group">
                      <div className="w-16 h-16 rounded-full bg-party-rose/20 flex items-center justify-center text-party-rose mb-6 group-hover:scale-110 transition-transform duration-500">
                          <Shield size={32} strokeWidth={1.5} className="drop-shadow-[0_0_10px_rgba(185,56,71,0.5)]" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-party-rose transition-colors">{t.def1Title}</h3>
                      <p className="text-white/70 leading-relaxed">{t.def1Desc}</p>
                  </div>
               </ScrollReveal>

               {/* Card 2: Prosperity */}
               <ScrollReveal delay={300} className="h-full">
                  <div className="h-full p-8 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 hover:border-yellow-400/50 shadow-lg hover:shadow-[0_0_30px_rgba(250,204,21,0.2)] transition-all duration-500 hover:-translate-y-2 group">
                      <div className="w-16 h-16 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-300 mb-6 group-hover:scale-110 transition-transform duration-500">
                          <Sparkles size={32} strokeWidth={1.5} className="drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors">{t.def2Title}</h3>
                      <p className="text-white/70 leading-relaxed">{t.def2Desc}</p>
                  </div>
               </ScrollReveal>

               {/* Card 3: Radiance */}
               <ScrollReveal delay={500} className="h-full">
                  <div className="h-full p-8 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 hover:border-blue-400/50 shadow-lg hover:shadow-[0_0_30px_rgba(96,165,250,0.2)] transition-all duration-500 hover:-translate-y-2 group">
                      <div className="w-16 h-16 rounded-full bg-blue-400/20 flex items-center justify-center text-blue-300 mb-6 group-hover:scale-110 transition-transform duration-500">
                          <Sun size={32} strokeWidth={1.5} className="drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">{t.def3Title}</h3>
                      <p className="text-white/70 leading-relaxed">{t.def3Desc}</p>
                  </div>
               </ScrollReveal>

           </div>
        </div>

        {/* Ideology Section */}
        <ScrollReveal className="w-full max-w-4xl">
           <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-br from-party-rose-dark/80 to-party-black/80 backdrop-blur-xl border border-party-rose/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center relative overflow-hidden">
               {/* Glow Effects */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-party-rose to-transparent opacity-50"></div>
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-party-rose/20 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

               <h2 className="text-2xl md:text-4xl font-serif font-bold text-white mb-6 tracking-wide">
                  {t.ideologyTitle}
               </h2>
               <div className="w-24 h-1 bg-white/20 mx-auto mb-8 rounded-full"></div>
               <p className="text-lg md:text-xl text-white/80 leading-loose font-light">
                  {t.ideologyText}
               </p>
           </div>
        </ScrollReveal>

      </div>
    </div>
  );
};