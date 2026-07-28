import { Calendar, ChevronDown } from 'lucide-react';

type HeroProps = {
  onBookClick: () => void;
};

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="/images/SaveClip.App_743995761_18070032605456554_3909695548574855438_n.jpg"
          alt="Yellow Aston Martin sports car"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-dark/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/50 to-dark" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <p className="text-gold text-xs sm:text-sm font-bold tracking-[0.3em] uppercase mb-6 animate-fade-in">
          Premium Mobile Auto Detailing
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8">
          PREMIUM MOBILE DETAILING
          <br />
          THAT <span className="text-gold">COMES TO YOU</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Professional, fully-insured detailing at your home or office. We bring
          the showroom shine to your driveway.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={onBookClick} className="btn-gold flex items-center gap-2 px-8 py-4 text-base">
            <Calendar className="w-5 h-5" />
            Book Your Detail
          </button>
          <a href="#services" className="btn-outline-gold px-8 py-4 text-base">
            View Services
          </a>
        </div>
      </div>

      <a
        href="#features"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
