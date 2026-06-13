'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
  useEffect(() => {
    // Hero entrance
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      .to('.hero-title', { opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .to('.hero-actions', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .to('.scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.2');

    gsap.set(['.hero-eyebrow', '.hero-sub', '.hero-actions', '.scroll-indicator'], { y: 30 });

    // Section reveals
    const fadeEls = document.querySelectorAll(
      '.section-eyebrow, .section-title, .about-text p, .stat-card, .skill-card, .project-card, .timeline-item, .contact-info, .contact-form'
    );
    fadeEls.forEach((el, i) => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          delay: (i % 4) * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    });

    // Orbit container
    gsap.fromTo('.orbit-container',
      { opacity: 0, scale: 0.7 },
      {
        opacity: 1, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)',
        scrollTrigger: { trigger: '.about-visual', start: 'top 80%' }
      }
    );

    // Timeline items stagger
    gsap.fromTo('.timeline-item',
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.timeline', start: 'top 75%' }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return null;
}
