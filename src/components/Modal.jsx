import React from "react";

export default function Modal({ product, onClose, onChangeColor, onAdd }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-50 w-[90%] max-w-4xl bg-[rgba(255,255,255,0.02)] p-6 rounded-xl border border-[rgba(255,255,255,0.04)] shadow-lg">
        <div className="flex gap-6">
          <div className="flex-1">
            <div className="text-sm text-[var(--muted)] mb-2">Producto</div>
            <div
              className="product-image rounded-lg"
              style={{ background: product.chosenColor }}
            />
          </div>

          <div className="w-72 flex flex-col">
            <div className="mb-3">
              <div className="font-semibold">{product.name}</div>
              <div className="text-sm text-[var(--muted)]">
                ${product.price}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-[var(--muted)] mb-2">Colores</div>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => onChangeColor(c)}
                    className={`w-9 h-9 rounded-md shadow-sm border ${
                      product.chosenColor === c
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
                className="w-full py-2 rounded-md bg-white/10 border border-white/8 hover:bg-white/12 transition"
              >
                + Añadir
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[var(--muted)] text-sm"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
