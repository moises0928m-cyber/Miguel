import { use, useState } from "react";
import CardGrid from "./CardGrid";
import Modal from "./Modal";
import products from "./products";
import { useNavigate } from "react-router-dom";

export default function Admin({ name }) {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate("");

  function openProduct(product) {
    setSelected({
      ...product,
      chosenColor: product.colors[0],
      chosenImage: product.images[0],
      colorIndex: 0,
    });
    setIsOpen(true);
  }

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

  const salir = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#1A1A1A] text-white">
        <header className="bg-[#0E0E0E] p-4 border border-[#3A3A3A]">
          <div className="flex items-center justify-between">
            <div className="flex justify-between items-center gap-3 text-[#B3B3B3] w-full">
              <div className="w-12 h-12 rounded-md flex items-center justify-center font-bold">
                <img src="images/log.png" alt="" />
              </div>
              <div className=" flex gap-2 ">
                <button onClick={salir}>Cerrar Seccion</button>
              </div>
            </div>
          </div>
        </header>

        <div className=" bg-[#1A1A1A]">
          <h1 className=" p-6 flex w-full text-3xl tracking-wide font-semibold justify-end">
            Bienvenido {name}
          </h1>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <CardGrid products={products} onOpen={openProduct} />
            </div>
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

        <footer className="bg-[#0E0E0E] p-4 text-center border border-[#3A3A3A]">
          footer
        </footer>
      </div>
    </>
  );
}
