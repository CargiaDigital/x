import { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

type GalleryImage = {
  src: string;
  alt: string;
};

const IMAGES: GalleryImage[] = [
  {
    src: '/images/SaveClip.App_743995761_18070032605456554_3909695548574855438_n.jpg',
    alt: 'Yellow Aston Martin DBS detailed exterior',
  },
  {
    src: '/images/SaveClip.App_743996841_18070032833456554_3409987902274517120_n.jpg',
    alt: 'Aston Martin detailed interior cockpit',
  },
  {
    src: '/images/SaveClip.App_744820531_18070027070456554_986704991547946424_n.jpg',
    alt: 'White Ford F-250 truck detailed at home',
  },
  {
    src: '/images/SaveClip.App_744820524_18070032821456554_7979682800319200025_n.jpg',
    alt: 'Red Ferrari Portofino exterior detail',
  },
  {
    src: '/images/SaveClip.App_744738068_18070032638456554_2026146738221336923_n.jpg',
    alt: 'Detailed engine bay showcase',
  },
];

export default function OurWorks() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxPos, setLightboxPos] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxPos(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  }, []);

  const goPrev = useCallback(() => {
    setLightboxPos((p) => (p - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  const goNext = useCallback(() => {
    setLightboxPos((p) => (p + 1) % IMAGES.length);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) goPrev();
    else if (delta < -50) goNext();
    touchStartX.current = null;
  };

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') goPrev();
    else if (e.key === 'ArrowRight') goNext();
  }, [closeLightbox, goPrev, goNext]);

  // Attach keyboard listener while lightbox open
  useEffect(() => {
    if (lightboxIndex === null) return;
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, onKey]);

  return (
    <section id="works" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-label">Our Portfolio</span>
          <h2 className="section-heading">
            Our <span className="text-gold">Works</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Real results from real customers. Tap any photo to view it full
            screen — swipe on mobile, use arrows on desktop.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {IMAGES.map((img, i) => (
            <button
              key={img.src}
              onClick={() => openLightbox(i)}
              className="relative overflow-hidden rounded-lg aspect-square group focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label={`Open ${img.alt} in lightbox`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-white" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="h-px w-8 bg-gold mb-2" />
                <p className="text-white text-xs font-medium leading-snug">{img.alt}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-dark/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-gray-400 hover:text-gold transition-colors p-2 z-10"
            aria-label="Close lightbox"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Prev arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-dark-400 border border-dark-600 text-white hover:border-gold hover:text-gold transition-colors flex items-center justify-center z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="max-w-4xl w-full px-16 sm:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={IMAGES[lightboxPos].src}
              alt={IMAGES[lightboxPos].alt}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4">
              <p className="text-gray-300 text-sm">{IMAGES[lightboxPos].alt}</p>
              <p className="text-gray-600 text-xs mt-1">
                {lightboxPos + 1} of {IMAGES.length}
              </p>
            </div>
          </div>

          {/* Next arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-dark-400 border border-dark-600 text-white hover:border-gold hover:text-gold transition-colors flex items-center justify-center z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
}
