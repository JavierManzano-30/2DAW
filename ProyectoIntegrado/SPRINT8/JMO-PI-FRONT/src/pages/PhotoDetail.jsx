import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPhotoById } from '../data/photos.js';

export function PhotoDetail() {
  const { photoId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const photo = getPhotoById(photoId);

  return (
    <div className="split">
      <div className="card">
        <h2 className="section-title">Detalle de la foto</h2>
        <p className="section-subtitle">Foto #{photoId} en votacion abierta.</p>
        <button className="image-button" type="button" onClick={() => setIsOpen(true)}>
          <img className="hero-image" src={photo.image} alt={`Foto de ${photo.user}`} />
        </button>
        <div className="list photo-details">
          <div className="list-item">
            <strong>Autor</strong>
            <span>{photo.user}</span>
          </div>
          <div className="list-item">
            <strong>Categoria</strong>
            <span>{photo.category}</span>
          </div>
          <div className="list-item description-item">
            <strong>Descripcion</strong>
            <span>{photo.description}</span>
          </div>
          <div className="list-item">
            <strong>Votos</strong>
            <span>{photo.votes}</span>
          </div>
        </div>
        <div style={{ marginTop: 18, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn" type="button">
            Votar
          </button>
          <Link className="btn outline" to="/app/dashboard">
            Volver a galeria
          </Link>
          <Link className="btn outline" to="/app/photos/01/closed">
            Ver votacion cerrada
          </Link>
        </div>
      </div>
      <div className="card comments-card">
        <h3 className="card-title">Comentarios</h3>
        <div className="comment-list">
          <div className="comment-item">
            <div className="comment-meta">
              <strong>Lucia R.</strong>
              <span>hace 1h</span>
            </div>
            <p>Gran luz en el retrato.</p>
          </div>
          <div className="comment-item">
            <div className="comment-meta">
              <strong>Marcos P.</strong>
              <span>hace 3h</span>
            </div>
            <p>Composicion impecable.</p>
          </div>
          <div className="comment-item">
            <div className="comment-meta">
              <strong>Ana G.</strong>
              <span>ayer</span>
            </div>
            <p>Me encanta la paleta.</p>
          </div>
        </div>
        <form className="comment-form">
          <textarea rows="2" placeholder="Escribe tu comentario..." />
          <button className="btn" type="button">
            Publicar
          </button>
        </form>
      </div>
      {isOpen && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setIsOpen(false)}>
          <button className="lightbox-close" type="button" onClick={() => setIsOpen(false)}>
            Cerrar
          </button>
          <img
            className="lightbox-image"
            src={photo.image}
            alt={`Foto de ${photo.user} ampliada`}
          />
        </div>
      )}
    </div>
  );
}
