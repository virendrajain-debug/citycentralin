import { useRef, useEffect, useCallback } from 'react';

const ITEMS = [
  'BRANDING',
  'SOCIAL MEDIA',
  'VIDEO',
  'AI MARKETING',
  'WEBSITES',
  'SEO',
  'GOOGLE ADS',
  'CONTENT',
  'GROWTH',
];

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const baseSpeed = useRef(0.6);
  const currentSpeed = useRef(0.6);
  const lastScroll = useRef(0);
  const paused = useRef(false);
  const rafId = useRef(0);
  const offset = useRef(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const delta = Math.abs(scrollY - lastScroll.current);
    lastScroll.current = scrollY;
    const boost = Math.min(delta * 0.015, 1.2);
    currentSpeed.current = baseSpeed.current + boost;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const trackEl = trackRef.current;
    if (!container || !trackEl) return;

    const onEnter = () => { paused.current = true; };
    const onLeave = () => { paused.current = false; };

    container.addEventListener('mouseenter', onEnter);
    container.addEventListener('mouseleave', onLeave);

    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = (now - lastTime) / 16.667;
      lastTime = now;

      if (!paused.current) {
        currentSpeed.current += (baseSpeed.current - currentSpeed.current) * 0.05;
        offset.current += currentSpeed.current * dt;
      }

      trackEl.style.transform = `translate3d(${-(offset.current % 1600)}px, 0, 0)`;
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mouseenter', onEnter);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, [handleScroll]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        overflow: 'hidden',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        padding: '32px 0',
        cursor: 'default',
        userSelect: 'none',
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(32px, 4vw, 64px)',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0,
          }}
        >
          {ITEMS.map((item, i) => (
            <span
              key={`set1-${i}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0,
              }}
            >
              <span
                style={{
                  color: i % 2 === 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                }}
              >
                {item}
              </span>
              {i < ITEMS.length - 1 && (
                <span
                  style={{
                    color: 'var(--text-muted)',
                    opacity: 0.4,
                    margin: '0 8px',
                  }}
                >
                  ·
                </span>
              )}
            </span>
          ))}
          <span
            style={{
              color: 'var(--text-muted)',
              opacity: 0.4,
              margin: '0 8px',
            }}
          >
            ·
          </span>
          {ITEMS.map((item, i) => (
            <span
              key={`set2-${i}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0,
              }}
            >
              <span
                style={{
                  color: i % 2 === 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                }}
              >
                {item}
              </span>
              {i < ITEMS.length - 1 && (
                <span
                  style={{
                    color: 'var(--text-muted)',
                    opacity: 0.4,
                    margin: '0 8px',
                  }}
                >
                  ·
                </span>
              )}
            </span>
          ))}
          <span
            style={{
              color: 'var(--text-muted)',
              opacity: 0.4,
              margin: '0 8px',
            }}
          >
            ·
          </span>
          {ITEMS.map((item, i) => (
            <span
              key={`set3-${i}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0,
              }}
            >
              <span
                style={{
                  color: i % 2 === 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                }}
              >
                {item}
              </span>
              {i < ITEMS.length - 1 && (
                <span
                  style={{
                    color: 'var(--text-muted)',
                    opacity: 0.4,
                    margin: '0 8px',
                  }}
                >
                  ·
                </span>
              )}
            </span>
          ))}
          <span
            style={{
              color: 'var(--text-muted)',
              opacity: 0.4,
              margin: '0 8px',
            }}
          >
            ·
          </span>
          {ITEMS.map((item, i) => (
            <span
              key={`set4-${i}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0,
              }}
            >
              <span
                style={{
                  color: i % 2 === 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                }}
              >
                {item}
              </span>
              {i < ITEMS.length - 1 && (
                <span
                  style={{
                    color: 'var(--text-muted)',
                    opacity: 0.4,
                    margin: '0 8px',
                  }}
                >
                  ·
                </span>
              )}
            </span>
          ))}
        </span>
      </div>
    </section>
  );
}
