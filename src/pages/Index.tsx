import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { perfumesMasculinos, perfumesFemeninos, perfumesArabesMasculinos, perfumesArabesFemeninos } from "@/data/categories";
import './Index.css';

const todosLosPerfumes = [
  ...perfumesMasculinos.map(p => ({ ...p, categoria: 'Diseñador Masculino' })),
  ...perfumesFemeninos.map(p => ({ ...p, categoria: 'Diseñador Femenino' })),
  ...perfumesArabesMasculinos.map(p => ({ ...p, categoria: 'Árabe Masculino' })),
  ...perfumesArabesFemeninos.map(p => ({ ...p, categoria: 'Árabe Femenino' })),
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
  { nombre: "Carolina Herrera", iniciales: "CH", ruta: "/femenino-disenador" },
  { nombre: "Jean Paul Gaultier", iniciales: "JPG", ruta: "/masculino-disenador" },
  { nombre: "Versace", iniciales: "VS", ruta: "/masculino-disenador" },
  { nombre: "Yves Saint Laurent", iniciales: "YSL", ruta: "/femenino-disenador" },
  { nombre: "Azzaro", iniciales: "AZ", ruta: "/masculino-disenador" },
  { nombre: "Valentino", iniciales: "VL", ruta: "/masculino-disenador" },
  { nombre: "Ariana Grande", iniciales: "AG", ruta: "/femenino-disenador" },
  { nombre: "Nautica", iniciales: "NT", ruta: "/masculino-disenador" },
];

const marcasArabes = [
  { nombre: "Lattafa", iniciales: "LT", ruta: "/femenino-arabe" },
  { nombre: "Afnan", iniciales: "AF", ruta: "/masculino-arabe" },
  { nombre: "Armaf", iniciales: "AR", ruta: "/masculino-arabe" },
];

