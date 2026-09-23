import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { testimonials } from '../data/testimonials';

const ease = [0.16, 1, 0.3, 1] as const;
const AUTO_ROTATE_MS = 6000;

function StarRating() {
  return (
    <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: 'var(--electric-blue)', fontSize: '18px' }}>
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning || index === active) return;
    setIsTransitioning(true);
    setActive(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [active, isTransitioning]);

  const next = useCallback(() => {
    goTo((active + 1) % testimonials.length);
  }, [active, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [next, isPaused]);

  const t = testimonials[active];

  return (
    <section
      ref={containerRef}
      id="testimonials"
      style={{
        position: 'relative',
        padding: 'var(--section-padding) 0',
        background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 40%, var(--bg-secondary) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(31, 72, 255, 0.03) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

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
            Testimonials
          </motion.span>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: 'clamp(48px, 6vw, 80px)', maxWidth: '560px' }}>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.9, ease: ease }}
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                margin: 0,
                color: 'var(--text-primary)',
              }}
            >
              Brands that grew with us.
            </motion.h2>
          </div>
        </div>

        {/* Quote area */}
        <div
          style={{ position: 'relative', minHeight: '320px' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Large quote mark */}
          <span
            style={{
              position: 'absolute',
              top: '-20px',
              left: '-10px',
              fontSize: '200px',
              fontWeight: 800,
              lineHeight: 1,
              color: 'var(--electric-blue)',
              opacity: 0.04,
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
            }}
          >
            &ldquo;
          </span>

          {/* Quote content - fade transition via CSS */}
          <div
            key={active}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              width: '100%',
              padding: '0 clamp(16px, 4vw, 48px)',
              animation: 'testimonialFade 0.5s ease-out',
            }}
          >
            <StarRating />

            <div
              style={{
                width: '48px',
                height: '1px',
                background: 'var(--border-color)',
                marginBottom: '32px',
              }}
            />

            <blockquote
              style={{
                fontSize: 'clamp(20px, 2vw, 28px)',
                fontWeight: 400,
                lineHeight: 1.6,
                color: 'var(--text-primary)',
                margin: '0 0 40px 0',
                fontStyle: 'italic',
                maxWidth: '700px',
                letterSpacing: '-0.01em',
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div
              style={{
                width: '48px',
                height: '1px',
                background: 'var(--border-color)',
                marginBottom: '32px',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'var(--electric-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: 700,
                }}
              >
                {t.avatar}
              </div>
              <div style={{ textAlign: 'left' }}>
                <p
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: 0,
                  }}
                >
                  {t.name}
                </p>
                <p
                  style={{
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    margin: 0,
                  }}
                >
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '48px',
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === active ? '32px' : '10px',
                height: '10px',
                borderRadius: '5px',
                border: 'none',
                background: i === active ? 'var(--electric-blue)' : 'var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes testimonialFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
