const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = data?.error || `Error HTTP ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export async function getTareas() {
  return request("/tareas");
}

export async function createTarea({ titulo, descripcion }) {
  return request("/tareas", {
    method: "POST",
    body: JSON.stringify({ titulo, descripcion })
  });
}

export async function deleteTarea(id) {
  return request(`/tareas/${id}`, {
    method: "DELETE"
  });
}
