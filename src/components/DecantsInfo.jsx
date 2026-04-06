const DecantsInfo = ({ onClose }) => {
  return (
    <div className="modal-bg open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 800, maxHeight: '90vh', overflowY: 'auto' }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <p className="modal-top-tag">Todo lo que necesitas saber</p>
        <h2 className="section-title-sm" style={{ marginBottom: 6 }}>¿Qué es un Decant?</h2>
        <div className="modal-divider"></div>

        <div className="decants-info-content">
          <div className="decants-info-block">
            <h3>📖 Definición</h3>
            <p>Un decant es una porción del perfume original trasvasada cuidadosamente a un atomizador portátil de vidrio o aluminio. No es una imitación ni réplica — es el mismo perfume original en una presentación más accesible.</p>
          </div>

          <div className="decants-info-block">
            <h3>🔬 ¿Cómo se hace?</h3>
            <p>Se extrae directamente del frasco original usando jeringas de precisión estériles. Se trasvasa al atomizador portátil, se sella y se etiqueta con el nombre del perfume, la marca y los mililitros.</p>
          </div>

          <div className="decants-info-block">
            <h3>🧪 Material</h3>
            <p>Utilizamos atomizadores de vidrio con spray de aluminio de alta calidad. Son resistentes, ligeros y perfectos para llevar en el bolsillo o bolsa. Cada atomizador viene etiquetado profesionalmente.</p>
          </div>

          <div className="modal-divider"></div>

          <p className="modal-section-label">Decants Disponibles</p>
          <div className="decants-info-sizes">
            <div className="decant-info-card">
              <div className="decant-info-ml">2ml</div>
              <div className="decant-info-details">
                <p>💨 ~20-25 sprays</p>
                <p>⏱️ Duración: 1-2 semanas</p>
                <p>✅ Ideal para probar</p>
              </div>
            </div>
            <div className="decant-info-card">
              <div className="decant-info-ml">5ml</div>
              <div className="decant-info-details">
                <p>💨 ~50-60 sprays</p>
                <p>⏱️ Duración: 3-5 semanas</p>
                <p>⭐ Más popular</p>
              </div>
            </div>
            <div className="decant-info-card">
              <div className="decant-info-ml">10ml</div>
              <div className="decant-info-details">
                <p>💨 ~100-120 sprays</p>
                <p>⏱️ Duración: 2-3 meses</p>
                <p>💎 Mejor valor</p>
              </div>
            </div>
            <div className="decant-info-card">
              <div className="decant-info-ml">30ml</div>
              <div className="decant-info-details">
                <p>💨 ~300-350 sprays</p>
                <p>⏱️ Duración: 6-8 meses</p>
                <p>🏆 Máximo ahorro</p>
              </div>
            </div>
          </div>

          <div className="modal-divider"></div>

          <div className="decants-info-block">
            <h3>✨ Ventajas de un Decant</h3>
            <ul className="decants-ventajas">
              <li>Probar perfumes originales sin comprar el frasco completo</li>
              <li>Portátil — llévalo a donde quieras</li>
              <li>Variedad — puedes tener muchas fragancias diferentes</li>
              <li>Económico — accede a perfumes premium desde $70 MXN</li>
              <li>100% original — mismo perfume, diferente presentación</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecantsInfo;
