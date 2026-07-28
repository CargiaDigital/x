import { MapPin, ChevronRight } from 'lucide-react';
import { SERVICE_CITIES } from '@/lib/constants';

type ServiceAreasProps = {
  onAreaClick: (city: string) => void;
};

export default function ServiceAreas({ onAreaClick }: ServiceAreasProps) {
  return (
    <section id="areas" className="py-20 bg-dark border-t border-dark-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="section-label">Service Areas</span>
        <h2 className="section-heading mb-4">
          Areas We <span className="text-gold">Serve</span>
        </h2>
        <p className="text-gray-400 mb-3 max-w-xl mx-auto">
          We proudly bring our mobile detailing service to these locations.
          Tap your city to book an appointment — your location is pre-filled
          automatically.
        </p>
        <p className="text-gray-600 text-xs mb-10 flex items-center justify-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-gold" />
          Click a city to start booking
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {SERVICE_CITIES.map((city) => (
            <button
              key={city}
              onClick={() => onAreaClick(city)}
              className="group flex items-center justify-between gap-2 bg-dark-300 border border-dark-500 rounded px-4 py-3.5 hover:border-gold hover:bg-dark-400 transition-all text-left"
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-brand flex-shrink-0 group-hover:text-gold transition-colors" />
                <span className="text-gray-300 group-hover:text-white text-sm transition-colors">{city}</span>
              </span>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gold group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
