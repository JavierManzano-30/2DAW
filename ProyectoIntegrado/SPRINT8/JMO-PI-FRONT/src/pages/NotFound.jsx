import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="auth-layout">
      <div className="card auth-card">
        <h2 className="card-title">404 · Pagina no encontrada</h2>
        <p className="card-subtle">La ruta solicitada no existe o fue movida.</p>
        <Link className="btn outline" to="/login">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
