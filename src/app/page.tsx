import Hero from '@/components/hero/Hero';
import IconTextMorph from '@/components/sections/IconTextMorph';
import PortfolioProjects from '@/components/sections/PortfolioProjects';
import SceneTyping from '@/components/sections/SceneTyping';
import Contact from '@/components/sections/Contact';
import FloatingShapes from '@/components/hero/FloatingShapes';

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col relative w-full">
      {/* Persisted Original 3D Shapes across Hero and About sections */}
      <div className="fixed top-0 left-0 w-full h-[100dvh] z-[15] pointer-events-none">
        <FloatingShapes />
      </div>

      {/* Hero section */}
      <div className="w-full relative z-10">
        <Hero />
      </div>

      {/* About Animation Section */}
      <div className="w-full relative z-10">
        <IconTextMorph />
      </div>

      {/* Projects Section */}
      <div className="w-full relative z-20 bg-white">
        <PortfolioProjects />
      </div>

      {/* Scene.js Typing Animation Section */}
      <div className="w-full relative z-20">
        <SceneTyping />
      </div>

      {/* Contact Section */}
      <div className="w-full relative z-30">
        <Contact />
      </div>
    </main>
  );
}
