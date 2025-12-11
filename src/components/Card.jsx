import React from "react";

export default function Card({ product, onOpen }) {
  return (
    <div
      className="p-3 bg-[#1F1F1F] text-white rounded-md cursor-pointer hover:bg-[#2F2F2F] border border-[#3A3A3A] transition"
      onClick={onOpen}
    >
      {/* Imagen del producto */}
      <img
        src={`/images/${product.images[0]}`}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />

      <div className="mt-3 bg-[#2A2A2A] p-2 rounded-md flex items-center justify-between border border-[#3A3A3A] px-2.5">
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-[#FFFFFF]">${product.price}</div>
        </div>
        <div className="text-xs ">Ver</div>
      </div>
    </div>
  );
}
