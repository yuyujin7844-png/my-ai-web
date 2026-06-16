import { useEffect, useRef } from 'react';
import './cursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const ringPos = { x: -100, y: -100 };
    const mousePos = { x: -100, y: -100 };
    let rafId;

    // 중심 도트: 마우스 즉시 추적
    const onMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      dot.classList.add('visible');
      ring.classList.add('visible');
    };

    // 골드 링: lerp 지연 추적
    const animate = () => {
      ringPos.x += (mousePos.x - ringPos.x) * 0.11;
      ringPos.y += (mousePos.y - ringPos.y) * 0.11;
      ring.style.left = `${ringPos.x}px`;
      ring.style.top = `${ringPos.y}px`;
      rafId = requestAnimationFrame(animate);
    };

    const onLeave = () => {
      dot.classList.remove('visible');
      ring.classList.remove('visible');
    };
    const onEnter = () => {
      dot.classList.add('visible');
      ring.classList.add('visible');
    };

    // 클릭 가능 요소 호버 시 링 확대
    const onHoverIn = () => ring.classList.add('hovered');
    const onHoverOut = () => ring.classList.remove('hovered');

    const SELECTORS = 'a, button, [role="button"], .MuiCard-root, .MuiIconButton-root';

    const attachHover = () => {
      document.querySelectorAll(SELECTORS).forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
        el.addEventListener('mouseenter', onHoverIn);
        el.addEventListener('mouseleave', onHoverOut);
      });
    };

    rafId = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    attachHover();

    // 동적으로 추가되는 요소에도 호버 적용
    const mo = new MutationObserver(attachHover);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
