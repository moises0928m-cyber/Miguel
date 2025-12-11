import React from "react";

export default function Modal({ product, onClose, onChangeColor, onAdd }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center tex">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-50 w-[90%] max-w-4xl bg-[#1F1F1F] p-6 rounded-xl border border-[#3A3A3A] shadow-xl">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="text-xl font-medium text-[#B3B3B3] mb-2">
              Producto
            </div>
            <img
              src={`/images/${product.chosenImage}`}
              alt={product.name}
              className="w-full h-100 object-cover rounded-lg"
            />
          </div>

          <div className="w-72 flex flex-col">
            <div className="mb-3">
              <div className="font-semibold text-xl mb-3 text-[#B3B3B3] ">
                {product.name}
              </div>
              <div className="text-sm text-[#B3B3B3]">${product.price}</div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-[#B3B3B3] mb-2">Colores</div>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => onChangeColor(i)}
                    className={`w-9 h-9 rounded-md shadow-sm border ${
                      product.colorIndex === i
                        ? "ring-2 ring-offset-1 ring-white/30"
                        : ""
                    }`}
                    style={{ background: c }}
                    aria-label={`color-${c}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-auto">
              <button
                onClick={onAdd}
                className="w-full py-2 rounded-md bg-[#C9A86A] text-[#0E0E0E] hover:bg-[#A38352] font-semibold transition"
              >
                + Añadir
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-3  text-[#B3B3B3] text-2xl"
        >
          x
        </button>
      </div>
    </div>
  );
}
