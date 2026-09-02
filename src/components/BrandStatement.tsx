import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

function AnimatedWord({
  text,
  scrollProgress,
  range,
  style,
}: {
  text: string;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  range: [number, number];
  style?: React.CSSProperties;
}) {
  const color = useTransform(
    scrollProgress,
    [range[0] - 0.15, range[0], range[1], range[1] + 0.1],
    ['#6A6A6A', '#6A6A6A', '#1F48FF', '#1F48FF'],
  );

  return (
    <motion.span
      style={{
        display: 'inline-block',
        color,
        ...style,
      }}
    >
      {text}
    </motion.span>
  );
}

function ParallaxLine({
  children,
  scrollProgress,
  yRange,
  delay,
}: {
  children: React.ReactNode;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  yRange: [number, number];
  delay: number;
}) {
  const y = useTransform(scrollProgress, [0, 1], yRange);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        delay,
        duration: 1,
        ease: ease,
      }}
      style={{ y, willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
}

export default function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bgColor = useTransform(
    bgProgress,
    [0, 0.4, 1],
    ['#08090D', '#0E1018', '#0F1420'],
  );

  return (
    <>
    <motion.section
      ref={containerRef}
      className="brand-statement"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor,
        padding: 'var(--section-padding) 0',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top divider */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 'var(--container-padding)',
          right: 'var(--container-padding)',
          height: '1px',
          background: 'rgba(255,255,255,0.08)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: '0 var(--container-padding)',
        }}
      >
        {/* Decorative line - top */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: ease }}
          style={{
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
            marginBottom: '64px',
            transformOrigin: 'left',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
          }}
        >
          {/* GOOD CONTENT GETS ATTENTION */}
          <ParallaxLine scrollProgress={scrollYProgress} yRange={[30, -30]} delay={0}>
            <div style={{ overflow: 'hidden' }}>
              <h2
                style={{
                  fontSize: 'clamp(42px, 7vw, 100px)',
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  color: '#6A6A6A',
                  margin: 0,
                }}
              >
                GOOD CONTENT
              </h2>
            </div>
          </ParallaxLine>

          <ParallaxLine scrollProgress={scrollYProgress} yRange={[20, -20]} delay={0.1}>
            <div style={{ overflow: 'hidden' }}>
              <h2
                style={{
                  fontSize: 'clamp(42px, 7vw, 100px)',
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  color: '#6A6A6A',
                  margin: 0,
                }}
              >
                GETS ATTENTION.
              </h2>
            </div>
          </ParallaxLine>

          {/* Empty line spacer */}
          <div style={{ height: 'clamp(40px, 6vw, 80px)' }} />

          {/* GREAT BRANDING GETS REMEMBERED */}
          <ParallaxLine scrollProgress={scrollYProgress} yRange={[40, -40]} delay={0.2}>
            <div style={{ overflow: 'hidden' }}>
              <h2
                style={{
                  fontSize: 'clamp(42px, 7vw, 100px)',
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  margin: 0,
                }}
              >
                <AnimatedWord
                  text="GREAT"
                  scrollProgress={scrollYProgress}
                  range={[0.2, 0.4]}
                />
                {' '}
                <AnimatedWord
                  text="BRANDING"
                  scrollProgress={scrollYProgress}
                  range={[0.25, 0.45]}
                />
              </h2>
            </div>
          </ParallaxLine>

          <ParallaxLine scrollProgress={scrollYProgress} yRange={[50, -50]} delay={0.3}>
            <div style={{ overflow: 'hidden' }}>
              <h2
                style={{
                  fontSize: 'clamp(42px, 7vw, 100px)',
                  fontWeight: 800,
                  lineHeight: 1.0,
                  letterSpacing: '-0.03em',
                  margin: 0,
                }}
              >
                <AnimatedWord
                  text="GETS"
                  scrollProgress={scrollYProgress}
                  range={[0.3, 0.5]}
                />
                {' '}
                <AnimatedWord
                  text="REMEMBERED."
                  scrollProgress={scrollYProgress}
                  range={[0.35, 0.55]}
                />
              </h2>
            </div>
          </ParallaxLine>
        </div>

        {/* Decorative line - bottom */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: ease }}
          style={{
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
            marginTop: '64px',
            transformOrigin: 'right',
          }}
        />

        {/* Side accent lines */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: ease }}
          style={{
            position: 'absolute',
            left: 0,
            top: '15%',
            bottom: '15%',
            width: '2px',
            background: 'var(--electric-blue)',
            opacity: 0.15,
            transformOrigin: 'top',
          }}
        />

        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8, ease: ease }}
          style={{
            position: 'absolute',
            right: 0,
            top: '20%',
            bottom: '20%',
            width: '2px',
            background: 'var(--electric-blue)',
            opacity: 0.1,
            transformOrigin: 'bottom',
          }}
        />
      </div>
    </motion.section>

    <style>{`
      @media (max-width: 768px) {
        .brand-statement h2 {
          font-size: clamp(28px, 8vw, 48px) !important;
        }
      }
    `}</style>
    </>
  );
}
