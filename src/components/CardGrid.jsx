import React from "react";
import Card from "./Card";

export default function CardGrid({ products, onOpen }) {
  return (
    <div className="bg-[#2A2A2A] p-4 rounded-lg border border-[#3A3A3A]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <Card key={p.id} product={p} onOpen={() => onOpen(p)} />
        ))}
      </div>
    </div>
  );
}
