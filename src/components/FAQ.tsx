import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Do I need to be present during the detailing?',
    a: 'No, you do not need to be present the entire time. We just need access to your vehicle and a place to work. Many clients have us detail their car while they are at work or running errands.',
  },
  {
    q: 'What do I need to provide?',
    a: 'We bring all our own equipment, water, and power supply. All we need is access to your vehicle and enough space to work around it comfortably.',
  },
  {
    q: 'How long does a detail take?',
    a: 'It depends on the package. An Express Detail takes 1–2 hours, while a Full Interior & Exterior detail can take 5–6 hours. Ceramic coating services may take 1–2 days.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'We ask for at least 24 hours notice for cancellations or rescheduling. Same-day cancellations may incur a small fee to cover travel and setup costs.',
  },
  {
    q: 'Do you offer gift cards?',
    a: 'Yes! We offer gift cards in any package amount. They make a great gift for any car enthusiast. Contact us to purchase one.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-dark-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="section-label">FAQ</span>
          <h2 className="section-heading">
            Common <span className="text-gold">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="bg-dark-300 border border-dark-500 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-white font-semibold text-sm">{f.q}</span>
                {open === i ? (
                  <Minus className="w-4 h-4 text-gold flex-shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 text-gold flex-shrink-0" />
                )}
              </button>
              {open === i && (
                <div className="px-6 pb-4">
                  <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
