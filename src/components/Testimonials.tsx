import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Marcus T.',
    service: 'Full Interior & Exterior',
    text: 'Absolutely blown away. They came to my office and my truck looked brand new by the time I left work. Worth every penny.',
    rating: 5,
  },
  {
    name: 'Sarah K.',
    service: 'Signature Ceramic Coating',
    text: 'The ceramic coating is unreal. Water just slides off. Professional team, on time, and the finish is glass-smooth.',
    rating: 5,
  },
  {
    name: 'David L.',
    service: 'Express Detail',
    text: 'Booked the express detail before selling my car. The buyer thought it was practically new. Highly recommend.',
    rating: 5,
  },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-label="Google">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Client Reviews</span>
          <h2 className="section-heading">
            What Our <span className="text-gold">Clients Say</span>
          </h2>
          {/* Google aggregate badge */}
          <div className="inline-flex items-center gap-3 mt-6 bg-dark-300 border border-dark-500 rounded-full px-5 py-2.5">
            <GoogleIcon />
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
              ))}
            </div>
            <span className="text-white font-bold text-sm">4.9</span>
            <span className="text-gray-500 text-xs">on Google Reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="card-dark relative flex flex-col">
              {/* Google badge top-right */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-dark-500 rounded-full px-2.5 py-1">
                <GoogleIcon />
                <span className="text-gray-400 text-[10px] font-medium">Google</span>
              </div>

              <Quote className="w-7 h-7 text-gold/25 mb-3" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">"{r.text}"</p>

              <div className="pt-4 border-t border-dark-500">
                <p className="text-white font-semibold text-sm">{r.name}</p>
                <p className="text-gold text-xs mt-1">{r.service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
