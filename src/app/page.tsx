import Hero from '@/components/hero/Hero';
import IconTextMorph from '@/components/sections/IconTextMorph';
import PortfolioProjects from '@/components/sections/PortfolioProjects';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] flex flex-col gap-6 p-6">
      {/* Hero section */}
      <div className="-m-6 mb-0">
        <Hero />
      </div>

      {/* About Animation Section */}
      <div className="overflow-hidden shadow-2xl">
        <IconTextMorph />
      </div>

      {/* Projects Section */}
      <div className="overflow-hidden shadow-2xl bg-[#050505] -mx-6 md:mx-0">
        <PortfolioProjects />
      </div>

    </main>
  );
}
