import React from 'react';
import { Link } from 'react-router-dom';

export function Forbidden() {
  return (
    <div className="auth-layout">
      <div className="card auth-card">
        <h2 className="card-title">403 · No autorizado</h2>
        <p className="card-subtle">No tienes permisos para ver esta seccion.</p>
        <Link className="btn outline" to="/app/dashboard">
          Volver al dashboard
        </Link>
      </div>
    </div>
  );
}
