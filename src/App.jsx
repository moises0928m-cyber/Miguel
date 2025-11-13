import React, { useState } from "react";
import Header from "./components/Header";
import CardGrid from "./components/CardGrid";
import Modal from "./components/Modal";
import CartAside from "./components/CartAside";
import products from "./data/products";

export default function App() {
  const [selected, setSelected] = useState(null); // producto seleccionado
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // {productId, color, qty}

  function openProduct(product) {
    setSelected({ ...product, chosenColor: product.colors[0] });
    setIsOpen(true);
  }

  function changeColor(color) {
    setSelected((prev) => (prev ? { ...prev, chosenColor: color } : prev));
  }

  function addToCart() {
    if (!selected) return;
    setCartItems((prev) => {
      const key = `${selected.id}-${selected.chosenColor}`;
      const found = prev.find((i) => i.key === key);
      if (found)
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      return [
        ...prev,
        {
          key,
          id: selected.id,
          name: selected.name,
          color: selected.chosenColor,
          qty: 1,
          price: selected.price,
        },
      ];
    });
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Header />
          <CardGrid products={products} onOpen={openProduct} />
        </div>

        <CartAside
          items={cartItems}
          onFinalize={() => alert("Finalizar — demo")}
        />
      </div>

      {isOpen && selected && (
        <Modal
          product={selected}
          onClose={() => setIsOpen(false)}
          onChangeColor={changeColor}
          onAdd={() => {
            addToCart();
            setIsOpen(false);
          }}
        />
      )}
    </div>
  );
}
