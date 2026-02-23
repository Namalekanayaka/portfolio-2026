import Hero from '@/components/hero/Hero';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      {/* Spacer for scroll demonstration */}
      <section className="h-screen flex items-center justify-center bg-[#f5f5f7]">
        <h2 className="text-4xl font-bold text-foreground/20 italic tracking-tighter uppercase">Next Chapter</h2>
      </section>
    </main>
  );
}
