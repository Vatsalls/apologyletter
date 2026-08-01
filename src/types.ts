export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date?: string;
  frameStyle: 'polaroid' | 'sunflower' | 'scribble' | 'notebook' | 'tape';
  sticker?: string;
  likes?: number;
}

export interface MessageItem {
  id: string;
  senderName: string;
  message: string;
  mood?: string;
  timestamp: string;
  read?: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: string;
  tag: string;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  emoji: string;
  redeemed: boolean;
  code: string;
}

export interface AdminData {
  visitorCount: number;
  lastVisit: string | null;
  visitors: { time: string; userAgent: string }[];
  messages: MessageItem[];
  customLetter: string;
  targetEmail: string;
}
