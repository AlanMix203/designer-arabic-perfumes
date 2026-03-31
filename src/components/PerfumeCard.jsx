const seasonLabels = {
  calor: "☀️ Calor",
  frio: "❄️ Frío",
  versatil: "🔄 Versátil",
};

const PerfumeCard = ({ perfume }) => {
  return (
    <div className="perfume-card-3d">
      <div className="perfume-inner rounded-lg overflow-hidden border border-border bg-card p-5">
        {/* Bottle */}
        <div className="flex justify-center mb-4 h-56 items-center overflow-hidden">
          <img
            src={perfume.image}
            alt={perfume.name}
            loading="lazy"
            className="bottle-3d h-52 w-auto object-contain"
          />
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div>
            <p className="font-ui text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              {perfume.brand}
            </p>
            <h3 className="font-display text-xl gold-text">{perfume.name}</h3>
          </div>

          <p className="font-body text-sm text-foreground/70 leading-relaxed">
            {perfume.description}
          </p>

          {/* Season & Duration */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`season-badge ${perfume.season}`}>
              {seasonLabels[perfume.season]}
            </span>
            <span className="font-ui text-[0.6rem] uppercase tracking-wider text-muted-foreground">
              ⏱ {perfume.duration}
            </span>
          </div>

          {/* Ingredients */}
          <div>
            <p className="font-ui text-[0.6rem] uppercase tracking-widest text-muted-foreground mb-1.5">
              Ingredientes
            </p>
            <div className="flex flex-wrap gap-1">
              {perfume.ingredients.map((ing) => (
                <span key={ing} className="ingredient-tag rounded">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="font-display text-2xl gold-text">
              ${perfume.price}
            </span>
            <span className="font-ui text-[0.6rem] uppercase tracking-widest text-muted-foreground">
              100ml
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumeCard;
