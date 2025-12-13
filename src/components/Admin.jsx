import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  logout,
} from "./Services";
import Toast from "./hooks/Toast";

export default function Admin({ name }) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 🔹 Estados para productos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Estados para el formulario
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  // 🔹 Estados para imágenes
  const [uploadingImages, setUploadingImages] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  // 🔹 Estado del formulario
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: 1,
    images: [], // Ahora será un array de URLs de Cloudinary
  });

  // 🔹 Toast para notificaciones
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // 🔹 Cargar productos y categorías al montar
  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts(10);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar productos");
      showToast("Error al cargar productos", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error al cargar categorías:", err);
    }
  };

  // 🔹 Función para subir imágenes a Cloudinary
  const uploadToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Nogales"); // 🔹 Tu upload preset

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dcejivtbg/image/upload", // 🔹 Tu cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.error) {
        console.error("Error de Cloudinary:", data.error);
        return null;
      }

      console.log("✅ Imagen subida a Cloudinary:", data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("❌ Error al subir a Cloudinary:", error);
      return null;
    }
  };

  // 🔹 Manejar selección de archivos
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    // Crear previsualizaciones
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
    setImageFiles((prev) => [...prev, ...files]);

    showToast(`${files.length} imagen(es) seleccionada(s)`, "success");
  };

  // 🔹 Eliminar imagen de la preview
  const removeImagePreview = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔹 Subir todas las imágenes a Cloudinary
  const uploadAllImages = async () => {
    if (imageFiles.length === 0) return [];

    setUploadingImages(true);
    showToast("Subiendo imágenes...", "info");

    const uploadPromises = imageFiles.map((file) => uploadToCloudinary(file));
    const uploadedUrls = await Promise.all(uploadPromises);

    // Filtrar URLs válidas (no null)
    const validUrls = uploadedUrls.filter((url) => url !== null);

    setUploadingImages(false);

    if (validUrls.length === imageFiles.length) {
      showToast(
        `${validUrls.length} imagen(es) subida(s) exitosamente`,
        "success"
      );
    } else {
      showToast(
        `Solo ${validUrls.length} de ${imageFiles.length} imágenes se subieron correctamente`,
        "warning"
      );
    }

    return validUrls;
  };

  // 🔹 Manejar cambios en el formulario
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Crear producto
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      // Validar campos
      if (!form.title || !form.price) {
        showToast("Título y precio son obligatorios", "error");
        return;
      }

      // Validar que haya imágenes
      if (imageFiles.length === 0) {
        showToast("Debes agregar al menos una imagen", "error");
        return;
      }

      // Subir imágenes a Cloudinary
      const uploadedUrls = await uploadAllImages();

      if (uploadedUrls.length === 0) {
        showToast("Error al subir las imágenes", "error");
        return;
      }

      const productData = {
        title: form.title,
        price: parseInt(form.price),
        description: form.description,
        categoryId: parseInt(form.categoryId),
        images: uploadedUrls,
      };

      await createProduct(productData);
      showToast("Producto creado exitosamente", "success");

      // Resetear formulario
      resetForm();
      loadProducts();
    } catch (err) {
      showToast("Error al crear producto", "error");
      console.error(err);
    }
  };

  // 🔹 Editar producto
  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      let finalImages = [...form.images]; // Mantener imágenes existentes

      // Si hay nuevas imágenes, subirlas
      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadAllImages();
        finalImages = [...finalImages, ...uploadedUrls];
      }

      if (finalImages.length === 0) {
        showToast("El producto debe tener al menos una imagen", "error");
        return;
      }

      const productData = {
        title: form.title,
        price: parseInt(form.price),
        description: form.description,
        categoryId: parseInt(form.categoryId),
        images: finalImages,
      };

      await updateProduct(editingProduct.id, productData);
      showToast("Producto actualizado exitosamente", "success");

      resetForm();
      loadProducts();
    } catch (err) {
      showToast("Error al actualizar producto", "error");
      console.error(err);
    }
  };

  // 🔹 Eliminar producto
  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await deleteProduct(id);
      showToast("Producto eliminado exitosamente", "success");
      loadProducts();
    } catch (err) {
      showToast("Error al eliminar producto", "error");
      console.error(err);
    }
  };

  // 🔹 Preparar edición
  const startEdit = (product) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      price: product.price.toString(),
      description: product.description,
      categoryId: product.category?.id || 1,
      images: product.images || [],
    });
    setImagePreviews([]);
    setImageFiles([]);
    setShowForm(true);
  };

  // 🔹 Resetear formulario
  const resetForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setForm({
      title: "",
      price: "",
      description: "",
      categoryId: 1,
      images: [],
    });
    setImagePreviews([]);
    setImageFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 🔹 Cerrar sesión
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A1A] text-white">
      {/* Toast */}
      <Toast show={toast.show} message={toast.message} type={toast.type} />

      {/* Header */}
      <header className="bg-[#0E0E0E] p-4 border border-[#3A3A3A]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="images/log.png" alt="Logo" className="w-12 h-12" />
            <h1 className="text-xl font-semibold">Panel de Administración</h1>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-[#B3B3B3]">Bienvenido, {name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Botón para crear producto */}
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Productos</h2>
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-[#C9A86A] hover:bg-[#A38352] px-6 py-2 rounded-lg font-semibold transition"
              >
                + Crear Producto
              </button>
            )}
          </div>

          {/* Formulario de crear/editar */}
          {showForm && (
            <div className="bg-[#2A2A2A] p-6 rounded-lg border border-[#3A3A3A] mb-6">
              <h3 className="text-xl font-semibold mb-4">
                {editingProduct ? "Editar Producto" : "Crear Nuevo Producto"}
              </h3>

              <form onSubmit={editingProduct ? handleEdit : handleCreate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2">Título *</label>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleFormChange}
                      className="w-full p-2 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] focus:outline-none focus:border-[#C9A86A] text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Precio *</label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleFormChange}
                      className="w-full p-2 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] focus:outline-none focus:border-[#C9A86A] text-white"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Descripción</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleFormChange}
                    className="w-full p-2 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] focus:outline-none focus:border-[#C9A86A] text-white"
                    rows="3"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Categoría</label>
                  <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleFormChange}
                    className="w-full p-2 rounded-lg bg-[#1F1F1F] border border-[#3A3A3A] focus:outline-none text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 🔹 NUEVO: Sección de subida de imágenes */}
                <div className="mb-4">
                  <label className="block mb-2">Imágenes del Producto *</label>

                  {/* Input de archivos */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-3 bg-[#1F1F1F] border-2 border-dashed border-[#3A3A3A] rounded-lg hover:border-[#C9A86A] transition flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Seleccionar imágenes
                  </button>

                  {/* Previsualizaciones de imágenes nuevas */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImagePreview(index)}
                            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Imágenes existentes (solo al editar) */}
                  {editingProduct && form.images.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-[#B3B3B3] mb-2">
                        Imágenes actuales:
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {form.images.map((img, index) => (
                          <div key={index} className="relative">
                            <img
                              src={img}
                              alt={`Actual ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={uploadingImages}
                    className={`bg-[#C9A86A] hover:bg-[#A38352] px-6 py-2 rounded-lg font-semibold transition ${
                      uploadingImages ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {uploadingImages
                      ? "Subiendo imágenes..."
                      : editingProduct
                      ? "Actualizar"
                      : "Crear"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Lista de productos */}
          {loading ? (
            <div className="text-center py-12">Cargando productos...</div>
          ) : error ? (
            <div className="text-red-500 text-center py-12">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#2A2A2A] p-4 rounded-lg border border-[#3A3A3A]"
                >
                  <img
                    src={product.images[0] || "https://via.placeholder.com/300"}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/300?text=Sin+Imagen";
                    }}
                  />

                  <h3 className="font-semibold text-lg mb-1">
                    {product.title}
                  </h3>
                  <p className="text-[#B3B3B3] mb-2">${product.price}</p>
                  <p className="text-sm text-[#9A9A9A] mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(product)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0E0E0E] p-4 text-center border border-[#3A3A3A]">
        Panel de Administración - API Platzi
      </footer>
    </div>
  );
}
