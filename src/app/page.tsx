import Hero from '@/components/hero/Hero';
import IconTextMorph from '@/components/sections/IconTextMorph';
import StickyProjects from '@/components/sections/StickyProjects';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0b] flex flex-col gap-6 p-6">
      {/* Hero section with no border radius and full-width top/sides */}
      <div className="-m-6 mb-0">
        <Hero />
      </div>

      {/* Animation section with rounded corners */}
      <div className="rounded-[40px] overflow-hidden shadow-2xl">
        <IconTextMorph />
      </div>

      {/* Sticky Stacking Projects */}
      <StickyProjects />

      {/* Spacer for scroll demonstration */}
      <section className="h-screen flex items-center justify-center bg-white rounded-[40px] shadow-2xl">
        <h2 className="text-4xl font-bold text-neutral-200 italic tracking-tighter uppercase">Next Chapter</h2>
      </section>
    </main>
  );
}
