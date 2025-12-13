import React from "react";

export default function Modal({ producto, onClose, onChangeColor, onAdd }) {
  //  Función para obtener la URL de la imagen
  const imagenSrc = (imagenPath) => {
    if (!imagenPath) {
      return "https://via.placeholder.com/400x400?text=Sin+Imagen";
    }

    if (imagenPath.startsWith("http")) {
      return imagenPath;
    }

    return `/images/${imagenPath}`;
  };

  //  Validación: Si no hay producto, no renderizar
  if (!producto) {
    console.error("Modal recibió producto undefined");
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-50 w-[90%] max-w-4xl bg-[#1F1F1F] p-6 rounded-xl border border-[#3A3A3A] shadow-xl">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="text-xl font-medium text-[#B3B3B3] mb-2">
              Producto
            </div>
            <img
              src={imagenSrc(producto.chosenImage)} //  CORRECCIÓN: chosenImage (no chosenImagen)
              alt={producto.name || "Producto"}
              className="w-full h-auto max-h-96 object-cover rounded-lg"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x400?text=Sin+Imagen";
              }}
            />
          </div>

          <div className="w-full md:w-72 flex flex-col">
            <div className="mb-3">
              <div className="font-semibold text-xl mb-3 text-[#B3B3B3]">
                {producto.name || "Sin nombre"}
              </div>
              <div className="text-sm text-[#B3B3B3]">
                ${producto.price || 0}
              </div>
            </div>

            {/* 🔹 Descripción (si existe) */}
            {producto.description && (
              <div className="mb-4">
                <div className="text-sm text-[#B3B3B3] mb-1">Descripción</div>
                <div className="text-xs text-[#9A9A9A] line-clamp-3">
                  {producto.description}
                </div>
              </div>
            )}

            <div className="mb-4">
              <div className="text-sm text-[#B3B3B3] mb-2">Colores</div>
              <div className="flex gap-2 flex-wrap">
                {producto.colors?.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => onChangeColor(i)}
                    className={`w-9 h-9 rounded-md shadow-sm border ${
                      producto.colorIndex === i //  CORRECCIÓN: producto (no product)
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
                + Añadir al carrito
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-[#B3B3B3] text-2xl hover:text-white transition"
        >
          ×
        </button>
      </div>
    </div>
  );
}
