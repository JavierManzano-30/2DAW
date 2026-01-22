import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext.jsx';

export function ProfileEdit() {
  const navigate = useNavigate();
  const { profile, setProfile } = useAuth();
  const [form, setForm] = useState({
    name: profile.name,
    bio: profile.bio,
    city: profile.city,
    category: profile.category,
  });
  const [photoPreview, setPhotoPreview] = useState(profile.avatar);
  const [status, setStatus] = useState('idle');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('saving');
    window.setTimeout(() => {
      setProfile({
        ...profile,
        name: form.name,
        bio: form.bio,
        city: form.city,
        category: form.category,
        avatar: photoPreview,
      });
      setStatus('success');
      navigate('/app/profile');
    }, 700);
  };

  return (
    <div className="split">
      <div className="card">
        <h2 className="section-title">Editar perfil</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="bio">Bio corta</label>
            <input
              id="bio"
              name="bio"
              type="text"
              value={form.bio}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="city">Ciudad</label>
            <input
              id="city"
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="category">Categoria favorita</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              <option>Retrato</option>
              <option>Urbano</option>
              <option>Naturaleza</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn" type="submit" disabled={status === 'saving'}>
              {status === 'saving' ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <Link className="btn outline" to="/app/profile">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
      <div className="card">
        <h3 className="card-title">Foto de perfil</h3>
        <img className="avatar-large" src={photoPreview} alt="Foto de perfil" />
        <div className="field">
          <label htmlFor="photo">Cambiar foto</label>
          <input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>
      </div>
    </div>
  );
}
