import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function UploadPhoto() {
  const navigate = useNavigate();

  return (
    <div className="split">
      <div className="card">
        <h2 className="section-title">Subir foto</h2>
        <p className="section-subtitle">Completa la ficha para abrir votacion.</p>
        <form className="form">
          <div className="field">
            <label htmlFor="title">Titulo</label>
            <input id="title" type="text" placeholder="Atardecer urbano" />
          </div>
          <div className="field">
            <label htmlFor="description">Descripcion</label>
            <textarea id="description" rows="4" placeholder="Describe la historia de la foto..." />
          </div>
          <div className="field">
            <label htmlFor="category">Categoria</label>
            <select id="category">
              <option>Retrato</option>
              <option>Paisaje</option>
              <option>Urbano</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="file">Archivo</label>
            <input id="file" type="file" />
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn" type="button" onClick={() => navigate('/app/photos/upload/success')}>
              Subir
            </button>
            <Link className="btn outline" to="/app/dashboard">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
      <div className="card">
        <h3 className="card-title">Vista previa</h3>
        <img className="hero-image" src="/assets/photos/imagen1.jpg" alt="Vista previa" />
        <p className="helper" style={{ marginTop: 12 }}>
          Formatos admitidos: JPG, PNG. Max 8MB.
        </p>
      </div>
    </div>
  );
}
