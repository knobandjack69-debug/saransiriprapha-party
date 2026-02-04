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
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const detailContainerRef = useRef<HTMLDivElement>(null);
  const listSectionRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<number | null>(null);
  const dragThreshold = 50;

  const activePolicy = useMemo(() => 
    selectedId ? policies.find(p => p.id === selectedId) : null
  , [selectedId, policies]);

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
    if (Math.abs(dragOffset) > 10) return;
    setSelectedId(id);
    setIsAutoPlaying(false);
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
    if (dragOffset > dragThreshold) handlePrev();
    else if (dragOffset < -dragThreshold) handleNext();
    setDragOffset(0);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handlePlayAudio = async (id: number, url: string) => {
    if (playingId === id) {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      setPlayingId(null);
      return;
    }
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setPlayingId(id);
    try {
      const audio = new Audio(url);
      audio.preload = 'none'; 
      audioRef.current = audio;
      audio.onended = () => { setPlayingId(null); audioRef.current = null; };
      audio.onerror = () => { setPlayingId(null); audioRef.current = null; };
      await audio.play();
    } catch (error: any) {
      if (error.name !== 'AbortError') { setPlayingId(null); audioRef.current = null; }
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
          scale: 2, 
          logging: false,
          useCORS: true,
        });
        const data = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = data;
        link.download = `Sarun_Policy_${activePolicy?.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) { console.error("Error generating image:", error); }
      finally { setIsGenerating(false); }
    } else { setIsGenerating(false); }
  };

  const getCardStyle = (idx: number) => {
    const total = policies.length;
    let diff = idx - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    const absDiff = Math.abs(diff);
    const isActive = diff === 0;
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
          @keyframes music-bar {
            0% { height: 20%; }
            50% { height: 100%; }
            100% { height: 20%; }
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        
        <div className="fixed inset-0 z-0 pointer-events-none">
            <img 
                src="https://img2.pic.in.th/S__3366954.jpg" 
                alt="Sarun Policy Background" 
                className="w-full h-full object-cover"
                decoding="async"
            />
            <div className="absolute inset-0 bg-party-cream/80 backdrop-blur-[2px]"></div>
        </div>
        
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
                    <span className="inline-block py-1 px-4 rounded-full bg-party-rose/10 text-party-rose text-[10px] font-bold tracking-[0.3em] uppercase mb-4">Political Strategy</span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-party-black mb-4 tracking-tight">{content.policyPage.title}</h1>
                    <div className="w-20 h-1 bg-party-rose mx-auto rounded-full"></div>
                </div>

                <div className="flex-1 relative flex items-center justify-center py-24 perspective-stage overflow-visible pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border border-party-black/5 rounded-full pointer-events-none opacity-30"></div>
                    <div className="relative w-full h-[550px] flex items-center justify-center transform-style-3d">
                        {policies.map((policy, idx) => (
                            <div 
                                key={policy.id}
                                onClick={() => idx === currentIndex ? handleSelectPolicy(policy.id) : setCurrentIndex(idx)}
                                className="absolute top-1/2 left-1/2 w-[320px] md:w-[420px] h-[480px] md:h-[580px] -mt-[240px] md:-mt-[290px] cursor-pointer group pointer-events-auto"
                                style={getCardStyle(idx)}
                            >
                                <div className="w-full h-full animate-float" style={{ animationDelay: `${idx * 0.5}s` }}>
                                    <div className="relative w-full h-full rounded-[3.5rem] overflow-hidden bg-party-beige shadow-2xl border border-white/30">
                                        <img 
                                            src={policy.imageUrl} 
                                            className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
                                            alt={policy.title} 
                                            draggable="false"
                                            loading={Math.abs(idx - currentIndex) <= 1 ? "eager" : "lazy"}
                                            decoding="async"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-party-black/95 via-party-black/40 to-transparent"></div>
                                        <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end">
                                            <div className="transform transition-transform duration-700 group-hover:-translate-y-3">
                                                <span className="text-party-rose font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">Pillar {String(policy.id).padStart(2, '0')}</span>
                                                <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 leading-[1.1]">{policy.title}</h3>
                                                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500">
                                                    <div className="flex items-center gap-4 text-white/50 text-[9px] font-bold uppercase tracking-[0.3em]">
                                                        <span>Full Strategy</span>
                                                        <div className="w-16 h-[1px] bg-white/20"></div>
                                                    </div>
                                                    <div className="w-14 h-14 rounded-full bg-party-rose text-white flex items-center justify-center shadow-xl transform translate-x-4 group-hover:translate-x-0 transition-all duration-500"><ChevronRight size={24} /></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-6 flex flex-col items-center gap-10 mt-8 relative z-20">
                    <div className="flex items-center gap-10">
                      <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-md border border-party-black/5 flex items-center justify-center text-party-black hover:bg-party-rose hover:text-white transition-all shadow-xl active:scale-90"><ChevronLeft size={28} /></button>
                      <div className="flex gap-3">
                          {policies.map((_, idx) => (
                              <button key={idx} onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); setIsAutoPlaying(false); }} className={`h-2 rounded-full transition-all duration-700 ${idx === currentIndex ? 'w-14 bg-party-rose' : 'w-3 bg-party-black/10 hover:bg-party-black/20'}`}/>
                          ))}
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-md border border-party-black/5 flex items-center justify-center text-party-black hover:bg-party-rose hover:text-white transition-all shadow-xl active:scale-90"><ChevronRight size={28} /></button>
                    </div>
                    <button onClick={scrollToAllPolicies} className="group flex items-center gap-3 px-8 py-4 bg-party-black text-white rounded-full font-sans font-bold tracking-widest uppercase text-xs shadow-lg hover:shadow-2xl hover:bg-party-rose transition-all duration-300 transform hover:-translate-y-1 active:scale-95"><LayoutGrid size={18} />{content.policyPage.viewAllBtn}</button>
                </div>
                <p className="text-center mt-6 text-party-black/20 text-[10px] font-bold uppercase tracking-[0.4em] pointer-events-none">Drag or Swipe to Explore</p>
            </div>

            <div ref={listSectionRef} className="py-32 px-6 md:px-12 bg-white/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16 px-4">
                        <div className="space-y-4">
                           <span className="text-party-rose font-black text-xs uppercase tracking-[0.6em]">Comprehensive Guide</span>
                           <h2 className="text-4xl md:text-6xl font-serif font-bold text-party-black leading-tight">{content.policyPage.listTitle}</h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {policies.map((policy) => (
                            <div key={policy.id} onClick={() => handleSelectPolicy(policy.id)} className="group relative bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 border border-white/40 shadow-sm hover:shadow-2xl hover:border-party-rose/20 transition-all duration-500 cursor-pointer flex flex-col h-full">
                                <div className="absolute top-8 right-8 text-4xl font-serif font-black text-party-rose/5 group-hover:text-party-rose/10 transition-colors">{String(policy.id).padStart(2, '0')}</div>
                                <div className="w-14 h-14 rounded-2xl bg-party-beige/50 flex items-center justify-center text-party-rose mb-8 group-hover:bg-party-rose group-hover:text-white transition-all duration-500"><FileText size={24} /></div>
                                <h3 className="text-xl md:text-2xl font-serif font-bold text-party-black mb-4 group-hover:text-party-rose transition-colors">{policy.title}</h3>
                                <p className="text-party-black/40 font-sans text-sm leading-relaxed mb-10 line-clamp-3">{policy.summary}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div ref={detailContainerRef} className={`fixed inset-0 z-[60] bg-party-cream/95 backdrop-blur-3xl overflow-y-auto transition-transform duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${selectedId ? 'translate-y-0' : 'translate-y-full'}`}>
            {activePolicy && (
                <div className="relative min-h-screen pb-20">
                    <div className="sticky top-0 left-0 right-0 z-50 bg-party-cream/60 backdrop-blur-xl border-b border-party-black/5 px-6 py-4 flex items-center justify-between">
                        <button onClick={handleBack} className="flex items-center gap-3 text-party-black font-bold group"><div className="bg-party-black/5 p-2.5 rounded-full group-hover:bg-party-rose group-hover:text-white transition-all"><ArrowLeft size={22} /></div><span className="text-sm tracking-wide">Return to Gallery</span></button>
                    </div>
                    <div className="max-w-5xl mx-auto px-6 py-12">
                        <div className="relative h-[45vh] md:h-[55vh] rounded-[4rem] overflow-hidden mb-16 shadow-2xl border border-white/20">
                             <img src={activePolicy.imageUrl} className="w-full h-full object-cover" alt={activePolicy.title} loading="lazy" decoding="async" />
                             <div className="absolute inset-0 bg-gradient-to-t from-party-cream/60 via-transparent to-transparent"></div>
                             <div className="absolute bottom-10 left-10 md:bottom-16 md:left-16">
                                <span className="inline-block px-5 py-2 bg-party-rose text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6 shadow-lg">Target Solution</span>
                                <h1 className="text-4xl md:text-7xl font-serif font-bold text-party-black max-w-3xl leading-[1.1]">{activePolicy.title}</h1>
                             </div>
                        </div>

                        {/* ADDED CONTENT SECTION START */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 animate-[fadeIn_0.8s_ease-out_0.3s] opacity-0 fill-mode-forwards" style={{ animationFillMode: 'forwards' }}>
                            {/* Left Sidebar: Controls */}
                            <div className="md:col-span-4 space-y-6">
                                {/* Audio Card */}
                                <div className="p-6 bg-white rounded-[2rem] border border-party-black/5 shadow-xl">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-party-rose/10 rounded-full flex items-center justify-center text-party-rose">
                                                <Info size={20} />
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-wider text-party-black/60">Audio Brief</span>
                                        </div>
                                        {/* Visualizer */}
                                        <div className="flex gap-1 h-5 items-end">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className={`w-1.5 bg-party-rose rounded-full transition-all duration-300 ${playingId === activePolicy.id ? 'animate-music-bar' : 'h-1.5 opacity-30'}`} style={{ animationDelay: `${i * 0.1}s` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handlePlayAudio(activePolicy.id, activePolicy.audioUrl)}
                                        className="w-full py-4 bg-party-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-party-rose transition-all shadow-lg active:scale-95 group"
                                    >
                                        {playingId === activePolicy.id ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                                        {playingId === activePolicy.id ? content.policyPage.pauseBtn : content.policyPage.listenBtn}
                                    </button>
                                </div>

                                {/* Download Card */}
                                <button 
                                    onClick={handleDownloadCard}
                                    disabled={isGenerating}
                                    className="w-full py-4 bg-white border-2 border-party-black/5 text-party-black rounded-[2rem] font-bold flex items-center justify-center gap-3 hover:border-party-rose/20 hover:shadow-xl transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {isGenerating ? <div className="w-5 h-5 border-2 border-party-black/20 border-t-party-rose rounded-full animate-spin"></div> : <Share2 size={20} />}
                                    {content.policyPage.saveBtn}
                                </button>
                            </div>

                            {/* Right Content: Details */}
                            <div className="md:col-span-8 space-y-12">
                                <div className="relative pl-8 border-l-2 border-party-rose/20">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-party-rose ring-4 ring-party-cream"></div>
                                    <h3 className="text-xl font-sans font-bold text-party-rose mb-4 uppercase tracking-widest">{content.policyPage.whyLabel}</h3>
                                    <p className="text-xl md:text-2xl font-serif text-party-black leading-relaxed">
                                        {activePolicy.why}
                                    </p>
                                </div>

                                <div className="relative pl-8 border-l-2 border-party-black/10">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-party-black ring-4 ring-party-cream"></div>
                                    <h3 className="text-xl font-sans font-bold text-party-black/40 mb-4 uppercase tracking-widest">{content.policyPage.whatLabel}</h3>
                                    <p className="text-lg md:text-xl font-serif text-party-black/80 leading-relaxed">
                                        {activePolicy.what}
                                    </p>
                                </div>

                                <div className="relative pl-8 border-l-2 border-party-black/10">
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-party-black ring-4 ring-party-cream"></div>
                                    <h3 className="text-xl font-sans font-bold text-party-black/40 mb-4 uppercase tracking-widest">{content.policyPage.howLabel}</h3>
                                    <div className="p-8 bg-white/60 rounded-[2rem] border border-party-black/5">
                                        <p className="text-lg md:text-xl font-serif text-party-black/80 leading-relaxed">
                                            {activePolicy.how}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ADDED CONTENT SECTION END */}
                        
                        {/* Hidden Card for Image Generation */}
                        <div className="absolute -left-[9999px] top-0">
                            <div id="policy-vertical-card" className="w-[600px] bg-[#EFECE1] p-10 flex flex-col gap-8 font-serif relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B93847]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#B93847] font-bold tracking-[0.2em] text-sm uppercase border border-[#B93847]/20 px-4 py-2 rounded-full bg-white">Sarunsiriprapha No.3</span>
                                    <span className="text-6xl font-black text-[#1F1F1F]/5">#{String(activePolicy.id).padStart(2, '0')}</span>
                                </div>
                                
                                <h1 className="text-5xl font-bold text-[#1F1F1F] leading-tight">{activePolicy.title}</h1>
                                
                                <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                                    <img src={activePolicy.imageUrl} className="w-full h-full object-cover" crossOrigin="anonymous" />
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="p-6 bg-white/60 rounded-3xl border border-[#1F1F1F]/5">
                                        <h3 className="text-[#B93847] font-bold text-xs uppercase tracking-widest mb-3">{content.policyPage.whyLabel}</h3>
                                        <p className="text-xl leading-relaxed text-[#1F1F1F]">{activePolicy.why}</p>
                                    </div>
                                </div>
                                
                                <div className="pt-6 border-t border-[#1F1F1F]/10 flex justify-between items-center">
                                    <div className="text-xs text-[#1F1F1F]/40 uppercase tracking-[0.3em] font-bold">No Drama Spirit</div>
                                    <div className="w-12 h-12 rounded-full bg-[#B93847] text-white flex items-center justify-center font-bold text-lg shadow-lg">SR</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    </div>
  );
};