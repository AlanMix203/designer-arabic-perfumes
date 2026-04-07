import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroSection from "@/components/HeroSection";
import MiniPerfumeCard from "@/components/MiniPerfumeCard";
import PerfumeDetail from "@/components/PerfumeDetail";
import AromasModal from "@/components/AromasModal";
import DecantsInfo from "@/components/DecantsInfo";
import EnvioInfo from "@/components/EnvioInfo";
import bannerImg from "@/assets/banner-perfumes.png";
import { perfumesMasculinos, perfumesFemeninos, perfumesArabesMasculinos, perfumesArabesFemeninos } from "@/data/categories";
import './Index.css';

const todosLosPerfumes = [
  ...perfumesMasculinos,
  ...perfumesFemeninos,
  ...perfumesArabesMasculinos,
  ...perfumesArabesFemeninos,
];

const perfumesFamosos = [
  perfumesMasculinos.find(p => p.nombre === "Valentino Born Intense"),
  perfumesMasculinos.find(p => p.nombre === "JPG Le Male"),
  perfumesMasculinos.find(p => p.nombre === "Versace Eros EDP"),
  perfumesMasculinos.find(p => p.nombre === "Azzaro Most Wanted Intense"),
  perfumesFemeninos.find(p => p.nombre === "Good Girl EDP"),
  perfumesFemeninos.find(p => p.nombre === "Libre Intense"),
].filter(Boolean);

