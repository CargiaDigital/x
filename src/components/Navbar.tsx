import { useEffect, useState } from 'react';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { PHONE, PHONE_HREF } from '@/lib/constants';

type NavbarProps = {
  onBookClick: () => void;
};

export default function Navbar({ onBookClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark/95 backdrop-blur-md border-b border-dark-500 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center group">
          <img
            src="/images/752509089_18071681270456554_6220982896886862741_n.jpg"
            alt="Premier Mobile Details logo"
            className="h-10 w-10 object-contain rounded bg-white/5 group-hover:opacity-90 transition-opacity"
          />
          <span className="ml-2.5 text-white font-bold text-sm sm:text-base tracking-wider uppercase hidden sm:block">
            Premier <span className="text-gold">Mobile</span> Details
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-gray-300 hover:text-gold transition-colors text-sm font-medium tracking-wide"
            >
              {link.label}
            </button>
          ))}
          <a
            href={PHONE_HREF}
            className="flex items-center gap-1.5 text-gray-300 hover:text-gold transition-colors text-sm font-medium"
          >
            <Phone className="w-4 h-4" />
            {PHONE}
          </a>
          <button onClick={onBookClick} className="btn-gold flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Book Online
          </button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-dark-200 border-t border-dark-500 mt-2">
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-left text-gray-300 hover:text-gold transition-colors text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
            <a href={PHONE_HREF} className="flex items-center gap-2 text-gray-300 hover:text-gold transition-colors text-sm font-medium">
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
            <button onClick={() => { setMobileOpen(false); onBookClick(); }} className="btn-gold flex items-center justify-center gap-2 w-full">
              <Calendar className="w-4 h-4" />
              Book Online
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
