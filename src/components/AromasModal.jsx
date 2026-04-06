import { todosLosAromas } from "@/data/aromas";

const AromasModal = ({ onClose, onSelectAroma }) => {
  const disponibles = todosLosAromas.filter(a => a.disponible);
  const noDisponibles = todosLosAromas.filter(a => !a.disponible);

  return (
    <div className="modal-bg open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 800 }}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <p className="modal-top-tag">Encuentra tu fragancia ideal</p>
        <h2 className="section-title-sm" style={{ marginBottom: 6 }}>Aromas Disponibles</h2>
        <div className="modal-divider"></div>

        <p className="modal-section-label">Disponibles</p>
        <div className="aromas-grid">
          {disponibles.map((a, i) => (
            <div key={i} className="aroma-chip aroma-available" onClick={() => onSelectAroma(a.nombre)}>
              <span className="aroma-emoji">{a.emoji}</span>
              <span className="aroma-name">{a.nombre}</span>
            </div>
          ))}
        </div>

        <p className="modal-section-label" style={{ marginTop: 24 }}>Próximamente</p>
        <div className="aromas-grid">
          {noDisponibles.map((a, i) => (
            <div key={i} className="aroma-chip aroma-unavailable">
              <span className="aroma-emoji">{a.emoji}</span>
              <span className="aroma-name">{a.nombre}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AromasModal;
