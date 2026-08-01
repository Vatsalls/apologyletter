import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroLetter } from './components/HeroLetter';
import { GallerySection } from './components/GallerySection';
import { MemoryTimeline } from './components/MemoryTimeline';
import { LoveCoupons } from './components/LoveCoupons';
import { MessageForm } from './components/MessageForm';
import { SecretInboxModal } from './components/SecretInboxModal';
import { Footer } from './components/Footer';

import { PhotoItem, AdminData, LoveCoupon } from './types';
import { DEFAULT_LETTER, INITIAL_PHOTOS, INITIAL_TIMELINE, INITIAL_COUPONS } from './data/initialData';
import { musicBox } from './utils/audioSynth';

import heroImg from './assets/images/sunflower_doodle_hero_1785576747436.jpg';
import envelopeImg from './assets/images/sunflower_envelope_seal_1785576762412.jpg';

export default function App() {
  const [photos, setPhotos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [letterText, setLetterText] = useState<string>(DEFAULT_LETTER);
  const [timeline] = useState(INITIAL_TIMELINE);
  const [coupons, setCoupons] = useState<LoveCoupon[]>(INITIAL_COUPONS);

  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isSecretAdminOpen, setIsSecretAdminOpen] = useState(false);
  const [adminData, setAdminData] = useState<AdminData | null>(null);

  // Load / Track visitor count on initial load
  useEffect(() => {
    fetch('/api/visit', { method: 'POST' })
      .then((res) => res.json())
      .then(() => fetchAdminData())
      .catch((err) => console.log('Visit logged locally:', err));
  }, []);

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin/data');
      if (res.ok) {
        const data = await res.json();
        setAdminData(data);
        if (data.customLetter) {
          setLetterText(data.customLetter);
        }
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
  };

  const handleToggleAudio = () => {
    const newState = musicBox.toggle();
    setIsAudioPlaying(newState);
  };

  const handleUpdateLetter = async (newText: string) => {
    setLetterText(newText);
    try {
      await fetch('/api/admin/update-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ letter: newText }),
      });
      fetchAdminData();
    } catch (err) {
      console.error('Failed to sync letter to server:', err);
    }
  };

  const handleAddPhoto = (newPhoto: PhotoItem) => {
    setPhotos([newPhoto, ...photos]);
  };

  const handleLikePhoto = (id: string) => {
    setPhotos(
      photos.map((p) => (p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p))
    );
  };

  const handleRedeemCoupon = (id: string) => {
    setCoupons(
      coupons.map((c) => (c.id === id ? { ...c, redeemed: true } : c))
    );
  };

  const handleSendMessage = async (
    senderName: string,
    message: string,
    mood: string
  ) => {
    const res = await fetch('/api/send-message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ senderName, message, mood }),
    });

    const data = await res.json();
    fetchAdminData();
    return data;
  };

  const handleOpenAdmin = () => {
    fetchAdminData();
    setIsSecretAdminOpen(true);
  };

  return (
    <div className="min-h-screen paper-bg font-body text-[#4A3E3D] relative overflow-x-hidden">
      
      {/* Sticky Header Navigation */}
      <Navbar
        onOpenSecretAdmin={handleOpenAdmin}
        isAudioPlaying={isAudioPlaying}
        toggleAudio={handleToggleAudio}
        unreadCount={adminData?.messages?.filter((m) => !m.read).length || 0}
      />

      <main className="space-y-6">
        {/* Landing Hero & Interactive Letter */}
        <HeroLetter
          letterText={letterText}
          onUpdateLetter={handleUpdateLetter}
          heroImage={heroImg}
          envelopeImage={envelopeImg}
        />

        {/* Gallery Section with Cute Doodle Borders */}
        <GallerySection
          photos={photos}
          onAddPhoto={handleAddPhoto}
          onLikePhoto={handleLikePhoto}
        />

        {/* Memory Timeline */}
        <MemoryTimeline timeline={timeline} />

        {/* Redeemable Love Coupons */}
        <LoveCoupons coupons={coupons} onRedeem={handleRedeemCoupon} />

        {/* Message Form (Sends to Vatsal's Email: vatsalpatelwork20@gmail.com) */}
        <MessageForm onSendMessage={handleSendMessage} />
      </main>

      {/* Footer */}
      <Footer onOpenSecretAdmin={handleOpenAdmin} />

      {/* Secret Inbox & Visitor Stats Modal for Vatsal */}
      <SecretInboxModal
        isOpen={isSecretAdminOpen}
        onClose={() => setIsSecretAdminOpen(false)}
        adminData={adminData}
      />

    </div>
  );
}
