import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Edit3, Check, Volume2, Music, Sun } from 'lucide-react';

interface HeroLetterProps {
  letterText: string;
  onUpdateLetter: (newText: string) => void;
  heroImage?: string;
  envelopeImage?: string;
}

export const HeroLetter: React.FC<HeroLetterProps> = ({
  letterText,
  onUpdateLetter,
  heroImage,
  envelopeImage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(letterText);

  const handleSaveLetter = () => {
    onUpdateLetter(editedText);
    setIsEditing(false);
  };

  return (
    <section id="letter-section" className="relative py-12 md:py-20 px-4 max-w-4xl mx-auto text-center">
      
      {/* Decorative Doodle Floating Sunflowers */}
      <div className="absolute top-4 left-4 sm:left-12 opacity-80 animate-float pointer-events-none select-none">
        <span className="text-4xl sm:text-5xl">🌻</span>
      </div>
      <div className="absolute top-12 right-4 sm:right-12 opacity-80 animate-float [animation-delay:2s] pointer-events-none select-none">
        <span className="text-4xl sm:text-5xl">✨</span>
      </div>

      {/* Main Header */}
      <div className="inline-block mb-6 relative">
        <span className="washi-tape-yellow px-4 py-1 font-handwritten text-lg text-amber-900 inline-block mb-2">
          Special Delivery For My Sunshine 💌
        </span>
        <h2 className="font-cute text-3xl sm:text-5xl font-bold text-[#78350F] tracking-tight">
          Sunflowers, Sunshine & You 🌻
        </h2>
        <p className="font-handwritten text-xl sm:text-2xl text-[#92400E] mt-2">
          Click the envelope below to unseal your surprise love note!
        </p>
      </div>

      {/* Interactive Envelope Container */}
      <div className="mt-8 relative max-w-2xl mx-auto">
        
        {!isOpen ? (
          /* Envelope Sealed State */
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.03, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer bg-[#FEF08A] border-4 border-dashed border-[#CA8A04] rounded-2xl p-8 sm:p-12 polaroid-shadow relative overflow-hidden group transition-all"
          >
            {/* Top Washi Tape */}
            <div className="washi-tape-pink absolute -top-3 left-1/2 -translate-x-1/2 px-8 py-1.5 font-handwritten text-sm text-pink-900 font-bold shadow-sm">
              TAP TO UNOPEN 🌻
            </div>

            {/* Envelope Artwork */}
            <div className="flex flex-col items-center justify-center my-4">
              {envelopeImage ? (
                <img
                  src={envelopeImage}
                  alt="Envelope with Sunflower Seal"
                  referrerPolicy="no-referrer"
                  className="w-48 h-48 object-cover rounded-2xl border-2 border-amber-300 shadow-md group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-amber-200 border-4 border-amber-400 flex items-center justify-center text-6xl shadow-inner group-hover:rotate-12 transition-transform">
                  🌻
                </div>
              )}

              <div className="mt-6 flex items-center gap-2 bg-white/90 px-6 py-2.5 rounded-full border-2 border-amber-400 text-amber-900 font-cute font-bold shadow-sm group-hover:bg-amber-300 transition-colors">
                <Heart className="w-5 h-5 fill-amber-600 text-amber-600 animate-pulse" />
                <span>Open Vatsal's Letter</span>
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
            </div>

            {/* Doodle Stamp Details */}
            <div className="absolute bottom-3 right-4 font-handwritten text-amber-800 text-sm border-2 border-amber-400 p-1.5 rounded rotate-3 bg-white/70">
              STAMP: 100% LOVE 💖
            </div>
          </motion.div>
        ) : (
          /* Opened Letter Paper State */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-[#FFFDF6] border-4 border-[#EAB308] rounded-2xl p-6 sm:p-10 polaroid-shadow relative text-left"
            >
              {/* Paper Washi Tapes */}
              <div className="washi-tape-yellow absolute -top-4 left-6 px-6 py-1 font-handwritten text-xs text-amber-900">
                To My Favorite Sunflower 🌻
              </div>
              <div className="washi-tape-pink absolute -top-4 right-6 px-6 py-1 font-handwritten text-xs text-pink-900">
                With All My Heart 💖
              </div>

              {/* Close / Edit Controls */}
              <div className="flex justify-between items-center mb-6 pt-2 border-b border-amber-200 pb-3">
                <span className="font-handwritten text-[#92400E] text-xl font-bold flex items-center gap-1.5">
                  <Sun className="w-5 h-5 text-amber-500 fill-amber-400 animate-spin-slow" />
                  A Letter From Vatsal
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-xs font-cute text-amber-800 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full border border-amber-300 flex items-center gap-1 transition-colors"
                    title="Customize Letter Text"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditing ? 'Cancel Edit' : 'Edit Letter'}</span>
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-cute text-amber-900 hover:bg-amber-100 px-3 py-1 rounded-full border border-amber-200 transition-colors"
                  >
                    Fold Up ✉️
                  </button>
                </div>
              </div>

              {/* Letter Content or Editor */}
              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    rows={8}
                    className="w-full p-4 font-handwritten text-2xl text-[#4A3E3D] bg-white border-2 border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleSaveLetter}
                      className="px-4 py-2 bg-[#EAB308] hover:bg-[#CA8A04] text-white font-cute font-bold rounded-lg flex items-center gap-1 shadow-sm transition-colors"
                    >
                      <Check className="w-4 h-4" /> Save Custom Letter
                    </button>
                  </div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap font-handwritten text-2xl sm:text-3xl text-[#573902] leading-relaxed tracking-wide">
                  {letterText}
                </div>
              )}

              {/* Bottom Doodle Sign-off */}
              <div className="mt-8 pt-4 border-t-2 border-dashed border-amber-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-amber-800 font-handwritten text-lg">
                  <span>🌻 Handcrafted with infinite love</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-bounce">🐝</span>
                  <span className="font-handwritten text-amber-900 text-xl">Forever & Always</span>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        )}

      </div>

    </section>
  );
};
