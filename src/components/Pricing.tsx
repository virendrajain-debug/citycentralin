import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { pricingTiers } from '../data/pricing';
import { PHONE_TEL } from '../lib/router';

const ease = [0.16, 1, 0.3, 1] as const;

function PricingPanel({
  tier,
  index,
  isInView,
}: {
  tier: typeof pricingTiers[number];
  index: number;
  isInView: boolean;
}) {
  const isPopular = tier.popular;
  const orderIndex = isPopular ? 1 : index < 1 ? 0 : 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.3 + orderIndex * 0.15,
        duration: 0.9,
        ease: ease,
      }}
      whileHover={{ scale: 1.01, y: -4 }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 0',
        minWidth: '280px',
        maxWidth: isPopular ? '420px' : '380px',
        padding: isPopular ? '44px 36px 40px' : '40px 32px 36px',
        background: 'var(--surface-elevated)',
        borderRadius: '16px',
        border: isPopular
          ? '1px solid rgba(31, 72, 255, 0.15)'
          : '1px solid var(--border-color)',
        borderTop: isPopular ? '3px solid var(--electric-blue)' : '1px solid var(--border-color)',
        boxShadow: isPopular
          ? '0 8px 40px rgba(31, 72, 255, 0.08), 0 0 80px rgba(31, 72, 255, 0.04)'
          : '0 2px 16px rgba(0, 0, 0, 0.03)',
        transition: 'box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: isPopular ? 2 : 1,
        marginTop: isPopular ? '-16px' : '0',
        transform: isPopular ? 'scale(1.02)' : undefined,
      }}
    >
      {/* Highlight badge */}
      {tier.highlight && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            delay: 0.7 + orderIndex * 0.15,
            duration: 0.5,
            ease: ease,
          }}
          style={{
            position: 'absolute',
            top: '-13px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '6px 20px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            background: 'var(--electric-blue)',
            borderRadius: '20px',
            whiteSpace: 'nowrap',
          }}
        >
          {tier.highlight}
        </motion.div>
      )}

      {/* Package name */}
      <span
        style={{
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: isPopular ? 'var(--electric-blue)' : 'var(--text-muted)',
          marginBottom: '16px',
        }}
      >
        {tier.name}
      </span>

      {/* Price */}
      <div style={{ marginBottom: '4px' }}>
        <span
          style={{
            fontSize: 'clamp(42px, 5vw, 56px)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
          }}
        >
          {tier.price}
        </span>
      </div>

      {/* Period */}
      <span
        style={{
          fontSize: '14px',
          color: 'var(--text-muted)',
          marginBottom: '28px',
        }}
      >
        {tier.period}
      </span>

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: isPopular
            ? 'rgba(31, 72, 255, 0.12)'
            : 'var(--border-color)',
          marginBottom: '24px',
        }}
      />

      {/* Features */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          maxHeight: '340px',
          marginBottom: '28px',
          paddingRight: '4px',
        }}
        className="pricing-features-scroll"
      >
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {tier.features.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: 0.5 + orderIndex * 0.15 + i * 0.03,
                duration: 0.5,
                ease: ease,
              }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '14px',
                lineHeight: 1.5,
                color: 'var(--text-secondary)',
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  marginTop: '2px',
                  fontSize: '13px',
                  color: isPopular ? 'var(--electric-blue)' : 'var(--text-muted)',
                  fontWeight: 600,
                }}
              >
                ✓
              </span>
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <motion.a
        href={PHONE_TEL}
        whileHover={{ y: -2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '16px 24px',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: isPopular ? '#FFFFFF' : 'var(--text-primary)',
          backgroundColor: isPopular ? 'var(--electric-blue)' : 'transparent',
          border: isPopular ? 'none' : '1px solid var(--border-color)',
          borderRadius: '8px',
          textDecoration: 'none',
          transition: 'background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
        }}
      >
        Start Growing Today
      </motion.a>
    </motion.div>
  );
}

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={containerRef}
      id="pricing"
      style={{
        position: 'relative',
        padding: 'var(--section-padding) 0',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(31, 72, 255, 0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
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
            Pricing
          </motion.span>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: 'clamp(48px, 6vw, 80px)', maxWidth: '640px' }}>
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
                margin: '0 0 16px 0',
                color: 'var(--text-primary)',
              }}
            >
              One plan. Everything included.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45, duration: 0.7, ease: ease }}
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              margin: 0,
            }}
          >
            Transparent pricing. No hidden fees. Choose the tier that matches your ambition.
          </motion.p>
        </div>

        {/* Pricing panels */}
        <div
          className="pricing-grid"
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: 'clamp(16px, 2vw, 28px)',
            justifyContent: 'center',
          }}
        >
          {/* Mobile: Gold first, then Silver, then Platinum */}
          <div className="pricing-mobile-order" style={{ display: 'contents' }}>
            {pricingTiers.map((tier, i) => (
              <PricingPanel
                key={tier.name}
                tier={tier}
                index={i}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .pricing-features-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .pricing-features-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .pricing-features-scroll::-webkit-scrollbar-thumb {
          background: var(--text-muted);
          border-radius: 2px;
          opacity: 0.3;
        }
        @media (min-width: 769px) {
          .pricing-grid {
            flex-direction: row !important;
            align-items: flex-start !important;
          }
          .pricing-mobile-order {
            display: contents !important;
          }
        }
        @media (max-width: 768px) {
          .pricing-grid {
            flex-direction: column !important;
            align-items: center !important;
          }
          .pricing-mobile-order {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            gap: 16px !important;
          }
          .pricing-mobile-order > div {
            max-width: 100% !important;
            width: 100% !important;
            margin-top: 0 !important;
            transform: none !important;
          }
          .pricing-mobile-order > div:nth-child(2) {
            order: -1 !important;
          }
        }
      `}</style>
    </section>
  );
}
