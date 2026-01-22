import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { StatusBlock } from '../components/StatusBlock.jsx';
import { photos } from '../data/photos.js';

const STATE_OPTIONS = [
  { value: 'default', label: 'Normal' },
  { value: 'loading', label: 'Cargando' },
  { value: 'empty', label: 'Vacio' },
  { value: 'error', label: 'Error' },
  { value: 'success', label: 'Exito' },
];

export function Dashboard() {
  const [params] = useSearchParams();
  const state = params.get('state') || 'default';
  const page = params.get('page') || '1';
  const pageNumber = Number(page) || 1;
  const totalPages = 47;
  const prevPage = Math.max(1, pageNumber - 1);
  const nextPage = Math.min(totalPages, pageNumber + 1);
  const windowPages = [
    Math.max(1, pageNumber - 1),
    pageNumber,
    Math.min(totalPages, pageNumber + 1),
  ].filter((value, index, self) => self.indexOf(value) === index);

  const orderedPhotos = page === '2' ? [...photos].reverse() : photos;

  return (
    <div className="dashboard">
      <div className="filters">
        <div className="filters-left">
          <select aria-label="Comunidad">
            <option>Comunidad</option>
            <option>SnapNation</option>
            <option>Popular</option>
          </select>
          <select aria-label="Categoria">
            <option>Categoria</option>
            <option>Paisaje</option>
            <option>Naturaleza</option>
            <option>Urbano</option>
          </select>
          <select aria-label="Ordenar">
            <option>Ordenar</option>
            <option>Mas votadas</option>
            <option>Mas recientes</option>
          </select>
        </div>
        <div className="filters-center pagination">
          {pageNumber === 1 ? (
            <span className="pagination-arrow disabled">&lt;</span>
          ) : (
            <Link className="pagination-arrow" to={`?page=${prevPage}`}>
              &lt;
            </Link>
          )}
          {pageNumber > 2 && (
            <>
              <Link className="page-link" to="?page=1">
                1
              </Link>
              <span className="pagination-ellipsis">...</span>
            </>
          )}
          {windowPages.map((value) => (
            <Link
              key={value}
              className={`page-link ${pageNumber === value ? 'active' : ''}`}
              to={`?page=${value}`}
            >
              {value}
            </Link>
          ))}
          {pageNumber < totalPages - 1 && (
            <>
              <span className="pagination-ellipsis">...</span>
              <Link className="page-link" to={`?page=${totalPages}`}>
                {totalPages}
              </Link>
            </>
          )}
          {pageNumber === totalPages ? (
            <span className="pagination-arrow disabled">&gt;</span>
          ) : (
            <Link className="pagination-arrow" to={`?page=${nextPage}`}>
              &gt;
            </Link>
          )}
        </div>
        <div className="filters-right">
          <strong>Tema semanal:</strong> Paisajes espectaculares
        </div>
      </div>
      <StatusBlock state={state} />
      {state === 'empty' && (
        <Link className="btn outline" to="/app/photos/upload" style={{ marginTop: 16 }}>
          Subir primera foto
        </Link>
      )}
      {state === 'default' && (
        <section className="gallery-card">
          <h3 className="gallery-title">GALERIA DE FOTOS</h3>
          <div className="gallery-cards">
            {orderedPhotos.map((photo) => (
              <article className="photo-card" key={photo.id}>
                <Link className="photo-link" to={`/app/photos/${photo.id}`}>
                  <img src={photo.image} alt={photo.category} />
                </Link>
                <div className="photo-info">
                  <div className="photo-meta">
                    <div>{photo.user}</div>
                    <div>{photo.city}</div>
                    <div>{photo.category}</div>
                  </div>
                  <div className="photo-actions">
                    <div className="votes">❤ {photo.votes} votos</div>
                    <button className="btn">Votar</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
