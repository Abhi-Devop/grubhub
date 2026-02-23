const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";  

export const apiService = {
  getProducts: async (search?: string) => {
    try {
        const res = await fetch(`${API_URL}/search?q=${search || ""}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        return await res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
  },

  getCategories: async () => {
    try {
        const res = await fetch(`${API_URL}/categories`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        return await res.json();
    } catch (e) {
        console.error(e);
        return [];
    }
  },

  getProductById: async (id: string) => {
      try {
          const res = await fetch(`${API_URL}/products/${id}`);
          if (!res.ok) throw new Error("Failed to fetch product");
          return await res.json();
      } catch (e) {
          console.error(e);
          return null;
      }
  },

  getOrders: async () => {
      try {
          const res = await fetch(`${API_URL}/orders`);
          if (!res.ok) throw new Error("Failed to fetch orders");
          return await res.json();
      } catch (e) {
          console.error(e);
          return [];
      }
  },

  getAllUsers: async () => {
      try {
          const res = await fetch(`${API_URL}/auth/users`, { method: "POST" });
          if (!res.ok) throw new Error("Failed to fetch users");
          return await res.json();
      } catch (e) {
          console.error(e);
          return [];
      }
  },

  createProduct: async (data: any) => {
      const res = await fetch(`${API_URL}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
      });
      const text = await res.text();
      return text ? JSON.parse(text) : {};
  },

  updateProduct: async (id: string, data: any) => {
      const res = await fetch(`${API_URL}/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
      });
      const text = await res.text();
      return text ? JSON.parse(text) : {};
  },

  deleteProduct: async (id: string) => {
      const res = await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
      const text = await res.text();
      return text ? JSON.parse(text) : {};
  },

  getProfile: async () => {
      try {
          const token = localStorage.getItem("token");
          if (!token) return null;
          const res = await fetch(`${API_URL}/auth/me`, {
              method: "POST",
              headers: { 
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}` 
              },
              body: JSON.stringify({ token }) // Assuming auth endpoint expects token in body or header
          });
          if (!res.ok) return null;
          return await res.json();
      } catch (e) {
          return null;
      }
  },

  createPaymentOrder: async (data: { userId: string, storeId: string, items: any[] }) => {
      const res = await fetch(`${API_URL}/payment/create-order`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
      });
      if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to create order");
      }
      return res.json();
  },

  createOrder: async (data: { userId: string, storeId: string, items: any[], paymentMethod: string }) => {
      const res = await fetch(`${API_URL}/orders/checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
      });
      if (!res.ok) {
          const text = await res.text();
          let message = "Failed to create order";
          try {
              const err = JSON.parse(text);
              message = err.message || message;
          } catch (e) {
              message = text || message;
          }
          throw new Error(message);
      }
      return res.json();
  },

  verifyPayment: async (data: any) => {
      const res = await fetch(`${API_URL}/payment/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Payment verification failed");
      return res.json();
  },
  


  updateProfile: async (userId: string, data: any) => {
      const res = await fetch(`${API_URL}/auth/me/update`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, ...data })
      });
      if (!res.ok) throw new Error("Failed to update profile");
      return res.json();
  },

  updateUserRole: async (userId: string, role: string) => {
      const res = await fetch(`${API_URL}/auth/users/${userId}/role`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role })
      });
      if (!res.ok) throw new Error("Failed to update user role");
      return res.json();
  },

  saveAddress: async (userId: string, data: any) => {
      const res = await fetch(`${API_URL}/addresses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, ...data })
      });
      if (!res.ok) throw new Error("Failed to save address");
      return res.json();
  },

  updateAddress: async (id: string, userId: string, data: any) => {
      const res = await fetch(`${API_URL}/addresses/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, ...data })
      });
      if (!res.ok) throw new Error("Failed to update address");
      return res.json();
  },
  
  deleteAddress: async (id: string, userId: string) => {
      const res = await fetch(`${API_URL}/addresses/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId })
      });
      if (!res.ok) throw new Error("Failed to delete address");
      return res.json();
  },

  getUserOrders: async (userId: string) => {
      try {
          const res = await fetch(`${API_URL}/orders/user/${userId}`);
          if (!res.ok) throw new Error("Failed to fetch user orders");
          return await res.json();
      } catch (e) {
          console.error(e);
          return [];
      }
  },

  getOrder: async (id: string) => {
      try {
          const res = await fetch(`${API_URL}/orders/${id}`);
          if (!res.ok) throw new Error("Failed to fetch order");
          return await res.json();
      } catch (e) {
          console.error(e);
          return null;
      }
  },
  
  // Helper to map DB product to Frontend FoodItem
  mapProductToFoodItem: (product: any) => ({
      id: product.id,
      name: product.name,
      price: product.price || product.storeProducts?.[0]?.price || 0, 
      mrp: product.mrp || product.storeProducts?.[0]?.mrp || 0,
      rating: 4.5, // Default for now
      time: "30 mins", // Default
      isVeg: true, // Needs DB field
      image: product.image,
      category: product.category?.name || "General",
      description: product.description || "",
      storeId: product.storeId || product.storeProducts?.[0]?.storeId
  })
};
