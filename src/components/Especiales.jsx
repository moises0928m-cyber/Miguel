import { useState } from "react";
import Regresar from "./Regresar";

export default function Especiales() {
  const [cambiar, setCambiar] = useState(false);
  const [color, setColor] = useState("");

  const cambio = (e) => {
    e.preventDefault();
    setCambiar(!cambiar);
  };

  return (
    <div>
      <Regresar />
      <div>
        <div className=" text-white py-6 sm:py-8 lg:py-12">
          <div className="mx-auto max-w-screen-2xl gap px-4 md:px-8">
            {/* text - start */}
            <div className="mb-10 md:mb-16">
              <h2 className="mb-4 text-center text-2xl font-bold  md:mb-6 lg:text-3xl">
                Pedidos especiales
              </h2>
            </div>
            {/* form - start */}
            <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2 md:grid-rows-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="mb-2 inline-block text-sm  sm:text-base"
                >
                  Nombre Completo
                </label>
                <input
                  name="first-name"
                  className="w-full border-b-2 border-[#3A3A3A]  focus:outline-none focus:border-gray-300 transition-all placeholder-gray-400"
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="mb-2 inline-block text-sm  sm:text-base"
                >
                  Numero
                </label>
                <input
                  name="last-name"
                  className="w-full border-b-2 border-[#3A3A3A]  focus:outline-none focus:border-gray-300 transition-all placeholder-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-2 inline-block text-sm  sm:text-base"
                >
                  Color
                </label>
                <div className="flex gap-4">
                  <input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    type="text"
                    className="w-full border-b-2 border-gray-400 focus:outline-none focus:border-gray-200 transition-all placeholder-gray-400"
                  />
                  <input
                    className=" w-20 h-10"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="last-name"
                  className="mb-2 inline-block text-sm  sm:text-base"
                >
                  Modelo
                </label>
                <select className="bg-[#3A3A3A] outline-none p-1 rounded-lg ">
                  <option name="Mochila">Mochila</option>
                  <option name="Cangurera">Cangurera</option>
                  <option name="Pechera">Pechera</option>
                  <option name="Cartera">Cartera</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-2 inline-block text-sm  sm:text-base"
                >
                  Descripcion
                </label>
                <textarea
                  name="message"
                  className="h-64 w-full rounded-xl  bg-[#3A3A3A] px-3 py-2  outline-none  transition duration-100 "
                />
              </div>
              {cambiar && <div>Jalo</div>}
              <div>
                <button onClick={cambio}>Subir una imagen</button>
              </div>
              <div className="flex items-center justify-between sm:col-span-2">
                <button className="bg-[#C9A86A] border p-2 rounded-lg text-xl tracking-widest text-[#0E0E0E] hover:bg-[#A38352] font-semibold transition ">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
