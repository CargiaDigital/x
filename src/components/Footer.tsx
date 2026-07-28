import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { PHONE, PHONE_HREF } from '@/lib/constants';

type FooterProps = {
  onBookClick: () => void;
};

export default function Footer({ onBookClick }: FooterProps) {
  return (
    <footer className="bg-dark border-t border-dark-500 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/images/752509089_18071681270456554_6220982896886862741_n.jpg"
                alt="Premier Mobile Details logo"
                className="h-11 w-11 object-contain rounded bg-white/5"
              />
              <div>
                <span className="block text-white font-bold tracking-wider uppercase text-sm">
                  Premier <span className="text-gold">Mobile</span> Details
                </span>
                <span className="block text-gray-500 text-xs mt-0.5">Premium Auto Detailing</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-6">
              Premium mobile auto detailing delivered to your door. Fully
              insured, professional-grade products, and a flawless finish every
              time.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/premiermobiledetails"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-400 border border-dark-600 flex items-center justify-center hover:border-gold hover:text-gold text-gray-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-400 border border-dark-600 flex items-center justify-center hover:border-gold hover:text-gold text-gray-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-gold text-sm transition-colors">About</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-gold text-sm transition-colors">Services</a></li>
              <li><a href="#process" className="text-gray-400 hover:text-gold text-sm transition-colors">How It Works</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-gold text-sm transition-colors">FAQ</a></li>
              <li><button onClick={onBookClick} className="text-gold hover:text-gold-bright text-sm transition-colors">Book Online</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={PHONE_HREF} className="flex items-center gap-2 text-gray-400 hover:text-gold text-sm transition-colors">
                  <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                  <span>{PHONE}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <span>info@premiermobiledetails.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Dallas–Fort Worth, TX</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-dark-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Premier Mobile Details. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">Fully Insured · Satisfaction Guaranteed</p>
        </div>
      </div>
    </footer>
  );
}
