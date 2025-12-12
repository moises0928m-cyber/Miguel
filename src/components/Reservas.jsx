import React from "react";
import { useState } from "react";
import CardGrid from "./CardGrid";
import CartAside from "./CartAside";
import Modal from "./Modal";
import products from "./products";
import Regresar from "./Regresar";

export default function Reservas() {
  const [selected, setSelected] = useState(null); // producto seleccionado
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]); // prducto por color y imagen

  /* modal con producto */
  function openProduct(product) {
    setSelected({
      ...product,
      chosenColor: product.colors[0],
      chosenImage: product.images[0],
      colorIndex: 0,
    });
    setIsOpen(true);
  }
  /* cambia img con producto */
  function changeColor(index) {
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
  }
  /* añadir al carro */
  function addToCart() {
    if (!selected) return;
    const key = `${selected.id} - ${selected.colorIndex}`;
    const found = cartItems.find((i) => i.key === key);
    if (found) {
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
  }

  return (
    <div className=" bg-[#1A1A1A]">
      <Regresar />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CardGrid products={products} onOpen={openProduct} />
        </div>

        <CartAside items={cartItems} />
      </div>

      {isOpen && selected && (
        <Modal
          product={selected}
          onClose={() => setIsOpen(false)}
          onChangeColor={changeColor}
          onAdd={addToCart}
        />
      )}
    </div>
  );
}
