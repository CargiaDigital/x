import { Check, Calendar, Phone } from 'lucide-react';
import { PHONE, PHONE_HREF } from '@/lib/constants';

type AboutProps = {
  onBookClick: () => void;
};

export default function About({ onBookClick }: AboutProps) {
  const points = [
    'Convenient mobile service at your home or office',
    'Trained, licensed & fully insured professionals',
    'Premium, vehicle-safe products and equipment',
    'Transparent pricing with zero hidden fees',
  ];

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #08101c 0%, #0d1f3c 55%, #0f2548 100%)' }}
    >
      {/* Blue glow orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-brand/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-dark/15 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 max-w-12 bg-blue-brand/60" />
          <span className="text-blue-light text-xs font-bold tracking-[0.2em] uppercase">About Premier</span>
          <div className="h-px flex-1 max-w-12 bg-blue-brand/60" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image column */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-[0_8px_60px_rgba(26,107,255,0.2)]">
              <img
                src="/images/SaveClip.App_747643166_18070026101456554_765976489282664510_n.jpg"
                alt="White Audi R8 Spyder — Premier Mobile Details client vehicle"
                className="w-full h-[540px] object-cover object-center"
              />
              {/* Blue-to-transparent gradient bottom overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-deep/80 via-transparent to-transparent" />
              {/* Blue accent bar left */}
              <div className="absolute left-0 top-0 h-full w-1.5 bg-blue-gradient" />
              {/* Gold accent bar right */}
              <div className="absolute right-0 top-0 h-full w-1 bg-gold-gradient" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 hidden sm:block bg-dark-200/90 backdrop-blur-sm border border-blue-brand/40 rounded-xl p-5 shadow-blue">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-gold">5+</p>
                  <p className="text-gray-400 text-xs mt-0.5">Years</p>
                </div>
                <div className="w-px h-10 bg-dark-500" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-white">4.9★</p>
                  <p className="text-gray-400 text-xs mt-0.5">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
              Detailing Craftsmanship,{' '}
              <br />
              <span className="text-gold">Delivered to Your Door.</span>
            </h2>
            <p className="text-blue-light/80 text-base leading-relaxed mb-8">
              At Premier Mobile Details, we believe your vehicle deserves the
              finest care — without the hassle of driving to a shop. Our team
              brings professional-grade equipment and premium products directly
              to your home or office, delivering a flawless finish every time.
            </p>

            <ul className="space-y-3.5 mb-8">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-brand/20 border border-blue-brand/50 flex items-center justify-center mt-0.5">
                    <Check className="w-3.5 h-3.5 text-blue-light" />
                  </span>
                  <span className="text-gray-300 text-sm">{p}</span>
                </li>
              ))}
            </ul>

            {/* Stats row */}
            <div className="flex gap-8 pb-8 border-b border-blue-brand/20 mb-8">
              <div>
                <p className="text-2xl font-bold text-white">2,000+</p>
                <p className="text-gray-500 text-xs mt-1">Cars Detailed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-gray-500 text-xs mt-1">Satisfaction</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">5★</p>
                <p className="text-gray-500 text-xs mt-1">Google Rating</p>
              </div>
            </div>

            {/* Gold CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onBookClick}
                className="btn-gold flex items-center justify-center gap-2 px-7 py-3.5"
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </button>
              <a
                href={PHONE_HREF}
                className="btn-outline-gold flex items-center justify-center gap-2 px-7 py-3.5"
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
