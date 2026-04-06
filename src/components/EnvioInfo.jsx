import fedexTruck from "@/assets/fedex-truck.png";

const EnvioInfo = ({ onClose }) => {
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

          <div className="decants-info-block envio-cotizar-block">
            <h3>💰 Cotiza tu Envío</h3>
            <p>Consulta el costo de envío a tu código postal directamente en SkyDropx:</p>
            <a
              href="https://www.skydrops.mx/cotizar"
              target="_blank"
              rel="noopener noreferrer"
              className="envio-cotizar-btn"
            >
              Cotizar envío en SkyDropx →
            </a>
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
