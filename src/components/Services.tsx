import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
} from 'framer-motion';
import { services } from '../data/services';

const ease = [0.16, 1, 0.3, 1] as const;

function SocialMediaVisual() {
  const cols = 4;
  const rows = 5;
  const gap = 6;
  const size = 28;
  return (
    <svg width="160" height="200" viewBox="0 0 160 200">
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const x = c * (size + gap) + 16;
          const y = r * (size + gap) + 10;
          const delay = (r * cols + c) * 0.06;
          return (
            <motion.rect
              key={`${r}-${c}`}
              x={x}
              y={y}
              width={size}
              height={size}
              rx={4}
              fill="var(--electric-blue)"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 0.15 + ((r + c) % 3) * 0.12, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay, duration: 0.5, ease: ease }}
            />
          );
        }),
      )}
    </svg>
  );
}

function BrandingVisual() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {[100, 80, 60].map((r, i) => (
        <motion.circle
          key={r}
          cx={100}
          cy={100}
          r={r}
          fill="none"
          stroke="var(--electric-blue)"
          strokeWidth={1.5}
          strokeOpacity={0.15 + i * 0.08}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.2, duration: 0.8, ease: ease }}
          style={{ transformOrigin: '100px 100px' }}
        />
      ))}
      <motion.circle
        cx={100}
        cy={100}
        r={18}
        fill="var(--electric-blue)"
        fillOpacity={0.25}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5, ease: ease }}
        style={{ transformOrigin: '100px 100px' }}
      />
    </svg>
  );
}

function VideoVisual() {
  return (
    <svg width="220" height="160" viewBox="0 0 220 160">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.line
          key={i}
          x1={10}
          y1={30 + i * 25}
          x2={210}
          y2={30 + i * 25}
          stroke="var(--electric-blue)"
          strokeWidth={1}
          strokeOpacity={0.1 + i * 0.05}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.12, duration: 0.8, ease: ease }}
        />
      ))}
      <motion.polygon
        points="90,50 90,110 140,80"
        fill="var(--electric-blue)"
        fillOpacity={0.2}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.6, ease: ease }}
        style={{ transformOrigin: '110px 80px' }}
      />
    </svg>
  );
}

function BrandPromotionVisual() {
  return (
    <svg width="200" height="180" viewBox="0 0 200 180">
      <motion.line
        x1={20}
        y1={160}
        x2={180}
        y2={20}
        stroke="var(--electric-blue)"
        strokeWidth={1.5}
        strokeOpacity={0.3}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: ease }}
      />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const t = i / 5;
        const cx = 20 + t * 160;
        const cy = 160 - t * 140;
        return (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r={5}
            fill="var(--electric-blue)"
            fillOpacity={0.2 + t * 0.2}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.4, ease: ease }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        );
      })}
    </svg>
  );
}

function InfluencerVisual() {
  const nodes = [
    { x: 100, y: 40 },
    { x: 50, y: 90 },
    { x: 150, y: 90 },
    { x: 30, y: 150 },
    { x: 100, y: 150 },
    { x: 170, y: 150 },
  ];
  const edges: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 4], [4, 5],
  ];
  return (
    <svg width="200" height="190" viewBox="0 0 200 190">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--electric-blue)"
          strokeWidth={1}
          strokeOpacity={0.2}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: ease }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={8}
          fill="var(--electric-blue)"
          fillOpacity={0.15 + (i % 2) * 0.1}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ease: ease }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}
    </svg>
  );
}

function WebsiteVisual() {
  return (
    <svg width="200" height="160" viewBox="0 0 200 160">
      <motion.rect
        x={10}
        y={10}
        width={180}
        height={140}
        rx={6}
        fill="none"
        stroke="var(--electric-blue)"
        strokeWidth={1.5}
        strokeOpacity={0.25}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: ease }}
      />
      <motion.line
        x1={10}
        y1={35}
        x2={190}
        y2={35}
        stroke="var(--electric-blue)"
        strokeWidth={1}
        strokeOpacity={0.15}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5, ease: ease }}
      />
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={22}
          y={48 + i * 34}
          width={156}
          height={22}
          rx={3}
          fill="var(--electric-blue)"
          fillOpacity={0.06 + i * 0.03}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + i * 0.15, duration: 0.6, ease: ease }}
          style={{ transformOrigin: '22px 59px' }}
        />
      ))}
    </svg>
  );
}

