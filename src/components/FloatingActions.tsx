import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

const PHONE = '+918889825105';
const WHATSAPP = 'https://wa.me/918889825105';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      zIndex: 999,
    }}>
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'scale(1)' : 'scale(0.8)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
        }}
      >
        <ArrowUp size={18} />
      </button>

      <motion.a
        href={`tel:${PHONE}`}
        aria-label="Call us"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'var(--electric-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(31, 72, 255, 0.3)',
        }}
      >
        <Phone size={18} />
      </motion.a>

      <motion.a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.3)',
        }}
      >
        <MessageCircle size={18} />
      </motion.a>
    </div>
  );
}
