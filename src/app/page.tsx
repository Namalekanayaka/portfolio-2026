import Hero from '@/components/hero/Hero';
import IconTextMorph from '@/components/sections/IconTextMorph';
import StickyProjects from '@/components/sections/StickyProjects';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] flex flex-col gap-6 p-6">
      {/* Hero section */}
      <div className="-m-6 mb-0">
        <Hero />
      </div>

      {/* About Animation Section */}
      <div className="rounded-[10vw] overflow-hidden shadow-2xl">
        <IconTextMorph />
      </div>

      {/* Advanced Projects Grid Section */}
      <StickyProjects />
    </main>
  );
}
