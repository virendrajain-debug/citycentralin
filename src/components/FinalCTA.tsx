import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const CTA_CSS = `
  @keyframes ctaGlow1 {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.08; }
    33% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.16; }
    66% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.12; }
  }
  @keyframes ctaGlow2 {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.04; }
    33% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.08; }
    66% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.06; }
  }
`;

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  return (
    <>
    <section
      ref={containerRef}
      id="cta"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#08090D',
        overflow: 'hidden',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: CTA_CSS }} />

      {/* Animated radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '900px',
          height: '900px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(31,72,255,0.3) 0%, rgba(31,72,255,0) 65%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: isInView ? 'ctaGlow1 6s ease-in-out infinite' : 'none',
          opacity: isInView ? undefined : 0.04,
        }}
      />

      {/* Subtle secondary glow */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '48%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(182,25,46,0.2) 0%, rgba(182,25,46,0) 65%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: isInView ? 'ctaGlow2 8s ease-in-out 1s infinite' : 'none',
          opacity: isInView ? undefined : 0.02,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: '120px var(--container-padding)',
          textAlign: 'center',
        }}
      >
        {/* Huge headline with clip-path reveal */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ overflow: 'hidden' }}>
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.9, ease: ease }}
              style={{
                fontSize: 'clamp(48px, 10vw, 140px)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                color: 'rgba(255,255,255,0.15)',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              READY TO
            </motion.p>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.9, ease: ease }}
              style={{
                fontSize: 'clamp(48px, 10vw, 140px)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                color: 'var(--electric-blue)',
                margin: 0,
                textTransform: 'uppercase',
              }}
            >
              GROW YOUR BRAND?
            </motion.h2>
          </div>
        </div>

        {/* Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.8, ease: ease }}
          style={{
            marginBottom: '56px',
            maxWidth: '560px',
            margin: '0 auto 56px',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(16px, 1.4vw, 22px)',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.5)',
              margin: 0,
            }}
          >
            Book a free strategy call — no commitment, just a clear growth plan
            for your business.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8, ease: ease }}
          style={{ marginBottom: '64px' }}
        >
          <motion.a
            href="tel:+918889825105"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '20px 48px',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              backgroundColor: 'var(--electric-blue)',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#3A6AFF';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                'var(--electric-blue)';
            }}
          >
            BOOK FREE STRATEGY CALL
            <motion.span
              whileHover={{ x: 4 }}
              transition={{ duration: 0.25, ease: ease }}
            >
              <ArrowRight size={20} strokeWidth={2.5} />
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <a
            href="tel:+918889825105"
            style={{
              fontSize: 'clamp(14px, 1.2vw, 18px)',
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                'rgba(255,255,255,0.8)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                'rgba(255,255,255,0.4)';
            }}
          >
            +91 8889825105
          </a>
          <a
            href="mailto:work@socialcitycentral.in"
            style={{
              fontSize: 'clamp(14px, 1.2vw, 18px)',
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                'rgba(255,255,255,0.8)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                'rgba(255,255,255,0.4)';
            }}
          >
            work@socialcitycentral.in
          </a>
        </motion.div>
      </div>
    </section>

    <style>{`
      @media (max-width: 768px) {
        #cta a[style*="padding: 20px 48px"] {
          padding: 16px 32px !important;
          font-size: 13px !important;
        }
      }
    `}</style>
    </>
  );
}