const Index = () => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [carritoActivo, setCarritoActivo] = useState(false);
  const [busqueda, setBusqueda] = useState('');

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
        <div className="texto-header">
          <h1>PARFAM AVIX</h1>
          <p>Fragancias exclusivas de diseñador</p>
        </div>
      </header>

      <button className="btn-carrito" onClick={toggleCarrito}>
        🛒 Carrito ({carrito.length})
      </button>

      <nav className="menu-extra menu-sticky">
        <a href="#inicio">Inicio</a>
        <a href="#catalogo">Catálogo</a>
        <a href="#decants">Decants</a>
        <a href="#marcas">Marcas</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#carrito" onClick={(e) => { e.preventDefault(); toggleCarrito(); }}>Carrito</a>
      </nav>

      {/* ===== BUSCADOR ===== */}
      <section className="search-section">
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar perfume por nombre o marca..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          {busqueda && (
            <button className="search-clear" onClick={() => setBusqueda('')}>✕</button>
          )}
        </div>
        {resultadosBusqueda.length > 0 && (
          <div className="search-results">
            <p className="search-results-count">{resultadosBusqueda.length} resultado(s)</p>
            <div className="masculino-grid">
              {resultadosBusqueda.map((p, i) => (
                <ProductCard
                  key={i}
                  nombre={p.nombre}
                  marca={p.marca}
                  precio2ml={p.precio2ml}
                  precio5ml={p.precio5ml}
                  precio10ml={p.precio10ml}
                  imagen={p.imagen}
                  video={p.video}
                  onAgregar={agregarProductCard}
                />
              ))}
            </div>
          </div>
        )}
        {busqueda.trim() && resultadosBusqueda.length === 0 && (
          <p className="search-no-results">No se encontraron perfumes con "{busqueda}"</p>
        )}
      </section>

      <section className="video-hero">
        <section className="hero-premium fade-in">
          <div className="hero-texto">
            <h1>PERFUMES DE DISEÑADOR</h1>
            <p>Encuentra una propuesta diferente para cada ocasión</p>
            <a href="#catalogo" className="btn-hero-premium">EXPLORAR COLECCIÓN</a>
          </div>
        </section>
        <video autoPlay muted loop playsInline className="video-background">
          <source src="TU_VIDEO.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay">
          <div className="video-content">
            <span className="video-tag">NUEVA COLECCIÓN</span>
            <h2>Siente el aroma del lujo</h2>
            <p>Inspiración de diseñador a una fracción del precio</p>
            <a href="#catalogo" className="btn-video">COMPRAR AHORA</a>
          </div>
        </div>
      </section>

      {/* ===== PERFUMES MÁS FAMOSOS ===== */}
      <section className="famosos-section">
        <p className="section-subtitle">Los favoritos de nuestros clientes</p>
        <h2 className="section-title">Perfumes Más Famosos</h2>
        <div className="section-divider"></div>
        <div className="masculino-grid">
          {perfumesFamosos.map((p, i) => (
            <ProductCard
              key={i}
              nombre={p.nombre}
              marca={p.marca}
              precio2ml={p.precio2ml}
              precio5ml={p.precio5ml}
              precio10ml={p.precio10ml}
              imagen={p.imagen}
              video={p.video}
              onAgregar={agregarProductCard}
            />
          ))}
        </div>
      </section>

      {/* ===== SECCIÓN DECANTS ===== */}
      <section id="decants" className="decants-section">
        <p className="section-subtitle">¿Qué es un Decant?</p>
        <h2 className="section-title">Nuestros Decants</h2>
        <div className="section-divider"></div>
        <p className="decants-description">
          Un decant es una muestra del perfume original trasvasada a un atomizador portátil. 
          Ideal para probar fragancias antes de invertir en el frasco completo.
        </p>
        <div className="decants-grid">
          <div className="decant-card">
            <div className="decant-icon">2ml</div>
            <h3>Decant 2ML</h3>
            <p className="decant-sprays">💨 ~20-25 sprays</p>
            <p className="decant-duration">⏱ Aprox. 1-2 semanas de uso</p>
            <p className="decant-detail">Perfecto para probar una fragancia nueva antes de comprometerte con un tamaño mayor.</p>
            <span className="decant-tag">IDEAL PARA PROBAR</span>
          </div>
          <div className="decant-card decant-featured">
            <div className="decant-icon">5ml</div>
            <h3>Decant 5ML</h3>
            <p className="decant-sprays">💨 ~50-60 sprays</p>
            <p className="decant-duration">⏱ Aprox. 3-5 semanas de uso</p>
            <p className="decant-detail">El tamaño más popular. Suficiente para disfrutar tu fragancia favorita por varias semanas.</p>
            <span className="decant-tag">MÁS POPULAR</span>
          </div>
          <div className="decant-card">
            <div className="decant-icon">10ml</div>
            <h3>Decant 10ML</h3>
            <p className="decant-sprays">💨 ~100-120 sprays</p>
            <p className="decant-duration">⏱ Aprox. 2-3 meses de uso</p>
            <p className="decant-detail">La mejor inversión calidad-precio. Ideal para tu fragancia signature del día a día.</p>
            <span className="decant-tag">MEJOR VALOR</span>
          </div>
        </div>
      </section>

      <section className="features-section">
        <p className="section-subtitle">¿Por qué elegirnos?</p>
        <h2 className="section-title">La Experiencia Parfam Avix</h2>
        <div className="section-divider"></div>
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">✦</span>
            <h3>100% Originales</h3>
            <p>Cada fragancia proviene directamente de casas de perfumería reconocidas mundialmente.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">◈</span>
            <h3>Decants Precisos</h3>
            <p>Mediciones exactas en 2ml, 5ml y 10ml para que pruebes antes de invertir.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⬡</span>
            <h3>Envío Discreto</h3>
            <p>Empaque elegante y seguro que protege cada fragancia hasta tu puerta.</p>
          </div>
        </div>
      </section>

      {/* ===== CATÁLOGO COMPLETO EN LA PÁGINA PRINCIPAL ===== */}
      <section id="catalogo" className="catalogo-completo">
        <p className="section-subtitle">Nuestra colección completa</p>
        <h2 className="section-title">Catálogo</h2>
        <div className="section-divider"></div>

        {/* Diseñador Masculino */}
        <div className="catalogo-categoria">
          <h3 className="catalogo-categoria-title">
            <span>Diseñador — Masculino</span>
            <Link to="/masculino-disenador" className="catalogo-ver-todo">Ver página completa →</Link>
          </h3>
          <div className="masculino-grid">
            {perfumesMasculinos.map((p, i) => (
              <ProductCard key={i} nombre={p.nombre} marca={p.marca} precio2ml={p.precio2ml} precio5ml={p.precio5ml} precio10ml={p.precio10ml} imagen={p.imagen} video={p.video} onAgregar={agregarProductCard} />
            ))}
          </div>
        </div>

        {/* Diseñador Femenino */}
        <div className="catalogo-categoria">
          <h3 className="catalogo-categoria-title">
            <span>Diseñador — Femenino</span>
            <Link to="/femenino-disenador" className="catalogo-ver-todo">Ver página completa →</Link>
          </h3>
          <div className="masculino-grid">
            {perfumesFemeninos.map((p, i) => (
              <ProductCard key={i} nombre={p.nombre} marca={p.marca} precio2ml={p.precio2ml} precio5ml={p.precio5ml} precio10ml={p.precio10ml} imagen={p.imagen} video={p.video} onAgregar={agregarProductCard} />
            ))}
          </div>
        </div>

        {/* Árabe Masculino */}
        <div className="catalogo-categoria">
          <h3 className="catalogo-categoria-title">
            <span>Árabe — Masculino</span>
            <Link to="/masculino-arabe" className="catalogo-ver-todo">Ver página completa →</Link>
          </h3>
          <div className="masculino-grid">
            {perfumesArabesMasculinos.map((p, i) => (
              <ProductCard key={i} nombre={p.nombre} marca={p.marca} precio2ml={p.precio2ml} precio5ml={p.precio5ml} precio10ml={p.precio10ml} imagen={p.imagen} video={p.video} onAgregar={agregarProductCard} />
            ))}
          </div>
        </div>

        {/* Árabe Femenino */}
        <div className="catalogo-categoria">
          <h3 className="catalogo-categoria-title">
            <span>Árabe — Femenino</span>
            <Link to="/femenino-arabe" className="catalogo-ver-todo">Ver página completa →</Link>
          </h3>
          <div className="masculino-grid">
            {perfumesArabesFemeninos.map((p, i) => (
              <ProductCard key={i} nombre={p.nombre} marca={p.marca} precio2ml={p.precio2ml} precio5ml={p.precio5ml} precio10ml={p.precio10ml} imagen={p.imagen} video={p.video} onAgregar={agregarProductCard} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== MARCAS ===== */}
      <section id="marcas" className="brands-section">
        <p className="section-subtitle">Las mejores casas de perfumería</p>
        <h2 className="section-title">Marcas que Manejamos</h2>
        <div className="section-divider"></div>

        <div className="brands-category">
          <h3 className="brands-category-title">Diseñador</h3>
          <div className="brands-grid">
            {marcasDisenador.map((m, i) => (
              <div key={i} className="brand-card brand-clickable" onClick={() => navigate(m.ruta)}>
                <div className="brand-logo-circle">{m.iniciales}</div>
                <p className="brand-name">{m.nombre}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="brands-category">
          <h3 className="brands-category-title">Árabes</h3>
          <div className="brands-grid">
            {marcasArabes.map((m, i) => (
              <div key={i} className="brand-card brand-clickable" onClick={() => navigate(m.ruta)}>
                <div className="brand-logo-circle brand-arab">{m.iniciales}</div>
                <p className="brand-name">{m.nombre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UBICACIÓN ===== */}
      <section className="location-section">
        <p className="section-subtitle">¿Dónde nos encontramos?</p>
        <h2 className="section-title">Nuestra Ubicación</h2>
        <div className="section-divider"></div>
        <div className="location-content">
          <div className="location-info">
            <div className="location-item">
              <span className="location-icon">📍</span>
              <div>
                <h4>Dirección</h4>
                <p>San Andrés Tuxtla, Veracruz, México</p>
              </div>
            </div>
            <div className="location-item">
              <span className="location-icon">🚚</span>
              <div>
                <h4>Envíos</h4>
                <p>Envíos gratis locales · Envíos nacionales a toda la república</p>
              </div>
            </div>
            <div className="location-item">
              <span className="location-icon">⏰</span>
              <div>
                <h4>Horario</h4>
                <p>Lunes a Sábado: 9:00 AM — 8:00 PM</p>
              </div>
            </div>
            <div className="location-item">
              <span className="location-icon">💬</span>
              <div>
                <h4>Contacto</h4>
                <p>WhatsApp disponible para consultas y pedidos</p>
              </div>
            </div>
          </div>
          <div className="location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60432.17!2d-95.22!3d18.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c50d19cb0e87e1%3A0x7b2e0a75b0f03c7d!2sSan%20Andr%C3%A9s%20Tuxtla%2C%20Ver.!5e0!3m2!1ses!2smx!4v1"
              width="100%"
              height="300"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
              allowFullScreen
              loading="lazy"
              title="Ubicación Parfam Avix"
            ></iframe>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <p className="section-subtitle">Lo que dicen nuestros clientes</p>
        <h2 className="section-title">Testimonios</h2>
        <div className="section-divider"></div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-stars">★ ★ ★ ★ ★</div>
            <p>"Increíble calidad. El decant de Sauvage dura todo el día y huele exactamente igual al original."</p>
            <span className="testimonial-author">— Carlos M.</span>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">★ ★ ★ ★ ★</div>
            <p>"Pedí tres decants y llegaron perfectamente empacados. El servicio es de primera."</p>
            <span className="testimonial-author">— Andrea R.</span>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-stars">★ ★ ★ ★ ★</div>
            <p>"Gracias a Parfam Avix pude probar perfumes árabes que nunca había encontrado en mi ciudad."</p>
            <span className="testimonial-author">— Miguel Á.</span>
          </div>
        </div>
      </section>

      <section id="nosotros">
        <div className="about-section">
          <p className="section-subtitle">Nuestra historia</p>
          <h2 className="section-title">Sobre Parfam Avix</h2>
          <div className="section-divider"></div>
          <p>Nacimos con la pasión de acercar las fragancias más exclusivas del mundo a quienes aprecian el arte de la perfumería.</p>
          <p>Desde San Andrés Tuxtla, Veracruz, seleccionamos cuidadosamente perfumes de diseñador y árabes para brindarte una experiencia olfativa incomparable.</p>
        </div>
      </section>

      <section className="newsletter-section">
        <p className="section-subtitle">Mantente al día</p>
        <h2 className="section-title">Recibe Novedades</h2>
        <div className="section-divider"></div>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Tu correo electrónico" />
          <button type="submit">Suscribirse</button>
        </form>
      </section>

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
        <h3>Total: $<span>{totalCarrito}</span></h3>
      </div>

      <footer>
        <div className="footer-content">
          <div className="footer-social">
            <a href="#">𝕏</a>
            <a href="#">IG</a>
            <a href="#">FB</a>
            <a href="#">TT</a>
          </div>
          <div className="footer-links">
            <a href="#inicio">Inicio</a>
            <a href="#catalogo">Catálogo</a>
            <a href="#nosotros">Nosotros</a>
          </div>
          <p>© 2026 Parfam Avix — Fragancias Originales</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
