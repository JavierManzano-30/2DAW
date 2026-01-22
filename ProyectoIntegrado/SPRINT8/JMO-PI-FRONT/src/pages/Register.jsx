import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { StateSwitcher } from '../components/StateSwitcher.jsx';

const STATE_OPTIONS = [
  { value: 'default', label: 'Normal' },
  { value: 'error', label: 'Error' },
  { value: 'fields', label: 'Campos' },
];

export function Register() {
  const [params] = useSearchParams();
  const state = params.get('state') || 'default';

  return (
    <div className="auth-layout">
      <div className="card auth-card">
        <h2 className="card-title">Registro</h2>
        <p className="card-subtle">Crea tu cuenta para participar en la galeria.</p>
        <form className="form">
          <div className="field">
            <label htmlFor="name">Nombre completo</label>
            <input id="name" type="text" placeholder="Alicia Romero" />
          </div>
          <div className="field">
            <label htmlFor="user">Usuario</label>
            <input id="user" type="text" placeholder="alicia88" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="alicia@mail.com" />
          </div>
          <div className="field">
            <label htmlFor="pass">Contrasena</label>
            <input id="pass" type="password" placeholder="********" />
          </div>
          <button className="btn" type="button">
            Crear cuenta
          </button>
          <div className="helper">
            Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
          </div>
        </form>
        <div style={{ marginTop: 18 }}>
          <StateSwitcher options={STATE_OPTIONS} current={state} />
          {state === 'error' && (
            <div className="status error">No se pudo registrar. Intenta de nuevo.</div>
          )}
          {state === 'fields' && (
            <div className="status error">Completa los campos obligatorios.</div>
          )}
        </div>
      </div>
    </div>
  );
}
