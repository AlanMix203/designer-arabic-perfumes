import avixLogo from "@/assets/avix-logo.png";

const HeroSection = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img
        src={avixLogo}
        alt="AVIX Perfumes"
        width={100}
        height={100}
        style={{
          borderRadius: '50%',
          border: '1px solid #333',
          boxShadow: '0 0 30px rgba(255,255,255,0.05)',
        }}
      />
    </div>
  );
};

export default HeroSection;
