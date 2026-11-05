import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface RoyalOpeningIntroProps {
  onOpen: () => void;
}

export const RoyalOpeningIntro: React.FC<RoyalOpeningIntroProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleOpenInvitation = () => {
    if (isOpening || isDismissed) return;
    setIsOpening(true);

    // Call onOpen to trigger music or other effects
    onOpen();

    // After animation finishes, remove from DOM
    setTimeout(() => {
      setIsDismissed(true);
    }, 1200);
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        isOpening ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Left Royal Gate Curtain */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-[#06281E] border-r border-[#D4AF37]/50 shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpening ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          backgroundImage: `
            radial-gradient(rgba(212, 175, 55, 0.14) 1px, transparent 0),
            radial-gradient(rgba(20, 86, 67, 0.35) 1px, transparent 0)
          `,
          backgroundSize: '36px 36px',
        }}
      >
        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-80" />
      </div>

      {/* Right Royal Gate Curtain */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-[#06281E] border-l border-[#D4AF37]/50 shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpening ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          backgroundImage: `
            radial-gradient(rgba(212, 175, 55, 0.14) 1px, transparent 0),
            radial-gradient(rgba(20, 86, 67, 0.35) 1px, transparent 0)
          `,
          backgroundSize: '36px 36px',
        }}
      >
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent opacity-80" />
      </div>

      {/* Center Royal Envelope / Medallion */}
      <div
        className={`relative z-10 max-w-sm sm:max-w-md w-full mx-4 p-8 sm:p-10 rounded-3xl bg-[#0A3C2F]/95 border-2 border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.35)] text-center transition-all duration-700 backdrop-blur-md ${
          isOpening ? 'scale-110 opacity-0 -translate-y-6' : 'scale-100 opacity-100'
        }`}
      >
        {/* Corner Filigree Borders */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />

        {/* Arabic Calligraphy header */}
        <p className="font-amiri text-2xl sm:text-3xl text-[#D4AF37] mb-2 leading-relaxed" dir="rtl" lang="ar">
          بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>

        <span className="font-sans-body uppercase text-[10px] tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
          Royal Wedding Invitation
        </span>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FDFBF7] tracking-wider my-2">
          Zayan & Ayisha
        </h2>

        <p className="font-cormorant italic text-sm text-[#FDFBF7]/80 max-w-xs mx-auto mb-6">
          Request the honour of your presence and blessings at the sacred celebration of their Nikah & Walima
        </p>

        {/* Golden Wax Seal Interactive Button */}
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleOpenInvitation}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A059] text-[#06281E] font-cinzel font-bold text-xs sm:text-sm uppercase tracking-widest shadow-2xl hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-[#D4AF37]/30"
          >
            {/* Pulsing ring animation */}
            <span className="absolute -inset-1 rounded-full bg-[#D4AF37] opacity-40 animate-ping pointer-events-none" />

            <div className="w-6 h-6 rounded-full bg-[#06281E] text-[#D4AF37] flex items-center justify-center font-cinzel text-xs font-bold border border-[#D4AF37]">
              Z&A
            </div>

            <span className="font-bold">Open Invitation</span>

            <Sparkles className="w-4 h-4 text-[#06281E] group-hover:rotate-12 transition-transform" />
          </button>

          <span className="font-cormorant italic text-xs text-[#D4AF37]/80 mt-4 flex items-center gap-1.5">
            <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]/30" />
            <span>Tap to unseal with Arabic royal music</span>
          </span>
        </div>

        {/* Skip button in corner */}
        <button
          onClick={handleOpenInvitation}
          className="absolute top-4 right-4 text-[10px] uppercase tracking-wider text-white/50 hover:text-[#D4AF37] transition-colors cursor-pointer"
        >
          Skip
        </button>
      </div>
    </div>
  );
};
