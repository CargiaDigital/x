import { PhoneCall, CalendarCheck, Sparkles, ThumbsUp } from 'lucide-react';

const steps = [
  { icon: PhoneCall, title: 'Book Online', desc: 'Choose your package and pick a time that works for you.' },
  { icon: CalendarCheck, title: 'We Confirm', desc: 'We text you to confirm your appointment details.' },
  { icon: Sparkles, title: 'We Detail', desc: 'Our team arrives fully equipped and gets to work.' },
  { icon: ThumbsUp, title: 'You Enjoy', desc: 'A flawless finish, delivered to your door.' },
];

export default function HowItWorks() {
  return (
    <section id="process" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">How It Works</span>
          <h2 className="section-heading">
            Simple <span className="text-gold">4-Step</span> Process
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="relative text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-300 border border-gold/40 mb-5">
                <s.icon className="w-7 h-7 text-gold" />
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-gradient text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-gold/30 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
