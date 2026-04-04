import { useState, useRef } from "react";

const MiniPerfumeCard = ({ perfume, onClick }) => {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <div className="mini-card" onClick={() => onClick(perfume)}
      onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="mini-card-img">
        <img src={perfume.imagen} alt={perfume.nombre}
          style={{ opacity: isHovering && perfume.video ? 0 : 1 }} />
        {perfume.video && (
          <video ref={videoRef} src={perfume.video} muted loop playsInline
            className="mini-card-video" style={{ opacity: isHovering ? 1 : 0 }} />
        )}
      </div>
      <div className="mini-card-info">
        <p className="mini-card-brand">{perfume.marca}</p>
        <h4 className="mini-card-name">{perfume.nombre}</h4>
        <div className="mini-card-stars">★★★★★</div>
        <p className="mini-card-price">Desde ${perfume.precio2ml}</p>
      </div>
    </div>
  );
};

export default MiniPerfumeCard;
