'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + 'px';
        cursorRef.current.style.top = my + 'px';
      }
    };

    const lag = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx + 'px';
        ringRef.current.style.top = ry + 'px';
      }
      requestAnimationFrame(lag);
    };

    window.addEventListener('mousemove', move);
    lag();

    const links = document.querySelectorAll('a, button, input, textarea');
    links.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (cursorRef.current) { cursorRef.current.style.width = '20px'; cursorRef.current.style.height = '20px'; }
        if (ringRef.current) { ringRef.current.style.width = '60px'; ringRef.current.style.height = '60px'; }
      });
      el.addEventListener('mouseleave', () => {
        if (cursorRef.current) { cursorRef.current.style.width = '12px'; cursorRef.current.style.height = '12px'; }
        if (ringRef.current) { ringRef.current.style.width = '40px'; ringRef.current.style.height = '40px'; }
      });
    });

    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}
