import { useState } from "react";
import { perfumes } from "@/data/perfumes";
import PerfumeCard from "./PerfumeCard";
import DecantsSidebar from "./DecantsSidebar";

const categories = [
  { id: "todos", label: "Todos" },
  { id: "diseñador", label: "Diseñador" },
  { id: "arabe", label: "Árabes" },
];

const PerfumeCatalog = () => {
  const [activeCategory, setActiveCategory] = useState("todos");

  const filtered =
    activeCategory === "todos"
      ? perfumes
      : perfumes.filter((p) => p.category === activeCategory);

  return (
    <section className="px-4 md:px-8 py-12 max-w-7xl mx-auto">
      {/* Category tabs */}
      <div className="flex justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`category-tab rounded ${activeCategory === cat.id ? "active" : ""}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid with sidebar */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Perfume grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((perfume) => (
            <PerfumeCard key={perfume.id} perfume={perfume} />
          ))}
        </div>

        {/* Decants sidebar */}
        <div className="w-full lg:w-72 shrink-0">
          <DecantsSidebar perfumes={filtered} />
        </div>
      </div>
    </section>
  );
};

export default PerfumeCatalog;
