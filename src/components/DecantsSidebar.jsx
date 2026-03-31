import { useState } from "react";
import decantImg from "@/assets/decant-sample.png";

const sizes = ["2ml", "5ml", "10ml", "30ml"];

const DecantsSidebar = ({ perfumes }) => {
  const [selectedSize, setSelectedSize] = useState("5ml");

  return (
    <aside className="border border-border rounded-lg bg-card p-5 space-y-5">
      <div className="text-center">
        <h3 className="font-display text-lg gold-text mb-1">Decants</h3>
        <div className="gold-divider w-16 mx-auto" />
      </div>

      {/* Size selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`decant-badge rounded ${selectedSize === size ? "selected" : ""}`}
          >
            {size}
          </button>
        ))}
      </div>

      {/* Decant image */}
      <div className="flex justify-center">
        <img
          src={decantImg}
          alt="Decant sample"
          loading="lazy"
          className="h-24 w-auto opacity-80"
        />
      </div>

      {/* Decant list */}
      <div className="space-y-3">
        {perfumes.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between py-2 border-b border-border/50"
          >
            <div>
              <p className="font-body text-sm text-foreground">{p.name}</p>
              <p className="font-ui text-[0.55rem] uppercase tracking-wider text-muted-foreground">
                {p.brand}
              </p>
            </div>
            <span className="font-display text-base gold-text">
              ${p.decants[selectedSize]}
            </span>
          </div>
        ))}
      </div>

      <p className="font-ui text-[0.55rem] text-center uppercase tracking-wider text-muted-foreground">
        Prueba antes de comprar
      </p>
    </aside>
  );
};

export default DecantsSidebar;
