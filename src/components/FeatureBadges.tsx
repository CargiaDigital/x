import { Car, ShieldCheck, Sparkles, ThumbsUp } from 'lucide-react';

const features = [
  { icon: Car, title: '100% Mobile Service', desc: 'We come to you' },
  { icon: ShieldCheck, title: 'Fully Insured', desc: 'Licensed & covered' },
  { icon: Sparkles, title: 'Premium Products', desc: 'Pro-grade only' },
  { icon: ThumbsUp, title: 'Satisfaction Guaranteed', desc: 'Quality assured' },
];

export default function FeatureBadges() {
  return (
    <section id="features" className="bg-dark-100 border-y border-dark-500 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="flex items-center gap-3 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-dark-400 border border-gold/30 flex items-center justify-center group-hover:border-gold transition-colors">
                <f.icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">{f.title}</p>
                <p className="text-gray-500 text-xs">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
