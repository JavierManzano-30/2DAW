import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.jsx';

export function Profile() {
  const { profile } = useAuth();

  return (
    <div className="split">
      <div className="card">
        <h2 className="section-title">Perfil</h2>
        <p className="section-subtitle">Tus datos y estadisticas recientes.</p>
        <img className="avatar" src={profile.avatar} alt="Perfil" style={{ marginBottom: 12 }} />
        <div className="helper" style={{ marginBottom: 12 }}>
          {profile.bio}
        </div>
        <div className="list">
          <div className="list-item">
            <span>Nombre</span>
            <strong>{profile.name}</strong>
          </div>
          <div className="list-item">
            <span>Categoria</span>
            <strong>{profile.category}</strong>
          </div>
          <div className="list-item">
            <span>Votos recibidos</span>
            <strong>24</strong>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
          <Link className="btn" to="/app/profile/edit">
            Editar perfil
          </Link>
          <Link className="btn outline" to="/app/dashboard">
            Volver
          </Link>
        </div>
      </div>
      <div className="card">
        <h3 className="card-title">Actividad</h3>
        <div className="list">
          <div className="list-item">
            <span>Ultima subida</span>
            <strong>Hace 2 dias</strong>
          </div>
          <div className="list-item">
            <span>Mejor puesto</span>
            <strong>#3</strong>
          </div>
          <div className="list-item">
            <span>Seguidores</span>
            <strong>128</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
