import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import './Index.css';

const CategoryPage = ({ title, subtitle, perfumes }) => {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [carritoActivo, setCarritoActivo] = useState(false);

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

  return (
    <div className="app-container">
      <div className="marco-neon"></div>

      <button className="category-back-btn" onClick={() => navigate('/')}>
        ← Volver al Inicio
      </button>

      <button className="btn-carrito" onClick={toggleCarrito}>
        🛒 Carrito ({carrito.length})
      </button>

      <section className="masculino-section" style={{ paddingTop: '80px' }}>
        <p className="section-subtitle">{subtitle}</p>
        <h2 className="section-title">{title}</h2>
        <div className="section-divider"></div>
        <div className="masculino-grid">
          {perfumes.map((p, i) => (
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
          <p>© 2026 Parfam Avix — Fragancias Originales</p>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;
