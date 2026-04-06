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

        {/* INFO DEL PERFUME */}
        <div className="detail-related">
          <h3 className="detail-related-title">Sobre esta Fragancia</h3>
          <p className="detail-related-sub">Perfil olfativo completo</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 16 }}>

            {/* Acordes */}
            <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: '24px' }}>
              <p style={{ color: '#555', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', marginBottom: 16 }}>Acordes Principales</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(perfume.acordes || []).map((acorde, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ color: '#ccc', fontSize: '0.75rem', fontFamily: 'Montserrat, sans-serif' }}>{acorde.nombre}</span>
                    </div>
                    <div style={{ background: '#1a1a1a', borderRadius: 4, height: 10, overflow: 'hidden' }}>
                      <div style={{ width: `${acorde.porcentaje}%`, height: '100%', background: acorde.color, borderRadius: 4, transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notas */}
            <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: '24px' }}>
              <p style={{ color: '#555', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', marginBottom: 16 }}>Pirámide Olfativa</p>

              <div style={{ marginBottom: 16 }}>
                <p style={{ color: '#FFD700', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', marginBottom: 8 }}>▲ Salida</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(perfume.notasSalida || []).map((n, i) => (
                    <span key={i} style={{ padding: '4px 10px', border: '1px solid #2a2a2a', color: '#ccc', fontSize: '0.7rem', fontFamily: 'Montserrat, sans-serif', borderRadius: 6 }}>{n}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <p style={{ color: '#FFD700', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', marginBottom: 8 }}>♥ Corazón</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(perfume.notasCorazon || []).map((n, i) => (
                    <span key={i} style={{ padding: '4px 10px', border: '1px solid #2a2a2a', color: '#ccc', fontSize: '0.7rem', fontFamily: 'Montserrat, sans-serif', borderRadius: 6 }}>{n}</span>
                  ))}
                </div>
              </div>

              <div>
                <p style={{ color: '#FFD700', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', marginBottom: 8 }}>● Base</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {(perfume.notasBase || []).map((n, i) => (
                    <span key={i} style={{ padding: '4px 10px', border: '1px solid #2a2a2a', color: '#ccc', fontSize: '0.7rem', fontFamily: 'Montserrat, sans-serif', borderRadius: 6 }}>{n}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Datos generales */}
            <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: 12, padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ color: '#555', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', marginBottom: 0 }}>Datos de la Fragancia</p>
              {[
                { label: 'Familia', valor: perfume.familia },
                { label: 'Proyección', valor: perfume.proyeccion },
                { label: 'Duración', valor: perfume.duracion },
                { label: 'Temporada', valor: perfume.temporada },
                { label: 'Momento', valor: perfume.momento === 'dia' ? '☀️ Día' : perfume.momento === 'noche' ? '🌙 Noche' : '🔄 Versátil' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1a1a1a', paddingBottom: 10 }}>
                  <span style={{ color: '#555', fontSize: '0.65rem', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.label}</span>
                  <span style={{ color: '#fff', fontSize: '0.8rem', fontFamily: 'Playfair Display, serif' }}>{item.valor}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumeDetail;
