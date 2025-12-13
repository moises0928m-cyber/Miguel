// Services.js - API de Platzi
const API_BASE_URL = "https://api.escuelajs.co/api/v1";

// 🔸 Función auxiliar para obtener el token
const getToken = () => {
  return localStorage.getItem("token");
};

// 🔸 Función auxiliar para manejar errores
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error: ${response.status}`);
  }
  return response.json();
};

// ==================== PRODUCTOS ====================

/**
 * 🔹 Obtener todos los productos
 * GET /products
 */
export const getProducts = async (limit = 10) => {
  try {
    console.log(`🔄 Solicitando ${limit} productos de la API...`);

    const response = await fetch(`${API_BASE_URL}/products?limit=${limit}`);
    const data = await handleResponse(response);

    console.log(`✅ API respondió con ${data?.length || 0} productos`);

    // 🔹 Validar que sea un array
    if (!Array.isArray(data)) {
      console.error("❌ La API no devolvió un array:", data);
      return [];
    }

    // 🔹 Filtrar productos válidos
    const productosValidos = data.filter((p) => {
      const esValido = p && typeof p === "object" && p.id;
      if (!esValido) {
        console.warn("⚠️ Producto inválido encontrado:", p);
      }
      return esValido;
    });

    console.log(`✅ ${productosValidos.length} productos válidos`);
    return productosValidos;
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    // Devolver array vacío en lugar de lanzar error
    return [];
  }
};

/**
 * 🔹 Obtener un producto por ID
 * GET /products/{id}
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};

/**
 * 🔹 Crear un nuevo producto (requiere autenticación)
 * POST /products
 */
export const createProduct = async (productData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

/**
 * 🔹 Actualizar un producto (requiere autenticación)
 * PUT /products/{id}
 */
export const updateProduct = async (id, productData) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

/**
 * 🔹 Eliminar un producto (requiere autenticación)
 * DELETE /products/{id}
 */
export const deleteProduct = async (id) => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};

// ==================== CATEGORÍAS ====================

/**
 * 🔹 Obtener todas las categorías
 * GET /categories
 */
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
};

/**
 * 🔹 Obtener productos por categoría
 * GET /categories/{id}/products
 */
export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/categories/${categoryId}/products`
    );
    return await handleResponse(response);
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error);
    return [];
  }
};

// ==================== AUTENTICACIÓN ====================

/**
 * 🔹 Obtener perfil del usuario autenticado
 * GET /auth/profile
 */
export const getUserProfile = async () => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("No hay token de autenticación");
    }

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    throw error;
  }
};

// ==================== UTILIDADES ====================

/**
 * 🔹 Verificar si el usuario está autenticado
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * 🔹 Cerrar sesión
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("role");
  localStorage.removeItem("userName");
};
