import { useRef } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

interface Project {
  title: string;
  category: string;
  description: string;
  number: string;
  align: 'left' | 'right';
  colors: string[];
  shapes: 'geometric' | 'overlapping' | 'organic' | 'grid';
}

const PROJECTS: Project[] = [
  {
    title: 'Urban Bites',
    category: 'Brand Identity & Social Media',
    description: 'Complete rebrand and social strategy that transformed engagement',
    number: '01',
    align: 'left',
    colors: ['var(--electric-blue)', 'var(--peach)', 'var(--red)'],
    shapes: 'geometric',
  },
  {
    title: 'Studio Lumen',
    category: 'Branding & Video Production',
    description: 'Premium visual identity with cinematic reel production',
    number: '02',
    align: 'right',
    colors: ['var(--peach)', 'var(--electric-blue)', 'var(--navy)'],
    shapes: 'overlapping',
  },
  {
    title: 'GreenLeaf Wellness',
    category: 'Social Media & Growth Strategy',
    description: 'Data-driven growth strategy with consistent content delivery',
    number: '03',
    align: 'left',
    colors: ['var(--electric-blue)', 'var(--navy)', 'var(--peach)'],
    shapes: 'organic',
  },
  {
    title: 'Metro Interiors',
    category: 'Website & Brand Promotion',
    description: 'Modern website with targeted local advertising campaigns',
    number: '04',
    align: 'right',
    colors: ['var(--red)', 'var(--electric-blue)', 'var(--peach)'],
    shapes: 'grid',
  },
];

