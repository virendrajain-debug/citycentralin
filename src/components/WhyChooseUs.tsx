import { useRef, useState } from 'react';
import {
  motion,
  useInView,
  AnimatePresence,
} from 'framer-motion';
import { services } from '../data/services';

const ease = [0.16, 1, 0.3, 1] as const;

function Heading({ isInView }: { isInView: boolean }) {
  return (
    <div style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}>
      <div style={{ overflow: 'hidden' }}>
        <motion.h2
          initial={{ y: '100%' }}
          animate={isInView ? { y: 0 } : {}}
          transition={{
            delay: 0.1,
            duration: 0.9,
            ease: ease,
          }}
          style={{
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
            color: 'var(--text-primary)',
          }}
        >
          EVERYTHING A GROWING BRAND NEEDS,
        </motion.h2>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <motion.h2
          initial={{ y: '100%' }}
          animate={isInView ? { y: 0 } : {}}
          transition={{
            delay: 0.25,
            duration: 0.9,
            ease: ease,
          }}
          style={{
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
            color: 'var(--electric-blue)',
          }}
        >
          IN ONE PLACE.
        </motion.h2>
      </div>
    </div>
  );
}

function ServiceItem({
  service,
  index,
  isHovered,
  onEnter,
  onLeave,
  isInView,
}: {
  service: typeof services[number];
  index: number;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  isInView: boolean;
}) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.3 + index * 0.08,
        duration: 0.7,
        ease: ease,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        cursor: 'pointer',
        padding: '20px 0',
        background: isHovered
          ? 'rgba(31, 72, 255, 0.03)'
          : 'transparent',
        transition: 'background 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        borderRadius: '8px',
      }}
    >
      {/* Top line */}
      <div
        style={{
          height: '1px',
          background: isHovered
            ? 'var(--electric-blue)'
            : 'var(--border-color)',
          transition: 'background 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          marginBottom: '20px',
          opacity: isHovered ? 0.4 : 1,
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'clamp(16px, 3vw, 40px)',
          padding: '0 clamp(16px, 3vw, 40px)',
        }}
      >
        {/* Number */}
        <motion.span
          animate={{
            scale: isHovered ? 1.08 : 1,
            color: isHovered
              ? 'var(--electric-blue)'
              : 'var(--text-muted)',
          }}
          transition={{ duration: 0.4, ease: ease }}
          style={{
            fontSize: 'clamp(32px, 4vw, 56px)',
            fontWeight: 300,
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
            fontFeatureSettings: '"tnum"',
            minWidth: 'clamp(60px, 8vw, 100px)',
            display: 'inline-block',
          }}
        >
          {num}
        </motion.span>

        {/* Title + Description */}
        <div style={{ flex: 1 }}>
          <motion.span
            animate={{
              color: isHovered
                ? 'var(--electric-blue)'
                : 'var(--text-primary)',
            }}
            transition={{ duration: 0.4, ease: ease }}
            style={{
              fontSize: 'clamp(20px, 2.5vw, 36px)',
              fontWeight: 600,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              display: 'block',
            }}
          >
            {service.title}
          </motion.span>

          {/* Description - desktop hover only */}
          <div
            style={{
              overflow: 'hidden',
              maxHeight: isHovered ? '120px' : '0px',
              opacity: isHovered ? 1 : 0,
              transition:
                'max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(14px, 1vw, 17px)',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                marginTop: '12px',
                maxWidth: '560px',
              }}
            >
              {service.description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div
        style={{
          height: '1px',
          background: 'var(--border-color)',
          marginTop: '20px',
        }}
      />
    </motion.div>
  );
}

function MobileAccordion({
  service,
  index,
  isOpen,
  onToggle,
  isInView,
}: {
  service: typeof services[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.2 + index * 0.06,
        duration: 0.6,
        ease: ease,
      }}
      style={{
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '20px 0',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            fontSize: '28px',
            fontWeight: 300,
            fontVariantNumeric: 'tabular-nums',
            fontFeatureSettings: '"tnum"',
            color: isOpen ? 'var(--electric-blue)' : 'var(--text-muted)',
            minWidth: '44px',
            transition: 'color 0.3s ease',
          }}
        >
          {num}
        </span>
        <span
          style={{
            flex: 1,
            fontSize: '18px',
            fontWeight: 600,
            color: isOpen ? 'var(--electric-blue)' : 'var(--text-primary)',
            transition: 'color 0.3s ease',
          }}
        >
          {service.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: ease }}
          style={{
            fontSize: '20px',
            color: 'var(--text-muted)',
            lineHeight: 1,
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: ease },
              opacity: { duration: 0.3, delay: 0.05 },
            }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                paddingBottom: '20px',
                paddingLeft: '60px',
              }}
            >
              {service.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 40%, var(--bg-tertiary) 70%, var(--bg-primary) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle side accent */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: ease }}
        style={{
          position: 'absolute',
          left: 'var(--container-padding)',
          top: '10%',
          bottom: '10%',
          width: '2px',
          background:
            'linear-gradient(180deg, transparent, var(--electric-blue), transparent)',
          opacity: 0.12,
          transformOrigin: 'top',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: 'var(--section-padding) var(--container-padding)',
        }}
      >
        <Heading isInView={isInView} />

        {/* Desktop: interactive list */}
        <div
          className="why-desktop"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          {services.map((service, i) => (
            <ServiceItem
              key={service.id}
              service={service}
              index={i}
              isHovered={hoveredIndex === i}
              onEnter={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Mobile: accordion */}
        <div
          className="why-mobile"
          style={{
            display: 'none',
            flexDirection: 'column',
          }}
        >
          {services.map((service, i) => (
            <MobileAccordion
              key={service.id}
              service={service}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .why-desktop { display: flex !important; }
          .why-mobile { display: none !important; }
        }
        @media (max-width: 768px) {
          .why-desktop { display: none !important; }
          .why-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
