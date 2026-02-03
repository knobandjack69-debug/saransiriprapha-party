import React, { useState } from 'react';

export const SRLogo: React.FC = () => {
  return (
    <div className="relative w-48 h-48 md:w-72 md:h-72 flex items-center justify-center group cursor-default">
      {/* Background Glows */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-party-rose/20 to-party-beige blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700 animate-pulse"></div>
      
      {/* Glass Circle */}
      <div className="relative w-full h-full rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_8px_32px_rgba(31,31,31,0.05)] flex items-center justify-center overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
        
        {/* Abstract Inner Shapes */}
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-gradient-to-br from-party-rose/10 to-transparent rounded-full blur-2xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-party-beige to-transparent rounded-full blur-xl transform -translate-x-1/4 translate-y-1/4"></div>

        {/* Logo Image - Scaled up to remove padding and strictly fill circle */}
        <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden rounded-full">
          <img 
            src="https://img5.pic.in.th/file/secure-sv1/4FE8F300-95F8-4D47-87E6-A9EB644494D2.jpeg" 
            alt="SR Party Logo" 
            className="w-full h-full object-cover scale-150 rounded-full drop-shadow-md opacity-95 group-hover:opacity-100 transition-opacity duration-500"
          />
        </div>

        {/* Ring */}
        <div className="absolute inset-4 rounded-full border border-white/30 border-t-white/60 rotate-45 transition-transform duration-[2000ms] group-hover:rotate-180 pointer-events-none"></div>
      </div>
    </div>
  );
};