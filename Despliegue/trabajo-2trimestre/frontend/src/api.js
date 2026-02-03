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

export async function getAnimeTop() {
  return request("/anime/top");
}

export async function getAnimeGenres() {
  return request("/anime/genres");
}

export async function searchAnime(query, filters = {}) {
  const params = new URLSearchParams({ q: query });
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    params.set(key, String(value));
  });
  return request(`/anime/search?${params.toString()}`);
}

export async function getFavoritos() {
  return request("/favoritos");
}

export async function addFavorito(payload) {
  return request("/favoritos", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export async function removeFavorito(id) {
  return request(`/favoritos/${id}`, {
    method: "DELETE"
  });
}
