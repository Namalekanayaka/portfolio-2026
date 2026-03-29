'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  'React.js',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Express.js',
  'MySQL',
  'Firebase',
  'Tailwind CSS',
  'Figma',
  'UI / UX Design',
  'Socket.io',
  'Git & GitHub',
];

export default function SkillsTextFill() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.skills-text-fill', { backgroundSize: '0%' });

      const textElements = gsap.utils.toArray<HTMLElement>('.skills-text-fill');

      textElements.forEach((text) => {
        gsap.fromTo(
          text,
          { backgroundSize: '0%' },
          {
            backgroundSize: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: text,
              start: 'center 95%',
              end: 'center 45%',
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="skills-section"
    >
      {/* Section Header */}
      <div className="skills-header">
        <p className="skills-eyebrow">What I work with</p>
        <h2 className="skills-heading">My Skills</h2>
      </div>

      {/* Scrollable skill lines */}
      <div ref={containerRef} className="skills-list">
        {skills.map((skill, i) => (
          <h2
            key={i}
            className="skills-text-fill"
            data-index={i}
          >
            {skill}
          </h2>
        ))}
      </div>
    </section>
  );
}
