import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function formulario(e) {
    e.preventDefault();

    setError(null);

    if (!email || !password) {
      setError("Complete todos los campos");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const respuesta = await fetch(
        "https://api-funval-g6.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await respuesta.json();

      if (!respuesta.ok) {
        setError(data.message || "Error al iniciar sesión");
        setLoading(false);
        return;
      }
      console.log(data);

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.user_role);

      if (data.user_role === "admin") {
        onLogin(data.user_name);
        navigate("/admin");
      } else {
        setError("No tienes permiso para entrar aquí.");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      }
    } catch (erro) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="h-screen w-full bg-cover bg-center bg-[#1a1a1a]">
        {loading && <Loading />}
        <div className="relative flex items-center justify-center h-screen">
          <div className="z-10 bg-[#3A3A3A] text-white bg-opacity-90 p-8 rounded-xl shadow-lg w-80 md:text-3xl md:p-10 md:w-100">
            <h2 className="text-2xl font-semibold mb-6 text-center ">
              Iniciar Sesión
            </h2>

            {error && (
              <p className="text-red-600 text-center text-sm mb-2">{error}</p>
            )}

            <form onSubmit={formulario} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium  md:text-xl">
                  Correo
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 rounded-lg text-xl   focus:outline-none focus:ring "
                  placeholder="ejemplo@gmail.com"
                />
              </div>

              <div className=" relative flex flex-col">
                <label className="text-sm font-medium  md:text-xl">
                  Contraseña
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="mt-1 p-2 rounded-lg"
                  placeholder="••••••••"
                />
                <button className="absolute right-3 top-12" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>
              </div>

              <button
                type="submit"
                className="bg-[#C9A86A] p-2 rounded-lg text-xl tracking-widest text-[#0E0E0E] hover:bg-[#A38352] font-semibold transition "
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
