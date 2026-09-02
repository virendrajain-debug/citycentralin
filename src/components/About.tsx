import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const PILLS = ['Strategy-first', 'Data-driven', 'Creative Studio', 'Full-Service'] as const;

const ECOSYSTEM_NODES = [
  { label: 'BRAND', angle: 0 },
  { label: 'CONTENT', angle: 51.4 },
  { label: 'SOCIAL', angle: 102.8 },
  { label: 'VIDEO', angle: 154.3 },
  { label: 'ADS', angle: 205.7 },
  { label: 'WEB', angle: 257.1 },
  { label: 'GROWTH', angle: 308.5 },
] as const;

const FLOW_STEPS = ['BUSINESS', 'IDENTITY', 'CONTENT', 'AUDIENCE', 'GROWTH'] as const;

function ClipPathReveal({
  line1,
  line2,
  isInView,
}: {
  line1: string;
  line2: string;
  isInView: boolean;
}) {
  return (
    <div style={{ marginBottom: '48px' }}>
      {[line1, line2].map((line, i) => (
        <div key={i} style={{ overflow: 'hidden' }}>
          <motion.h2
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              delay: 0.2 + i * 0.15,
              duration: 0.9,
              ease: ease,
            }}
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: 0,
              color:
                i === 1 ? 'var(--electric-blue)' : 'var(--text-primary)',
            }}
          >
            {line}
          </motion.h2>
        </div>
      ))}
    </div>
  );
}

function Pill({
  text,
  index,
  isInView,
}: {
  text: string;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.8 + index * 0.12,
        duration: 0.6,
        ease: ease,
      }}
      style={{
        display: 'inline-block',
        padding: '10px 20px',
        fontSize: '13px',
        fontWeight: 600,
        letterSpacing: '0.04em',
        color: 'var(--text-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '100px',
        whiteSpace: 'nowrap' as const,
      }}
    >
      {text}
    </motion.span>
  );
}

function EcosystemVisualization({ isInView }: { isInView: boolean }) {
  const size = 420;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 150;

  const nodePositions = ECOSYSTEM_NODES.map((node) => {
    const rad = (node.angle * Math.PI) / 180;
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
      label: node.label,
    };
  });

  const connectionPairs: [number, number][] = [
    [0, 1], [0, 2], [0, 5], [1, 2], [1, 3],
    [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], [1, 6],
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.5 }}
      style={{
        width: '100%',
        maxWidth: `${size}px`,
        aspectRatio: '1',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: 'visible' }}
      >
        {connectionPairs.map(([a, b], i) => {
          const p1 = nodePositions[a];
          const p2 = nodePositions[b];
          return (
            <motion.line
              key={`line-${i}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke="var(--electric-blue)"
              strokeOpacity={0.15}
              strokeWidth={1}
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{
                delay: 0.8 + i * 0.08,
                duration: 0.8,
                ease: ease,
              }}
            />
          );
        })}

        {nodePositions.map((node, i) => (
          <g key={node.label}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={22}
              fill="var(--bg-primary)"
              stroke="var(--electric-blue)"
              strokeWidth={1}
              strokeOpacity={0.3}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                delay: 1.0 + i * 0.1,
                duration: 0.5,
                ease: ease,
              }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            />
            <motion.text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{
                delay: 1.2 + i * 0.1,
                duration: 0.5,
              }}
              style={{
                fontSize: '8px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                fill: 'var(--text-primary)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

function FlowDiagram({ isInView }: { isInView: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0px',
        marginTop: '64px',
      }}
    >
      {FLOW_STEPS.map((step, i) => (
        <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 1.5 + i * 0.2,
              duration: 0.6,
              ease: ease,
            }}
            style={{
              padding: '14px 32px',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              background: 'var(--bg-primary)',
              textAlign: 'center' as const,
            }}
          >
            {step}
          </motion.div>

          {i < FLOW_STEPS.length - 1 && (
            <svg
              width="2"
              height="48"
              viewBox="0 0 2 48"
              style={{ overflow: 'visible' }}
            >
              <motion.line
                x1={1}
                y1={0}
                x2={1}
                y2={44}
                stroke="var(--electric-blue)"
                strokeOpacity={0.3}
                strokeWidth={1}
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{
                  delay: 1.7 + i * 0.2,
                  duration: 0.6,
                  ease: ease,
                }}
              />
              <motion.path
                d="M 1 44 L 1 48 L -3 44 L 5 44 L 1 48 L 1 44"
                fill="none"
                stroke="var(--electric-blue)"
                strokeOpacity={0.3}
                strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{
                  delay: 1.9 + i * 0.2,
                  duration: 0.3,
                  ease: ease,
                }}
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      ref={containerRef}
      id="about"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background line */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '10%',
          width: '1px',
          background:
            'linear-gradient(180deg, transparent 0%, var(--electric-blue) 50%, transparent 100%)',
          opacity: 0.06,
          y: bgY,
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
        {/* Heading */}
        <ClipPathReveal
          line1="TURNING BUSINESSES"
          line2="INTO BRANDS."
          isInView={isInView}
        />

        {/* Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8, ease: ease }}
          style={{
            maxWidth: '640px',
            marginBottom: '40px',
          }}
        >
          <p
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              marginBottom: '16px',
            }}
          >
            At CITY CENTRAL INDIA, we help businesses create powerful digital identities
            through strategic branding, creative storytelling, AI-powered marketing,
            and high-performance websites.
          </p>
          <p
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
            }}
          >
            We combine creativity with data to deliver measurable business growth.
          </p>
        </motion.div>

        {/* Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap' as const,
            gap: '12px',
            marginBottom: '80px',
          }}
        >
          {PILLS.map((pill, i) => (
            <Pill key={pill} text={pill} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Ecosystem visualization */}
        <div className="about-ecosystem">
          <EcosystemVisualization isInView={isInView} />
        </div>

        {/* Vertical flow diagram */}
        <div className="about-flow">
          <FlowDiagram isInView={isInView} />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-ecosystem {
            max-width: 300px !important;
          }
          .about-flow {
            gap: 0 !important;
          }
          .about-flow > div > div > div {
            padding: 10px 20px !important;
            font-size: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
