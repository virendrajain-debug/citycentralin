import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

const ease = [0.16, 1, 0.3, 1] as const;

const METRICS = [
  { end: 250, suffix: '+', label: 'BRANDS SERVED' },
  { end: 10, suffix: 'M+', label: 'VIEWS GENERATED' },
  { end: 98, suffix: '%', label: 'CLIENT SATISFACTION' },
  { end: 5, suffix: '+', label: 'YEARS EXPERIENCE' },
] as const;

function MetricItem({
  metric,
  index,
  isInView,
}: {
  metric: typeof METRICS[number];
  index: number;
  isInView: boolean;
}) {
  const { count, ref } = useCountUp(metric.end, 2200);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.3 + index * 0.2,
        duration: 0.9,
        ease: ease,
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '40px 0',
        flex: '1 1 0',
        minWidth: '200px',
      }}
    >
      <span
        style={{
          fontSize: 'clamp(48px, 8vw, 96px)',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: 'var(--electric-blue)',
        }}
      >
        {count}
        {metric.suffix}
      </span>
      <span
        style={{
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: 'var(--text-muted)',
        }}
      >
        {metric.label}
      </span>
    </motion.div>
  );
}

export default function Metrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Animated horizontal line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, delay: 0.2, ease: ease }}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'var(--border-color)',
          transformOrigin: 'left',
          zIndex: 0,
        }}
      />

      {/* Moving diagonal line background */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: 0,
          width: '1px',
          height: '140%',
          background:
            'linear-gradient(180deg, transparent, var(--electric-blue), transparent)',
          opacity: 0.07,
          transform: 'rotate(20deg)',
          transformOrigin: 'top left',
          zIndex: 0,
          pointerEvents: 'none',
          animation: 'metricsLineMove 14s linear infinite',
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
          padding: '0 var(--container-padding)',
        }}
      >
        <div
          className="metrics-row"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
          }}
        >
          {METRICS.map((metric, i) => (
            <div key={metric.label} style={{ display: 'flex', alignItems: 'stretch', flex: '1 1 0' }}>
              {i > 0 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{
                    delay: 0.4 + i * 0.15,
                    duration: 0.8,
                    ease: ease,
                  }}
                  style={{
                    width: '1px',
                    background: 'var(--border-color)',
                    alignSelf: 'stretch',
                    transformOrigin: 'top',
                  }}
                />
              )}
              <div
                style={{
                  flex: '1 1 0',
                  padding: '0 clamp(16px, 2.5vw, 40px)',
                }}
              >
                <MetricItem metric={metric} index={i} isInView={isInView} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes metricsLineMove {
          0% { transform: rotate(20deg) translate(-10%, 0%); }
          100% { transform: rotate(20deg) translate(110%, 20%); }
        }
        @media (max-width: 768px) {
          .metrics-row {
            flex-direction: column !important;
            gap: 0 !important;
          }
          .metrics-row > div {
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 0;
          }
          .metrics-row > div:last-child {
            border-bottom: none;
          }
          .metrics-row > div > div:first-child {
            display: none !important;
          }
          .metrics-row > div > div:last-child {
            padding: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
