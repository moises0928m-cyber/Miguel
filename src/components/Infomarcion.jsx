import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function Infomarcion() {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate("");

  const especiales = () => {
    navigate("pedidos");
    setloading(true);
  };
  const productos = () => {
    navigate("reserva");
    setloading(true);
  };

  return (
    <>
      {loading && <Loading />}
      <div className="flex-1 h-screen w-full md:flex md:items-center md:justify-center p-10 px-15">
        <div className="flex-col gap-4 p-5  flex items-center justify-center md:h-[300px] ">
          <div className="w-full  bg-[#3A3A3A] rounded-xl">
            <h1 className="w-full flex items-center justify-center text-3xl font-bold tracking-widest mb-2 pt-4">
              Informacion
            </h1>
            <h3 className="text-2xl p-5  flex flex-col justify-center items-center font-medium mb-5">
              Equipa tu día. Eleva tu estilo.
            </h3>
            Somos una tienda especializada en pecheras, mochilas y cangureras
            diseñadas para quienes necesitan comodidad, resistencia y flow en
            cada movimiento. Ofrecemos piezas modernas, funcionales y con
            materiales duraderos para acompañarte en la calle, en el trabajo o
            en tus aventuras diarias.
            <h3 className="text-2xl p-5  flex flex-col justify-center items-center font-medium mb-5">
              Lleva lo que importa. Con estilo y sin complicaciones.
            </h3>
          </div>
          <div className="w-full flex justify-evenly mt-4 ">
            <button
              onClick={especiales}
              className="bg-[#C9A86A] p-2 rounded-lg text-xl tracking-widest text-[#0E0E0E] hover:bg-[#A38352] font-semibold transition "
            >
              Pedidos especiales
            </button>

            <button
              onClick={productos}
              className="bg-[#C9A86A] p-2 rounded-lg text-xl tracking-widest text-[#0E0E0E] hover:bg-[#A38352] font-semibold transition "
            >
              Productos
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
