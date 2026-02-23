import Hero from '@/components/hero/Hero';
import IconTextMorph from '@/components/sections/IconTextMorph';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <IconTextMorph />

      {/* Spacer for scroll demonstration */}
      <section className="h-screen flex items-center justify-center bg-white">
        <h2 className="text-4xl font-bold text-neutral-200 italic tracking-tighter uppercase">Next Chapter</h2>
      </section>
    </main>
  );
}
