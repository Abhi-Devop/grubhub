import { QueryClient } from "@tanstack/react-query";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

type RequestConfig = RequestInit & {
  token?: string;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

async function fetcher<T>(endpoint: string, { token, ...customConfig }: RequestConfig = {}): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    // Auto-attach token if in browser
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        headers.Authorization = `Bearer ${storedToken}`;
      }
    }
  }

  const config: RequestInit = {
    method: customConfig.body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    // Try to parse error message
    let errorMessage = "Something went wrong";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Ignore JSON parse error
    }
    throw new Error(errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const apiClient = {
  get: <T>(endpoint: string, config?: RequestConfig) => 
    fetcher<T>(endpoint, { ...config, method: "GET" }),

  post: <T>(endpoint: string, body: any, config?: RequestConfig) => 
    fetcher<T>(endpoint, { ...config, method: "POST", body: JSON.stringify(body) }),

  put: <T>(endpoint: string, body: any, config?: RequestConfig) => 
    fetcher<T>(endpoint, { ...config, method: "PUT", body: JSON.stringify(body) }),

  delete: <T>(endpoint: string, config?: RequestConfig) => 
    fetcher<T>(endpoint, { ...config, method: "DELETE" }),
};
