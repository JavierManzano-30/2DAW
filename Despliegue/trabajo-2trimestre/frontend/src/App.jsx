import React, { useEffect, useMemo, useState } from "react";
import {
  addFavorito,
  getAnimeTop,
  getFavoritos,
  removeFavorito,
  searchAnime
} from "./api.js";

function truncateText(text, max = 140) {
  if (!text) return "";
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}

function getYear(item) {
  return item?.year || item?.aired?.prop?.from?.year || null;
}

function getImage(item) {
  return item?.images?.jpg?.image_url || item?.images?.webp?.image_url || "";
}

export default function App() {
  const [animeItems, setAnimeItems] = useState([]);
  const [animeQuery, setAnimeQuery] = useState("");
  const [animeLoading, setAnimeLoading] = useState(false);
  const [animeError, setAnimeError] = useState("");

  const [favoritos, setFavoritos] = useState([]);
  const [favLoading, setFavLoading] = useState(false);
  const [favError, setFavError] = useState("");
  const [lastAction, setLastAction] = useState("");

  const apiUrl = useMemo(
    () => import.meta.env.VITE_API_URL || "http://localhost:4000",
    []
  );

  useEffect(() => {
    async function loadFavs() {
      setFavError("");
      setFavLoading(true);
      try {
        const data = await getFavoritos();
        setFavoritos(data);
      } catch (err) {
        setFavError(err.message);
      } finally {
        setFavLoading(false);
      }
    }

    loadFavs();
  }, []);

  async function handleAnimeTop() {
    setAnimeError("");
    setAnimeLoading(true);
    try {
      const data = await getAnimeTop();
      setAnimeItems(data?.data || []);
    } catch (err) {
      setAnimeError(err.message);
    } finally {
      setAnimeLoading(false);
    }
  }

  async function handleAnimeSearch() {
    setAnimeError("");
    if (!animeQuery.trim()) {
      setAnimeError("Escribe un titulo para buscar.");
      return;
    }
    setAnimeLoading(true);
    try {
      const data = await searchAnime(animeQuery.trim());
      setAnimeItems(data?.data || []);
    } catch (err) {
      setAnimeError(err.message);
    } finally {
      setAnimeLoading(false);
    }
  }

  async function handleAddFavorito(item) {
    setFavError("");
    try {
      const payload = {
        mal_id: item.mal_id,
        title: item.title,
        image: getImage(item),
        score: item.score ?? null,
        year: getYear(item)
      };
      const saved = await addFavorito(payload);

      setFavoritos((prev) => {
        const exists = prev.some((fav) => fav.mal_id === saved.mal_id);
        if (exists) return prev;
        return [saved, ...prev];
      });
      setLastAction("Favorito guardado.");
    } catch (err) {
      setFavError(err.message);
    }
  }

  async function handleRemoveFavorito(id) {
    setFavError("");
    try {
      await removeFavorito(id);
      setFavoritos((prev) => prev.filter((fav) => fav._id !== id));
      setLastAction("Favorito eliminado.");
    } catch (err) {
      setFavError(err.message);
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Despliegue - SPA + API</p>
          <h1>Anime Hub</h1>
          <p className="sub">
            Busqueda y favoritos con Jikan. Base URL: <span>{apiUrl}</span>
          </p>
        </div>
        <div className="status">
          <div className={`pill ${animeLoading || favLoading ? "pill--loading" : ""}`}>
            {animeLoading || favLoading ? "Procesando..." : "Listo"}
          </div>
          {lastAction && <p className="hint">{lastAction}</p>}
        </div>
      </header>

      <section className="panel">
        <h2>Explorar anime</h2>
        <div className="anime-controls">
          <button onClick={handleAnimeTop}>Top anime</button>
          <label className="anime-search">
            Buscar por titulo
            <input
              value={animeQuery}
              onChange={(event) => setAnimeQuery(event.target.value)}
              placeholder="Ej: Fullmetal Alchemist"
            />
          </label>
          <button onClick={handleAnimeSearch}>Buscar</button>
        </div>
        {animeLoading && <p className="hint">Cargando anime...</p>}
        {animeError && <p className="error">{animeError}</p>}
      </section>

      <section className="panel">
        <h3>Resultados</h3>
        {animeItems.length === 0 ? (
          <p className="hint">Sin resultados todavia. Prueba top o una busqueda.</p>
        ) : (
          <div className="anime-grid">
            {animeItems.map((item) => {
              const image = getImage(item);
              return (
                <article key={item.mal_id} className="anime-card">
                  {image ? (
                    <img src={image} alt={item.title} loading="lazy" />
                  ) : (
                    <div className="anime-placeholder">Sin imagen</div>
                  )}
                  <div className="anime-body">
                    <h4 className="anime-title">{item.title}</h4>
                    <div className="anime-meta">
                      <span>Score: {item.score ?? "N/A"}</span>
                      <span>Episodios: {item.episodes ?? "?"}</span>
                      <span>Ano: {getYear(item) ?? "?"}</span>
                    </div>
                    {item.synopsis && (
                      <p className="anime-synopsis">
                        {truncateText(item.synopsis)}
                      </p>
                    )}
                    <button
                      className="anime-action"
                      onClick={() => handleAddFavorito(item)}
                    >
                      Guardar en favoritos
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="panel">
        <h3>Mis favoritos</h3>
        {favLoading && <p className="hint">Cargando favoritos...</p>}
        {favError && <p className="error">{favError}</p>}
        {favoritos.length === 0 ? (
          <p className="hint">Aun no tienes favoritos guardados.</p>
        ) : (
          <ul className="favoritos">
            {favoritos.map((fav) => (
              <li key={fav._id}>
                <div>
                  <h4>{fav.title}</h4>
                  <p>
                    Score: {fav.score ?? "N/A"} · Ano: {fav.year ?? "?"}
                  </p>
                </div>
                <button
                  type="button"
                  className="id-chip"
                  onClick={() => handleRemoveFavorito(fav._id)}
                >
                  Quitar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
