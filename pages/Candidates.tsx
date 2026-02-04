import React, { useState } from 'react';
import { CandidateCard } from '../components/CandidateCard';
import { CANDIDATES_DATA } from '../constants';
import { Language, Content } from '../types';

interface CandidatesProps {
  lang: Language;
  content: Content;
}

export const Candidates: React.FC<CandidatesProps> = ({ lang, content }) => {
  const candidates = CANDIDATES_DATA(lang);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  return (
    <div className="relative w-full bg-party-cream">
      
      {/* 
        Hero Image Section 
        - Sticky: Stays in place while the first candidate card slides over it.
        - Z-0: sits behind the cards (z-index of cards starts at 1).
      */}
      <div className="h-screen w-full flex flex-col items-center justify-center bg-party-beige z-0 sticky top-0 overflow-hidden">
        {/* Full width/height container without padding */}
        <div className={`w-full h-full flex items-center justify-center transition-opacity duration-700 ${isHeroLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <img 
                src="https://img2.pic.in.th/Sarun-Siriprapha.png" 
                alt="Sarunsiriprapha Party Team" 
                className="w-full h-full object-cover object-top parallax-img"
                fetchPriority="high"
                decoding="async"
                onLoad={() => setIsHeroLoaded(true)}
            />
        </div>

        {!isHeroLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-10 h-10 border-4 border-party-rose/10 border-t-party-rose rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none z-10">
            <div className="flex flex-col items-center gap-3 animate-bounce opacity-80 mix-blend-difference text-white">
                <span className="text-[10px] uppercase tracking-[0.4em] font-medium drop-shadow-md">
                  {content.nav.candidates}
                </span>
                 <div className="w-[1px] h-10 bg-white drop-shadow-md"></div>
            </div>
        </div>
      </div>

      <div className="relative z-10">
        {candidates.map((candidate, index) => (
          <CandidateCard 
            key={candidate.id} 
            candidate={candidate} 
            index={index} 
            total={candidates.length}
            content={content}
          />
        ))}
        
        {/* Footer */}
        <div className="h-[50vh] bg-party-black text-white/50 flex items-center justify-center font-sans text-sm relative z-20">
            © 2024 Sarunsiriprapha Party. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};