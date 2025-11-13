import React from "react";

export default function CartAside({ items, onFinalize }) {
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <aside className="bg-[rgba(255,255,255,0.02)] p-4 rounded-lg border border-[rgba(255,255,255,0.03)] h-full">
      <h3 className="font-semibold mb-2">Tu carrito</h3>
      <div className="text-sm text-[var(--muted)] mb-4">
        Items: {items.length}
      </div>

      <div className="space-y-3 mb-4">
        {items.length === 0 && (
          <div className="text-[var(--muted)]">No hay productos</div>
        )}
        {items.map((it) => (
          <div key={it.key} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-md"
                style={{ background: it.color }}
              />
              <div className="text-sm">
                <div className="font-medium">{it.name}</div>
                <div className="text-[var(--muted)] text-xs">x{it.qty}</div>
              </div>
            </div>
            <div className="text-sm">${it.qty * it.price}</div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <div className="text-sm text-[var(--muted)] mb-2">Total</div>
        <div className="font-semibold text-lg mb-3">${total}</div>
        <button
          onClick={onFinalize}
          className="w-full py-2 rounded-md bg-white/10 border border-white/8"
        >
          Finalizar
        </button>
      </div>
    </aside>
  );
}
