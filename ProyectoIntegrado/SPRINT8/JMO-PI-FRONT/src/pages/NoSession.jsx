import React from 'react';
import { Link } from 'react-router-dom';

export function NoSession() {
  return (
    <div className="auth-layout">
      <div className="card auth-card">
        <h2 className="card-title">Sesion expirada</h2>
        <p className="card-subtle">Necesitas iniciar sesion para volver al dashboard.</p>
        <Link className="btn" to="/login">
          Ir a login
        </Link>
      </div>
    </div>
  );
}
