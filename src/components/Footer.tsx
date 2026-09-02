import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

function InstagramIcon({ size = 20, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const QUICK_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
];

const COMPANY_LINKS = [
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { icon: InstagramIcon, href: 'https://instagram.com/citycentralindia', label: 'Instagram' },
  { icon: MessageCircle, href: 'https://wa.me/918889825105', label: 'WhatsApp' },
  { icon: Phone, href: 'tel:+918889825105', label: 'Phone' },
  { icon: Mail, href: 'mailto:work@socialcitycentral.in', label: 'Email' },
];

function scrollTo(href: string) {
  if (href.startsWith('#')) {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const NAVBAR_HEIGHT = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        background: 'var(--bg-secondary)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: '0 var(--container-padding)',
        }}
      >
        {/* Top section */}
        <div
          style={{
            paddingTop: 'clamp(60px, 8vw, 120px)',
            paddingBottom: 'clamp(48px, 6vw, 80px)',
          }}
        >
          {/* Huge brand name */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: ease }}
            style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              margin: '0 0 16px 0',
            }}
          >
            CITYCENTRAL.IN
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8, ease: ease }}
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              margin: 0,
              maxWidth: '600px',
              marginBottom: 'clamp(48px, 6vw, 80px)',
            }}
          >
            Turning businesses into brands through strategy, creativity and data.
          </motion.p>

          {/* Three columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(32px, 4vw, 64px)',
            }}
            className="footer-columns"
          >
            {/* Column 1: Quick Links */}
            <div>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--electric-blue)',
                  margin: '0 0 24px 0',
                }}
              >
                Quick Links
              </h3>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {QUICK_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    style={{
                      fontSize: '15px',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Column 2: Company */}
            <div>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--electric-blue)',
                  margin: '0 0 24px 0',
                }}
              >
                Company
              </h3>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {COMPANY_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    style={{
                      fontSize: '15px',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Column 3: Get In Touch */}
            <div>
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--electric-blue)',
                  margin: '0 0 24px 0',
                }}
              >
                Get In Touch
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <a
                  href="tel:+918889825105"
                  style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  }}
                >
                  +91 8889825105
                </a>
                <a
                  href="mailto:work@socialcitycentral.in"
                  style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  }}
                >
                  work@socialcitycentral.in
                </a>
                <a
                  href="https://socialcitycentral.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  }}
                >
                  socialcitycentral.in
                </a>
                <a
                  href="https://instagram.com/citycentralindia"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  }}
                >
                  @citycentralindia
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social icons row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '16px',
            paddingBottom: 'clamp(32px, 4vw, 48px)',
          }}
        >
          {SOCIAL_LINKS.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              whileHover={{ scale: 1.1, y: -2 }}
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'border-color 0.3s ease, color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--electric-blue)';
                (e.currentTarget as HTMLElement).style.color = 'var(--electric-blue)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)';
                (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)';
              }}
              aria-label={social.label}
            >
              <social.icon size={20} strokeWidth={1.5} />
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'var(--border-color)',
          }}
        />

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            padding: 'clamp(24px, 3vw, 36px) 0',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: 'var(--text-muted)',
              margin: 0,
            }}
          >
            &copy; 2026 City Central India. All rights reserved.
          </p>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--text-muted)',
              margin: 0,
            }}
          >
            Built with care in Indore, India.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-columns {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}
