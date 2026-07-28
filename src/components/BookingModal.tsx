import { useEffect } from 'react';
import { X } from 'lucide-react';
import BookingForm from './BookingForm';

type BookingModalProps = {
  open: boolean;
  initialPackageId?: string;
  initialCity?: string;
  onClose: () => void;
};

export default function BookingModal({ open, initialPackageId, initialCity, onClose }: BookingModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="absolute inset-0 bg-dark/90 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-dark-200 border border-dark-500 rounded-xl shadow-2xl my-8">
        <div className="flex items-center justify-between px-6 py-5 border-b border-dark-500 sticky top-0 bg-dark-200 rounded-t-xl z-10">
          <div>
            <p className="text-gold text-xs font-bold tracking-[0.2em] uppercase">Premier Mobile Details</p>
            <h2 className="text-white font-bold text-lg">Book Your Appointment</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gold transition-colors p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
          <BookingForm initialPackageId={initialPackageId} initialCity={initialCity} onComplete={onClose} />
        </div>
      </div>
    </div>
  );
}
