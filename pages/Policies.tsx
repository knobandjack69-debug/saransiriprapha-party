
// Fix: Added missing React import to resolve "Cannot find namespace 'React'" errors
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Content, Language } from '../types';
import { POLICIES_DATA } from '../constants';
import { Play, Pause, Info, ArrowLeft, ChevronRight, Share2, ChevronLeft, LayoutGrid, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';

interface PoliciesProps {
  content: Content;
}

export const Policies: React.FC<PoliciesProps> = ({ content }) => {
  const isEn = content.nav.home === "Home";
  const lang = isEn ? Language.EN : Language.TH;
  const policies = POLICIES_DATA(lang);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Dragging states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const detailContainerRef = useRef<HTMLDivElement>(null);
  const listSectionRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<number | null>(null);
  const dragThreshold = 50; // pixels to trigger a shift

  const activePolicy = useMemo(() => 
    selectedId ? policies.find(p => p.id === selectedId) : null
  , [selectedId, policies]);

  // Handle Carousel Auto-play
  useEffect(() => {
    if (isAutoPlaying && !selectedId && !isDragging) {
      autoPlayRef.current = window.setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % policies.length);
      }, 3000);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, selectedId, isDragging, policies.length]);

  const handleSelectPolicy = (id: number) => {
    if (Math.abs(dragOffset) > 10) return; // Prevent clicking if it was a drag
    setSelectedId(id);
    setIsAutoPlaying(false);
    // Scroll detail to top when opening
    if (detailContainerRef.current) detailContainerRef.current.scrollTop = 0;
  };

  const handleBack = () => {
    setSelectedId(null);
    setIsAutoPlaying(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setPlayingId(null);
    }
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + policies.length) % policies.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % policies.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const scrollToAllPolicies = () => {
    listSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 15000);
  };

  // Drag Handlers
  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    setStartX(clientX);
    setDragOffset(0);
  };

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const currentOffset = clientX - startX;
    setDragOffset(currentOffset);
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset > dragThreshold) {
      handlePrev();
    } else if (dragOffset < -dragThreshold) {
      handleNext();
    }
    
    setDragOffset(0);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handlePlayAudio = async (id: number, url: string) => {
    if (playingId === id) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPlayingId(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setPlayingId(id);

    try {
      const audio = new Audio(url);
      audio.preload = 'auto'; 
      audioRef.current = audio;
      audio.onended = () => { setPlayingId(null); audioRef.current = null; };
      audio.onerror = () => { setPlayingId(null); audioRef.current = null; };
      await audio.play();
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setPlayingId(null);
        audioRef.current = null;
      }
    }
  };

  const handleDownloadCard = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    const element = document.getElementById('policy-vertical-card');
    if (element) {
      try {
        await new Promise(resolve => setTimeout(resolve, 600));
        const canvas = await html2canvas(element, {
          backgroundColor: '#EFECE1',
          scale: 3, 
          logging: false,
          useCORS: true,
          allowTaint: false,
          width: 1080,
          height: 1920,
          windowWidth: 1080,
          windowHeight: 1920,
          x: 0,
          y: 0,
        });
        const data = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = data;
        link.download = `Sarun_Policy_${activePolicy?.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error generating image:", error);
      } finally {
        setIsGenerating(false);
      }
    } else {
        setIsGenerating(false);
    }
  };

  const getCardStyle = (idx: number) => {
    const total = policies.length;
    let diff = idx - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const absDiff = Math.abs(diff);
    const isActive = diff === 0;
    
    // Smoothly integrate drag offset into the X position
    const visualDragShift = dragOffset * 0.5;
    const xOffset = diff * 140 + visualDragShift; 
    const zOffset = absDiff * -200; 
    const rotateY = diff * -20; 
    const opacity = Math.max(0, 1 - absDiff * 0.45);
    const scale = Math.max(0.5, 1 - absDiff * 0.12);
    
    return {
      transform: `translateX(calc(-50% + ${xOffset}px)) translateZ(${zOffset}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: 100 - absDiff,
      filter: isActive ? 'none' : 'blur(4px)',
      transition: isDragging ? 'none' : 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
    };
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden relative">
        <style>{`
          @keyframes floating-card {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: floating-card 6s ease-in-out infinite;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .perspective-stage {
            perspective: 2500px;
          }
          .grabbing {
            cursor: grabbing !important;
          }
        `}</style>
        
        {/* =========================================================================
            FIXED BACKGROUND IMAGE WITH SOFT ELEGANT SHADOW/OVERLAY
           ========================================================================= */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            <img 
                src="https://img2.pic.in.th/S__3366954.jpg" 
                alt="Sarun Policy Background" 
                className="w-full h-full object-cover"
            />
            {/* Elegant light shadow overlay for readability and "New Gen" look */}
            <div className="absolute inset-0 bg-party-cream/80 backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-party-cream/40"></div>
        </div>
        
        {/* =========================================================================
            LIST VIEW (3D SEMI-CIRCULAR CAROUSEL + FULL GRID)
           ========================================================================= */}
        <div className={`relative z-10 transition-all duration-1000 ease-in-out ${selectedId ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
            <div 
              className={`min-h-screen flex flex-col pt-32 pb-20 relative select-none ${isDragging ? 'grabbing' : ''}`}
              onMouseDown={onDragStart}
              onMouseMove={onDragMove}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              onTouchStart={onDragStart}
              onTouchMove={onDragMove}
              onTouchEnd={onDragEnd}
            >
                
                <div className="container mx-auto px-6 text-center mb-8 relative z-10 pointer-events-none">
                    <span className="inline-block py-1 px-4 rounded-full bg-party-rose/10 text-party-rose text-[10px] font-bold tracking-[0.3em] uppercase mb-4">
                        Political Strategy
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-party-black mb-4 tracking-tight">
                        {content.policyPage.title}
                    </h1>
                    <div className="w-20 h-1 bg-party-rose mx-auto rounded-full"></div>
                </div>

                {/* Carousel Stage */}
                <div className="flex-1 relative flex items-center justify-center py-24 perspective-stage overflow-visible pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border border-party-black/5 rounded-full pointer-events-none opacity-30"></div>

                    <div className="relative w-full h-[550px] flex items-center justify-center transform-style-3d">
                        {policies.map((policy, idx) => (
                            <div 
                                key={policy.id}
                                onClick={() => idx === currentIndex ? handleSelectPolicy(policy.id) : setCurrentIndex(idx)}
                                className={`absolute top-1/2 left-1/2 w-[320px] md:w-[420px] h-[480px] md:h-[580px] -mt-[240px] md:-mt-[290px] cursor-pointer group pointer-events-auto`}
                                style={getCardStyle(idx)}
                            >
                                <div className={`w-full h-full animate-float`} style={{ animationDelay: `${idx * 0.5}s` }}>
                                    <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden bg-party-beige shadow-2xl border border-white/30">
                                        <img 
                                            src={policy.imageUrl} 
                                            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
                                            alt={policy.title} 
                                            draggable="false"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-party-black/95 via-party-black/40 to-transparent"></div>
                                        
                                        <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                                            <div className="transform transition-transform duration-700 group-hover:-translate-y-3">
                                                <span className="text-party-rose font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">
                                                    Pillar {String(policy.id).padStart(2, '0')}
                                                </span>
                                                <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 leading-[1.1]">
                                                    {policy.title}
                                                </h3>
                                                
                                                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                    <div className="flex items-center gap-4 text-white/50 text-[9px] font-bold uppercase tracking-[0.3em]">
                                                        <span>Full Strategy</span>
                                                        <div className="w-16 h-[1px] bg-white/20"></div>
                                                    </div>
                                                    <div className="w-14 h-14 rounded-full bg-party-rose text-white flex items-center justify-center shadow-xl transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                                        <ChevronRight size={24} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carousel Controls */}
                <div className="container mx-auto px-6 flex flex-col items-center gap-10 mt-8 relative z-20">
                    <div className="flex items-center gap-10">
                      <button 
                          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                          className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-md border border-party-black/5 flex items-center justify-center text-party-black hover:bg-party-rose hover:text-white transition-all shadow-xl active:scale-90"
                      >
                          <ChevronLeft size={28} />
                      </button>

                      <div className="flex gap-3">
                          {policies.map((_, idx) => (
                              <button 
                                  key={idx}
                                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 10000); }}
                                  className={`h-2 rounded-full transition-all duration-700 ${idx === currentIndex ? 'w-14 bg-party-rose' : 'w-3 bg-party-black/10 hover:bg-party-black/20'}`}
                              />
                          ))}
                      </div>

                      <button 
                          onClick={(e) => { e.stopPropagation(); handleNext(); }}
                          className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-md border border-party-black/5 flex items-center justify-center text-party-black hover:bg-party-rose hover:text-white transition-all shadow-xl active:scale-90"
                      >
                          <ChevronRight size={28} />
                      </button>
                    </div>

                    <button 
                        onClick={scrollToAllPolicies}
                        className="group flex items-center gap-3 px-8 py-4 bg-party-black text-white rounded-full font-sans font-bold tracking-widest uppercase text-xs shadow-lg hover:shadow-2xl hover:bg-party-rose transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                    >
                        <LayoutGrid size={18} />
                        {content.policyPage.viewAllBtn}
                    </button>
                </div>
                
                <p className="text-center mt-6 text-party-black/20 text-[10px] font-bold uppercase tracking-[0.4em] pointer-events-none">
                  Drag or Swipe to Explore
                </p>
            </div>

            {/* Complete Policy Grid Section */}
            <div ref={listSectionRef} className="py-32 px-6 md:px-12 bg-white/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16 px-4">
                        <div className="space-y-4">
                           <span className="text-party-rose font-black text-xs uppercase tracking-[0.6em]">Comprehensive Guide</span>
                           <h2 className="text-4xl md:text-6xl font-serif font-bold text-party-black leading-tight">
                              {content.policyPage.listTitle}
                           </h2>
                        </div>
                        <div className="hidden lg:block w-32 h-[1px] bg-party-black/10 mb-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {policies.map((policy) => (
                            <div 
                                key={policy.id}
                                onClick={() => handleSelectPolicy(policy.id)}
                                className="group relative bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-white/40 shadow-sm hover:shadow-2xl hover:border-party-rose/20 transition-all duration-500 cursor-pointer flex flex-col h-full"
                            >
                                <div className="absolute top-8 right-8 text-4xl font-serif font-black text-party-rose/5 group-hover:text-party-rose/10 transition-colors">
                                    {String(policy.id).padStart(2, '0')}
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-party-beige/50 flex items-center justify-center text-party-rose mb-8 group-hover:bg-party-rose group-hover:text-white transition-all duration-500">
                                    <FileText size={24} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-serif font-bold text-party-black mb-4 group-hover:text-party-rose transition-colors">
                                    {policy.title}
                                </h3>
                                <p className="text-party-black/40 font-sans text-sm leading-relaxed mb-10 line-clamp-3">
                                    {policy.summary}
                                </p>
                                <div className="mt-auto flex items-center gap-3 text-party-rose font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                    <span>Detailed View</span>
                                    <ArrowLeft className="w-4 h-4 rotate-180" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* =========================================================================
            DETAIL VIEW
           ========================================================================= */}
        <div 
            ref={detailContainerRef}
            className={`fixed inset-0 z-[60] bg-party-cream/95 backdrop-blur-3xl overflow-y-auto transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${selectedId ? 'translate-y-0' : 'translate-y-full'}`}
        >
            {activePolicy && (
                <div className="relative min-h-screen pb-20">
                    <div className="sticky top-0 left-0 right-0 z-50 bg-party-cream/60 backdrop-blur-xl border-b border-party-black/5 px-6 py-4 flex items-center justify-between">
                        <button onClick={handleBack} className="flex items-center gap-3 text-party-black font-bold group">
                            <div className="bg-party-black/5 p-2.5 rounded-full group-hover:bg-party-rose group-hover:text-white transition-all">
                                <ArrowLeft size={22} />
                            </div>
                            <span className="text-sm tracking-wide">Return to Gallery</span>
                        </button>
                        <div className="text-[10px] font-black text-party-black/30 tracking-[0.4em] uppercase hidden md:block">
                            Policy Briefing {String(activePolicy.id).padStart(2, '0')}
                        </div>
                    </div>

                    <div className="max-w-5xl mx-auto px-6 py-12">
                        <div className="relative h-[45vh] md:h-[55vh] rounded-[4rem] overflow-hidden mb-16 shadow-2xl border border-white/20">
                             <img src={activePolicy.imageUrl} className="w-full h-full object-cover" alt={activePolicy.title} />
                             <div className="absolute inset-0 bg-gradient-to-t from-party-cream/60 via-transparent to-transparent"></div>
                             <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16">
                                <span className="inline-block px-5 py-2 bg-party-rose text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6 shadow-lg">Target Solution</span>
                                <h1 className="text-4xl md:text-7xl font-serif font-bold text-party-black max-w-3xl leading-[1.1]">{activePolicy.title}</h1>
                             </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 p-10 bg-white/70 backdrop-blur-xl rounded-[3.5rem] border border-white/40 shadow-xl">
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className={`w-16 h-16 rounded-[1.5rem] flex-shrink-0 flex items-center justify-center transition-all ${playingId === activePolicy.id ? 'bg-party-rose text-white shadow-2xl shadow-party-rose/30 scale-110' : 'bg-party-beige text-party-rose hover:scale-105'}`}>
                                    {playingId === activePolicy.id ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-party-black text-xl">{content.policyPage.listenBtn}</h3>
                                    <p className="text-sm text-party-black/50">Experience the narrated vision</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <button onClick={() => handlePlayAudio(activePolicy.id, activePolicy.audioUrl)} className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-95 border ${playingId === activePolicy.id ? 'bg-party-rose text-white border-party-rose' : 'bg-party-black text-white border-party-black hover:bg-party-rose hover:border-party-rose'}`}>
                                    {playingId === activePolicy.id ? "Pause" : "Stream Audio"}
                                </button>
                                <button onClick={handleDownloadCard} disabled={isGenerating} className="flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-sm bg-white/80 border border-party-black/10 text-party-black hover:bg-party-beige/20 transition-all shadow-lg active:scale-95 disabled:opacity-50">
                                    {isGenerating ? <div className="w-5 h-5 border-2 border-party-black/20 border-t-party-rose rounded-full animate-spin"></div> : <Share2 size={20} />}
                                    <span>{content.policyPage.saveBtn}</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                            <div className="lg:col-span-8 space-y-16">
                                <div className="group relative">
                                    <h3 className="text-party-rose font-bold text-xs uppercase tracking-[0.4em] mb-8 flex items-center gap-4"><Info size={16} className="stroke-[3]" />{content.policyPage.whyLabel}</h3>
                                    <div className="p-12 rounded-[3rem] bg-white/60 border border-white/40 shadow-md backdrop-blur-sm"><p className="text-2xl md:text-3xl font-serif text-party-black/80 leading-relaxed italic">"{activePolicy.why}"</p></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-8">
                                        <h3 className="text-party-black/40 font-bold text-xs uppercase tracking-[0.4em] flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-party-rose"></div>{content.policyPage.whatLabel}</h3>
                                        <div className="p-10 rounded-[2.5rem] bg-party-beige/20 border border-party-black/5 h-full"><p className="text-xl text-party-black/70 leading-relaxed font-medium">{activePolicy.what}</p></div>
                                    </div>
                                    <div className="space-y-8">
                                        <h3 className="text-party-black/40 font-bold text-xs uppercase tracking-[0.4em] flex items-center gap-4"><div className="w-2 h-2 bg-party-rose rotate-45"></div>{content.policyPage.howLabel}</h3>
                                        <div className="p-10 rounded-[2.5rem] bg-party-beige/20 border border-party-black/5 h-full"><p className="text-xl text-party-black/70 leading-relaxed font-medium">{activePolicy.how}</p></div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-4">
                                <div className="sticky top-28 p-10 rounded-[3rem] bg-party-black text-white space-y-10 overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-party-rose/20 rounded-full blur-[100px]"></div>
                                    <h4 className="text-party-rose font-bold text-xs uppercase tracking-[0.3em]">Policy Summary</h4>
                                    <p className="text-3xl font-serif font-bold italic leading-tight">{activePolicy.summary}</p>
                                    <div className="h-[1px] w-full bg-white/10"></div>
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-serif font-black text-2xl text-party-rose shadow-inner">3</div>
                                        <span className="text-xs font-bold uppercase tracking-[0.4em] opacity-50">Vote for Change</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* HIDDEN PURE-TYPOGRAPHY SHARE CARD FOR DOWNLOAD (TEXT ONLY) */}
                    <div className="absolute top-0 left-0 overflow-hidden w-0 h-0">
                        <div id="policy-vertical-card" className="w-[1080px] h-[1920px] bg-[#EFECE1] relative overflow-hidden flex flex-col p-[100px]" style={{ position: 'fixed', top: '0', left: '-10000px' }}>
                            <div className="absolute inset-[100px] border-[2px] border-[#B93847]/10 pointer-events-none"></div>
                            <div className="absolute left-[100px] top-[100px] w-64 h-2 bg-[#B93847]"></div>
                            <div className="flex-1 flex flex-col justify-between py-24 z-10">
                                <div className="space-y-6">
                                    <h4 className="text-[#B93847] font-sans font-black text-4xl tracking-[0.6em] uppercase">Sarun Party</h4>
                                    <p className="text-[#1F1F1F]/40 font-sans font-bold text-2xl tracking-[0.3em]">STRATEGIC SOLUTIONS • NO DRAMA</p>
                                </div>
                                <div className="space-y-12">
                                    <div className="flex items-center gap-10">
                                        <span className="text-[#B93847] font-serif font-black text-[150px] leading-none">{String(activePolicy.id).padStart(2, '0')}</span>
                                        <div className="h-[3px] flex-1 bg-[#B93847]/20"></div>
                                    </div>
                                    <h1 className="text-[120px] font-serif font-bold text-[#1F1F1F] leading-[1.05] tracking-tight">{activePolicy.title}</h1>
                                </div>
                                <div className="flex-1 flex flex-col justify-center space-y-24 my-20">
                                    <div className="space-y-8">
                                        <span className="text-[#B93847] font-sans font-black text-3xl uppercase tracking-[0.5em]">{content.policyPage.whyLabel}</span>
                                        <p className="text-[48px] font-serif italic text-[#1F1F1F]/80 leading-snug">"{activePolicy.why}"</p>
                                    </div>
                                    <div className="space-y-8">
                                        <span className="text-[#B93847] font-sans font-black text-3xl uppercase tracking-[0.5em]">{content.policyPage.whatLabel}</span>
                                        <div className="bg-white p-16 rounded-[4.5rem] border-l-[40px] border-[#B93847] shadow-2xl">
                                            <p className="text-[56px] font-sans font-bold text-[#1F1F1F] leading-tight">{activePolicy.what}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-8">
                                        <span className="text-[#B93847] font-sans font-black text-3xl uppercase tracking-[0.5em]">{content.policyPage.howLabel}</span>
                                        <p className="text-[40px] font-sans text-[#1F1F1F]/70 leading-relaxed font-medium">{activePolicy.how}</p>
                                    </div>
                                </div>
                                <div className="flex items-end justify-between pt-20 border-t-4 border-[#B93847]/10">
                                    <div className="max-w-[70%] space-y-8">
                                        <h2 className="text-6xl font-serif italic text-[#1F1F1F] font-semibold leading-tight">"No drama เน้นแก้ปัญหา พรรคศรัณศิริประภาจัดให้"</h2>
                                        <p className="text-[#B93847] font-sans font-black text-3xl tracking-[0.3em] uppercase">#ActionOverDrama • Vote Number 3</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -inset-24 bg-[#B93847]/5 rounded-full blur-[120px]"></div>
                                        <div className="w-[480px] h-[480px] rounded-[7rem] bg-white shadow-2xl flex items-center justify-center border-4 border-[#B93847]/10 relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-full h-16 bg-[#B93847] flex items-center justify-center"><span className="text-white text-sm font-black tracking-[0.6em] uppercase">Ballot Token</span></div>
                                            <span className="text-[400px] font-serif font-black text-[#B93847] leading-none pt-16">3</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute -bottom-60 -left-60 text-[1100px] font-serif font-black text-[#B93847]/5 leading-none select-none pointer-events-none">3</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};
