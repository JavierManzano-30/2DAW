import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.jsx';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle');
  const [credentials, setCredentials] = useState({ user: '', password: '' });

  const handleLogin = () => {
    setStatus('loading');
    window.setTimeout(() => {
      const isValid = credentials.user === 'javier' && credentials.password === '1234';
      if (!isValid) {
        setStatus('error');
        return;
      }
      login();
      navigate('/app/dashboard');
    }, 800);
  };

  return (
    <div className="auth-layout">
      <div className="card auth-card">
        <h2 className="card-title">Iniciar sesion</h2>
        <p className="card-subtle">Accede para ver las votaciones abiertas.</p>
        <form className="form">
          <div className="field">
            <label htmlFor="user">Usuario</label>
            <input
              id="user"
              type="text"
              placeholder="javier"
              value={credentials.user}
              onChange={(event) => setCredentials((prev) => ({ ...prev, user: event.target.value }))}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Contrasena</label>
            <input
              id="password"
              type="password"
              placeholder="1234"
              value={credentials.password}
              onChange={(event) =>
                setCredentials((prev) => ({ ...prev, password: event.target.value }))
              }
            />
          </div>
          <div className="field" style={{ flexDirection: 'row', gap: 8 }}>
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">Recuerdame</label>
          </div>
          <button className="btn" type="button" onClick={handleLogin} disabled={status === 'loading'}>
            {status === 'loading' ? 'Cargando...' : 'Login'}
          </button>
          <div className="helper">
            No tienes cuenta? <Link className="text-link" to="/register">Registrate</Link>
          </div>
        </form>
        {status === 'error' && (
          <div className="status error">
            Usuario o contrasena incorrectos. Prueba con javier / 1234.
          </div>
        )}
      </div>
    </div>
  );
}
