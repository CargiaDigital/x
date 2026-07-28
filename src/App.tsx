import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureBadges from '@/components/FeatureBadges';
import About from '@/components/About';
import Services from '@/components/Services';
import OurWorks from '@/components/OurWorks';
import BeforeAfterSliders from '@/components/BeforeAfterSliders';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import ServiceAreas from '@/components/ServiceAreas';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import BookPage from '@/pages/BookPage';

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.replace(/^#/, '') || '/');

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace(/^#/, '') || '/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return route;
}

function App() {
  const route = useHashRoute();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPackage, setBookingPackage] = useState<string | undefined>(undefined);
  const [bookingCity, setBookingCity] = useState<string | undefined>(undefined);

  const openBooking = (packageId?: string) => {
    setBookingPackage(packageId);
    setBookingCity(undefined);
    setBookingOpen(true);
  };

  const openBookingWithCity = (city: string) => {
    setBookingPackage(undefined);
    setBookingCity(city);
    setBookingOpen(true);
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setBookingPackage(undefined);
    setBookingCity(undefined);
  };

  // Standalone /book route
  if (route === '/book' || route === 'book') {
    const params = new URLSearchParams(window.location.search);
    const pkgParam = params.get('package') || undefined;
    return (
      <BookPage
        initialPackageId={pkgParam}
        onBackHome={() => { window.location.hash = '/'; }}
      />
    );
  }

  return (
    <div className="bg-dark min-h-screen">
      <Navbar onBookClick={() => openBooking()} />
      <Hero onBookClick={() => openBooking()} />
      <FeatureBadges />
      <About onBookClick={() => openBooking()} />
      <Services onBookClick={openBooking} />
      <BeforeAfterSliders />
      <OurWorks />
      <HowItWorks />
      <Testimonials />
      <ServiceAreas onAreaClick={openBookingWithCity} />
      <FAQ />
      <Footer onBookClick={() => openBooking()} />
      <BookingModal
        open={bookingOpen}
        initialPackageId={bookingPackage}
        initialCity={bookingCity}
        onClose={closeBooking}
      />
    </div>
  );
}

export default App;
