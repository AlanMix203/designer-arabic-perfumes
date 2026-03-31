import HeroSection from "@/components/HeroSection";
import PerfumeCatalog from "@/components/PerfumeCatalog";

const Index = () => {
  return (
    <div className="min-h-screen bg-background gold-frame-outer">
      <HeroSection />
      <PerfumeCatalog />
      <footer className="py-8 text-center">
        <div className="gold-divider w-32 mx-auto mb-4" />
        <p className="font-ui text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
          © 2026 AVIX — Fragancias de Lujo
        </p>
      </footer>
    </div>
  );
};

export default Index;
