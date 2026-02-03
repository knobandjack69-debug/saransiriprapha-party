import React, { useRef, useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import { CandidateProfile, Content } from '../types';

interface CandidateCardProps {
  candidate: CandidateProfile;
  index: number;
  total: number;
  content: Content;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, index, total, content }) => {
  const displayIndex = (index + 1).toString().padStart(2, '0');
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Handle Scroll Effects (Shadow Overlay + Opacity Fade)
  useEffect(() => {
    let animationFrameId: number;

    const updateEffects = () => {
      if (!cardRef.current || !overlayRef.current || !contentContainerRef.current) return;
      
      const nextElement = cardRef.current.nextElementSibling as HTMLElement;
      
      // If no next element, handle clean state (end of list or footer)
      if (!nextElement) {
          overlayRef.current.style.opacity = '0';
          contentContainerRef.current.style.opacity = '1';
          return;
      }

      const windowHeight = window.innerHeight;
      const nextRect = nextElement.getBoundingClientRect();
      const nextTop = nextRect.top;
      
      // Calculate progress of the NEXT card covering THIS card
      // 0 (next card is at bottom) -> 1 (next card fully covers this)
      let progress = 1 - (nextTop / windowHeight);
      progress = Math.max(0, Math.min(1, progress));

      // 1. Shadow Overlay Opacity (Darkens the card as it gets covered)
      overlayRef.current.style.opacity = (progress * 0.9).toString();

      // 2. Content Fade Out (Smooth fade as it gets covered)
      const fadeOpacity = Math.max(0, 1 - (progress * 2.5));
      contentContainerRef.current.style.opacity = fadeOpacity.toString();
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(updateEffects);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial calculation
    updateEffects();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle Entrance Animation (Trigger when card enters viewport)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Helper for staggered entrance animation
  // Slide up from 30px below, Fade from 0 -> 1
  const getAnimStyle = (delayIndex: number) => ({
    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
    opacity: isVisible ? 1 : 0,
    // Increased duration to 1.5s, adjusted ease to a smoother curve, and increased delay gap
    transition: `all 1.5s cubic-bezier(0.2, 0.4, 0.2, 1) ${delayIndex * 0.2}s`
  });
  
  return (
    <div 
      ref={cardRef}
      className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden bg-party-cream border-t border-white/40 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.25)]"
      style={{ zIndex: index + 1 }}
    >
      {/* Darkening Overlay for Stacking Effect - Changed to Red (party-rose-dark) */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-party-rose-dark pointer-events-none z-[60] mix-blend-multiply transition-opacity duration-100 will-change-opacity"
        style={{ opacity: 0 }}
      />
      
      <div className="relative w-full h-full flex flex-col md:flex-row max-w-7xl mx-auto">
        
        {/* Left: Image */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-party-beige mix-blend-multiply opacity-20 z-10"></div>
            <img 
              src={candidate.image} 
              alt={candidate.name}
              className="w-full h-full object-cover object-top transition-transform duration-[1.5s] ease-in-out group-hover:scale-105"
            />
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 relative bg-party-cream overflow-hidden">
            
            {/* Wrapper for Scroll Fade Out Effect */}
            <div ref={contentContainerRef} className="will-change-opacity relative z-30 h-full flex flex-col justify-center">
                
                {/* Background Index Number */}
                <div 
                    className="absolute right-0 -top-6 md:-top-32 text-[120px] md:text-[280px] font-serif font-bold text-party-rose/5 leading-none select-none pointer-events-none z-0"
                    style={{
                         opacity: isVisible ? 1 : 0,
                         transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                         transition: 'all 1s ease-out'
                    }}
                >
                    {displayIndex}
                </div>

                <div className="space-y-3 md:space-y-6 relative z-10">
                    
                    {/* 1. Chips (Role & Grade) */}
                    <div style={getAnimStyle(0)}>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-party-rose text-white text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-sm shadow-md">
                                {candidate.role}
                            </span>
                            <span className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-party-black/5 text-party-black/60 text-[10px] md:text-xs font-bold tracking-widest uppercase rounded-sm border border-party-black/10">
                                {candidate.grade}
                            </span>
                        </div>
                    </div>

                    {/* 2. Name */}
                    <div style={getAnimStyle(1)}>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-party-black leading-tight">
                            {candidate.name}
                        </h2>
                    </div>

                    {/* 3. Nickname */}
                    <div style={getAnimStyle(2)}>
                        <p className="text-xl md:text-2xl font-serif text-party-rose font-medium">
                            "{candidate.nickname}"
                        </p>
                    </div>

                    {/* 4. Divider Line */}
                    <div style={getAnimStyle(3)}>
                         <div className="w-16 md:w-24 h-[2px] bg-party-rose/80"></div>
                    </div>

                    {/* 5. Vision / Details */}
                    <div style={getAnimStyle(4)}>
                        <div className="space-y-2 md:space-y-3">
                            <h3 className="text-[10px] md:text-xs font-sans font-bold text-party-black/40 uppercase tracking-[0.2em]">
                                {content.candidate.visionTitle}
                            </h3>
                            <div className="relative">
                                <Quote className="absolute -top-2 -left-4 md:-top-3 md:-left-5 w-4 h-4 md:w-6 md:h-6 text-party-rose/20 transform -scale-x-100" />
                                <p className="text-sm md:text-base lg:text-lg font-serif text-party-black/80 leading-relaxed text-justify relative z-10 line-clamp-6 md:line-clamp-none">
                                    {candidate.vision}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 6. Footer Counter */}
                    <div style={getAnimStyle(5)}>
                        <div className="pt-2 md:pt-8 text-[10px] md:text-xs font-sans font-bold text-party-black/20 tracking-widest">
                          CANDIDATE {displayIndex} / {total.toString().padStart(2, '0')}
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </div>
  );
};