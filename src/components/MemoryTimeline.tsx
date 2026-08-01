import React from 'react';
import { TimelineEvent } from '../types';
import { Sparkles, Heart } from 'lucide-react';

interface MemoryTimelineProps {
  timeline: TimelineEvent[];
}

export const MemoryTimeline: React.FC<MemoryTimelineProps> = ({ timeline }) => {
  return (
    <section id="timeline-section" className="py-12 md:py-20 px-4 max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="text-center mb-12">
        <span className="washi-tape-pink px-6 py-1 font-handwritten text-lg text-pink-900 inline-block mb-3">
          Our Story So Far 📖
        </span>
        <h2 className="font-cute text-3xl sm:text-5xl font-bold text-[#78350F]">
          Timeline Of Golden Moments
        </h2>
        <p className="font-handwritten text-xl sm:text-2xl text-[#92400E] mt-2">
          Step by step, day by day, planting love like sunflowers.
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-4 border-dashed border-[#FDE047] ml-6 sm:ml-12 space-y-10">
        {timeline.map((event, idx) => (
          <div key={event.id} className="relative pl-8 sm:pl-10 group">
            
            {/* Timeline Sunflower Marker */}
            <div className="absolute -left-6 sm:-left-7 top-0 w-11 h-11 rounded-full bg-[#FEF08A] border-3 border-[#CA8A04] flex items-center justify-center text-xl shadow-sm group-hover:rotate-12 transition-transform">
              {event.icon || '🌻'}
            </div>

            {/* Event Card */}
            <div className="bg-[#FFFDF6] border-2 border-amber-300 rounded-2xl p-6 polaroid-shadow hover:border-amber-400 transition-all relative">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-handwritten text-lg font-bold text-amber-800 bg-amber-100 px-3 py-0.5 rounded-full border border-amber-200">
                  {event.date}
                </span>
                <span className="font-cute text-xs font-bold text-amber-700 uppercase tracking-wider bg-yellow-200/60 px-2.5 py-0.5 rounded-full">
                  {event.tag}
                </span>
              </div>

              <h3 className="font-cute text-2xl font-bold text-[#78350F] flex items-center gap-2">
                {event.title}
              </h3>

              <p className="font-handwritten text-2xl text-[#573902] mt-2 leading-relaxed">
                {event.description}
              </p>

              {/* Decorative Corner Doodle */}
              <div className="absolute bottom-2 right-3 opacity-30 group-hover:opacity-100 transition-opacity text-amber-600">
                <Heart className="w-4 h-4 fill-amber-400" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
