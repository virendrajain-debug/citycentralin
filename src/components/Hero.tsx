import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { PHONE_TEL } from '../lib/router';

const WORDS = ['STRATEGY', 'CREATIVITY', 'GROWTH'] as const;

const HEADLINES = [
  { text: "WE DON'T JUST", highlight: false },
  { text: 'MANAGE SOCIAL MEDIA.', highlight: false },
  { text: 'WE BUILD', highlight: false },
  { text: 'POWERFUL BRANDS.', highlight: true },
] as const;

const FLOAT_LABELS = [
  { label: 'ENGAGEMENT', x: '8%', y: '25%' },
  { label: 'REACH', x: '82%', y: '18%' },
  { label: 'CONTENT', x: '75%', y: '72%' },
  { label: 'GROWTH', x: '12%', y: '75%' },
] as const;

const PARTICLES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  size: 3 + (i % 3) * 2,
  startX: 10 + (i * 17) % 80,
  startY: 15 + (i * 23) % 70,
}));

const ease = [0.16, 1, 0.3, 1] as const;

function LineReveal({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ delay, duration: 0.8, ease: ease }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function FloatingLabel({ label, x, y, index }: { label: string; x: string; y: string; index: number }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile && index >= 2) return null;

  const duration = 8 + index * 2;
  const direction = index % 2 === 0 ? 1 : -1;

  return (
    <div
      className="hero-float-label"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        color: '#6A6A6A',
        border: '1px solid rgba(255,255,255,0.08)',
        padding: '8px 16px',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        zIndex: 1,
        animation: `heroFloat ${duration}s ease-in-out infinite`,
        ['--float-x1' as string]: `${15 * direction}px`,
        ['--float-x2' as string]: `${-10 * direction}px`,
      }}
    >
      {label}
    </div>
  );
}

function Particle({ id, size, startX, startY }: typeof PARTICLES[number]) {
  const duration = 12 + id * 1.5;
  const x1 = id % 2 === 0 ? 40 : -40;
  const x2 = id % 2 === 0 ? -20 : 20;

  return (
    <div
      className="hero-particle"
      style={{
        position: 'absolute',
        left: `${startX}%`,
        top: `${startY}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: 'var(--electric-blue)',
        zIndex: 1,
        animation: `heroParticle ${duration}s ease-in-out infinite`,
        ['--p-x1' as string]: `${x1}px`,
        ['--p-x2' as string]: `${x2}px`,
      }}
    />
  );
}

const CSS_KEYFRAMES = `
  @keyframes heroFloat {
    0%, 100% { opacity: 0; transform: translate(0, 0); }
    15% { opacity: 0.6; }
    50% { opacity: 0.4; transform: translate(var(--float-x1), -20px); }
    75% { opacity: 0.6; transform: translate(var(--float-x2), 10px); }
  }
  @keyframes heroParticle {
    0%, 100% { opacity: 0; transform: translate(0, 0); }
    15% { opacity: 0.4; }
    50% { opacity: 0.2; transform: translate(var(--p-x1), -60px); }
    75% { opacity: 0.4; transform: translate(var(--p-x2), 30px); }
  }
  @keyframes heroGlow {
    0%, 100% { transform: translate(-50%, -50%) translate(0, 0); }
    25% { transform: translate(-50%, -50%) translate(40px, -30px); }
    50% { transform: translate(-50%, -50%) translate(-20px, 20px); }
    75% { transform: translate(-50%, -50%) translate(30px, -10px); }
  }
`;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const particles = useMemo(() => PARTICLES, []);

  return (
    <section
      ref={ref}
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
      {/* Animated grid lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          zIndex: 0,
        }}
      />

      {/* Radial gradient glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(31,72,255,0.12) 0%, rgba(31,72,255,0) 70%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none',
          animation: 'heroGlow 10s ease-in-out infinite',
        }}
      />

      {/* Particles */}
      {isInView && particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}

      {/* Floating labels */}
      {FLOAT_LABELS.map((item, i) => (
        <FloatingLabel key={item.label} {...item} index={i} />
      ))}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: '120px var(--container-padding) 80px',
        }}
      >
        {/* Pre-headline sequence */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {WORDS.map((word, i) => (
            <div key={word} style={{ overflow: 'hidden' }}>
              <motion.span
                initial={{ y: '100%', opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  delay: 0.3 + i * 0.4,
                  duration: 0.6,
                  ease: ease,
                }}
                style={{
                  display: 'inline-block',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  color: 'var(--electric-blue)',
                }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Main headline */}
        <div style={{ marginBottom: '48px' }}>
          {HEADLINES.map((line, i) => (
            <LineReveal key={i} delay={1.5 + i * 0.2}>
              <h1
                style={{
                  fontSize: 'clamp(40px, 7.5vw, 110px)',
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  color: line.highlight ? 'var(--electric-blue)' : '#F5F5F5',
                  margin: 0,
                }}
              >
                {line.text}
              </h1>
            </LineReveal>
          ))}
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.5, duration: 0.8, ease: ease }}
          style={{
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            lineHeight: 1.7,
            color: '#C8C8C8',
            maxWidth: '640px',
            marginBottom: '40px',
          }}
        >
          CITY CENTRAL INDIA helps businesses grow through Branding, Social Media
          Management, AI Marketing, Creative Content and Website Development.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.8, duration: 0.8, ease: ease }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
          className="hero-cta-group"
        >
          <a
            href={PHONE_TEL}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 32px',
              fontSize: '14px',
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
              e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--electric-blue)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Get Free Consultation
          </a>

          <a
            href="#work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 32px',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: '#F5F5F5',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
              e.currentTarget.style.borderColor = '#6A6A6A';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            View Our Work
          </a>
        </motion.div>
      </div>
      <style>{`
        ${CSS_KEYFRAMES}
        @media (max-width: 768px) {
          .hero-float-label {
            display: none !important;
          }
          .hero-particle {
            opacity: 0.15 !important;
          }
          .hero-cta-group {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-cta-group a {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
