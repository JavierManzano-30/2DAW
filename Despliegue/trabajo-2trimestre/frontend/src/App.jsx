import React, { useMemo, useState } from "react";
import { createTarea, deleteTarea, getTareas } from "./api.js";

function mapId(tarea) {
  return tarea._id || tarea.id;
}

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [lastAction, setLastAction] = useState("");

  const apiUrl = useMemo(
    () => import.meta.env.VITE_API_URL || "http://localhost:4000",
    []
  );

  async function handleLoad() {
    setError("");
    setLoading(true);
    try {
      const data = await getTareas();
      setTareas(data);
      setLastAction("Lista cargada correctamente.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    setError("");
    if (!titulo.trim() || !descripcion.trim()) {
      setError("Rellena titulo y descripcion.");
      return;
    }
    setLoading(true);
    try {
      const nueva = await createTarea({
        titulo: titulo.trim(),
        descripcion: descripcion.trim()
      });
      setTareas((prev) => [nueva, ...prev]);
      setTitulo("");
      setDescripcion("");
      setLastAction("Tarea creada correctamente.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    setError("");
    if (!deleteId.trim()) {
      setError("Indica un ID para eliminar.");
      return;
    }
    setLoading(true);
    try {
      await deleteTarea(deleteId.trim());
      setTareas((prev) => prev.filter((tarea) => mapId(tarea) !== deleteId.trim()));
      setDeleteId("");
      setLastAction("Tarea eliminada correctamente.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Despliegue - SPA + API</p>
          <h1>Tareas SPA</h1>
          <p className="sub">
            Frontend React que consume la API REST. Base URL: <span>{apiUrl}</span>
          </p>
        </div>
        <div className="status">
          <div className={`pill ${loading ? "pill--loading" : ""}`}>
            {loading ? "Procesando..." : "Listo"}
          </div>
          {lastAction && <p className="hint">{lastAction}</p>}
        </div>
      </header>

      <section className="panel">
        <h2>Acciones</h2>
        <div className="actions">
          <button onClick={handleLoad}>GET /tareas</button>
          <button onClick={handleCreate}>POST /tareas</button>
          <button onClick={handleDelete}>DELETE /tareas/:id</button>
        </div>
        {error && <p className="error">{error}</p>}
      </section>

      <section className="grid">
        <div className="panel">
          <h3>Nueva tarea</h3>
          <label>
            Titulo
            <input
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              placeholder="Ej: Preparar despliegue"
            />
          </label>
          <label>
            Descripcion
            <textarea
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              placeholder="Describe la tarea"
            />
          </label>
        </div>

        <div className="panel">
          <h3>Eliminar tarea</h3>
          <label>
            ID de la tarea
            <input
              value={deleteId}
              onChange={(event) => setDeleteId(event.target.value)}
              placeholder="_id de Mongo o id en memoria"
            />
          </label>
          <p className="hint">Puedes copiar el ID desde la lista de tareas.</p>
        </div>
      </section>

      <section className="panel">
        <h3>Listado</h3>
        {tareas.length === 0 ? (
          <p className="hint">No hay tareas cargadas. Pulsa "GET /tareas".</p>
        ) : (
          <ul className="tareas">
            {tareas.map((tarea) => {
              const id = mapId(tarea);
              return (
                <li key={id}>
                  <div>
                    <h4>{tarea.titulo}</h4>
                    <p>{tarea.descripcion}</p>
                  </div>
                  <button
                    type="button"
                    className="id-chip"
                    onClick={() => setDeleteId(id)}
                    title="Click para poner este ID en el campo de eliminar"
                  >
                    {id}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
