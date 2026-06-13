'use client';
import { useEffect, useRef, useState } from 'react';

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (navRef.current) navRef.current.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav ref={navRef}>
        <div className="nav-logo mono">
          <span>Mr. m.mehdi</span> 
        </div>
        <ul className="nav-links">
          {['about', 'skills', 'projects', 'experience', 'contact'].map(s => (
            <li key={s}>
              <a href={`#${s}`}>{s}</a>
            </li>
          ))}
          <li><a href="#contact" className="nav-cta">hire me</a></li>
        </ul>
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-nav ${open ? 'open' : ''}`}>
        {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map(s => (
          <a key={s} href={`#${s.toLowerCase()}`} onClick={close}>{s}</a>
        ))}
      </div>
    </>
  );
}
