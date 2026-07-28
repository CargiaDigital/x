import { Check, Star, Clock, Phone } from 'lucide-react';
import { PACKAGES, PHONE, PHONE_HREF } from '@/lib/constants';

type ServicesProps = {
  onBookClick: (packageId?: string) => void;
};

const accentMap: Record<string, { border: string; iconColor: string; badge: string; price: string; top: string }> = {
  silver:   { border: 'border-gray-500/60',   iconColor: 'text-gray-400',   badge: 'bg-gray-600 text-white',              price: 'text-gray-300',   top: 'bg-gray-500' },
  teal:     { border: 'border-teal-500/60',    iconColor: 'text-teal-400',   badge: 'bg-teal-600 text-white',              price: 'text-teal-300',   top: 'bg-teal-500' },
  blue:     { border: 'border-blue-brand/60',  iconColor: 'text-blue-light', badge: 'bg-blue-dark text-white',             price: 'text-blue-light', top: 'bg-blue-brand' },
  gold:     { border: 'border-gold',           iconColor: 'text-gold',       badge: 'bg-gold-gradient text-dark',          price: 'text-gold',       top: 'bg-gold-bright' },
  platinum: { border: 'border-slate-300/60',   iconColor: 'text-slate-300',  badge: 'bg-slate-400 text-dark',              price: 'text-slate-200',  top: 'bg-slate-300' },
};

export default function Services({ onBookClick }: ServicesProps) {
  return (
    <section id="services" className="py-24 bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Service Packages</span>
          <h2 className="section-heading">
            Choose Your <span className="text-gold">Detailing Package</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Transparent pricing. Premium results. Every package includes our
            mobile service guarantee.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PACKAGES.map((pkg) => {
            const accent = accentMap[pkg.accent] ?? accentMap.blue;
            if (pkg.isCustom) {
              return (
                <div
                  key={pkg.id}
                  className="relative rounded-lg bg-dark-300 border border-blue-brand/50 p-8 flex flex-col items-center text-center justify-between hover:-translate-y-1 transition-all duration-300 shadow-blue"
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-3">{pkg.name}</h3>
                    <p className="text-gray-300 font-semibold text-base mb-2">{pkg.tagline}</p>
                    <p className="text-blue-light font-bold uppercase tracking-widest text-sm">
                      WE BUILD PACKAGES THAT FIT YOUR NEEDS.
                    </p>
                  </div>
                  <a
                    href={PHONE_HREF}
                    className="btn-blue flex items-center gap-2 w-full justify-center py-4 text-sm tracking-widest"
                  >
                    <Phone className="w-4 h-4" />
                    CALL FOR A QUOTE ON SPECIAL SERVICES!
                  </a>
                </div>
              );
            }

            return (
              <div
                key={pkg.id}
                className={`relative rounded-lg bg-dark-300 border ${accent.border} p-8 transition-all duration-300 hover:-translate-y-1 ${
                  pkg.highlight ? 'shadow-gold' : 'hover:shadow-card'
                }`}
              >
                {pkg.badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${accent.badge}`}
                  >
                    {pkg.badge}
                  </div>
                )}

                <div className={`w-full h-0.5 rounded-full mb-6 ${accent.top}`} />

                <h3 className="text-xl font-bold text-white mb-1">{pkg.name}</h3>
                <p className="text-gray-500 text-xs mb-4">{pkg.tagline}</p>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-4xl font-extrabold ${accent.price}`}>{pkg.price}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-6">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Est. {pkg.duration}</span>
                </div>

                <div className="h-px bg-dark-500 mb-6" />

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className={`w-4 h-4 ${accent.iconColor} flex-shrink-0 mt-0.5`} />
                      <span className="text-gray-300 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onBookClick(pkg.id)}
                  className={`w-full py-3 rounded-sm border font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                    pkg.highlight
                      ? 'bg-gold-gradient text-dark hover:opacity-90'
                      : `border-current ${accent.iconColor} hover:bg-white/5`
                  }`}
                >
                  Book This Package
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-500 text-sm mt-12 flex items-center justify-center gap-2">
          <Star className="w-4 h-4 text-gold" />
          All packages include free mobile service within our service area.
        </p>
      </div>
    </section>
  );
}
