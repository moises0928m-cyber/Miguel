import React from "react";
import { Link } from "react-router-dom";

export default function Infomarcion() {
  return (
    <div className="flex-1 h-screen w-full md:flex md:items-center md:justify-center p-10 px-15">
      <div className="flex-col gap-4 p-5  flex items-center justify-center md:h-[300px] ">
        <div className="w-full  bg-[#3A3A3A] rounded-xl">
          <h1 className="w-full flex items-center justify-center text-3xl font-bold tracking-widest mb-2 pt-4">
            Informacion
          </h1>
          <h2 className="text-2xl p-5  flex justify-center items-center font-medium mb-5">
            Equipa tu día. Eleva tu estilo. Somos una tienda especializada en
            pecheras, mochilas y cangureras diseñadas para quienes necesitan
            comodidad, resistencia y flow en cada movimiento. Ofrecemos piezas
            modernas, funcionales y con materiales duraderos para acompañarte en
            la calle, en el trabajo o en tus aventuras diarias. Lleva lo que
            importa. Con estilo y sin complicaciones.
          </h2>
        </div>
        <div className="w-full flex justify-evenly mt-4 ">
          <button className="bg-[#C9A86A] p-2 rounded-lg text-xl tracking-widest text-[#0E0E0E] hover:bg-[#A38352] font-semibold transition ">
            <Link to="pedidos">Pedidos especiales</Link>
          </button>
          <Link
            to="reserva"
            className="bg-[#C9A86A] p-2 rounded-lg text-xl tracking-widest text-[#0E0E0E] hover:bg-[#A38352] font-semibold transition"
          >
            <button className="cursor-pointer">Productos</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
