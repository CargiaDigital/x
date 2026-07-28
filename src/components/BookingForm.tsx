import { useState, useMemo } from 'react';
import {
  ArrowLeft, ArrowRight, Check, Loader2, Calendar, User, Phone, Car,
  Package as PackageIcon, Home, MapPin, Clock, MessageSquare, CheckCircle2,
} from 'lucide-react';
import { PACKAGES, TIME_SLOTS, SERVICE_CITIES } from '@/lib/constants';
import { type BookingInsert } from '@/lib/supabase';

type BookingFormProps = {
  initialPackageId?: string;
  initialCity?: string;
  onComplete?: () => void;
};

type FormState = {
  city: string;
  name: string;
  phone: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  packageId: string;
  propertyType: string;
  address: string;
  date: string;
  time: string;
  comments: string;
};

const STEPS = ['Service', 'Vehicle', 'Location', 'Schedule', 'Review'] as const;

export default function BookingForm({ initialPackageId, initialCity, onComplete }: BookingFormProps) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    city: initialCity ?? '',
    name: '',
    phone: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    packageId: initialPackageId ?? '',
    propertyType: '',
    address: '',
    date: '',
    time: '',
    comments: '',
  });

  const selectedPackage = useMemo(
    () => PACKAGES.find((p) => p.id === form.packageId),
    [form.packageId]
  );

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const today = new Date().toISOString().split('T')[0];

  const validateStep = (): boolean => {
    setError(null);
    if (step === 0) {
      if (!form.packageId) { setError('Please select a package'); return false; }
    }
    if (step === 1) {
      if (!form.name.trim()) { setError('Please enter your name'); return false; }
      if (!form.phone.trim()) { setError('Please enter your phone number'); return false; }
      if (!form.vehicleYear.trim()) { setError('Please enter vehicle year'); return false; }
      if (!form.vehicleMake.trim()) { setError('Please enter vehicle make'); return false; }
      if (!form.vehicleModel.trim()) { setError('Please enter vehicle model'); return false; }
    }
    if (step === 2) {
      if (!form.city.trim()) { setError('Please enter your city'); return false; }
      if (!form.propertyType) { setError('Please select house or apartment'); return false; }
      if (!form.address.trim()) { setError('Please enter your address'); return false; }
    }
    if (step === 3) {
      if (!form.date) { setError('Please select a date'); return false; }
      if (!form.time) { setError('Please select a time slot'); return false; }
    }
    return true;
  };

  const next = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    setError(null);

    const pkg = PACKAGES.find((p) => p.id === form.packageId);
    const payload: BookingInsert = {
      city: form.city,
      name: form.name,
      phone: form.phone,
      vehicle_year: form.vehicleYear,
      vehicle_make: form.vehicleMake,
      vehicle_model: form.vehicleModel,
      package: pkg?.name ?? form.packageId,
      price: pkg?.price ?? '',
      property_type: form.propertyType,
      address: form.address,
      appointment_date: form.date,
      appointment_time: form.time,
      comments: form.comments || undefined,
    };

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-booking`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Submission failed');
      }
    } catch {
      setError('Something went wrong submitting your booking. Please try again or call us.');
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border-2 border-gold mb-6">
          <CheckCircle2 className="w-10 h-10 text-gold" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Booking Request Sent!</h3>
        <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
          Thank you, {form.name.split(' ')[0]}. We've received your booking
          request and will text you shortly to confirm your {selectedPackage?.name}{' '}
          appointment on {new Date(form.date + 'T00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {form.time}.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(0);
            setForm({
              city: '', name: '', phone: '', vehicleYear: '', vehicleMake: '',
              vehicleModel: '', packageId: '', propertyType: '', address: '',
              date: '', time: '', comments: '',
            });
            onComplete?.();
          }}
          className="btn-outline-gold"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i < step
                    ? 'bg-gold-gradient text-dark'
                    : i === step
                    ? 'bg-blue-gradient text-white'
                    : 'bg-dark-400 text-gray-600 border border-dark-600'
                }`}
              >
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-[10px] mt-1.5 uppercase tracking-wide ${i === step ? 'text-gold' : 'text-gray-600'}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px flex-1 mx-2 mb-5 ${i < step ? 'bg-gold' : 'bg-dark-600'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 0: Service */}
      {step === 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <PackageIcon className="w-5 h-5 text-gold" />
            <h3 className="text-white font-bold text-lg">Select Your Package</h3>
          </div>
          {PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => update('packageId', pkg.id)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                form.packageId === pkg.id
                  ? 'border-gold bg-dark-400 shadow-gold'
                  : 'border-dark-600 bg-dark-300 hover:border-gold/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold text-sm">{pkg.name}</p>
                  <p className="text-gray-500 text-xs">{pkg.tagline}</p>
                </div>
                <div className="text-right">
                  <p className="text-gold font-bold text-lg">{pkg.price}</p>
                  <p className="text-gray-600 text-xs">{pkg.duration}</p>
                </div>
              </div>
              {form.packageId === pkg.id && (
                <div className="mt-2 flex items-center gap-1.5 text-gold text-xs">
                  <Check className="w-3.5 h-3.5" /> Selected
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Step 1: Vehicle & Contact */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-gold" />
            <h3 className="text-white font-bold text-lg">Your Info & Vehicle</h3>
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="John Doe"
              className="input-dark"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="(469) 555-0123"
              className="input-dark"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
              <span className="inline-flex items-center gap-1"><Car className="w-3.5 h-3.5" /> Vehicle (Year, Make, Model)</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input type="text" value={form.vehicleYear} onChange={(e) => update('vehicleYear', e.target.value)} placeholder="2021" className="input-dark" />
              <input type="text" value={form.vehicleMake} onChange={(e) => update('vehicleMake', e.target.value)} placeholder="Toyota" className="input-dark" />
              <input type="text" value={form.vehicleModel} onChange={(e) => update('vehicleModel', e.target.value)} placeholder="Camry" className="input-dark" />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Location */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-gold" />
            <h3 className="text-white font-bold text-lg">Service Location</h3>
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">City</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
              placeholder="Dallas, TX"
              className="input-dark"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">House or Apartment?</label>
            <div className="grid grid-cols-2 gap-3">
              {['House', 'Apartment'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => update('propertyType', opt)}
                  className={`p-4 rounded-lg border flex items-center gap-2 justify-center transition-all ${
                    form.propertyType === opt
                      ? 'border-gold bg-dark-400 text-gold'
                      : 'border-dark-600 bg-dark-300 text-gray-400 hover:border-gold/50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span className="text-sm font-medium">{opt}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">Full Address</label>
            <textarea
              value={form.address}
              onChange={(e) => update('address', e.target.value)}
              placeholder="123 Main St, Apt 4B, Dallas, TX 75201"
              rows={3}
              className="input-dark resize-none"
            />
          </div>
        </div>
      )}

      {/* Step 3: Schedule */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-gold" />
            <h3 className="text-white font-bold text-lg">Pick Your Date & Time</h3>
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">Date</label>
            <input
              type="date"
              min={today}
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
              className="input-dark"
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
              <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Time Slot</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => update('time', slot)}
                  className={`py-2.5 rounded text-xs font-medium transition-all ${
                    form.time === slot
                      ? 'bg-blue-gradient text-white'
                      : 'bg-dark-400 text-gray-400 border border-dark-600 hover:border-blue-brand'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-xs font-medium mb-1.5 uppercase tracking-wide">
              <span className="inline-flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> Comments (Optional)</span>
            </label>
            <textarea
              value={form.comments}
              onChange={(e) => update('comments', e.target.value)}
              placeholder="Any special instructions, gate codes, parking details..."
              rows={3}
              className="input-dark resize-none"
            />
          </div>
        </div>
      )}

      {/* Step 4: Review */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Check className="w-5 h-5 text-gold" />
            <h3 className="text-white font-bold text-lg">Review Your Booking</h3>
          </div>

          <div className="bg-dark-400 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-dark-600">
              <span className="text-gray-500 text-xs uppercase tracking-wide">Package</span>
              <div className="text-right">
                <span className="text-white font-semibold text-sm">{selectedPackage?.name}</span>
                <span className="text-gold font-bold ml-2">{selectedPackage?.price}</span>
              </div>
            </div>
            <ReviewRow icon={<User className="w-3.5 h-3.5" />} label="Name" value={form.name} />
            <ReviewRow icon={<Phone className="w-3.5 h-3.5" />} label="Phone" value={form.phone} />
            <ReviewRow icon={<Car className="w-3.5 h-3.5" />} label="Vehicle" value={`${form.vehicleYear} ${form.vehicleMake} ${form.vehicleModel}`} />
            <ReviewRow icon={<MapPin className="w-3.5 h-3.5" />} label="Location" value={`${form.address}, ${form.city}`} />
            <ReviewRow icon={<Home className="w-3.5 h-3.5" />} label="Property" value={form.propertyType} />
            <ReviewRow icon={<Calendar className="w-3.5 h-3.5" />} label="Date" value={form.date ? new Date(form.date + 'T00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : ''} />
            <ReviewRow icon={<Clock className="w-3.5 h-3.5" />} label="Time" value={form.time} />
            {form.comments && <ReviewRow icon={<MessageSquare className="w-3.5 h-3.5" />} label="Comments" value={form.comments} />}
          </div>

          <div className="bg-gold/5 border border-gold/30 rounded-lg p-4">
            <p className="text-gray-400 text-xs leading-relaxed">
              By submitting, you agree to receive a confirmation text. We'll
              reach out within 24 hours to finalize your appointment.
            </p>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="mt-4 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded px-3 py-2">
          {error}
        </p>
      )}

      {/* Nav buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-dark-600">
        <button
          onClick={back}
          disabled={step === 0}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${
            step === 0 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-gold'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {step < STEPS.length - 1 ? (
          <button onClick={next} className="btn-gold flex items-center gap-2">
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={submitting} className="btn-gold flex items-center gap-2 disabled:opacity-60">
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            {submitting ? 'Submitting...' : 'Confirm Booking'}
          </button>
        )}
      </div>
    </div>
  );
}

function ReviewRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1.5 text-gray-500 text-xs uppercase tracking-wide">
        {icon} {label}
      </span>
      <span className="text-white text-sm font-medium text-right max-w-[60%]">{value || '—'}</span>
    </div>
  );
}
