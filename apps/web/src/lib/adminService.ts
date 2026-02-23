const API_URL = "http://localhost:3002"; // Adjust based on apps/api port

export const adminService = {
  getProducts: async (search?: string) => {
    const res = await fetch(`${API_URL}/search?q=${search || ""}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  createProduct: async (data: any) => {
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create product");
    return res.json();
  },

  updateProduct: async (id: string, data: any) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update product");
    return res.json();
  },

  deleteProduct: async (id: string) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete product");
    return res.json();
  },
};
