import React from 'react';
import { Heart, Sun, Lock } from 'lucide-react';

interface FooterProps {
  onOpenSecretAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSecretAdmin }) => {
  return (
    <footer className="mt-20 border-t-2 border-dashed border-amber-300 bg-[#FEF08A]/40 py-10 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Animated Sunflower */}
        <div className="inline-block text-4xl animate-bounce">
          🌻
        </div>

        <h3 className="font-cute text-2xl font-bold text-amber-950">
          Handcrafted With Infinite Love For You
        </h3>

        <p className="font-handwritten text-2xl text-amber-900 max-w-lg mx-auto">
          "You are my sunshine, my only sunshine. You make me happy when skies are gray." 💛
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs font-cute text-amber-800 border-t border-amber-300/60 max-w-md mx-auto">
          <span>Created by Vatsal with 💖 & Sunflowers</span>
          <span className="hidden sm:inline">•</span>
          <button
            onClick={onOpenSecretAdmin}
            className="hover:underline text-amber-900 font-bold flex items-center gap-1 bg-amber-200/80 px-2.5 py-1 rounded-full border border-amber-300"
          >
            <Lock className="w-3 h-3 text-amber-800" />
            <span>Vatsal's Private Corner</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
