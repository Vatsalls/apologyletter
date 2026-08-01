import React, { useState } from 'react';
import { LoveCoupon } from '../types';
import { Gift, Check, Sparkles, Heart } from 'lucide-react';

interface LoveCouponsProps {
  coupons: LoveCoupon[];
  onRedeem: (id: string) => void;
}

export const LoveCoupons: React.FC<LoveCouponsProps> = ({ coupons, onRedeem }) => {
  const [redeemedEffectId, setRedeemedEffectId] = useState<string | null>(null);

  const handleRedeemClick = (id: string) => {
    onRedeem(id);
    setRedeemedEffectId(id);
    setTimeout(() => setRedeemedEffectId(null), 3000);
  };

  return (
    <section id="coupons-section" className="py-12 md:py-20 px-4 max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="text-center mb-12">
        <span className="washi-tape-yellow px-6 py-1 font-handwritten text-lg text-amber-900 inline-block mb-3">
          Redeemable Love Vouchers 🎟️
        </span>
        <h2 className="font-cute text-3xl sm:text-5xl font-bold text-[#78350F]">
          Special Sunflower Love Coupons
        </h2>
        <p className="font-handwritten text-xl sm:text-2xl text-[#92400E] mt-2">
          Click "Redeem" whenever you want Vatsal to fulfill one of these promises!
        </p>
      </div>

      {/* Grid of Coupons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`border-3 border-dashed rounded-2xl p-6 relative transition-all polaroid-shadow ${
              coupon.redeemed
                ? 'bg-amber-100/70 border-amber-300 opacity-90'
                : 'bg-[#FFFDF6] border-[#CA8A04] hover:scale-[1.02]'
            }`}
          >
            {/* Coupon Notch Left & Right */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFFDF6] border-r-2 border-amber-300" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFFDF6] border-l-2 border-amber-300" />

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FEF08A] border-2 border-[#CA8A04] flex items-center justify-center text-3xl shrink-0 shadow-xs">
                {coupon.emoji}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-cute text-xl font-bold text-[#78350F]">
                    {coupon.title}
                  </h3>
                  <span className="font-mono text-[10px] text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded">
                    {coupon.code}
                  </span>
                </div>

                <p className="font-handwritten text-xl text-[#573902] mt-1 leading-snug">
                  {coupon.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-dashed border-amber-200 pt-3">
                  <span className="font-handwritten text-xs text-amber-800">
                    {coupon.redeemed ? 'STATUS: REDEEMED WITH LOVE 💕' : 'VALID FOR: INFINITE USES'}
                  </span>

                  {coupon.redeemed ? (
                    <span className="font-cute text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Claimed!
                    </span>
                  ) : (
                    <button
                      onClick={() => handleRedeemClick(coupon.id)}
                      className="px-4 py-1.5 bg-[#FDE047] hover:bg-[#FACC15] text-[#78350F] border-2 border-[#CA8A04] font-cute text-xs font-bold rounded-full shadow-xs hover:scale-105 transition-transform flex items-center gap-1"
                    >
                      <Gift className="w-3.5 h-3.5" /> Redeem Now!
                    </button>
                  )}
                </div>

              </div>
            </div>

            {/* Stamp Effect when redeemed */}
            {coupon.redeemed && (
              <div className="absolute bottom-4 right-6 font-handwritten text-rose-600 text-lg font-bold border-2 border-rose-400 p-1 rounded -rotate-12 bg-white/80 pointer-events-none">
                CLAIMED BY SUNSHINE 🌻
              </div>
            )}

            {redeemedEffectId === coupon.id && (
              <div className="absolute inset-0 bg-yellow-300/20 backdrop-blur-xs rounded-2xl flex items-center justify-center pointer-events-none animate-pulse">
                <span className="font-cute text-lg font-bold text-amber-900 bg-white px-4 py-2 rounded-full border-2 border-amber-400 shadow-md flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Redeemed! Vatsal is on it! 💖
                </span>
              </div>
            )}

          </div>
        ))}
      </div>

    </section>
  );
};
