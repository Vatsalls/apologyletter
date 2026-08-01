import { PhotoItem, TimelineEvent, LoveCoupon } from '../types';

export const DEFAULT_LETTER = `My Dearest Sunflower 🌻,

I created this cute little website just for you. From the moment you walked into my life, everything became brighter, warmer, and full of color—just like a field of sunflowers blooming under the morning sun.

Whenever you need a smile, I hope you come here to look at our memories, read this letter, and remember how deeply loved and appreciated you are every single day.

Thank you for being my sunshine, my best friend, and my favorite smile.

Forever Yours,
Vatsal 💛`;

export const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1000&q=80',
    caption: 'Blooming with happiness whenever I am with you 🌻',
    date: 'Summer Days',
    frameStyle: 'polaroid',
    sticker: '🌻',
    likes: 12
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80',
    caption: 'Holding hands & chasing sunset golden hours 💛',
    date: 'Favorite Memory',
    frameStyle: 'sunflower',
    sticker: '✨',
    likes: 18
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80',
    caption: 'Little moments that mean everything to us ☕',
    date: 'Cosy Afternoons',
    frameStyle: 'scribble',
    sticker: '💖',
    likes: 15
  },
  {
    id: 'photo-4',
    url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1000&q=80',
    caption: 'Fields of sunshine and sweet laughter 🐝',
    date: 'Roadtrip Magic',
    frameStyle: 'tape',
    sticker: '🍯',
    likes: 24
  },
  {
    id: 'photo-5',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80',
    caption: 'You make my heart skip a beat every time 🥰',
    date: 'Always & Forever',
    frameStyle: 'notebook',
    sticker: '💌',
    likes: 30
  },
  {
    id: 'photo-6',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    caption: 'Starry night skies & warm cuddles 🌌',
    date: 'Night Walk',
    frameStyle: 'polaroid',
    sticker: '🌙',
    likes: 21
  }
];

export const INITIAL_TIMELINE: TimelineEvent[] = [
  {
    id: 'tl-1',
    date: 'Day 1',
    title: 'The First Spark 🌟',
    description: 'The day we first started talking and time completely stood still.',
    icon: '✨',
    tag: 'Beginning'
  },
  {
    id: 'tl-2',
    date: 'Memory',
    title: 'Our Sunflower Date 🌻',
    description: 'Walking together under the bright yellow sky, laughing at silly jokes.',
    icon: '🌻',
    tag: 'Favorite'
  },
  {
    id: 'tl-3',
    date: 'Special',
    title: 'Late Night Heart-to-Hearts 💬',
    description: 'Talking for hours until the sun came up, realizing you are my home.',
    icon: '🌙',
    tag: 'Love'
  },
  {
    id: 'tl-4',
    date: 'Today & Beyond',
    title: 'Creating This Special Space 🎁',
    description: 'Building a cute digital garden just for you to celebrate us.',
    icon: '💖',
    tag: 'Forever'
  }
];

export const INITIAL_COUPONS: LoveCoupon[] = [
  {
    id: 'cp-1',
    title: 'One Super Warm Warm Hug 🤗',
    description: 'Redeem anytime for a tight 10-second bear hug with zero questions asked!',
    emoji: '🤗',
    redeemed: false,
    code: 'HUG-SUNSHINE-01'
  },
  {
    id: 'cp-2',
    title: 'You Pick The Movie Night 🎬',
    description: 'Complete movie authority + unlimited snacks prepared by Vatsal!',
    emoji: '🍿',
    redeemed: false,
    code: 'MOVIE-PICK-02'
  },
  {
    id: 'cp-3',
    title: 'Sunflower Coffee & Treat Date ☕',
    description: 'One surprise coffee, boba, or sweet treat delivered directly to you!',
    emoji: '🌻',
    redeemed: false,
    code: 'COFFEE-SUNFLOWER-03'
  },
  {
    id: 'cp-4',
    title: 'Win Any Friendly Argument 🏆',
    description: 'Show this ticket to immediately win any funny debate on the spot.',
    emoji: '👑',
    redeemed: false,
    code: 'ARGUMENT-WINNER-04'
  }
];
