import { useState, useRef } from "react";
import Regresar from "./Regresar";
import Toast from "./hooks/Toast";

export default function Especiales() {
  const [cambiar, setCambiar] = useState(false);
  const [color, setColor] = useState("#000000");
  const [imagenes, setImagenes] = useState([]);
  const [previews, setPreviews] = useState([]);
  const inputImg = useRef(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  });
  const [form, setForm] = useState({
    nombre: "",
    numero: "",
    modelo: "Mochila",
    descripcion: "",
  });

  const Show = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type }), 3000);
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* funcion para subir a Cloudinary */
  const cloudinaryUpload = async (file) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Nogales");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dcejivtbg/image/upload",
        { method: "POST", body: data }
      );

      const json = await res.json();
      console.log(" Respuesta de Cloudinary:", json);

      if (json.error) {
        console.error(" Error de Cloudinary:", json.error);
        return null;
      }

      return json.secure_url;
    } catch (error) {
      console.error(" Error en cloudinaryUpload:", error);
      return null;
    }
  };

  const handleImg = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    /* visualizar */
    setPreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);

    /* Guardar archivos */
    setImagenes((prev) => [...prev, ...files]);
  };

  const cambio = (e) => {
    e.preventDefault();

    if (cambiar) {
      setImagenes([]);
      setPreviews([]);
      if (inputImg.current) inputImg.current.value = "";
    }
    setCambiar(!cambiar);
  };
  const eliminarImagen = (index) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /*  Función para enviar a WhatsApp */
  const Whasap = async (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.numero.trim()) {
      Show("Porfavor ingresar tu nombre y numero", "error");
      return;
    }
    if (!/^\d+$/.test(form.numero)) {
      Show("El numero debe ser solo digitos");
      return;
    }

    let urls = [];

    if (imagenes.length > 0) {
      for (let i = 0; i < imagenes.length; i++) {
        try {
          const url = await cloudinaryUpload(imagenes[i]);

          if (url) {
            console.log(` Imagen ${i + 1} subida:`, url);
            urls.push(url);
          }
        } catch (error) {
          console.error(` Error en imagen ${i + 1}:`, error);
        }
      }
    }

    /* mensaje con URLs */
    const mensaje = `*Nuevo Pedido Especial*

 *Nombre:* ${form.nombre || "No ingresado"}
 *Número del Cliente:* ${form.numero || "No ingresado"}
 *Modelo:* ${form.modelo || "No ingresado"}
 *Color:* ${color || "No ingresado"}
 *Descripción:* ${form.descripcion || "No ingresado"}

${
  urls.length > 0
    ? ` *Imágenes (${urls.length}):*\n${urls
        .map((url, i) => `${i + 1}. ${url}`)
        .join("\n")}`
    : " Sin imágenes"
}`;

    const numero = "59173163291";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  };

  return (
    <>
      <Toast show={toast.show} message={toast.message} type={toast.type} />
      <div>
        <Regresar />
        <div>
          <div className="text-white py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-2xl gap px-4 md:px-8">
              <div className="mb-10 md:mb-16">
                <h2 className="mb-4 text-center text-3xl font-bold md:mb-6 lg:text-3xl">
                  Pedidos especiales
                </h2>
              </div>

              <form
                onSubmit={Whasap}
                className="p-2 mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2 md:grid-rows-2"
              >
                <div>
                  <label className="mb-2 inline-block font-medium tracking-wide sm:text-base">
                    Nombre Completo
                  </label>
                  <input
                    value={form.nombre}
                    onChange={handleForm}
                    name="nombre"
                    className="w-full border-b-2 border-[#3A3A3A] focus:outline-none focus:border-gray-300 transition-all placeholder-gray-400 bg-transparent"
                  />
                </div>

                <div>
                  <label className="mb-2 inline-block font-medium tracking-wide sm:text-base">
                    Numero
                  </label>
                  <input
                    value={form.numero}
                    onChange={handleForm}
                    name="numero"
                    className="w-full border-b-2 border-[#3A3A3A] focus:outline-none focus:border-gray-300 transition-all placeholder-gray-400 bg-transparent"
                  />
                </div>

                <div>
                  <label className="mb-2 inline-block font-medium tracking-wide sm:text-base">
                    Color
                  </label>
                  <div className="flex gap-4">
                    <input
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      type="text"
                      className="w-full border-b-2 border-gray-400 focus:outline-none focus:border-gray-200 transition-all placeholder-gray-400 bg-transparent"
                    />
                    <input
                      className="w-20 h-10 cursor-pointer"
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 inline-block font-medium tracking-wide sm:text-base">
                    Modelo
                  </label>
                  <select
                    value={form.modelo}
                    onChange={handleForm}
                    name="modelo"
                    className="bg-[#3A3A3A] outline-none p-1 rounded-lg"
                  >
                    <option>Mochila</option>
                    <option>Cangurera</option>
                    <option>Pechera</option>
                    <option>Cartera</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 inline-block font-medium tracking-wide sm:text-base">
                    Descripcion
                  </label>
                  <textarea
                    value={form.descripcion}
                    onChange={handleForm}
                    name="descripcion"
                    className="h-64 w-full rounded-xl bg-[#3A3A3A] px-3 py-2 outline-none transition duration-100"
                  />
                </div>

                <div className="flex flex-col w-full sm:col-span-2">
                  {cambiar && (
                    <div className="w-full">
                      <input
                        type="file"
                        ref={inputImg}
                        accept="image/*"
                        multiple
                        onChange={handleImg}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => inputImg.current.click()}
                        className="w-full md:flex md:justify-center font-medium tracking-wide"
                      >
                        <p className="bg-[#3A3A3A] p-2 cursor-pointer rounded-lg">
                          Seleccionar imágenes
                        </p>
                      </button>

                      {previews.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {previews.map((img, i) => (
                            <div key={i} className="relative">
                              <img
                                src={img}
                                alt={`Preview ${i + 1}`}
                                className="w-full h-40 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => eliminarImagen(i)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                              >
                                x
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={cambio}
                      className="bg-[#3A3A3A] p-2 rounded-lg mt-2 cursor-pointer font-medium tracking-wide"
                    >
                      {cambiar ? "Cancelar" : "Subir imágenes"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:col-span-2">
                  <button
                    type="submit"
                    className="bg-[#C9A86A] font-medium p-2 px-6 rounded-lg text-xl tracking-widest text-[#0E0E0E] hover:bg-[#A38352] transition"
                  >
                    Enviar a WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
