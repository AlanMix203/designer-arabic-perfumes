import avixLogo from "@/assets/avix-logo.png";

const HeroSection = () => {
  return (
    <div className="hero-logo-container">
      <div className="hero-logo-wrapper">
        <img src={avixLogo} alt="AVIX Logo" className="hero-logo-img" />
      </div>
      <div className="hero-logo-text">
        <span className="hero-brand-name">AVIX</span>
      </div>
      <div className="hero-tagline">
        <span>Fragancias de Lujo</span>
      </div>
      <div className="hero-line"></div>
    </div>
  );
};

export default HeroSection;