function AbstractVisual({
  colors,
  shapes,
}: {
  colors: string[];
  shapes: string;
}) {
  const visualSize = 480;

  const renderShapes = () => {
    switch (shapes) {
      case 'geometric':
        return (
          <>
            <motion.rect
              x="40" y="60" width="180" height="180"
              fill={colors[0]} opacity={0.85}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.85 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: ease }}
              style={{ transformOrigin: '130px 150px' }}
            />
            <motion.circle
              cx="320" cy="200" r="100"
              fill={colors[1]} opacity={0.7}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: ease }}
              style={{ transformOrigin: '320px 200px' }}
            />
            <motion.polygon
              points="200,340 340,340 270,220"
              fill={colors[2]} opacity={0.6}
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8, ease: ease }}
              style={{ transformOrigin: '270px 280px' }}
            />
            <motion.line
              x1="60" y1="360" x2="400" y2="360"
              stroke={colors[0]} strokeWidth={2} opacity={0.3}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1, ease: ease }}
            />
          </>
        );
      case 'overlapping':
        return (
          <>
            <motion.rect
              x="50" y="80" width="200" height="200"
              fill={colors[0]} opacity={0.75}
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 0.75 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: ease }}
            />
            <motion.rect
              x="160" y="120" width="200" height="200"
              fill={colors[1]} opacity={0.65}
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 0.65 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8, ease: ease }}
            />
            <motion.rect
              x="100" y="200" width="180" height="180"
              fill={colors[2]} opacity={0.5}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8, ease: ease }}
            />
            <motion.circle
              cx="250" cy="150" r="40"
              fill="none" stroke={colors[0]} strokeWidth={2} opacity={0.4}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6, ease: ease }}
              style={{ transformOrigin: '250px 150px' }}
            />
          </>
        );
      case 'organic':
        return (
          <>
            <motion.ellipse
              cx="180" cy="200" rx="140" ry="100"
              fill={colors[0]} opacity={0.6}
              initial={{ scale: 0.7 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1, ease: ease }}
              style={{ transformOrigin: '180px 200px' }}
            />
            <motion.ellipse
              cx="300" cy="180" rx="100" ry="130"
              fill={colors[1]} opacity={0.5}
              initial={{ scale: 0.7, rotate: 15 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1, ease: ease }}
              style={{ transformOrigin: '300px 180px' }}
            />
            <motion.ellipse
              cx="240" cy="300" rx="120" ry="80"
              fill={colors[2]} opacity={0.45}
              initial={{ scale: 0.7, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 1, ease: ease }}
              style={{ transformOrigin: '240px 300px' }}
            />
            <motion.path
              d="M 100 350 Q 200 300 300 350 Q 350 380 400 340"
              fill="none" stroke={colors[0]} strokeWidth={2} opacity={0.3}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1.2, ease: ease }}
            />
          </>
        );
      case 'grid':
        return (
          <>
            {Array.from({ length: 5 }).map((_, row) =>
              Array.from({ length: 5 }).map((_, col) => (
                <motion.rect
                  key={`${row}-${col}`}
                  x={60 + col * 80}
                  y={60 + row * 80}
                  width="64"
                  height="64"
                  rx="4"
                  fill={
                    (row + col) % 3 === 0
                      ? colors[0]
                      : (row + col) % 3 === 1
                      ? colors[1]
                      : colors[2]
                  }
                  opacity={
                    (row + col) % 4 === 0
                      ? 0.8
                      : (row + col) % 3 === 0
                      ? 0.5
                      : 0.25
                  }
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: (row + col) % 4 === 0 ? 0.8 : (row + col) % 3 === 0 ? 0.5 : 0.25 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.2 + (row * 5 + col) * 0.03,
                    duration: 0.5,
                    ease: ease,
                  }}
                  style={{ transformOrigin: `${60 + col * 80 + 32}px ${60 + row * 80 + 32}px` }}
                />
              ))
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: `${visualSize}px`,
        aspectRatio: '1',
        position: 'relative',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${visualSize} ${visualSize}`}
        style={{ overflow: 'visible' }}
      >
        {renderShapes()}
      </svg>
    </div>
  );
}

function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const isLeft = project.align === 'left';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 5);
    mouseY.set(y * 5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      data-project-card=""
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: 0.2,
        duration: 0.9,
        ease: ease,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        flexDirection: isLeft ? 'row' : 'row-reverse',
        alignItems: 'center',
        gap: 'clamp(40px, 6vw, 100px)',
        padding: '80px 0',
        position: 'relative',
      }}
    >
      {/* Background number */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.04 } : {}}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: isLeft ? '-40px' : 'auto',
          right: isLeft ? 'auto' : '-40px',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(120px, 18vw, 280px)',
          fontWeight: 900,
          lineHeight: 1,
          color: 'var(--text-primary)',
          pointerEvents: 'none',
          zIndex: 0,
          transition: 'opacity 0.6s ease',
        }}
        className="project-number"
      >
        {project.number}
      </motion.span>

      {/* Text side */}
      <motion.div
        style={{
          flex: 1,
          minWidth: 0,
          position: 'relative',
          zIndex: 1,
          x: useSpring(
            mouseX.get() < 0 ? 1 : -1,
            { stiffness: 150, damping: 20 }
          ),
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6, ease: ease }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            {project.category}
          </span>
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.4 }}
            style={{
              fontSize: '14px',
              color: 'var(--electric-blue)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
            className="project-arrow"
          >
            →
          </motion.span>
        </motion.div>

        <h3
          style={{
            fontSize: 'clamp(36px, 4vw, 64px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
            color: 'var(--text-primary)',
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: 'clamp(14px, 1.1vw, 17px)',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: '480px',
            margin: 0,
          }}
        >
          {project.description}
        </p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8, ease: ease }}
          style={{
            height: '1px',
            background: 'var(--electric-blue)',
            opacity: 0.2,
            marginTop: '32px',
            transformOrigin: isLeft ? 'left' : 'right',
          }}
        />
      </motion.div>

      {/* Visual side */}
      <motion.div
        data-project-visual=""
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          justifyContent: isLeft ? 'flex-end' : 'flex-start',
          x: springX,
          y: springY,
          willChange: 'transform',
          transition: 'transform 0.1s ease-out',
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4, ease: ease }}
      >
        <AbstractVisual
          colors={project.colors}
          shapes={project.shapes}
        />
      </motion.div>

      <style>{`
        .project-arrow {
          opacity: 0 !important;
          transition: opacity 0.3s ease;
        }
        [data-project]:hover .project-arrow {
          opacity: 1 !important;
        }
        [data-project]:hover .project-number {
          opacity: 0.08 !important;
        }
      `}</style>
    </motion.div>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: 'var(--section-padding) 0',
        background: 'var(--bg-primary)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container-width)',
          margin: '0 auto',
          padding: '0 var(--container-padding)',
        }}
      >
        {/* Section heading */}
        <div style={{ marginBottom: 'clamp(60px, 8vw, 120px)' }}>
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
            PORTFOLIO
          </motion.span>

          <div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.9, ease: ease }}
                style={{
                  fontSize: 'clamp(48px, 8vw, 120px)',
                  fontWeight: 800,
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                  margin: 0,
                }}
              >
                SELECTED WORK
              </motion.h2>
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <div style={{ overflow: 'hidden' }}>
              <motion.p
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8, ease: ease }}
                style={{
                  fontSize: 'clamp(20px, 2.5vw, 36px)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-muted)',
                  margin: 0,
                }}
              >
                IDEAS THAT LOOK GOOD.
              </motion.p>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.p
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8, ease: ease }}
                style={{
                  fontSize: 'clamp(20px, 2.5vw, 36px)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                RESULTS THAT MATTER.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div>
          {PROJECTS.map((project, i) => (
            <div key={project.title} data-project="">
              <ProjectCard project={project} />
              {i < PROJECTS.length - 1 && (
                <div
                  style={{
                    width: '100%',
                    height: '1px',
                    background: 'var(--border-color)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        [data-project]:hover .project-number {
          opacity: 0.08 !important;
        }
        [data-project]:hover .project-arrow {
          opacity: 1 !important;
        }
        @media (max-width: 768px) {
          [data-project] [data-project-card] {
            flex-direction: column !important;
            padding: 40px 0 !important;
            gap: 24px !important;
          }
          [data-project] [data-project-card] > div {
            flex: none !important;
            width: 100% !important;
          }
          [data-project] [data-project-visual] {
            order: -1 !important;
            justify-content: center !important;
          }
          .project-number {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
