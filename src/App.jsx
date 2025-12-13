import { useState } from "react";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import Reservas from "./components/Reservas";
import Infomarcion from "./components/Infomarcion";
import Especiales from "./components/Especiales";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Protector from "./components/Protector";

export default function App() {
  const [name, setName] = useState("");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Infomarcion />} />
          <Route path="reserva" element={<Reservas />} />
          <Route path="pedidos" element={<Especiales />} />
        </Route>
        <Route path="/login" element={<Login onLogin={setName} />} />
        <Route
          path="/admin"
          element={
            <Protector>
              <Admin name={name} />
            </Protector>
          }
        />
      </Routes>
    </>
  );
}
