import { CalendarClock, Sparkles, ShieldCheck, Clock3 } from 'lucide-react';

type BookingFormProps = {
  initialPackageId?: string;
  initialCity?: string;
  onComplete?: () => void;
};

export default function BookingForm({ initialPackageId, initialCity, onComplete }: BookingFormProps) {
  const preselectNote =
    initialPackageId || initialCity
      ? `We've pre-selected ${initialPackageId ? 'your package' : 'your area'} — pick a time below to finish booking.`
      : null;

  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/30 mb-5">
        <CalendarClock className="w-8 h-8 text-gold" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">Schedule Your Detail</h3>
      <p className="text-gray-400 max-w-md mx-auto mb-6 text-sm leading-relaxed">
        Choose a date and time that works for you. You'll get an instant
        confirmation with all the details.
      </p>

      {preselectNote && (
        <p className="text-gold/90 text-xs bg-gold/5 border border-gold/20 rounded px-3 py-2 mb-6 max-w-md mx-auto">
          {preselectNote}
        </p>
      )}

      {/* Cal.com embed placeholder */}
      <div className="bg-dark-400 border border-dark-600 rounded-lg p-8 min-h-[420px] flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-gold/40 border-t-gold animate-spin mb-4" />
        <p className="text-gray-500 text-sm">Loading calendar…</p>
        <p className="text-gray-600 text-xs mt-1">
          Online scheduling will appear here once Cal.com is connected.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
        <Feature icon={<Sparkles className="w-4 h-4" />} label="Premium products" />
        <Feature icon={<ShieldCheck className="w-4 h-4" />} label="Fully insured" />
        <Feature icon={<Clock3 className="w-4 h-4" />} label="We come to you" />
      </div>

      {onComplete && (
        <button onClick={onComplete} className="btn-outline-gold mt-6">
          Done
        </button>
      )}
    </div>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 bg-dark-300 border border-dark-600 rounded px-3 py-2">
      <span className="text-gold">{icon}</span>
      <span className="text-gray-400 text-xs font-medium">{label}</span>
    </div>
  );
}
