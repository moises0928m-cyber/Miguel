import React from "react";
import { useState, useEffect } from "react";
import CardGrid from "./CardGrid";
import CartAside from "./CartAside";
import Modal from "./Modal";
import { getProducts } from "./Services";
import Regresar from "./Regresar";

export default function Reservas() {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [producto, setProducto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setLoading(true);
        console.log("🔄 Cargando productos...");

        const data = await getProducts(10);
        console.log("📦 Productos obtenidos de la API:", data);
        console.log("📊 Total recibido:", data?.length || 0);

        // 🔹 VALIDACIÓN: Asegurarnos de que solo procesemos 10
        if (!Array.isArray(data)) {
          throw new Error("La API no devolvió un array");
        }

        // 🔹 IMPORTANTE: Tomar solo los primeros 10 y filtrar válidos
        const productoTransformer = data
          .slice(0, 10) // ✅ FORZAR límite a 10
          .filter((product) => product && product.id) // ✅ Filtrar válidos
          .map((product) => {
            // Asegurar que images siempre sea un array válido
            const imagenes = Array.isArray(product.images)
              ? product.images.filter((img) => img && img.trim() !== "")
              : [];

            // Si no hay imágenes, usar un placeholder
            if (imagenes.length === 0) {
              imagenes.push(
                "https://via.placeholder.com/300x200?text=Sin+Imagen"
              );
            }

            return {
              id: product.id,
              name: product.title || "Sin título",
              price: product.price || 0,
              description: product.description || "Sin descripción",
              images: imagenes,
              colors: ["#000000"],
              chosenColor: "#000000",
              chosenImage: imagenes[0],
              colorIndex: 0,
            };
          });

        console.log("✅ Productos transformados:", productoTransformer);
        console.log("📊 Total final:", productoTransformer.length);

        setProducto(productoTransformer);
        setError(null);
      } catch (err) {
        console.error("❌ Error al cargar productos:", err);
        setError("No se pudieron cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, []);

  function openProduct(product) {
    console.log("🔍 Abriendo producto:", product);
    setSelected({
      ...product,
      chosenColor: product.colors[0],
      chosenImage: product.images[0],
      colorIndex: 0,
    });
    setIsOpen(true);
  }

  const changeColor = (index) => {
    setSelected((prev) =>
      prev
        ? {
            ...prev,
            chosenColor: prev.colors[index],
            chosenImage: prev.images[index],
            colorIndex: index,
          }
        : prev
    );
  };

  const addCart = () => {
    if (!selected) return;
    const key = `${selected.id}-${selected.colorIndex}`;
    const esta = cartItems.find((i) => i.key === key);

    if (esta) {
      setCartItems((prev) =>
        prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          key,
          id: selected.id,
          name: selected.name,
          color: selected.chosenColor,
          image: selected.chosenImage,
          qty: 1,
          price: selected.price,
        },
      ]);
    }
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="bg-[#1A1A1A] min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1A1A1A] min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A1A] min-h-screen">
      <Regresar />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
        <div className="lg:col-span-2">
          <CardGrid products={producto} onOpen={openProduct} />
        </div>

        <CartAside items={cartItems} />
      </div>

      {/* ✅ CORRECCIÓN: producto (no product) */}
      {isOpen && selected && (
        <Modal
          producto={selected}
          onClose={() => setIsOpen(false)}
          onChangeColor={changeColor}
          onAdd={addCart}
        />
      )}
    </div>
  );
}
