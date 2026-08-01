import React from 'react';

export const Footer: React.FC = () => {
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

        <div className="pt-4 flex items-center justify-center gap-3 text-xs font-cute text-amber-800 border-t border-amber-300/60 max-w-md mx-auto">
          <span>Created by Vatsal with 💖 & Sunflowers</span>
        </div>

      </div>
    </footer>
  );
};
