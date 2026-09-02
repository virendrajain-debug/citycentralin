import { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '../data/process';

gsap.registerPlugin(ScrollTrigger);

const ease = [0.16, 1, 0.3, 1] as const;

const STEP_ICONS: Record<string, React.ReactNode> = {
  Discovery: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="20" cy="20" r="12" stroke="var(--electric-blue)" strokeWidth="2" />
      <line x1="29" y1="29" x2="40" y2="40" stroke="var(--electric-blue)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="4" fill="var(--electric-blue)" opacity="0.3" />
    </svg>
  ),
  Strategy: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 8 L24 18 L18 24 L18 40 L30 40 L30 24 L24 18Z" stroke="var(--electric-blue)" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24" cy="12" r="2" fill="var(--electric-blue)" />
      <path d="M14 40 L34 40" stroke="var(--electric-blue)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Design: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M8 40 L24 8 L40 40Z" stroke="var(--electric-blue)" strokeWidth="2" strokeLinejoin="round" fill="none" />
      <circle cx="24" cy="30" r="6" stroke="var(--electric-blue)" strokeWidth="2" fill="none" />
      <line x1="24" y1="24" x2="24" y2="36" stroke="var(--electric-blue)" strokeWidth="1.5" />
      <line x1="18" y1="30" x2="30" y2="30" stroke="var(--electric-blue)" strokeWidth="1.5" />
    </svg>
  ),
  Content: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="6" width="32" height="36" rx="2" stroke="var(--electric-blue)" strokeWidth="2" />
      <line x1="14" y1="16" x2="34" y2="16" stroke="var(--electric-blue)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="22" x2="34" y2="22" stroke="var(--electric-blue)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="28" x2="28" y2="28" stroke="var(--electric-blue)" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="28" y="30" width="8" height="8" rx="1" fill="var(--electric-blue)" opacity="0.3" />
    </svg>
  ),
  Launch: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 4 L24 20 L16 28" stroke="var(--electric-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 4 L24 20 L32 28" stroke="var(--electric-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 28 L24 44" stroke="var(--electric-blue)" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 28 L8 32" stroke="var(--electric-blue)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <path d="M32 28 L40 32" stroke="var(--electric-blue)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  Growth: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <polyline points="8,40 18,28 26,34 40,12" stroke="var(--electric-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="34,12 40,12 40,18" stroke="var(--electric-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="18" cy="28" r="3" fill="var(--electric-blue)" opacity="0.3" />
      <circle cx="26" cy="34" r="3" fill="var(--electric-blue)" opacity="0.3" />
      <circle cx="40" cy="12" r="3" fill="var(--electric-blue)" opacity="0.5" />
    </svg>
  ),
};

function StepCard({
  step,
  index,
  isActive,
}: {
  step: (typeof processSteps)[0];
  index: number;
  isActive: boolean;
}) {
  const stepNum = String(step.id).padStart(2, '0');
  const iconKey = step.title as keyof typeof STEP_ICONS;

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: isActive ? 1 : 0.4, x: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: 0.1 + index * 0.1,
        duration: 0.8,
        ease: ease,
      }}
      style={{
        minWidth: 'min(100vw, 480px)',
        padding: '0 clamp(20px, 4vw, 60px)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        flexShrink: 0,
      }}
    >
      {/* Step number */}
      <span
        style={{
          fontSize: 'clamp(64px, 8vw, 100px)',
          fontWeight: 900,
          lineHeight: 1,
          color: 'var(--electric-blue)',
          opacity: 0.12,
          letterSpacing: '-0.04em',
        }}
      >
        {stepNum}
      </span>

      {/* Icon */}
      <div style={{ marginTop: '-12px' }}>
        {STEP_ICONS[iconKey]}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 'clamp(28px, 3vw, 40px)',
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          margin: 0,
        }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 'clamp(14px, 1.1vw, 17px)',
          lineHeight: 1.65,
          color: 'var(--text-secondary)',
          maxWidth: '380px',
          margin: 0,
        }}
      >
        {step.description}
      </p>

      {/* Accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: ease }}
        style={{
          width: '48px',
          height: '2px',
          background: 'var(--electric-blue)',
          transformOrigin: 'left',
          marginTop: '8px',
        }}
      />
    </motion.div>
  );
}

function MobileTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: '-80px' });

  return (
    <div
      ref={timelineRef}
      style={{
        position: 'relative',
        paddingLeft: '40px',
      }}
    >
      {/* Vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.5, ease: ease }}
        style={{
          position: 'absolute',
          left: '12px',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'var(--electric-blue)',
          opacity: 0.25,
          transformOrigin: 'top',
        }}
      />

      {processSteps.map((step, i) => {
        const stepNum = String(step.id).padStart(2, '0');
        const iconKey = step.title as keyof typeof STEP_ICONS;

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              delay: i * 0.15,
              duration: 0.7,
              ease: ease,
            }}
            style={{
              position: 'relative',
              paddingBottom: i < processSteps.length - 1 ? '56px' : 0,
              paddingLeft: '32px',
            }}
          >
            {/* Dot on line */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.2 + i * 0.15,
                duration: 0.4,
                ease: ease,
              }}
              style={{
                position: 'absolute',
                left: '-28px',
                top: '4px',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: 'var(--electric-blue)',
                border: '3px solid var(--bg-primary)',
              }}
            />

            {/* Number */}
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'var(--electric-blue)',
                opacity: 0.6,
              }}
            >
              STEP {stepNum}
            </span>

            {/* Icon */}
            <div style={{ margin: '12px 0' }}>
              {STEP_ICONS[iconKey]}
            </div>

            {/* Title */}
            <h4
              style={{
                fontSize: 'clamp(22px, 4vw, 28px)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                margin: '0 0 8px',
              }}
            >
              {step.title}
            </h4>

            {/* Description */}
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                margin: 0,
                maxWidth: '400px',
              }}
            >
              {step.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

function DesktopHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const ctx = gsap.context(() => {
      const totalWidth = scrollRef.current!.scrollWidth - window.innerWidth;

      gsap.to(scrollRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const stepIndex = Math.min(
              Math.floor(progress * processSteps.length),
              processSteps.length - 1
            );
            setActiveStep(stepIndex);
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {/* Progress bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--bg-secondary)',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: 'var(--electric-blue)',
            width: progressWidth,
            willChange: 'width',
          }}
        />
      </div>

      {/* Horizontal track */}
      <div
        style={{
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0',
            willChange: 'transform',
          }}
        >
          {processSteps.map((step, i) => (
            <div
              key={step.id}
              style={{
                minWidth: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                padding: '0 clamp(40px, 8vw, 120px)',
                opacity: activeStep === i ? 1 : 0.35,
                transition: 'opacity 0.5s ease',
              }}
            >
              <div
                style={{
                  maxWidth: 'var(--container-width)',
                  margin: '0 auto',
                  width: '100%',
                }}
              >
                <StepCard
                  step={step}
                  index={i}
                  isActive={activeStep === i}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        position: 'relative',
        background: 'var(--bg-secondary)',
        overflow: 'hidden',
      }}
    >
      {/* Section heading */}
      <div
        style={{
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: 'var(--section-padding) var(--container-padding)',
          paddingBottom: isMobile ? '48px' : '0',
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: ease }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--electric-blue)',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '32px',
              height: '1px',
              background: 'var(--electric-blue)',
            }}
          />
          OUR PROCESS
        </motion.span>

        <div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.9, ease: ease }}
              style={{
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                margin: 0,
                color: 'var(--text-primary)',
              }}
            >
              FROM FIRST CALL
            </motion.h2>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.9, ease: ease }}
              style={{
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                margin: 0,
                color: 'var(--electric-blue)',
              }}
            >
              TO REAL GROWTH.
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Content */}
      {isMobile ? (
        <div
          style={{
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
            padding: '0 var(--container-padding) var(--section-padding)',
          }}
        >
          <MobileTimeline />
        </div>
      ) : (
        <DesktopHorizontalScroll />
      )}
    </section>
  );
}
