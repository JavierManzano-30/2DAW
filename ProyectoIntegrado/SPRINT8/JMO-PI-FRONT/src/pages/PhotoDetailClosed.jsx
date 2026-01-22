import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPhotoById } from '../data/photos.js';

export function PhotoDetailClosed() {
  const { photoId } = useParams();
  const photo = getPhotoById(photoId);

  return (
    <div className="split">
      <div className="card">
        <h2 className="section-title">Votacion cerrada</h2>
        <p className="section-subtitle">La ronda termino. Resultados publicados.</p>
        <img className="hero-image" src={photo.image} alt={`Foto de ${photo.user}`} />
        <div className="list">
          <div className="list-item">
            <span>Puntaje final</span>
            <strong>9.4</strong>
          </div>
          <div className="list-item">
            <span>Posicion</span>
            <strong>3 de 48</strong>
          </div>
          <div className="list-item">
            <span>Votos</span>
            <strong>312</strong>
          </div>
        </div>
        <Link className="btn outline" to={`/app/photos/${photo.id}`} style={{ marginTop: 18 }}>
          Volver al detalle
        </Link>
      </div>
      <div className="card">
        <h3 className="card-title">Ganadores</h3>
        <div className="list">
          <div className="list-item">
            <span>1. Clara Ruiz</span>
            <strong>9.9</strong>
          </div>
          <div className="list-item">
            <span>2. Pablo Montero</span>
            <strong>9.6</strong>
          </div>
          <div className="list-item">
            <span>3. Sofia Valdes</span>
            <strong>9.4</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
