import React, { useEffect, useMemo, useState } from "react";
import {
  addFavorito,
  getAnimeGenres,
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

const TYPE_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "tv", label: "TV" },
  { value: "movie", label: "Película" },
  { value: "ova", label: "OVA" },
  { value: "special", label: "Special" },
  { value: "ona", label: "ONA" },
  { value: "music", label: "Music" }
];

const STATUS_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "airing", label: "En emisión" },
  { value: "complete", label: "Finalizado" },
  { value: "upcoming", label: "Próximo" }
];

const ORDER_OPTIONS = [
  { value: "", label: "Relevancia" },
  { value: "score", label: "Score" },
  { value: "popularity", label: "Popularidad" },
  { value: "favorites", label: "Favoritos" },
  { value: "episodes", label: "Episodios" },
  { value: "start_date", label: "Fecha inicio" }
];

const SORT_OPTIONS = [
  { value: "desc", label: "Desc" },
  { value: "asc", label: "Asc" }
];

export default function App() {
  const [animeItems, setAnimeItems] = useState([]);
  const [animeQuery, setAnimeQuery] = useState("");
  const [animeLoading, setAnimeLoading] = useState(false);
  const [animeError, setAnimeError] = useState("");

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [sort, setSort] = useState("desc");
  const [minScore, setMinScore] = useState("");
  const [maxScore, setMaxScore] = useState("");

  const [favoritos, setFavoritos] = useState([]);
  const [favLoading, setFavLoading] = useState(false);
  const [favError, setFavError] = useState("");
  const [lastAction, setLastAction] = useState("");

  const [lastSearch, setLastSearch] = useState(null);

  const apiUrl = useMemo(
    () => import.meta.env.VITE_API_URL || "http://localhost:4000",
    []
  );

  useEffect(() => {
    async function loadInitial() {
      setFavError("");
      setFavLoading(true);
      try {
        const [favData, genreData] = await Promise.all([
          getFavoritos(),
          getAnimeGenres()
        ]);
        setFavoritos(favData);
        setGenres(genreData?.data || []);
      } catch (err) {
        setFavError(err.message);
      } finally {
        setFavLoading(false);
      }
    }

    loadInitial();
  }, []);

  function buildFilters() {
    const filters = {
      genres: selectedGenre || undefined,
      type: selectedType || undefined,
      status: selectedStatus || undefined,
      order_by: orderBy || undefined,
      min_score: minScore || undefined,
      max_score: maxScore || undefined
    };

    if (orderBy) {
      filters.sort = sort || "desc";
    }

    return filters;
  }

  function hasAnyFilter(filters) {
    return Object.values(filters).some((value) => value !== undefined && value !== "");
  }

  async function executeSearch(query, filters, remember = true) {
    setAnimeError("");
    setAnimeLoading(true);
    try {
      const data = await searchAnime(query, filters);
      setAnimeItems(data?.data || []);
      if (remember) {
        setLastSearch({ type: "search", query, filters });
      }
    } catch (err) {
      setAnimeError(err.message);
    } finally {
      setAnimeLoading(false);
    }
  }

  async function handleAnimeTop() {
    setAnimeError("");
    setAnimeLoading(true);
    try {
      const data = await getAnimeTop();
      setAnimeItems(data?.data || []);
      setLastSearch({ type: "top" });
    } catch (err) {
      setAnimeError(err.message);
    } finally {
      setAnimeLoading(false);
    }
  }

  function handleAnimeSearch(event) {
    if (event) event.preventDefault();
    const query = animeQuery.trim();
    const filters = buildFilters();

    if (!query && !hasAnyFilter(filters)) {
      setAnimeError("Escribe un titulo o selecciona algun filtro.");
      return;
    }

    executeSearch(query, filters);
  }

  async function handleRefresh() {
    if (lastSearch?.type === "top") {
      await handleAnimeTop();
      return;
    }

    if (lastSearch?.type === "search") {
      await executeSearch(lastSearch.query, lastSearch.filters, false);
      return;
    }

    await handleAnimeTop();
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

      <section className="panel hero-panel">
        <div className="hero-panel__copy">
          <h2>Explorar anime</h2>
          <p>
            Usa los filtros para encontrar tu proximo anime favorito. Puedes buscar solo por
            genero sin escribir titulo.
          </p>
        </div>
        <form className="anime-controls" onSubmit={handleAnimeSearch}>
          <button type="button" className="ghost" onClick={handleAnimeTop}>
            Top anime
          </button>
          <label>
            Buscar por titulo
            <input
              value={animeQuery}
              onChange={(event) => setAnimeQuery(event.target.value)}
              placeholder="Ej: Fullmetal Alchemist"
            />
          </label>
          <label>
            Genero
            <select
              value={selectedGenre}
              onChange={(event) => setSelectedGenre(event.target.value)}
            >
              <option value="">Todos</option>
              {genres.map((genre) => (
                <option key={genre.mal_id} value={genre.mal_id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Tipo
            <select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
            >
              {TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Estado
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Ordenar por
            <select value={orderBy} onChange={(event) => setOrderBy(event.target.value)}>
              {ORDER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Orden
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Score min
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={minScore}
              onChange={(event) => setMinScore(event.target.value)}
              placeholder="0"
            />
          </label>
          <label>
            Score max
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              value={maxScore}
              onChange={(event) => setMaxScore(event.target.value)}
              placeholder="10"
            />
          </label>
          <div className="anime-actions">
            <button type="submit">Buscar</button>
            <button type="button" className="ghost" onClick={handleRefresh}>
              Refrescar
            </button>
          </div>
        </form>
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
                <div className="fav-info">
                  {fav.image ? (
                    <img src={fav.image} alt={fav.title} loading="lazy" />
                  ) : (
                    <div className="fav-placeholder">N/A</div>
                  )}
                  <div>
                    <h4>{fav.title}</h4>
                    <p>
                      Score: {fav.score ?? "N/A"} · Ano: {fav.year ?? "?"}
                    </p>
                  </div>
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
