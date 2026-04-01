import React, { useState } from 'react';
import HeroSection from "@/components/HeroSection";
import './Index.css';

const Index = () => {
  const [carrito, setCarrito] = useState([]);
  const [carritoActivo, setCarritoActivo] = useState(false);

  const toggleCarrito = () => {
    setCarritoActivo(!carritoActivo);
  };

  const agregarAlCarrito = (nombre, e) => {
    const contenedor = e.target.parentElement;
    const select = contenedor.querySelector("select");
    const precioUnitario = parseInt(select.value);
    const texto = select.options[select.selectedIndex].text;

    const nuevoItem = {
      nombre,
      precio: precioUnitario,
      precioBase: precioUnitario,
      texto,
      cantidad: 1
    };

    setCarrito([...carrito, nuevoItem]);
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const sumarCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad++;
    nuevoCarrito[index].precio += nuevoCarrito[index].precioBase;
    setCarrito(nuevoCarrito);
  };

  const restarCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    if (nuevoCarrito[index].cantidad > 1) {
      nuevoCarrito[index].cantidad--;
      nuevoCarrito[index].precio -= nuevoCarrito[index].precioBase;
      setCarrito(nuevoCarrito);
    } else {
      eliminarDelCarrito(index);
    }
  };

  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <div className="app-container">
      <div className="marco-neon"></div>

      <div className="top-bar">
        <div className="texto-movimiento">
          <span>DECANTS DE PERFUME DE DISEÑADOR Y ARABES</span>
          <span>ENVÍOS GRATIS EN SAN ANDRÉS TUXTLA</span>
          <span>DECANTS DE DISEÑADOR Y ARABES</span>
          <span>PARFAM AVIX</span>
          <span>ENVÍOS NACIONALES</span>
          <span>100% ORIGINAL </span>
        </div>
      </div>

      {/* --- ENCABEZADO --- */}
      <header className="encabezado">
        <HeroSection />
        <div className="texto-header">
          <h1>PARFAM AVIX</h1>
          <p>EL RICO PERFUME DEL HOMBRE</p>
        </div>
      </header>

      <button className="btn-carrito" onClick={toggleCarrito}>
        🛒 Carrito ({carrito.length})
      </button>

      {/* --- MENU --- */}
      <nav className="menu-extra">
        <a href="#inicio">Inicio</a>
        <a href="#tienda">Tienda</a>
        <a href="#catalogo">Catálogo</a>
        <a href="#carrito">Carrito</a>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="video-hero">
        <section className="hero-premium fade-in">
          <div className="hero-texto">
            <h1>PERFUMES DE DISEÑADOR</h1>
            <p>Encuentra una propuesta diferente para cada ocasión</p>
            <a href="#tienda" className="btn-hero-premium">
              PROBAR AHORA
            </a>
          </div>
        </section>

        <video autoPlay muted loop playsInline className="video-background">
          <source src="TU_VIDEO.mp4" type="video/mp4" />
          Tu navegador no soporta videos.
        </video>

        <div className="video-overlay">
          <div className="video-content">
            <span className="video-tag">NUEVA COLECCIÓN</span>
            <h2>Siente el aroma del lujo</h2>
            <p>Inspiración de diseñador a una fracción del precio.</p>
            <a href="#" className="btn-video">COMPRAR AHORA</a>
          </div>
        </div>
      </section>

      {/* --- CATALOGO --- */}
      <section className="catalogo">
        <h2 className="titulo-catalogo">Catálogo Decants</h2>
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

      {/* --- TIENDA --- */}
      <section id="tienda" className="tienda">
        <h2>Tienda</h2>

        <div className="producto">
          <img src="https://via.placeholder.com/200" alt="Dior Sauvage" />
          <h3>Dior Sauvage</h3>
          <select className="opciones">
            <option value="200">2ml - $200</option>
            <option value="400">5ml - $400</option>
            <option value="700">10ml - $700</option>
            <option value="1500">30ml - $1500</option>
          </select>
          <button onClick={(e) => agregarAlCarrito("Dior Sauvage", e)}>Agregar</button>
        </div>

        <div className="producto">
          <img src="https://via.placeholder.com/200" alt="Lattafa Asad" />
          <h3>Lattafa Asad</h3>
          <select className="opciones">
            <option value="150">2ml - $150</option>
            <option value="300">5ml - $300</option>
            <option value="600">10ml - $600</option>
            <option value="1200">30ml - $1200</option>
          </select>
          <button onClick={(e) => agregarAlCarrito("Lattafa Asad", e)}>Agregar</button>
        </div>
      </section>

      {/* --- CARRITO LATERAL --- */}
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
        <p>© 2026 Parfam Avix - Perfumes Originales</p>
      </footer>
    </div>
  );
};

export default Index;