const marcasDisenador = [
  { nombre: "Carolina Herrera", iniciales: "CH", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Carolina_Herrera_Logo.svg/300px-Carolina_Herrera_Logo.svg.png" },
  { nombre: "Jean Paul Gaultier", iniciales: "JPG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Jean_Paul_Gaultier_logo.svg/300px-Jean_Paul_Gaultier_logo.svg.png" },
  { nombre: "Versace", iniciales: "VS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Versace_logo.svg/300px-Versace_logo.svg.png" },
  { nombre: "Yves Saint Laurent", iniciales: "YSL", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/YSL_Logo.svg/300px-YSL_Logo.svg.png" },
  { nombre: "Azzaro", iniciales: "AZ", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Azzaro_logo.svg/300px-Azzaro_logo.svg.png" },
  { nombre: "Valentino", iniciales: "VL", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Valentino_Logo.svg/300px-Valentino_Logo.svg.png" },
  { nombre: "Ariana Grande", iniciales: "AG", logo: null },
  { nombre: "Nautica", iniciales: "NT", logo: null },
];

const marcasArabes = [
  { nombre: "Lattafa", iniciales: "LT", logo: null },
  { nombre: "Afnan", iniciales: "AF", logo: null },
  { nombre: "Armaf", iniciales: "AR", logo: null },
];

const Index = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [carritoActivo, setCarritoActivo] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [perfumeSeleccionado, setPerfumeSeleccionado] = useState(null);
  const [marcaFiltro, setMarcaFiltro] = useState(null);
  const [marcaLogo, setMarcaLogo] = useState(null);
  const [marcasModal, setMarcasModal] = useState(false);
  const [marcaDetalleModal, setMarcaDetalleModal] = useState(false);
  const [aromasModal, setAromasModal] = useState(false);
  const [decantsModal, setDecantsModal] = useState(false);
  const [envioModal, setEnvioModal] = useState(false);
  const [aromaFiltro, setAromaFiltro] = useState(null);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') { setMarcasModal(false); setAromasModal(false); setDecantsModal(false); setEnvioModal(false); }};
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  const toggleCarrito = () => setCarritoActivo(!carritoActivo);

  const agregarProductCard = (nombre, precio, texto, cantidad) => {
    setCarrito([...carrito, { nombre, precio: precio * cantidad, precioBase: precio, texto, cantidad }]);
  };

  const eliminarDelCarrito = (index) => {
    const c = [...carrito]; c.splice(index, 1); setCarrito(c);
  };

  const sumarCantidad = (index) => {
    const c = [...carrito]; c[index].cantidad++; c[index].precio += c[index].precioBase; setCarrito(c);
  };

  const restarCantidad = (index) => {
    const c = [...carrito];
    if (c[index].cantidad > 1) { c[index].cantidad--; c[index].precio -= c[index].precioBase; setCarrito(c); }
    else eliminarDelCarrito(index);
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio, 0);

  const resultadosBusqueda = useMemo(() => {
    if (!busqueda.trim()) return [];
    const q = busqueda.toLowerCase();
    return todosLosPerfumes.filter(p =>
      p.nombre.toLowerCase().includes(q) || p.marca.toLowerCase().includes(q)
    );
  }, [busqueda]);

  const perfumesDeMarca = useMemo(() => {
    if (!marcaFiltro) return [];
    return todosLosPerfumes.filter(p =>
      p.marca.toLowerCase().includes(marcaFiltro.toLowerCase())
    );
  }, [marcaFiltro]);

  const perfumesDeAroma = useMemo(() => {
    if (!aromaFiltro) return [];
    return todosLosPerfumes.filter(p =>
      (p.ingredientes || []).some(ing => ing.toLowerCase() === aromaFiltro.toLowerCase())
    );
  }, [aromaFiltro]);

  const handleMarcaClick = (marca) => {
    setMarcaFiltro(marca.nombre);
    setMarcaLogo(marca.logo || null);
    setMarcasModal(false);
    setMarcaDetalleModal(true);
  };

  const handleAromaSelect = (nombre) => {
    setAromaFiltro(nombre);
    setAromasModal(false);
  };

  return (
    <div className="app-container">
      <div className="marco-neon"></div>

      <div className="top-bar">
        <div className="texto-movimiento">
          <span>DECANTS DE PERFUME DE DISEÑADOR Y ÁRABES</span>
          <span>ENVÍOS GRATIS EN SAN ANDRÉS TUXTLA</span>
          <span>DECANTS DE DISEÑADOR Y ÁRABES</span>
          <span>PARFAM AVIX</span>
          <span>ENVÍOS NACIONALES</span>
          <span>100% ORIGINAL</span>
        </div>
      </div>

      <header className="encabezado">
        <HeroSection />
      </header>

      {/* TOP RIGHT: Search + Cart */}
      <div className="top-actions">
        <div className="top-search-bar">
          <span className="search-icon-sm">🔍</span>
          <input type="text" placeholder="Buscar perfume..."
            value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          {busqueda && <button className="search-clear-sm" onClick={() => setBusqueda('')}>✕</button>}
        </div>
        <button className="btn-carrito" onClick={toggleCarrito}>
          🛒 ({carrito.length})
        </button>
      </div>

      {/* Search results dropdown */}
      {resultadosBusqueda.length > 0 && (
        <div className="search-dropdown">
          <p className="search-results-count">{resultadosBusqueda.length} resultado(s)</p>
          <div className="mini-grid-4">
            {resultadosBusqueda.map((p, i) => (
              <MiniPerfumeCard key={i} perfume={p} onClick={setPerfumeSeleccionado} onAgregar={agregarProductCard} />
            ))}
          </div>
        </div>
      )}
      {busqueda.trim() && resultadosBusqueda.length === 0 && (
        <div className="search-dropdown">
          <p className="search-no-results">No se encontraron perfumes con "{busqueda}"</p>
        </div>
      )}

      <nav className="menu-extra menu-sticky">
        <a href="#inicio">Inicio</a>
        <a href="#marcas" onClick={(e) => { e.preventDefault(); setMarcasModal(true); }}>Marcas</a>
        <a href="#aromas" onClick={(e) => { e.preventDefault(); setAromasModal(true); }}>Aromas</a>
        <a href="#decants" onClick={(e) => { e.preventDefault(); setDecantsModal(true); }}>¿Qué es un Decant?</a>
        <a href="#envio" onClick={(e) => { e.preventDefault(); setEnvioModal(true); }}>Envío</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#carrito" onClick={(e) => { e.preventDefault(); toggleCarrito(); }}>Carrito</a>
      </nav>

      {/* BANNER IMAGE */}
      <div className="banner-image-section">
        <img src={bannerImg} alt="Colección de perfumes Parfam Avix" />
      </div>

      {/* AROMA FILTER RESULTS */}
      {aromaFiltro && (
        <section className="aroma-filter-section">
          <div className="aroma-filter-header">
            <span className="aroma-filter-tag">🌸 Aroma: {aromaFiltro}</span>
            <p className="search-results-count">{perfumesDeAroma.length} perfume(s) con {aromaFiltro}</p>
            <button className="aroma-clear-btn" onClick={() => setAromaFiltro(null)}>✕ Quitar filtro</button>
          </div>
          <div className="mini-grid-4">
            {perfumesDeAroma.map((p, i) => (
              <MiniPerfumeCard key={i} perfume={p} onClick={setPerfumeSeleccionado} onAgregar={agregarProductCard} />
            ))}
          </div>
        </section>
      )}

      {/* ===== DISEÑADOR ===== */}
      <section className="cat-content">
        <h2 className="section-title-sm" style={{ marginBottom: 16 }}>Diseñador</h2>
        <div className="catalogo-cat">
          <h3 className="catalogo-cat-title"><span>Masculino</span></h3>
          <div className="mini-grid-4">
            {perfumesMasculinos.map((p, i) => (
              <MiniPerfumeCard key={i} perfume={p} onClick={setPerfumeSeleccionado} onAgregar={agregarProductCard} />
            ))}
          </div>
        </div>
        <div className="catalogo-cat">
          <h3 className="catalogo-cat-title"><span>Femenino</span></h3>
          <div className="mini-grid-4">
            {perfumesFemeninos.map((p, i) => (
              <MiniPerfumeCard key={i} perfume={p} onClick={setPerfumeSeleccionado} onAgregar={agregarProductCard} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ÁRABES ===== */}
      <section className="cat-content">
        <h2 className="section-title-sm" style={{ marginBottom: 16 }}>Árabes</h2>
        <div className="catalogo-cat">
          <h3 className="catalogo-cat-title"><span>Masculino</span></h3>
          <div className="mini-grid-4">
            {perfumesArabesMasculinos.map((p, i) => (
              <MiniPerfumeCard key={i} perfume={p} onClick={setPerfumeSeleccionado} onAgregar={agregarProductCard} />
            ))}
          </div>
        </div>
        <div className="catalogo-cat">
          <h3 className="catalogo-cat-title"><span>Femenino</span></h3>
          <div className="mini-grid-4">
            {perfumesArabesFemeninos.map((p, i) => (
              <MiniPerfumeCard key={i} perfume={p} onClick={setPerfumeSeleccionado} onAgregar={agregarProductCard} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNER 1 ===== */}
      <section className="promo-banner">
        <div className="promo-inner">
          <span className="promo-tag">ENVÍO GRATIS</span>
          <h3>Envíos gratis en San Andrés Tuxtla</h3>
          <p>Envíos nacionales por FedEx Express · Entrega 1-3 días hábiles</p>
        </div>
      </section>

      {/* ===== MARCA FILTRADA ===== */}
      {marcaDetalleModal && marcaFiltro && (
        <div className="modal-bg open" onClick={(e) => e.target === e.currentTarget && setMarcaDetalleModal(false)}>
          <div className="modal-box" style={{ maxWidth: 1000, maxHeight: '85vh', overflowY: 'auto' }}>
            <button className="modal-close" onClick={() => setMarcaDetalleModal(false)}>✕</button>
            <p className="modal-top-tag">Colección</p>
            {marcaLogo ? (
              <div className="marca-logo-header">
                <img src={marcaLogo} alt={marcaFiltro} loading="lazy" className="marca-logo-img" />
              </div>
            ) : (
              <h2 className="section-title-sm" style={{ marginBottom: 4 }}>{marcaFiltro}</h2>
            )}
            <p className="modal-section-label" style={{ marginBottom: 24 }}>{perfumesDeMarca.length} perfume(s) disponibles</p>
            <div className="modal-divider"></div>
            <div className="mini-grid-4" style={{ padding: '0 0 20px' }}>
              {perfumesDeMarca.map((p, i) => (
                <MiniPerfumeCard
                  key={i}
                  perfume={p}
                  onClick={(p) => { setMarcaDetalleModal(false); setPerfumeSeleccionado(p); }}
                  onAgregar={agregarProductCard}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== PERFUMES MÁS FAMOSOS ===== */}
      <section className="famosos-section-compact">
        <p className="section-subtitle-sm">Los favoritos de nuestros clientes</p>
        <h2 className="section-title-sm">Perfumes Más Famosos</h2>
        <div className="mini-grid-4">
          {perfumesFamosos.map((p, i) => (
            <MiniPerfumeCard key={i} perfume={p} onClick={setPerfumeSeleccionado} onAgregar={agregarProductCard} />
          ))}
        </div>
      </section>

      {/* ===== PROMO BANNER 2 ===== */}
      <section className="promo-banner promo-gold">
        <div className="promo-inner">
          <span className="promo-tag">100% ORIGINALES</span>
          <h3>Perfumes auténticos de las mejores marcas</h3>
          <p>Cada fragancia es cuidadosamente seleccionada y garantizada</p>
        </div>
      </section>

      {/* ===== SECCIÓN DECANTS ===== */}
      <section id="decants" className="decants-section-compact">
        <h2 className="section-title-sm">Nuestros Decants</h2>
        <p className="decants-desc-sm">
          Un decant es una muestra del perfume original trasvasada a un atomizador portátil.
        </p>
        <div className="decants-row">
          <div className="decant-item">
            <div className="decant-ml">2ml</div>
            <p className="decant-sp">💨 ~20-25 sprays</p>
            <p className="decant-dur">1-2 semanas</p>
            <span className="decant-label">PROBAR</span>
          </div>
          <div className="decant-item">
            <div className="decant-ml">5ml</div>
            <p className="decant-sp">💨 ~50-60 sprays</p>
            <p className="decant-dur">3-5 semanas</p>
            <span className="decant-label decant-pop">MÁS POPULAR</span>
          </div>
          <div className="decant-item">
            <div className="decant-ml">10ml</div>
            <p className="decant-sp">💨 ~100-120 sprays</p>
            <p className="decant-dur">2-3 meses</p>
            <span className="decant-label">MEJOR VALOR</span>
          </div>
          <div className="decant-item">
            <div className="decant-ml">30ml</div>
            <p className="decant-sp">💨 ~300-350 sprays</p>
            <p className="decant-dur">6-8 meses</p>
            <span className="decant-label">MÁXIMO AHORRO</span>
          </div>
        </div>
      </section>

      <section className="features-section-compact">
        <div className="features-row">
          <div className="feature-sm"><span>✦</span><h3>100% Originales</h3></div>
          <div className="feature-sm"><span>◈</span><h3>Decants Precisos</h3></div>
          <div className="feature-sm"><span>⬡</span><h3>Envío Discreto</h3></div>
          <div className="feature-sm"><span>♦</span><h3>Atención Personal</h3></div>
        </div>
      </section>

      {/* ===== ¿POR QUÉ ELEGIRNOS? ===== */}
      <section className="porque-section">
        <h2 className="section-title-sm">¿Por Qué Elegirnos?</h2>
        <div className="porque-grid">
          <div className="porque-card">
            <span className="porque-icon">🔬</span>
            <h4>Precisión en cada Decant</h4>
            <p>Medimos cada mililitro con jeringa de precisión para que recibas exactamente lo que pides.</p>
          </div>
          <div className="porque-card">
            <span className="porque-icon">🏷️</span>
            <h4>Precios Accesibles</h4>
            <p>Prueba perfumes de $3,000-$8,000 MXN desde solo $60 pesos con nuestros decants.</p>
          </div>
          <div className="porque-card">
            <span className="porque-icon">📦</span>
            <h4>Empaque Premium</h4>
            <p>Cada decant va sellado, etiquetado y protegido individualmente contra derrames.</p>
          </div>
          <div className="porque-card">
            <span className="porque-icon">💎</span>
            <h4>Variedad Exclusiva</h4>
            <p>Más de 50 fragancias de diseñador y árabes para explorar sin gastar una fortuna.</p>
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNER 3 ===== */}
      <section className="promo-banner promo-dark">
        <div className="promo-inner">
          <span className="promo-tag">¿NO SABES QUÉ ELEGIR?</span>
          <h3>Escríbenos por WhatsApp y te asesoramos</h3>
          <p>Te ayudamos a encontrar la fragancia perfecta para ti · Asesoría gratuita</p>
        </div>
      </section>

      {/* ===== CÓMO FUNCIONA ===== */}
      <section className="como-funciona-section">
        <h2 className="section-title-sm">¿Cómo Funciona?</h2>
        <p className="section-subtitle-sm">Comprar tu decant es muy sencillo</p>
        <div className="como-pasos">
          <div className="como-paso">
            <div className="como-paso-num">1</div>
            <h4>Elige tus fragancias</h4>
            <p>Explora nuestro catálogo y selecciona los perfumes que te interesen.</p>
          </div>
          <div className="como-paso-arrow">→</div>
          <div className="como-paso">
            <div className="como-paso-num">2</div>
            <h4>Selecciona el tamaño</h4>
            <p>Elige entre 2ml, 5ml, 10ml o 30ml según tu preferencia.</p>
          </div>
          <div className="como-paso-arrow">→</div>
          <div className="como-paso">
            <div className="como-paso-num">3</div>
            <h4>Realiza tu pedido</h4>
            <p>Agrégalos al carrito o contáctanos por WhatsApp.</p>
          </div>
          <div className="como-paso-arrow">→</div>
          <div className="como-paso">
            <div className="como-paso-num">4</div>
            <h4>Recibe en tu puerta</h4>
            <p>Envío por FedEx Express a toda la República Mexicana.</p>
          </div>
        </div>
      </section>

      {/* ===== UBICACIÓN ===== */}
      <section className="location-section">
        <h2 className="section-title-sm">Nuestra Ubicación</h2>
        <div className="location-content">
          <div className="location-info">
            <div className="location-item"><span className="location-icon">📍</span><div><h4>Dirección</h4><p>San Andrés Tuxtla, Veracruz, México</p></div></div>
            <div className="location-item"><span className="location-icon">🚚</span><div><h4>Envíos</h4><p>Envíos gratis locales · Nacionales por FedEx Express</p></div></div>
            <div className="location-item"><span className="location-icon">⏰</span><div><h4>Horario</h4><p>Lunes a Sábado: 9:00 AM — 8:00 PM</p></div></div>
            <div className="location-item"><span className="location-icon">💬</span><div><h4>Contacto</h4><p>WhatsApp disponible</p></div></div>
          </div>
          <div className="location-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60432.17!2d-95.22!3d18.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c50d19cb0e87e1%3A0x7b2e0a75b0f03c7d!2sSan%20Andr%C3%A9s%20Tuxtla%2C%20Ver.!5e0!3m2!1ses!2smx!4v1"
              width="100%" height="250" style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
              allowFullScreen loading="lazy" title="Ubicación Parfam Avix"></iframe>
          </div>
        </div>
      </section>

      <section className="testimonials-section-compact">
        <h2 className="section-title-sm">Testimonios</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">★ ★ ★ ★ ★</div>
            <p>"Increíble calidad. El decant dura todo el día."</p>
            <span className="testimonial-author">— Carlos M.</span>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">★ ★ ★ ★ ★</div>
            <p>"Llegaron perfectamente empacados. Servicio de primera."</p>
            <span className="testimonial-author">— Andrea R.</span>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">★ ★ ★ ★ ★</div>
            <p>"Pude probar perfumes árabes que nunca había encontrado."</p>
            <span className="testimonial-author">— Miguel Á.</span>
          </div>
        </div>
      </section>

      <section id="nosotros">
        <div className="about-section">
          <h2 className="section-title-sm">Sobre Parfam Avix</h2>
          <p>Nacimos con la pasión de acercar las fragancias más exclusivas del mundo.</p>
          <p>Desde San Andrés Tuxtla, Veracruz, seleccionamos cuidadosamente perfumes de diseñador y árabes.</p>
        </div>
      </section>

      <section className="newsletter-section">
        <h2 className="section-title-sm">Recibe Novedades</h2>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Tu correo electrónico" />
          <button type="submit">Suscribirse</button>
        </form>
      </section>

      {/* CARRITO */}
      <div id="carrito" className={`carrito ${carritoActivo ? 'activo' : ''}`}>
        <button className="cerrar-carrito" onClick={toggleCarrito}>✕</button>
        <h2>Tu Carrito</h2>
        <div id="lista">
          {carrito.map((item, i) => (
            <div className="item-carrito-pro" key={i}>
              <div className="info">
                <p className="nombre">{item.nombre}</p>
                <p className="detalle">{item.texto}</p>
                <p className="precio">${item.precio}</p>
              </div>
              <div className="cantidad">
                <button onClick={() => restarCantidad(i)}>-</button>
                <span>{item.cantidad}</span>
                <button onClick={() => sumarCantidad(i)}>+</button>
              </div>
              <button className="eliminar" onClick={() => eliminarDelCarrito(i)}>✕</button>
            </div>
          ))}
        </div>
        {carrito.length > 0 && (
          <div className="carrito-totales">
            <div className="carrito-linea"><span>Subtotal</span><span>${totalCarrito} MXN</span></div>
            <div className="carrito-linea"><span>Envío (FedEx Express)</span><span>Por cotizar</span></div>
            <div className="carrito-linea carrito-total-final"><span>Total estimado</span><span>${totalCarrito} MXN + envío</span></div>
          </div>
        )}
        {carrito.length === 0 && (
          <p className="carrito-vacio">Tu carrito está vacío</p>
        )}
      </div>

      {/* DETAIL MODAL */}
      {perfumeSeleccionado && (
        <PerfumeDetail
          perfume={perfumeSeleccionado}
          todosLosPerfumes={todosLosPerfumes}
          onClose={() => setPerfumeSeleccionado(null)}
          onAgregar={agregarProductCard}
        />
      )}

      {/* MODAL MARCAS */}
      {marcasModal && (
        <div className="modal-bg open" onClick={(e) => e.target === e.currentTarget && setMarcasModal(false)}>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setMarcasModal(false)}>✕</button>
            <p className="modal-top-tag">Las mejores casas de perfumería</p>
            <h2 className="section-title-sm" style={{ marginBottom: 6 }}>Marcas que Manejamos</h2>
            <div className="modal-divider"></div>

            <p className="modal-section-label">Diseñador</p>
            <div className="brands-grid" style={{ marginBottom: 28 }}>
              {marcasDisenador.map((m, i) => (
                <div key={i} className="brand-card brand-clickable" onClick={() => handleMarcaClick(m)}>
                  <div className="brand-logo-circle">{m.iniciales}</div>
                  <span className="brand-name">{m.nombre}</span>
                </div>
              ))}
            </div>

            <p className="modal-section-label">Árabes</p>
            <div className="brands-grid">
              {marcasArabes.map((m, i) => (
                <div key={i} className="brand-card brand-clickable" onClick={() => handleMarcaClick(m)}>
                  <div className="brand-logo-circle brand-arab">{m.iniciales}</div>
                  <span className="brand-name">{m.nombre}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL AROMAS */}
      {aromasModal && (
        <AromasModal onClose={() => setAromasModal(false)} onSelectAroma={handleAromaSelect} />
      )}

      {/* MODAL DECANTS INFO */}
      {decantsModal && (
        <DecantsInfo onClose={() => setDecantsModal(false)} />
      )}

      {/* MODAL ENVÍO */}
      {envioModal && (
        <EnvioInfo onClose={() => setEnvioModal(false)} />
      )}

      <footer>
        <div className="footer-content">
          <div className="footer-social">
            <a href="#">𝕏</a><a href="#">IG</a><a href="#">FB</a><a href="#">TT</a>
          </div>
          <div className="footer-links">
            <a href="#inicio">Inicio</a><a href="#marcas">Marcas</a><a href="#nosotros">Nosotros</a>
          </div>
          <p>© 2026 Parfam Avix — Fragancias Originales</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;