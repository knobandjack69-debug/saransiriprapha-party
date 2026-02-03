
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, MessageSquare, School, HeartHandshake, Trophy, Sparkles } from 'lucide-react';
import { Content } from '../types';

interface HomeProps {
  content: Content;
}

export const Home: React.FC<HomeProps> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full bg-party-cream overflow-x-hidden">
      {/* MemorialPopup ถูกย้ายไปอยู่ที่ App.tsx แล้ว เพื่อให้แสดงผลทุกหน้าครั้งแรกที่เข้า */}
      
      {/* 
        SECTION 1: HERO
        "No Drama" Slogan + Big Number 3 
      */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Background Image Layer - Image: S__3366942.jpg */}
        <div className="absolute inset-0 z-0">
           <img 
             src="https://img5.pic.in.th/file/secure-sv1/S__3366942.jpg"
             alt="Party Background"
             className="w-full h-full object-cover"
           />
           {/* Minimal overlays for clarity */}
           <div className="absolute inset-0 bg-gradient-to-t from-party-cream/30 via-transparent to-transparent"></div>
           <div className="absolute inset-0 bg-gradient-to-r from-party-cream/30 via-party-rose/5 to-transparent"></div>
           <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            
            {/* Text Content */}
            <div className="w-full md:w-2/3 space-y-6">
              <div 
                className={`transform transition-all duration-1000 ease-out delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <span className="inline-block py-1 px-3 border border-party-black/20 rounded-full text-xs md:text-sm font-sans tracking-widest uppercase text-party-black/60 mb-4 bg-white/40 backdrop-blur-md">
                   {content.home.partyName}
                </span>
              </div>

              <h1 
                className={`text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-party-black leading-tight max-w-4xl transform transition-all duration-1000 ease-out delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                No Drama <br/>
                <span 
                  className="text-party-rose inline-block"
                  style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.4)' }}
                >
                  เน้นแก้ปัญหา
                </span> <br/>
                <span className="text-2xl md:text-4xl lg:text-5xl font-medium opacity-80 mt-2 block">
                  พรรคศรัณศิริประภาจัดให้
                </span>
              </h1>

              {/* Saran Bot CTA Button */}
              <div 
                className={`mt-10 flex flex-wrap gap-4 transform transition-all duration-1000 ease-out delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <NavLink 
                    to="/saranbot"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-party-black text-white rounded-full font-sans font-bold tracking-wide overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <Sparkles size={18} className="text-party-rose animate-pulse" />
                        {content.home.saranbotBtn}
                    </span>
                    <div className="absolute inset-0 bg-party-rose-dark/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </NavLink>
              </div>
            </div>

            {/* Big Number 3 - Cream color with red shadow, shifted up */}
            <div className="w-full md:w-1/3 flex justify-center md:justify-end mt-4 md:mt-0 relative transform -translate-y-12 md:-translate-y-24">
               <div 
                  className={`text-[200px] md:text-[350px] leading-none font-serif font-bold text-party-cream drop-shadow-2xl transform transition-all duration-1000 ease-out delay-500 ${isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 rotate-12'}`}
                  style={{ textShadow: '0 10px 30px rgba(185, 56, 71, 0.4)' }}
               >
                 3
               </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-party-rose/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
            </div>

          </div>
        </div>
      </section>

      {/* 
        SECTION 2: SCROLLING MARQUEE
      */}
      <div className="bg-party-rose text-white py-4 overflow-hidden shadow-lg transform -skew-y-1 relative z-20">
         <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-12 mx-6">
                    {content.home.marqueeKeywords.map((word, idx) => (
                        <div key={idx} className="flex items-center gap-12">
                            <span className="text-lg md:text-xl font-sans font-medium uppercase tracking-widest">{word}</span>
                            <div className="w-2 h-2 rounded-full bg-white/50"></div>
                        </div>
                    ))}
                </div>
            ))}
         </div>
      </div>
      <style>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 30s linear infinite;
        }
      `}</style>


      {/* 
        SECTION 3: POLICY TEASER (2x2 GRID) & CTA
      */}
      <section className="py-24 px-6 md:px-12 relative overflow-hidden">
        
        {/* Decor Background Image - Increased opacity and reduced gradient shadow to make it clearer */}
        <div className="absolute inset-0 w-full h-full opacity-70 pointer-events-none">
            <img 
                src="https://img2.pic.in.th/S__3366943.jpg" 
                alt="Decor Background" 
                className="w-full h-full object-cover object-center"
            />
            {/* Softened gradients to allow more of the image to shine through clearly */}
            <div className="absolute inset-0 bg-gradient-to-r from-party-cream/40 via-transparent to-party-cream/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-party-cream/40 via-transparent to-transparent"></div>
        </div>

        {/* max-width is 7xl to provide a broad yet organized grid layout */}
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-16">
                <div className="group p-8 md:p-10 bg-white/90 backdrop-blur-sm border border-party-black/5 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-party-rose/30 transition-all duration-500 transform hover:-translate-y-1">
                    <div className="w-14 h-14 bg-party-rose/10 rounded-2xl flex items-center justify-center text-party-rose mb-8 group-hover:scale-110 transition-transform">
                        <MessageSquare size={28} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-party-black mb-3">{content.home.policyHighlights.complaint}</h3>
                    <p className="text-party-black/60 font-sans text-sm md:text-base leading-relaxed">Direct line to solutions. No bureaucracy, just action.</p>
                </div>
                 <div className="group p-8 md:p-10 bg-white/90 backdrop-blur-sm border border-party-black/5 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-party-rose/30 transition-all duration-500 transform hover:-translate-y-1">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
                        <School size={28} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-party-black mb-3">{content.home.policyHighlights.academic}</h3>
                    <p className="text-party-black/60 font-sans text-sm md:text-base leading-relaxed">Peer tutoring systems & resource sharing centers.</p>
                </div>
                 <div className="group p-8 md:p-10 bg-white/90 backdrop-blur-sm border border-party-black/5 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-party-rose/30 transition-all duration-500 transform hover:-translate-y-1">
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-8 group-hover:scale-110 transition-transform">
                        <HeartHandshake size={28} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-party-black mb-3">{content.home.policyHighlights.welfare}</h3>
                    <p className="text-party-black/60 font-sans text-sm md:text-base leading-relaxed">Improved facilities and swift maintenance response.</p>
                </div>
                 <div className="group p-8 md:p-10 bg-white/90 backdrop-blur-sm border border-party-black/5 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-party-rose/30 transition-all duration-500 transform hover:-translate-y-1">
                    <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-8 group-hover:scale-110 transition-transform">
                        <Trophy size={28} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-party-black mb-3">{content.home.policyHighlights.esport}</h3>
                    <p className="text-party-black/60 font-sans text-sm md:text-base leading-relaxed">Support for diverse talents, from stage to screen.</p>
                </div>
            </div>

            <div className="flex justify-center">
                <NavLink 
                    to="/policies"
                    className="group relative inline-flex items-center gap-3 px-10 py-5 bg-party-rose text-white rounded-full font-sans font-bold tracking-wide overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                    <span className="relative z-10">{content.home.policyBtn}</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-party-rose-dark transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </NavLink>
            </div>
        </div>
      </section>
    </div>
  );
};
