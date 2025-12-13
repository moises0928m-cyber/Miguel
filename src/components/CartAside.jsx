import { useState } from "react";
import Toast from "./hooks/Toast";

export default function CartAside({ items }) {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  });
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  const Show = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 3000);
  };

  const enviar = () => {
    if (items.length === 0) {
      Show("El carrito esta vacio", "error");
      return;
    }

    const productos = items
      .map((i) => {
        return `Producto: ${i.name} Cantidad : ${i.qty} Precio unitario :$${
          i.price
        } Subtotal: $${i.qty * i.price} `;
      })
      .join("\n-----------------------------\n");
    const total = items.reduce((s, i) => s + i.qty * i.price, 0);
    const mensaje = `🛒Nuevo pedido de la pagina web 
     ${productos} 
     Total:$${total}
     Fecha: ${new Date().toLocaleString()}`;

    const numero = "59173163291";

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

    Show("Pedido enviado por WhatsApp", "success");
  };
  console.log(items);

  return (
    <>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
      <aside className="p-4 rounded-lg bg-[#2A2A2A] border border-[#3A3A3A] h-full text-white flex flex-col">
        <h3 className="font-semibold mb-2">Tu carrito</h3>
        <div className="text-sm mb-4">Items: {items.length}</div>

        <div className="space-y-3 mb-4 flex-1 overflow-auto">
          {items.length === 0 && <div>No hay productos</div>}
          {items.map((it) => (
            <div
              key={it.key}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={it.image}
                  alt={it.name}
                  className="w-10 h-10 rounded-md object-contain"
                />
                <div className="text-sm">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-xs">x{it.qty}</div>
                </div>
              </div>
              <div className="text-sm">${it.qty * it.price}</div>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <div className="text-sm mb-2">Total</div>
          <div className="font-semibold text-lg mb-3">${total}</div>
          <button
            onClick={enviar}
            className="w-full py-2 rounded-md bg-[#C9A86A] text-[#0E0E0E] hover:bg-[#A38352] font-semibold transition"
          >
            Finalizar
          </button>
        </div>
      </aside>
    </>
  );
}
