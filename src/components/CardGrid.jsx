import React from "react";
import Card from "./Card";

export default function CardGrid({ products, onOpen }) {
  // 🔹 Filtrar productos válidos (no undefined, no null)
  const productosValidos = products?.filter((p) => p && p.id) || [];

  console.log("📊 Total productos recibidos:", products?.length || 0);
  console.log("✅ Productos válidos:", productosValidos.length);
  console.log("🔍 Primeros 3 productos:", productosValidos.slice(0, 3));

  // 🔹 Si no hay productos válidos
  if (productosValidos.length === 0) {
    return (
      <div className="bg-[#2A2A2A] p-8 rounded-lg border border-[#3A3A3A] text-center">
        <p className="text-white text-lg">No hay productos disponibles</p>
      </div>
    );
  }

  return (
    <div className="bg-[#2A2A2A] p-4 rounded-lg border border-[#3A3A3A]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productosValidos.map((p) => (
          <Card key={p.id} producto={p} onOpen={() => onOpen(p)} />
        ))}
      </div>
    </div>
  );
}
