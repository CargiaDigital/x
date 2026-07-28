import { Car, ArrowLeft } from 'lucide-react';
import BookingForm from '@/components/BookingForm';

type BookPageProps = {
  initialPackageId?: string;
  onBackHome: () => void;
};

export default function BookPage({ initialPackageId, onBackHome }: BookPageProps) {
  return (
    <div className="min-h-screen bg-dark-gradient flex flex-col">
      <header className="py-5 px-4 sm:px-6 border-b border-dark-500">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-6 h-6 text-gold" />
            <span className="text-white font-bold tracking-wider uppercase text-sm">
              Premier <span className="text-gold">Mobile</span> Details
            </span>
          </div>
          <button
            onClick={onBackHome}
            className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <p className="text-gold text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Schedule Your Detail
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Book Your <span className="text-gold">Appointment</span>
            </h1>
            <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
              Pick a date and time that works for you and we'll handle the rest.
            </p>
          </div>

          <div className="bg-dark-200 border border-dark-500 rounded-xl shadow-card p-6 sm:p-8">
            <BookingForm initialPackageId={initialPackageId} onComplete={onBackHome} />
          </div>

          <p className="text-center text-gray-600 text-xs mt-6">
            Premier Mobile Details · Fully Insured · Satisfaction Guaranteed
          </p>
        </div>
      </main>
    </div>
  );
}
