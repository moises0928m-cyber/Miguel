import React from "react";

export default function Header() {
  return (
    <header className="mb-6 bg-[rgba(255,255,255,0.02)] p-4 rounded-lg border border-[rgba(255,255,255,0.03)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-md bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-bold">
            LOGO
          </div>
          <div>
            <h1 className="text-xl font-semibold">
              Demo Pecheras & Cangureras
            </h1>
            <p className="text-sm text-[var(--muted)]">
              Selecciona un producto para ver opciones de color y añadir al
              carrito.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
