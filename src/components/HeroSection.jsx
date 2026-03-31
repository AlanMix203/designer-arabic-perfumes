import avixLogo from "@/assets/avix-logo.png";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6">
        <img
          src={avixLogo}
          alt="AVIX Perfumes"
          width={200}
          height={200}
          className="rounded-full border-2 border-gold"
          style={{ boxShadow: "var(--shadow-gold-intense)" }}
        />
      </div>
      <h1 className="font-display text-5xl md:text-6xl gold-text tracking-wider mb-4 text-center">
        AVIX
      </h1>
      <p className="font-body text-xl md:text-2xl text-gold-light tracking-widest uppercase mb-2">
        Fragancias de Lujo
      </p>
      <div className="gold-divider w-48 mt-6" />
    </section>
  );
};

export default HeroSection;