function ReportsVisual() {
  const bars = [65, 45, 80, 55, 90, 40, 70];
  const barW = 16;
  const gap = 8;
  const totalW = bars.length * (barW + gap);
  const maxH = 120;
  return (
    <svg width={totalW + 20} height={150} viewBox={`0 0 ${totalW + 20} 150`}>
      {bars.map((h, i) => {
        const x = 10 + i * (barW + gap);
        const barH = (h / 100) * maxH;
        const y = 130 - barH;
        return (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={barH}
            rx={3}
            fill="var(--electric-blue)"
            fillOpacity={0.15 + (h / 100) * 0.15}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: ease }}
            style={{ transformOrigin: `${x + barW / 2}px 130px` }}
          />
        );
      })}
    </svg>
  );
}

function AccountVisual() {
  const positions = [
    { x: 100, y: 50 },
    { x: 40, y: 110 },
    { x: 160, y: 110 },
  ];
  return (
    <svg width="200" height="160" viewBox="0 0 200 160">
      {positions.map((p, i) => (
        <g key={i}>
          <motion.circle
            cx={p.x}
            cy={p.y}
            r={28}
            fill="none"
            stroke="var(--electric-blue)"
            strokeWidth={1.5}
            strokeOpacity={0.2}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.2, duration: 0.6, ease: ease }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
          <motion.circle
            cx={p.x}
            cy={p.y}
            r={8}
            fill="var(--electric-blue)"
            fillOpacity={0.2}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.2, duration: 0.4, ease: ease }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
        </g>
      ))}
      <motion.line x1={100} y1={78} x2={40} y2={82} stroke="var(--electric-blue)" strokeWidth={1} strokeOpacity={0.15}
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.5, ease: ease }}
      />
      <motion.line x1={100} y1={78} x2={160} y2={82} stroke="var(--electric-blue)" strokeWidth={1} strokeOpacity={0.15}
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.5, ease: ease }}
      />
    </svg>
  );
}

function GrowthVisual() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {[80, 60, 40, 20].map((r, i) => (
        <motion.circle
          key={r}
          cx={100}
          cy={100}
          r={r}
          fill="none"
          stroke="var(--electric-blue)"
          strokeWidth={1}
          strokeOpacity={0.08 + i * 0.05}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2 + i * 0.18,
            duration: 0.8,
            ease: ease,
          }}
          style={{ transformOrigin: '100px 100px' }}
        />
      ))}
      <motion.circle
        cx={100}
        cy={100}
        r={6}
        fill="var(--electric-blue)"
        fillOpacity={0.4}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.0, duration: 0.4, ease: ease }}
        style={{ transformOrigin: '100px 100px' }}
      />
    </svg>
  );
}

const VISUALS = [
  SocialMediaVisual,
  BrandingVisual,
  VideoVisual,
  BrandPromotionVisual,
  InfluencerVisual,
  WebsiteVisual,
  ReportsVisual,
  AccountVisual,
  GrowthVisual,
] as const;

const BG_COLORS = [
  'rgba(31, 72, 255, 0.015)',
  'rgba(31, 72, 255, 0.01)',
  'rgba(31, 72, 255, 0.018)',
  'rgba(31, 72, 255, 0.012)',
  'rgba(31, 72, 255, 0.016)',
  'rgba(31, 72, 255, 0.01)',
  'rgba(31, 72, 255, 0.02)',
  'rgba(31, 72, 255, 0.014)',
  'rgba(31, 72, 255, 0.018)',
] as const;

function ServiceSlide({
  service,
  index,
  progress,
}: {
  service: typeof services[number];
  index: number;
  progress: ReturnType<typeof useMotionValue<number>>;
}) {
  const Visual = VISUALS[index];
  const num = String(index + 1).padStart(2, '0');

  const start = index / 9;
  const end = (index + 1) / 9;
  const fadeIn = 0.05;

  const opacity = useTransform(progress, (v) => {
    if (v < start - fadeIn) return 0;
    if (v < start) return (v - (start - fadeIn)) / fadeIn;
    if (v < end - fadeIn) return 1;
    if (v < end) return 1 - (v - (end - fadeIn)) / fadeIn;
    return 0;
  });
  const yVal = useTransform(progress, (v) => {
    if (v < start - fadeIn) return 80;
    if (v < start) return 80 - ((v - (start - fadeIn)) / fadeIn) * 80;
    if (v < end - fadeIn) return 0;
    if (v < end) return -((v - (end - fadeIn)) / fadeIn) * 80;
    return -80;
  });
  const scaleVal = useTransform(progress, (v) => {
    if (v < start - fadeIn) return 0.96;
    if (v < start) return 0.96 + ((v - (start - fadeIn)) / fadeIn) * 0.04;
    if (v < end - fadeIn) return 1;
    if (v < end) return 1 - ((v - (end - fadeIn)) / fadeIn) * 0.04;
    return 0.96;
  });

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        y: yVal,
        scale: scaleVal,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(32px, 5vw, 80px)',
          maxWidth: '1100px',
          width: '100%',
          padding: '0 var(--container-padding)',
          flexWrap: 'wrap',
        }}
      >
        {/* Left: content */}
        <div style={{ flex: '1 1 400px', minWidth: '280px' }}>
          <span
            style={{
              fontSize: 'clamp(64px, 10vw, 140px)',
              fontWeight: 200,
              fontVariantNumeric: 'tabular-nums',
              fontFeatureSettings: '"tnum"',
              color: 'var(--electric-blue)',
              opacity: 0.08,
              lineHeight: 1,
              display: 'block',
              marginBottom: '-20px',
              position: 'relative',
              zIndex: 0,
            }}
          >
            {num}
          </span>
          <h3
            style={{
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              margin: '0 0 24px 0',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {service.title}
          </h3>
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
            {service.subServices.map((sub, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: 'clamp(14px, 1.1vw, 17px)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--electric-blue)',
                    opacity: 0.4,
                    flexShrink: 0,
                  }}
                />
                {sub.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: visual */}
        <div
          style={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '180px',
          }}
        >
          <Visual />
        </div>
      </div>
    </motion.div>
  );
}

