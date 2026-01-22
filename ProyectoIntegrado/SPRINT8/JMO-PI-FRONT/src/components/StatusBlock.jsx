import React from 'react';

export function StatusBlock({ state }) {
  if (!state || state === 'default') {
    return null;
  }

  const labels = {
    loading: 'Cargando datos de la galería…',
    error: 'No se pudo cargar la información. Revisa tu conexión.',
    empty: 'Aún no hay contenido para mostrar. Sube tu primera foto.',
    success: 'Todo listo. La acción se completó correctamente.',
  };

  return <div className={`status ${state}`}>{labels[state]}</div>;
}
