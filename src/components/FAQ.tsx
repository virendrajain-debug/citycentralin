import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { faqItems } from '../data/faq';

const ease = [0.16, 1, 0.3, 1] as const;

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
  isInView,
}: {
  item: (typeof faqItems)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.15 + index * 0.08,
        duration: 0.7,
        ease: ease,
      }}
      style={{
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '28px 0',
          textAlign: 'left',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          gap: '24px',
          transition: 'background-color 0.3s ease',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(17px, 1.4vw, 21px)',
            fontWeight: 500,
            color: isOpen ? 'var(--electric-blue)' : 'var(--text-primary)',
            transition: 'color 0.3s ease',
            lineHeight: 1.4,
          }}
        >
          {item.question}
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.35, ease: ease }}
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '1px solid var(--border-color)',
            fontSize: '18px',
            fontWeight: 300,
            color: isOpen ? 'var(--electric-blue)' : 'var(--text-muted)',
            transition: 'border-color 0.3s ease, color 0.3s ease',
          }}
        >
          +
        </motion.span>
      </button>

      <div
        style={{
          maxHeight: isOpen ? '300px' : '0',
          opacity: isOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease 0.05s',
        }}
      >
        <p
          style={{
            fontSize: 'clamp(14px, 1.1vw, 16px)',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            padding: '0 0 28px 0',
            maxWidth: '680px',
          }}
        >
          {item.answer}
        </p>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={containerRef}
      id="faq"
      style={{
        position: 'relative',
        padding: 'var(--section-padding) 0',
        background: 'var(--bg-primary)',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: '0 var(--container-padding)',
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: 'clamp(40px, 6vw, 100px)',
          alignItems: 'start',
        }}
        className="faq-grid"
      >
        {/* Left: Heading */}
        <div style={{ position: 'sticky', top: '120px' }}>
          <div style={{ overflow: 'hidden', marginBottom: '12px' }}>
            <motion.span
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: ease }}
              className="section-label"
              style={{ display: 'inline-flex' }}
            >
              FAQ
            </motion.span>
          </div>
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
              Questions,
              <br />
              answered.
            </motion.h2>
          </div>
        </div>

        {/* Right: Accordion */}
        <div>
          {faqItems.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .faq-grid > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}
