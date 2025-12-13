import React from "react";

export default function Card({ producto, onOpen }) {
  // 🔹 Función para obtener la URL de la imagen
  const imagenSrc = (imagenPath) => {
    // Si no hay imagen, devolver placeholder
    if (!imagenPath) {
      return "https://via.placeholder.com/300x200?text=Sin+Imagen";
    }

    // Si es una URL completa (http/https)
    if (imagenPath.startsWith("http")) {
      return imagenPath;
    }

    // Si es una ruta local
    return `/images/${imagenPath}`;
  };

  //  Obtener la primera imagen de forma segura
  const obtenerPrimeraImagen = () => {
    // Verificar si producto existe y tiene images
    if (!producto || !producto.images || !Array.isArray(producto.images)) {
      console.warn("Producto sin imágenes:", producto);
      return null;
    }

    // Obtener la primera imagen no vacía
    const primeraImagen = producto.images.find(
      (img) => img && img.trim() !== ""
    );
    return primeraImagen || null;
  };

  const imagenProducto = obtenerPrimeraImagen();

  //  Validación: Si no hay producto, no renderizar nada
  if (!producto) {
    console.error("Card recibió un producto undefined");
    return null;
  }

  console.log("📦 Producto en Card:", producto);

  return (
    <div
      className="p-3 bg-[#1F1F1F] text-white rounded-md cursor-pointer hover:bg-[#2F2F2F] border border-[#3A3A3A] transition"
      onClick={onOpen}
    >
      {/*  Imagen del producto con manejo seguro */}
      <img
        src={imagenSrc(imagenProducto)}
        alt={producto.name || "Producto"}
        className="w-full h-48 object-cover mb-4 rounded-md"
        onError={(e) => {
          //  CORRECCIÓN: e.target.src (no e.target.value)
          e.target.src = "https://via.placeholder.com/300x200?text=Sin+Imagen";
        }}
      />

      <div className="mt-3 bg-[#2A2A2A] p-2 rounded-md flex items-center justify-between border border-[#3A3A3A] px-2.5">
        <div>
          <div className="font-medium">{producto.name || "Sin nombre"}</div>
          <div className="text-sm text-[#FFFFFF]">${producto.price || 0}</div>
        </div>
        <div className="text-xs">Ver</div>
      </div>
    </div>
  );
}
