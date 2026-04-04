import { useState, useRef } from "react";
import ProductCard from "./ProductCard";
import MiniPerfumeCard from "./MiniPerfumeCard";

const momentoLabels = {
  dia: "☀️ Recomendado de Día",
  noche: "🌙 Recomendado de Noche",
  versatil: "🔄 Versátil (Día y Noche)",
};

const PerfumeDetail = ({ perfume, todosLosPerfumes, onClose, onAgregar }) => {
  const [selectedSize, setSelectedSize] = useState(1);
  const [cantidad, setCantidad] = useState(1);
  const videoRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  if (!perfume) return null;

  const sizes = [
    { label: "2ML", price: perfume.precio2ml },
    { label: "5ML", price: perfume.precio5ml },
    { label: "10ML", price: perfume.precio10ml },
  ];

  const currentSize = sizes[selectedSize];

  const handleAgregar = () => {
    if (onAgregar) {
      onAgregar(perfume.nombre, currentSize.price, `${currentSize.label} — $${currentSize.price}`, cantidad);
    }
  };

  // Related by shared ingredients
  const relacionados = todosLosPerfumes
    .filter(p => p.nombre !== perfume.nombre)
    .map(p => ({
      ...p,
      coincidencias: (p.ingredientes || []).filter(ing => (perfume.ingredientes || []).includes(ing)).length,
    }))
    .filter(p => p.coincidencias > 0)
    .sort((a, b) => b.coincidencias - a.coincidencias)
    .slice(0, 4);

  const masVendidos = todosLosPerfumes
    .filter(p => p.nombre !== perfume.nombre)
    .slice(0, 4);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose}>✕</button>

        <div className="detail-main">
          {/* LEFT - Image */}
          <div className="detail-image"
            onMouseEnter={() => { setIsHovering(true); videoRef.current?.play().catch(() => {}); }}
            onMouseLeave={() => { setIsHovering(false); if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } }}>
            <img src={perfume.imagen} alt={perfume.nombre}
              style={{ opacity: isHovering && perfume.video ? 0 : 1 }} />
            {perfume.video && (
              <video ref={videoRef} src={perfume.video} muted loop playsInline
                className="detail-video" style={{ opacity: isHovering ? 1 : 0 }} />
            )}
          </div>

          {/* RIGHT - Info */}
          <div className="detail-info">
            <p className="detail-brand">{perfume.marca}</p>
            <h2 className="detail-name">{perfume.nombre}</h2>
            <div className="detail-stars">★★★★★ <span>97</span></div>

            <p className="detail-description">{perfume.descripcion}</p>

            {/* Momento */}
            <div className="detail-momento">
              {momentoLabels[perfume.momento] || "🔄 Versátil"}
            </div>

            {/* Ingredientes */}
            <div className="detail-ingredients">
              <p className="detail-label">INGREDIENTES</p>
              <div className="detail-tags">
                {(perfume.ingredientes || []).map((ing) => (
                  <span key={ing} className="detail-tag">{ing}</span>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="detail-sizes">
              <p className="detail-label">MILILITROS</p>
              <div className="sizes-buttons">
                {sizes.map((s, i) => (
                  <button key={i}
                    className={`size-btn ${selectedSize === i ? "size-active" : ""}`}
                    onClick={() => setSelectedSize(i)}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="product-card-price">
              <p className="price-label">Precio</p>
              <p className="price-value">$ {currentSize.price}<sup>00</sup></p>
            </div>

            {/* Quantity */}
            <div className="product-card-qty">
              <p className="qty-label">Cantidad</p>
              <div className="qty-controls">
                <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>−</button>
                <span>{cantidad}</span>
                <button onClick={() => setCantidad(cantidad + 1)}>+</button>
              </div>
            </div>

            <button className="product-card-add" onClick={handleAgregar}>
              Agregar al Carrito
            </button>

            <div className="product-card-features">
              <div className="feature-line">📦 Envíos a toda la república mexicana</div>
              <div className="feature-line">🚀 Entrega exprés 1-2 días hábiles*</div>
              <div className="feature-line">✓ Perfumes 100% originales</div>
              <div className="feature-line">🔒 Pagos seguros</div>
              <div className="feature-line"><span className="stock-dot"></span> En stock</div>
            </div>
          </div>
        </div>

        {/* Related perfumes */}
        {relacionados.length > 0 && (
          <div className="detail-related">
            <h3 className="detail-related-title">Perfumes Relacionados</h3>
            <p className="detail-related-sub">Basado en ingredientes similares</p>
            <div className="detail-related-grid">
              {relacionados.map((p, i) => (
                <MiniPerfumeCard key={i} perfume={p} onClick={() => {}} />
              ))}
            </div>
          </div>
        )}

        {/* Best sellers */}
        <div className="detail-related">
          <h3 className="detail-related-title">Más Vendidos</h3>
          <p className="detail-related-sub">Los favoritos de nuestros clientes</p>
          <div className="detail-related-grid">
            {masVendidos.map((p, i) => (
              <MiniPerfumeCard key={i} perfume={p} onClick={() => {}} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumeDetail;
