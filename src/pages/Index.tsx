import React, { useState } from 'react';
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import './Index.css';

const perfumesMasculinos = [
  { nombre: "Valentino Born Intense", marca: "VALENTINO", precio2ml: 80, precio3ml: 110, precio5ml: 170, precio10ml: 300, imagen: "https://images.unsplash.com/photo-1594035910387-fea081ac45b2?w=400&h=400&fit=crop" },
  { nombre: "JPG Le Male", marca: "JEAN PAUL GAULTIER", precio2ml: 70, precio3ml: 95, precio5ml: 150, precio10ml: 270, imagen: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop" },
  { nombre: "Versace Eros EDP", marca: "VERSACE", precio2ml: 75, precio3ml: 100, precio5ml: 160, precio10ml: 280, imagen: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop" },
  { nombre: "Versace Dylan Blue", marca: "VERSACE", precio2ml: 65, precio3ml: 90, precio5ml: 140, precio10ml: 250, imagen: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=400&fit=crop" },
  { nombre: "Azzaro Most Wanted Intense", marca: "AZZARO", precio2ml: 85, precio3ml: 115, precio5ml: 180, precio10ml: 320, imagen: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop" },
  { nombre: "Versace Eau Fraîche", marca: "VERSACE", precio2ml: 60, precio3ml: 85, precio5ml: 130, precio10ml: 230, imagen: "https://images.unsplash.com/photo-1594035910387-fea081ac45b2?w=400&h=400&fit=crop" },
  { nombre: "212 VIP Black", marca: "CAROLINA HERRERA", precio2ml: 75, precio3ml: 100, precio5ml: 155, precio10ml: 275, imagen: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop" },
  { nombre: "Nautica Voyage", marca: "NAUTICA", precio2ml: 45, precio3ml: 60, precio5ml: 90, precio10ml: 160, imagen: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop" },
];

const Index = () => {
  const [carrito, setCarrito] = useState([]);
  const [carritoActivo, setCarritoActivo] = useState(false);

  const toggleCarrito = () => setCarritoActivo(!carritoActivo);

  const agregarAlCarrito = (nombre, e) => {
    const contenedor = e.target.parentElement;
    const select = contenedor.querySelector("select");
    const precioUnitario = parseInt(select.value);
    const texto = select.options[select.selectedIndex].text;
    setCarrito([...carrito, { nombre, precio: precioUnitario, precioBase: precioUnitario, texto, cantidad: 1 }]);
  };

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

      <nav className="menu-extra">
        <a href="#inicio">Inicio</a>
        <a href="#tienda">Tienda</a>
        <a href="#masculino">Masculino</a>
        <a href="#catalogo">Catálogo</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#carrito">Carrito</a>
      </nav>

      <section className="video-hero">
        <section className="hero-premium fade-in">
          <div className="hero-texto">
            <h1>PERFUMES DE DISEÑADOR</h1>
            <p>Encuentra una propuesta diferente para cada ocasión</p>
            <a href="#masculino" className="btn-hero-premium">EXPLORAR COLECCIÓN</a>
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
            <a href="#masculino" className="btn-video">COMPRAR AHORA</a>
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
            <p>Mediciones exactas en 2ml, 3ml, 5ml y 10ml para que pruebes antes de invertir.</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⬡</span>
            <h3>Envío Discreto</h3>
            <p>Empaque elegante y seguro que protege cada fragancia hasta tu puerta.</p>
          </div>
        </div>
      </section>

      {/* --- MASCULINO DISEÑADOR --- */}
      <section id="masculino" className="masculino-section">
        <p className="section-subtitle">Colección para él</p>
        <h2 className="section-title">Masculino — Diseñador</h2>
        <div className="section-divider"></div>
        <div className="masculino-grid">
          {perfumesMasculinos.map((p, i) => (
            <ProductCard
              key={i}
              nombre={p.nombre}
              marca={p.marca}
              precio2ml={p.precio2ml}
              precio3ml={p.precio3ml}
              precio5ml={p.precio5ml}
              precio10ml={p.precio10ml}
              imagen={p.imagen}
              onAgregar={agregarProductCard}
            />
          ))}
        </div>
      </section>

      <section id="catalogo" className="catalogo">
        <p className="section-subtitle">Explora nuestras categorías</p>
        <h2 className="titulo-catalogo">Catálogo</h2>
        <div className="fila">
          {["Masculino Diseñador", "Femenino Diseñador", "Masculino Árabe", "Femenino Árabe"].map((tipo, idx) => (
            <div className="perfume" key={idx}>
              <h3>{tipo.split(' ')[0]}</h3>
              <p>{tipo.split(' ')[1]}</p>
              <a href="#" className="btn">Ver Todo</a>
            </div>
          ))}
        </div>
      </section>

      <section id="tienda" className="tienda">
        <p className="section-subtitle">Nuestra selección</p>
        <h2>Tienda</h2>
        <div className="section-divider"></div>
        <div className="productos-grid">
          <div className="producto">
            <img src="https://via.placeholder.com/280x220/111111/333333?text=Dior+Sauvage" alt="Dior Sauvage" />
            <h3>Dior Sauvage</h3>
            <select className="opciones">
              <option value="200">2ml — $200</option>
              <option value="400">5ml — $400</option>
              <option value="700">10ml — $700</option>
              <option value="1500">30ml — $1,500</option>
            </select>
            <button onClick={(e) => agregarAlCarrito("Dior Sauvage", e)}>Agregar al Carrito</button>
          </div>
          <div className="producto">
            <img src="https://via.placeholder.com/280x220/111111/333333?text=Lattafa+Asad" alt="Lattafa Asad" />
            <h3>Lattafa Asad</h3>
            <select className="opciones">
              <option value="150">2ml — $150</option>
              <option value="300">5ml — $300</option>
              <option value="600">10ml — $600</option>
              <option value="1200">30ml — $1,200</option>
            </select>
            <button onClick={(e) => agregarAlCarrito("Lattafa Asad", e)}>Agregar al Carrito</button>
          </div>
          <div className="producto">
            <img src="https://via.placeholder.com/280x220/111111/333333?text=Bleu+de+Chanel" alt="Bleu de Chanel" />
            <h3>Bleu de Chanel</h3>
            <select className="opciones">
              <option value="250">2ml — $250</option>
              <option value="500">5ml — $500</option>
              <option value="900">10ml — $900</option>
              <option value="1800">30ml — $1,800</option>
            </select>
            <button onClick={(e) => agregarAlCarrito("Bleu de Chanel", e)}>Agregar al Carrito</button>
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
            <a href="#tienda">Tienda</a>
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
