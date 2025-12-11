import React from "react";

export default function Header() {
  return (
    <header className="mb-6 bg-[#0E0E0E] p-4 rounded-lg border border-[#3A3A3A]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[#B3B3B3]">
          <div className="w-12 h-12 rounded-md flex items-center justify-center font-bold">
            <img src="images/log.png" alt="" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">
              Demo Pecheras & Cangureras
            </h1>
            <p className="text-sm ">
              Selecciona un producto para ver opciones de color y añadir al
              carrito.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
