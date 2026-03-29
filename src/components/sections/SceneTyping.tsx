'use client';

import React, { useEffect, useRef } from 'react';

export default function SceneTyping() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<unknown>(null);

  useEffect(() => {
    // Dynamically import to avoid SSR issues
    Promise.all([
      import('scenejs'),
      import('@scenejs/effects'),
    ]).then(([SceneModule, EffectsModule]) => {
      const Scene = (SceneModule as { default: typeof SceneModule.default }).default ?? SceneModule.default;
      const Effects = EffectsModule as { typing?: (...args: unknown[]) => unknown; kineticFrame?: (...args: unknown[]) => unknown };

      // Attach typing & kineticFrame to Scene object so original API works
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SceneAny = Scene as any;
      if (Effects.typing) SceneAny.typing = Effects.typing;
      if (Effects.kineticFrame) SceneAny.kineticFrame = Effects.kineticFrame;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const scene: any = new SceneAny(
        {
          '.scene-typing-container': {},
        },
        {
          selector: true,
        }
      );

      // Override selector scope to our section's container
      // Scene.js uses document.querySelector by default — we scope via our ref
      const item = scene.getItem('.scene-typing-container');

      function move(
        startTime: number,
        endTime: number,
        left: number,
        top: number,
        rotate: number,
        scale: number
      ) {
        item.set({
          [`${startTime}, ${endTime}`]: SceneAny.kineticFrame({
            left: `${left}px`,
            top: `${top}px`,
          }).set({
            transform: {
              rotate: `${rotate}deg`,
              scale,
            },
          }),
        });
      }

      move(0, 0, 90, 115, 0, 5);
      move(1, 1, 90, 115, 0, 2);
      move(2, 3, 0, 115, 0, 1);
      move(4, 4.5, -100, 0, -90, 2);
      move(5.5, 6, -52, -18, -90, 1.6);
      move(7, 7.5, 30, 45, 0, 2);
      move(8.5, 9, 10, 30, 0, 3);
      move(10, 10.5, 28, 0, 0, 2.2);
      move(11.5, 12, 50, -35, 0, 1.65);
      move(13, 13.5, 35, -70, 0, 2);
      move(14.5, 18, 0, 0, 0, 1);

      scene.set({
        "[data-typing='intro']": SceneAny.typing({
          text: "I'm a Front-End Engineer",
          duration: 1.5
        }),

        "[data-typing='with']": {
          1.8: SceneAny.typing({
            text: "with",
            duration: 0.5
          }),
        },

        "[data-typing='skills1']": {
          2.5: SceneAny.typing({
            text: "JavaScript, TypeScript, CSS,",
            duration: 1.5
          }),
        },

        "[data-typing='skills2']": {
          4.2: SceneAny.typing({
            text: "Node.js, Animations, Scene.js",
            duration: 1.5
          }),
        },

        "[data-typing='cta']": {
          6.2: SceneAny.typing({
            text: "Scroll down to contact me ↓",
            duration: 1.5
          }),
        },
      });

      scene.setPlaySpeed(1);
      scene.setEasing('ease-in-out');
      scene.setIterationCount('infinite');
      scene.play();

      sceneRef.current = scene;
    });

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (sceneRef.current as any)?.stop?.();
    };
  }, []);

  return (
    <section
      id="scene-typing"
      className="scene-typing-section"
    >
      <div className="scene-typing-wrapper" ref={containerRef}>
        <div className="scene-typing-container">
          <a
            href="https://github.com/daybrush"
            target="_blank"
            rel="noreferrer"
            data-typing="i"
          >
            I
          </a>
          <a
            href="https://github.com/daybrush"
            target="_blank"
            rel="noreferrer"
            data-typing="frontend"
          >
            &apos;m Front-End
          </a>
          <a
            href="https://github.com/daybrush"
            target="_blank"
            rel="noreferrer"
            data-typing="engineer"
          >
            Engineer
          </a>
          <p data-typing="with">with</p>
          <p data-typing="javascript">JavaScript</p>
          <p data-typing="typescript">TypeScript</p>
          <p data-typing="css">CSS</p>
          <p data-typing="nodejs">Node.js</p>
          <p data-typing="animation">Animation</p>
          <a
            href="https://github.com/daybrush/scenejs"
            target="_blank"
            rel="noreferrer"
            data-typing="scenejs"
          >
            Scene.js
          </a>
        </div>
      </div>
    </section>
  );
}
