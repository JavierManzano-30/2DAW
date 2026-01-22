import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.jsx';

export function PrivateLayout() {
  const { user, profile, logout } = useAuth();
  const navClass = ({ isActive }) => (isActive ? 'active' : undefined);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner header-order">
          <span className="brand-logo-wrap">
            <img className="brand-logo" src="/favicon.svg" alt="SnapNation" />
          </span>
          <NavLink className={navClass} to="/app/dashboard">
            Inicio
          </NavLink>
          <NavLink className={navClass} to="/app/photos/01">
            Galeria
          </NavLink>
          <div className="brand-text header-brand">
            <span className="brand-snap">Snap</span>
            <span className="brand-nation">Nation</span>
          </div>
          <NavLink className={navClass} to="/unauthorized">
            Ganadores
          </NavLink>
          <NavLink className={navClass} to="/app/profile">
            Perfil
          </NavLink>
          <div className="header-user-block">
            <div className="header-user">
              <span className="helper">Hola, {user?.name}</span>
              <img className="avatar" src={profile.avatar} alt="Perfil" />
            </div>
            <button className="btn ghost" type="button" onClick={logout}>
              Cerrar sesion
            </button>
          </div>
        </div>
      </header>
      <main className="page">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-brand-top">
              <img className="footer-logo" src="/favicon.svg" alt="SnapNation" />
              <div className="brand-text">
                <span className="brand-snap">Snap</span>
                <span className="brand-nation">Nation</span>
              </div>
            </div>
            <div className="footer-brand-text">
              <div className="footer-note">
                La comunidad de fotografia donde tu creatividad compite semanalmente. Captura, comparte
                y gana.
              </div>
            </div>
            <div className="footer-social">
              <span className="social-icon">
                <img src="/assets/icons/instagram.svg" alt="Instagram" />
              </span>
              <span className="social-icon">
                <img src="/assets/icons/x.jpg" alt="X" />
              </span>
              <span className="social-icon">
                <img src="/assets/icons/facebook.png" alt="Facebook" />
              </span>
            </div>
          </div>
          <div className="footer-column">
            <strong>Comunidad</strong>
            <div className="footer-link">Explorar fotos</div>
            <div className="footer-link">Ganadores</div>
            <div className="footer-link">Temas semanales</div>
            <div className="footer-link">Reglas</div>
          </div>
          <div className="footer-column">
            <strong>Soporte</strong>
            <div className="footer-link">Centro de ayuda</div>
            <div className="footer-link">Terminos y condiciones</div>
            <div className="footer-link">Privacidad</div>
            <div className="footer-link">Contacto</div>
          </div>
        </div>
        <div className="footer-bottom">© 2026 SnapNation. Todos los derechos reservados.</div>
      </footer>
    </div>
  );
}
