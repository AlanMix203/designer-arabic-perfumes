import { useState, useRef } from "react";

const ingredienteEmojis = {
  "Vainilla": "🍦", "Ámbar": "🔶", "Cuero": "🧥", "Iris": "🌸",
  "Lavanda": "💜", "Menta": "🌿", "Canela": "🫚", "Manzana Verde": "🍏",
  "Tonka": "🫘", "Bergamota": "🍊", "Incienso": "🪔", "Almizcle": "🤍",
  "Cardamomo": "🫛", "Jengibre": "🫚", "Madera de Cedro": "🌲", "Cedro": "🌲",
  "Limón": "🍋", "Salvia": "🍃", "Vainilla Negra": "🖤", "Loto": "🪷",
  "Jazmín": "🌺", "Cacao": "🍫", "Tuberosa": "🌷", "Azahar": "🌼",
  "Coco": "🥥", "Caramelo": "🍬", "Piña": "🍍", "Abedul": "🌳",
  "Manzana": "🍎", "Mango": "🥭", "Tabaco": "🍂", "Rosa": "🌹",
  "Frambuesa": "🫐", "Orquídea": "🌺", "Sándalo": "🪵", "Fresa": "🍓",
  "Cereza": "🍒", "Almendra": "🌰", "Pachulí": "🍃", "Mandarina": "🍊",
};

const MiniPerfumeCard = ({ perfume, onClick, onAgregar }) => {
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

  const topIngredientes = (perfume.ingredientes || []).slice(0, 3);

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
        <p className="mini-card-price">
          <span className="mini-card-price-old">${perfume.precio10ml + 50}</span>
          <span className="mini-card-price-current"> ${perfume.precio2ml} MXN</span>
        </p>
        <div className="mini-card-ingredients">
          {topIngredientes.map((ing) => (
            <div key={ing} className="mini-card-ing">
              <span className="mini-card-ing-emoji">{ingredienteEmojis[ing] || "✦"}</span>
              <span className="mini-card-ing-name">{ing}</span>
            </div>
          ))}
        </div>
        <button className="mini-card-add" onClick={(e) => {
          e.stopPropagation();
          if (onAgregar) onAgregar(perfume.nombre, perfume.precio2ml, "2ML — $" + perfume.precio2ml, 1);
        }}>
          🛒 Añadir al Carrito
        </button>
      </div>
    </div>
  );
};

export default MiniPerfumeCard;
