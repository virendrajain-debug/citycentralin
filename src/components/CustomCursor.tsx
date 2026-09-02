import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SPRING_CONFIG = { damping: 25, stiffness: 300, mass: 0.5 };
const EXPANDED_SIZE = 48;
const DOT_SIZE = 8;

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isExplore, setIsExplore] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, SPRING_CONFIG);
  const springY = useSpring(cursorY, SPRING_CONFIG);

  const size = isHovering ? EXPANDED_SIZE : DOT_SIZE;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible],
  );

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(min-width: 1024px)');
    if (!mql.matches) return;

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target?.closest('a, button, [data-cursor]')) {
        setIsHovering(false);
        setIsExplore(false);
        return;
      }
      setIsHovering(true);
      const el = target.closest('[data-cursor]');
      setIsExplore(el?.getAttribute('data-cursor') === 'explore');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  if (!isVisible) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: isHovering ? 'var(--text-primary)' : '#0A0A0A',
        color: isHovering ? '#FFFFFF' : 'transparent',
        pointerEvents: 'none',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        translateX: '-50%',
        translateY: '-50%',
        transition: 'background-color 0.2s ease, color 0.2s ease',
      }}
    >
      {isExplore && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          EXPLORE
        </motion.span>
      )}
    </motion.div>
  );
}
