import { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { testimonials } from '../data/testimonials';

const ease = [0.16, 1, 0.3, 1] as const;
const AUTO_ROTATE_MS = 6000;

function NavigationDot({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.3 }}
      style={{
        width: isActive ? '28px' : '8px',
        height: '8px',
        borderRadius: '4px',
        background: isActive ? 'var(--electric-blue)' : 'var(--text-muted)',
        opacity: isActive ? 1 : 0.3,
        border: 'none',
        cursor: 'pointer',
        transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease',
        padding: 0,
      }}
    />
  );
}

function StarRating() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '4px',
        marginBottom: '24px',
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          style={{
            fontSize: '18px',
            color: 'var(--electric-blue)',
            lineHeight: 1,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [next, isPaused]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      next();
    } else if (info.offset.x > threshold) {
      prev();
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
    }),
  };

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

        {/* Testimonial display */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            position: 'relative',
            maxWidth: '860px',
            margin: '0 auto',
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Large decorative quotation mark */}
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

          {/* Draggable quote area */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.3}
            onDragEnd={handleDragEnd}
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'grab',
              zIndex: 1,
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  width: '100%',
                  padding: '0 clamp(16px, 4vw, 48px)',
                }}
              >
                {/* Star rating */}
                <StarRating />

                {/* Thin line */}
                <div
                  style={{
                    width: '48px',
                    height: '1px',
                    background: 'var(--border-color)',
                    marginBottom: '32px',
                  }}
                />

                {/* Quote text */}
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
                  &ldquo;{testimonials[active].quote}&rdquo;
                </blockquote>

                {/* Thin line */}
                <div
                  style={{
                    width: '48px',
                    height: '1px',
                    background: 'var(--border-color)',
                    marginBottom: '32px',
                  }}
                />

                {/* Author info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Avatar */}
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      background: 'var(--electric-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      flexShrink: 0,
                    }}
                  >
                    {testimonials[active].avatar}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        lineHeight: 1.3,
                      }}
                    >
                      {testimonials[active].name}
                    </span>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '14px',
                        color: 'var(--text-muted)',
                        lineHeight: 1.4,
                      }}
                    >
                      {testimonials[active].role}, {testimonials[active].company}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation dots */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '40px',
            }}
          >
            {testimonials.map((_, i) => (
              <NavigationDot
                key={i}
                isActive={i === active}
                onClick={() => {
                  setDirection(i > active ? 1 : -1);
                  setActive(i);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #testimonials blockquote {
            font-size: clamp(18px, 4.5vw, 22px) !important;
          }
        }
      `}</style>
    </section>
  );
}
