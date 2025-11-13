import React from "react";

export default function Card({ product, onOpen }) {
  const sampleColor = product.colors[0];
  return (
    <div
      className="p-3 bg-[rgba(255,255,255,0.01)] rounded-md cursor-pointer hover:shadow-lg transition grid grid-"
      onClick={onOpen}
    >
      <div className="product-image" style={{ background: sampleColor }} />
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-[var(--muted)]">${product.price}</div>
        </div>
        <div className="text-xs text-[var(--muted)]">Ver</div>
      </div>
    </div>
  );
}
