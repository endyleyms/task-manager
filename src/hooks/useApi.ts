import { useState, useCallback } from "react";

type FetchMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions {
  url: string;
  method?: FetchMethod;
  body?: any;
  headers?: HeadersInit;
  onError?: (error: any) => void; // Callback personalizado para errores
}

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useCallback memoriza funciones, evitando que se vuelvan a crear en cada render. -> evita que se redefinan las funciones
  const fetchData = useCallback(async ({ url, method = "GET", body, headers, onError }: FetchOptions) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        body: method !== "GET" ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Error en la API");
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      if (onError) onError(err); // Llamar al callback de error si está definido
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
}


/**
 * Ejemplo en cada petición
  1. GET
 *  useEffect(() => {
    fetchData({
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "GET",
      onError: (err: { message: any }) => console.error("Error en API:", err.message),
    });
  }, []);

  2. POST
  * const createUser = async () => {
      const newUser = { name: "Juan", email: "juan@test.com" };
      await fetchData({
        url: "/api/users/create",
        method: "POST",
        body: newUser,
        onError: (err) => alert("Error creando usuario: " + err.message),
      });
    };
  
  3. PUT
  * const createUser = async () => {
      const newUser = { name: "Juan", email: "juan@test.com" };
      await fetchData({
        url: "/api/users/create",
        method: "POST",
        body: newUser,
        onError: (err) => alert("Error creando usuario: " + err.message),
      });
    };
 */
