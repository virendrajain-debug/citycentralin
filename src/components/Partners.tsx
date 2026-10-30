import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const PARTNERS = [
  {
    name: 'Maniramji Jewellers',
    location: 'Jewellery Partner',
    src: '/partner-maniramji.webp',
  },
  {
    name: 'Career Sakha',
    location: 'Career Partner',
    src: '/partner-careersakha.jpg',
  },
  {
    name: 'Cashify',
    location: 'Usha Nagar Store',
    src: '/partner-cashify.webp',
  },
] as const;

export default function Partners() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={containerRef}
      aria-label="Our partners"
      style={{
        position: 'relative',
        padding: 'var(--section-padding) 0',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: '0 var(--container-padding)',
        }}
      >
        {/* Section label */}
        <div style={{ overflow: 'hidden', marginBottom: '12px' }}>
          <motion.span
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: ease }}
            className="section-label"
            style={{ display: 'inline-flex' }}
          >
            Our Partners
          </motion.span>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: 'clamp(40px, 5vw, 64px)', maxWidth: '620px' }}>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.9, ease: ease }}
              style={{
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                margin: 0,
                color: 'var(--text-primary)',
              }}
            >
              Brands we are working with.
            </motion.h2>
          </div>
        </div>

        {/* Partner logo tiles */}
        <div
          className="partners-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 'clamp(16px, 2vw, 28px)',
          }}
        >
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.3 + i * 0.15,
                duration: 0.8,
                ease: ease,
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                padding: 'clamp(28px, 4vw, 48px) clamp(20px, 3vw, 36px)',
                borderRadius: '18px',
                background: '#FFFFFF',
                border: '1px solid var(--border-color)',
                boxShadow: '0 2px 20px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  loading="lazy"
                  decoding="async"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '120px',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </div>

              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#0A0A0A',
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {partner.name}
                </p>
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#8A8A8A',
                    margin: '4px 0 0 0',
                  }}
                >
                  {partner.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .partners-grid {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
