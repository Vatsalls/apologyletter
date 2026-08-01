import React, { useState } from 'react';
import { Sun, Heart, Image as ImageIcon, Mail, Clock, Gift, Lock, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenSecretAdmin: () => void;
  isAudioPlaying: boolean;
  toggleAudio: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSecretAdmin,
  isAudioPlaying,
  toggleAudio,
  unreadCount = 0,
}) => {
  const [clickCount, setClickCount] = useState(0);

  const handleSunflowerClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    if (nextCount >= 3) {
      setClickCount(0);
      onOpenSecretAdmin();
    }
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF6]/90 backdrop-blur-md border-b-2 border-dashed border-[#FDE047] px-4 py-3 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo with Sunflower Doodle */}
        <div 
          className="flex items-center gap-2 cursor-pointer group select-none"
          onClick={handleSunflowerClick}
          title="Tap 3 times to open Vatsal's Private Corner 🔑"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#FEF08A] border-2 border-[#CA8A04] shadow-sm group-hover:rotate-12 transition-transform">
            <span className="text-2xl animate-spin-slow">🌻</span>
            {clickCount > 0 && clickCount < 3 && (
              <span className="absolute -bottom-1 -right-1 text-[10px] bg-amber-600 text-white font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {3 - clickCount}
              </span>
            )}
          </div>
          <div>
            <h1 className="font-cute text-xl font-bold text-[#854D0E] tracking-tight flex items-center gap-1">
              Sunshine & Love <Heart className="w-4 h-4 fill-amber-500 text-amber-500 inline animate-bounce" />
            </h1>
            <p className="font-handwritten text-xs text-[#A16207]">For My Dearest Sunflower</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => scrollTo('letter-section')}
            className="px-3 py-1.5 rounded-full font-cute text-sm font-medium text-[#78350F] hover:bg-[#FEF08A]/70 hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4 text-amber-600" />
            <span>Letter</span>
          </button>

          <button
            onClick={() => scrollTo('gallery-section')}
            className="px-3 py-1.5 rounded-full font-cute text-sm font-medium text-[#78350F] hover:bg-[#FEF08A]/70 hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <ImageIcon className="w-4 h-4 text-amber-600" />
            <span>Gallery</span>
          </button>

          <button
            onClick={() => scrollTo('timeline-section')}
            className="px-3 py-1.5 rounded-full font-cute text-sm font-medium text-[#78350F] hover:bg-[#FEF08A]/70 hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Timeline</span>
          </button>

          <button
            onClick={() => scrollTo('coupons-section')}
            className="px-3 py-1.5 rounded-full font-cute text-sm font-medium text-[#78350F] hover:bg-[#FEF08A]/70 hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Gift className="w-4 h-4 text-amber-600" />
            <span>Love Coupons</span>
          </button>

          <button
            onClick={() => scrollTo('message-section')}
            className="px-3 py-1.5 rounded-full bg-[#FDE047] hover:bg-[#FACC15] text-[#78350F] border-2 border-[#CA8A04] font-cute text-sm font-bold shadow-sm hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Heart className="w-4 h-4 fill-amber-700 text-amber-700" />
            <span>Send Msg</span>
          </button>
        </nav>

        {/* Right Utility Buttons: Audio & Private Corner */}
        <div className="flex items-center gap-2">
          {/* Ambient Music Toggle Button */}
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-full border-2 transition-all flex items-center gap-1 ${
              isAudioPlaying
                ? 'bg-[#FEF08A] border-[#CA8A04] text-[#854D0E] animate-pulse'
                : 'bg-white border-amber-200 text-amber-700 hover:bg-[#FEF08A]/40'
            }`}
            title={isAudioPlaying ? 'Mute romantic tune' : 'Play cute romantic tune'}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-4 h-4" />
                <span className="text-xs font-cute font-bold hidden sm:inline">Playing ♪</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="text-xs font-cute hidden sm:inline">Play Tune</span>
              </>
            )}
          </button>

          {/* Secret Vatsal Corner Shortcut */}
          <button
            onClick={onOpenSecretAdmin}
            className="relative p-2 rounded-full bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 text-amber-800 transition-all hover:scale-105"
            title="Vatsal's Private Corner (Messages & Visitor Stats)"
          >
            <Lock className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[10px] rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
