import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { goHome, navigateToSection, NAVBAR_HEIGHT, PHONE_TEL } from '../lib/router';

const ease = [0.16, 1, 0.3, 1] as const;

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
] as const;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false);
    if (href === '#home') {
      goHome();
      return;
    }
    navigateToSection(href.replace('#', ''));
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: ease }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: NAVBAR_HEIGHT,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'background-color 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s cubic-bezier(0.16,1,0.3,1), backdrop-filter 0.4s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
            padding: '0 var(--container-padding)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              goHome();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <img
              src="/logo.png"
              alt="City Central India"
              className="nav-logo"
              style={{
                height: '72px',
                width: 'auto',
                maxHeight: '72px',
                objectFit: 'contain',
              }}
            />
          </a>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--text-secondary)';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right: Theme Toggle + CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
            className="desktop-actions"
          >
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                transition: 'background-color 0.2s ease, color 0.2s ease',
                border: '1px solid var(--border-color)',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-secondary)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
              }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href={PHONE_TEL}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                backgroundColor: 'var(--electric-blue)',
                borderRadius: '6px',
                textDecoration: 'none',
                transition: 'background-color 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-hover)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--electric-blue)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              GET FREE CONSULTATION
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
            }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Overlay - CSS toggled, no AnimatePresence */}
      <div
        className="mobile-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          backgroundColor: 'var(--bg-primary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Mobile Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            goHome();
          }}
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <img
            src="/logo.png"
            alt="City Central India"
            className="mobile-logo-img"
            style={{
              height: '60px',
              width: 'auto',
              maxHeight: '60px',
              objectFit: 'contain',
            }}
          />
        </a>
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(link.href);
            }}
            style={{
              fontSize: 'clamp(28px, 6vw, 40px)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.05}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.05}s`,
            }}
          >
            {link.label}
          </a>
        ))}

        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.4s cubic-bezier(0.16,1,0.3,1) ${0.1 + NAV_LINKS.length * 0.05}s, transform 0.4s cubic-bezier(0.16,1,0.3,1) ${0.1 + NAV_LINKS.length * 0.05}s`,
          }}
        >
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
            }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

<a
                href={PHONE_TEL}
                style={{
              padding: '14px 32px',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              backgroundColor: 'var(--electric-blue)',
              borderRadius: '6px',
              textDecoration: 'none',
            }}
          >
            GET FREE CONSULTATION
          </a>
        </div>
      </div>

      {/* Responsive CSS injected via style tag */}
      <style>{`
        @media (max-width: 1023px) {
          .desktop-nav, .desktop-actions { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .nav-logo { height: 52px !important; max-height: 52px !important; }
        }
        @media (min-width: 1024px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-overlay { display: none !important; }
          .nav-logo { height: 60px !important; max-height: 60px !important; }
        }
        @media (max-width: 480px) {
          .mobile-overlay .mobile-logo-img { height: 52px !important; }
          .nav-logo { height: 48px !important; max-height: 48px !important; }
        }
      `}</style>
    </>
  );
}
