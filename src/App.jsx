import React from "react";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Reservas from "./components/Reservas";
import Infomarcion from "./components/Infomarcion";
import Especiales from "./components/Especiales";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Infomarcion />} />
          <Route path="reserva" element={<Reservas />} />
          <Route path="pedidos" element={<Especiales />} />
        </Route>
      </Routes>
    </>
  );
}
{
  /* <div className="min-h-screen p-6 bg-[#1A1A1A]">
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
          onAdd={addToCart}
        />
      )}
    </div> */
}
