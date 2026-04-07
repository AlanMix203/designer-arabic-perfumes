import { useState } from "react";
import fedexTruck from "@/assets/fedex-truck.png";

const EnvioInfo = ({ onClose }) => {
  const [cpDestino, setCpDestino] = useState('');
  const [cotizando, setCotizando] = useState(false);
  const [resultadoCotizacion, setResultadoCotizacion] = useState(null);
  const [errorCotizacion, setErrorCotizacion] = useState(null);

  const cotizarEnvio = async () => {
    if (!cpDestino || cpDestino.length !== 5) {
      setErrorCotizacion('Ingresa un código postal válido de 5 dígitos');
      return;
    }
    setCotizando(true);
    setErrorCotizacion(null);
    setResultadoCotizacion(null);

    // Simulated shipping quote based on distance from origin CP 95750
    try {
      const cp = parseInt(cpDestino);
      const origen = 95750;
      const diff = Math.abs(cp - origen);
      
      let costoBase;
      if (diff < 1000) costoBase = 89;
      else if (diff < 5000) costoBase = 129;
      else if (diff < 20000) costoBase = 159;
      else costoBase = 189;

      // Simulate network delay
      await new Promise(r => setTimeout(r, 1200));

      setResultadoCotizacion({
        costo: costoBase,
        tiempo: diff < 1000 ? '1-2 días hábiles' : diff < 5000 ? '2-3 días hábiles' : '3-4 días hábiles',
        servicio: 'FedEx Express'
      });
    } catch {
      setErrorCotizacion('Error al cotizar. Intenta de nuevo.');
    }
    setCotizando(false);
  };

  return (
    <div className="modal-bg open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 700, maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <p className="modal-top-tag">Entrega rápida y segura</p>
        <h2 className="section-title-sm" style={{ marginBottom: 6 }}>Información de Envío</h2>
        <div className="modal-divider"></div>

        <div className="decants-info-content">
          <div className="envio-highlight">
            <img src={fedexTruck} alt="FedEx Express" loading="lazy" width={512} height={512} style={{ width: 120, height: 'auto', margin: '0 auto 12px', display: 'block' }} />
            <span className="envio-fedex">FedEx Express</span>
            <p>Todos nuestros envíos nacionales se realizan a través de <strong>FedEx</strong>, garantizando seguridad, rapidez y rastreo en tiempo real.</p>
          </div>

          <div className="decants-info-block">
            <h3>🚚 Envío Local</h3>
            <p><strong>San Andrés Tuxtla, Veracruz</strong></p>
            <p>✅ Envío GRATIS · Entrega el mismo día o al día siguiente</p>
          </div>

          <div className="decants-info-block">
            <h3>📦 Envío Nacional (FedEx Express)</h3>
            <p>Cobertura a toda la República Mexicana</p>
            <ul className="decants-ventajas">
              <li>Entrega en 1-3 días hábiles</li>
              <li>Guía de rastreo proporcionada al momento del envío</li>
              <li>Empaque discreto y seguro</li>
              <li>Protección contra derrames con sello hermético</li>
              <li>Cada decant va envuelto individualmente</li>
            </ul>
          </div>

          {/* COTIZADOR INLINE */}
          <div className="decants-info-block envio-cotizar-block">
            <h3>💰 Cotiza tu Envío</h3>
            <p>Ingresa tu código postal para conocer el costo de envío:</p>
            <div className="cotizar-form">
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="Ej: 06600"
                value={cpDestino}
                onChange={(e) => setCpDestino(e.target.value.replace(/\D/g, ''))}
                className="cotizar-input"
              />
              <button
                onClick={cotizarEnvio}
                disabled={cotizando}
                className="cotizar-btn"
              >
                {cotizando ? 'Cotizando...' : 'Cotizar'}
              </button>
            </div>
            {errorCotizacion && <p className="cotizar-error">{errorCotizacion}</p>}
            {resultadoCotizacion && (
              <div className="cotizar-resultado">
                <div className="cotizar-resultado-item">
                  <span className="cotizar-label">Servicio</span>
                  <span className="cotizar-value">{resultadoCotizacion.servicio}</span>
                </div>
                <div className="cotizar-resultado-item">
                  <span className="cotizar-label">Tiempo estimado</span>
                  <span className="cotizar-value">{resultadoCotizacion.tiempo}</span>
                </div>
                <div className="cotizar-resultado-item cotizar-precio">
                  <span className="cotizar-label">Costo de envío</span>
                  <span className="cotizar-value cotizar-value-big">${resultadoCotizacion.costo} MXN</span>
                </div>
              </div>
            )}
          </div>

          <div className="decants-info-block">
            <h3>📋 Proceso de Envío</h3>
            <ol className="envio-pasos">
              <li>Realizas tu pedido por WhatsApp o en la página</li>
              <li>Confirmamos disponibilidad y total</li>
              <li>Recibes datos para pago (transferencia/depósito)</li>
              <li>Preparamos tu pedido con empaque premium</li>
              <li>Te enviamos la guía FedEx con rastreo</li>
              <li>¡Recibe y disfruta tus fragancias!</li>
            </ol>
          </div>

          <div className="decants-info-block">
            <h3>🛡️ Garantía de Envío</h3>
            <p>Si tu pedido llega dañado o con algún problema, te lo reponemos sin costo adicional. Tu satisfacción es nuestra prioridad.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvioInfo;
