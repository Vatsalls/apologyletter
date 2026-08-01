import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroLetter } from './components/HeroLetter';
import { GallerySection } from './components/GallerySection';
import { MessageForm } from './components/MessageForm';
import { Footer } from './components/Footer';

import { PhotoItem, AdminData } from './types';
import { DEFAULT_LETTER, INITIAL_PHOTOS } from './data/initialData';

import heroImg from './assets/images/sunflower_doodle_hero_1785576747436.jpg';
import envelopeImg from './assets/images/sunflower_envelope_seal_1785576762412.jpg';

export default function App() {
  const [photos, setPhotos] = useState<PhotoItem[]>(INITIAL_PHOTOS);
  const [letterText, setLetterText] = useState<string>(DEFAULT_LETTER);
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

  return (
    <div className="min-h-screen paper-bg font-body text-[#4A3E3D] relative overflow-x-hidden">

      {/* Sticky Header Navigation */}
      <Navbar />

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

        {/* Message Form (Sends to Vatsal's Email: vatsalpatelwork20@gmail.com) */}
        <MessageForm onSendMessage={handleSendMessage} />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
