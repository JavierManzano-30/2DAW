import React from 'react';
import { Link } from 'react-router-dom';

export function UploadSuccess() {
  return (
    <div className="auth-layout">
      <div className="card auth-card">
        <h2 className="card-title">Foto subida</h2>
        <div className="status success">La foto quedo publicada para votacion.</div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
          <Link className="btn" to="/app/dashboard?state=success">
            Volver al dashboard
          </Link>
          <Link className="btn outline" to="/app/photos/upload">
            Subir otra
          </Link>
        </div>
      </div>
    </div>
  );
}