function MobileServiceCard({
  service,
  index,
  isInView,
}: {
  service: typeof services[number];
  index: number;
  isInView: boolean;
}) {
  const Visual = VISUALS[index];
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.1 + index * 0.08,
        duration: 0.7,
        ease: ease,
      }}
      style={{
        padding: 'clamp(24px, 5vw, 40px)',
        background: BG_COLORS[index],
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              color: 'var(--electric-blue)',
              display: 'block',
              marginBottom: '8px',
            }}
          >
            {num}
          </span>
          <h3
            style={{
              fontSize: 'clamp(22px, 4vw, 28px)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            {service.title}
          </h3>
        </div>
        <div style={{ opacity: 0.6 }}>
          <Visual />
        </div>
      </div>
      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {service.subServices.map((sub, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: 'var(--electric-blue)',
                opacity: 0.35,
                flexShrink: 0,
              }}
            />
            {sub.name}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const bgIndex = useTransform(scrollYProgress, (v: number) => Math.min(8, Math.floor(v * 9)));
  const bgColor = useTransform(
    bgIndex,
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [
      BG_COLORS[0], BG_COLORS[1], BG_COLORS[2], BG_COLORS[3], BG_COLORS[4],
      BG_COLORS[5], BG_COLORS[6], BG_COLORS[7], BG_COLORS[8],
    ] as unknown as string[],
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: `${9 * 100}vh`,
        background: 'var(--bg-primary)',
      }}
    >
      {/* Sticky container */}
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: bgColor,
          transition: 'background-color 0.3s ease',
        }}
      >
        {/* Heading - always visible */}
        <div
          className="services-heading"
          style={{
            position: 'absolute',
            top: 'clamp(40px, 6vh, 80px)',
            left: 'var(--container-padding)',
            right: 'var(--container-padding)',
            zIndex: 10,
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.9, ease: ease }}
              style={{
                fontSize: 'clamp(24px, 3vw, 42px)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                margin: '0 0 8px 0',
              }}
            >
              A full creative & growth stack, under one roof.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7, ease: ease }}
            style={{
              fontSize: 'clamp(14px, 1.1vw, 17px)',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              maxWidth: '560px',
            }}
          >
            Nine service pillars designed to work together — from first impression to long-term growth.
          </motion.p>
        </div>

        {/* Service slides */}
        <div
          className="services-desktop"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          {services.map((service, i) => (
            <ServiceSlide
              key={service.id}
              service={service}
              index={i}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* Mobile: vertical list */}
        <div
          className="services-mobile"
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: 'clamp(100px, 14vh, 160px) var(--container-padding) var(--container-padding)',
            display: 'none',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {services.map((service, i) => (
            <MobileServiceCard
              key={service.id}
              service={service}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Scroll indicator line */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 'clamp(24px, 3vh, 40px)',
            left: 'var(--container-padding)',
            right: 'var(--container-padding)',
            height: '2px',
            background: 'var(--border-color)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'var(--electric-blue)',
              borderRadius: '1px',
              scaleX: scrollYProgress,
              transformOrigin: 'left',
            }}
          />
        </motion.div>
      </motion.div>

      <style>{`
        @media (min-width: 769px) {
          .services-desktop { display: block !important; }
          .services-mobile { display: none !important; }
          .services-heading { display: block !important; }
        }
        @media (max-width: 768px) {
          .services-desktop { display: none !important; }
          .services-mobile { display: flex !important; }
          .services-heading { position: relative !important; top: auto !important; left: auto !important; right: auto !important; margin-bottom: 24px !important; }
          .services-mobile::-webkit-scrollbar { display: none; }
          .services-mobile { -ms-overflow-style: none; scrollbar-width: none; }
        }
      `}</style>
    </section>
  );
}
