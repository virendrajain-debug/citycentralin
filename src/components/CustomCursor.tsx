import { useEffect, useRef, useState } from 'react';

const SPRING = 0.15;
const DOT_SIZE = 8;
const EXPANDED_SIZE = 48;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const raf = useRef(0);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(min-width: 1024px)');
    setIsMobile(!mql.matches);

    const onChange = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mql.addEventListener('change', onChange);

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('a, button, [data-cursor]');
      if (!el) {
        if (dotRef.current) {
          dotRef.current.style.width = DOT_SIZE + 'px';
          dotRef.current.style.height = DOT_SIZE + 'px';
          dotRef.current.style.backgroundColor = '#0A0A0A';
          dotRef.current.style.color = 'transparent';
        }
        return;
      }
      if (dotRef.current) {
        dotRef.current.style.width = EXPANDED_SIZE + 'px';
        dotRef.current.style.height = EXPANDED_SIZE + 'px';
        dotRef.current.style.backgroundColor = 'var(--text-primary)';
        dotRef.current.style.color = '#FFFFFF';
      }
      const cursor = (e.target as HTMLElement)?.closest?.('[data-cursor]');
      const span = dotRef.current?.querySelector('span');
      if (span) {
        span.textContent = cursor?.getAttribute('data-cursor') === 'explore' ? 'EXPLORE' : '';
      }
    };

    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * SPRING;
      pos.current.y += (target.current.y - pos.current.y) * SPRING;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      mql.removeEventListener('change', onChange);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('pointerover', onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (isMobile) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: '50%',
        backgroundColor: '#0A0A0A',
        color: 'transparent',
        pointerEvents: 'none',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform',
        transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, color 0.2s ease',
      }}
    >
      <span
        style={{
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
        }}
      />
    </div>
  );
}
