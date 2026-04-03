import { useState, useRef } from "react";

const ProductCard = ({ nombre, marca, precio2ml, precio5ml, precio10ml, imagen, video, onAgregar }) => {
  const sizes = [
    { label: "2ML", ml: "2ml", price: precio2ml },
    { label: "5ML", ml: "5ml", price: precio5ml },
    { label: "10ML", ml: "10ml", price: precio10ml },
  ];

  const [selectedSize, setSelectedSize] = useState(1);
  const [cantidad, setCantidad] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);

  const currentSize = sizes[selectedSize];

  const handleAgregar = () => {
    if (onAgregar) {
      onAgregar(nombre, currentSize.price, `${currentSize.label} — $${currentSize.price}`, cantidad);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="product-card">
      <div
        className="product-card-img"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={imagen}
          alt={nombre}
          style={{ opacity: isHovering && video ? 0 : 1 }}
        />
        {video && (
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            className="product-card-video"
            style={{ opacity: isHovering ? 1 : 0 }}
          />
        )}
      </div>
      <div className="product-card-info">
        <h3 className="product-card-name">{nombre}</h3>
        <div className="product-card-stars">★★★★★ <span className="star-count">97</span></div>
        <p className="product-card-brand">{marca}</p>

        <div className="product-card-sizes">
          <p className="sizes-label">MILILITROS</p>
          <div className="sizes-buttons">
            {sizes.map((s, i) => (
              <button
                key={i}
                className={`size-btn ${selectedSize === i ? "size-active" : ""}`}
                onClick={() => setSelectedSize(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="product-card-price">
          <p className="price-label">Precio</p>
          <p className="price-value">$ {currentSize.price}<sup>00</sup></p>
        </div>

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
  );
};

export default ProductCard;
