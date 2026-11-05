import React, { useState } from 'react';
import { Eye, Sparkles } from 'lucide-react';
import { OrnateDivider } from './OrnateDivider';
import { LightboxModal, GalleryItem } from './LightboxModal';

// High-fidelity generated imagery
import groomImg from '../assets/images/kerala_muslim_groom_1793874103430.jpg';
import brideImg from '../assets/images/kerala_muslim_bride_1793874104118.jpg';
import hennaRingsImg from '../assets/images/wedding_henna_rings_1793840605998.jpg';
import stageImg from '../assets/images/royal_wedding_stage_1793840606152.jpg';
import banquetImg from '../assets/images/wedding_banquet_decor_1793840606931.jpg';
import mylanchiImg from '../assets/images/mylanchi_mehendi_ceremony_1793840625995.jpg';

export const GallerySection: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'photo-1',
      src: stageImg,
      title: 'The Royal Floral Pavilion',
      subtitle: 'Mughal arched wedding stage adorned with fresh white roses & glowing lanterns',
      aspect: 'col-span-1 md:col-span-2 row-span-1 md:row-span-2 aspect-[16/9] md:aspect-auto',
    },
    {
      id: 'photo-2',
      src: hennaRingsImg,
      title: 'Sacred Vows & Antique Rings',
      subtitle: 'Intricate bridal henna and jasmine mogra gajra garlands',
      aspect: 'col-span-1 row-span-1 aspect-[4/3]',
    },
    {
      id: 'photo-3',
      src: mylanchiImg,
      title: 'Mylanchi Raavu Traditions',
      subtitle: 'Joyful family mehendi night with traditional Malabar melodies and floral uruli',
      aspect: 'col-span-1 row-span-1 aspect-[4/3]',
    },
    {
      id: 'photo-4',
      src: banquetImg,
      title: 'The Royal Dastarkhwan Banquet',
      subtitle: 'Gilded tableware and ambient candlelight for an unforgettable feast',
      aspect: 'col-span-1 md:col-span-2 row-span-1 aspect-[16/9] md:aspect-[21/9]',
    },
    {
      id: 'photo-5',
      src: groomImg,
      title: 'Zayan | The Groom',
      subtitle: 'Ivory royal sherwani with gold kasavu embroidery and traditional Malabar regalia',
      aspect: 'col-span-1 row-span-1 aspect-[3/4]',
    },
    {
      id: 'photo-6',
      src: brideImg,
      title: 'Ayisha | The Bride',
      subtitle: 'Emerald green Kerala bridal attire adorned with heirloom Palakka & Kasu mala',
      aspect: 'col-span-1 row-span-1 aspect-[3/4]',
    },
  ];

  const handleNext = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % galleryItems.length);
    }
  };

  const handlePrev = () => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + galleryItems.length) % galleryItems.length
      );
    }
  };

  return (
    <section id="gallery" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#06281E] text-[#FDFBF7] overflow-hidden">
      {/* Background Islamic Arabesque Subtle Glow */}
      <div className="absolute inset-0 bg-arabesque-dark opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#145643]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-sans-body uppercase text-xs tracking-[0.25em] text-[#D4AF37] font-semibold">
              Moments of Splendor
            </span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7]">
            Royal Wedding Gallery
          </h2>
          <p className="font-cormorant italic text-lg sm:text-xl text-[#FDFBF7]/80 mt-2">
            A glimpse into the celebrations, cherished traditions, and regal splendor.
          </p>
          <OrnateDivider variant="gold" />
        </div>

        {/* Masonry / Curated Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative rounded-xl overflow-hidden cursor-pointer border border-[#D4AF37]/30 bg-[#0A3C2F] shadow-xl hover:border-[#D4AF37] transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image Frame with Fallback Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A3C2F]">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Gradient Scrim & Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06281E]/90 via-[#06281E]/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* View Icon Button on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#06281E]/80 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Caption Bar */}
                <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-cinzel text-base sm:text-lg text-[#FDFBF7] font-semibold tracking-wide">
                    {item.title}
                  </h3>
                  <p className="font-sans-body text-xs text-[#D4AF37]/90 mt-0.5 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <LightboxModal
          items={galleryItems}
          currentIndex={selectedPhotoIndex}
          onClose={() => setSelectedPhotoIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      </div>
    </section>
  );
};
