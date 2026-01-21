# Sprint 8 · Navegacion React

## Mapa de rutas (Figma → React)
| Ruta | Pantalla | Descripcion breve | Figma (imagen) |
| --- | --- | --- | --- |
| `/login` | Login | Acceso de usuarios con estados | `PC-Login.png`, `PC-LoginCargando.png`, `PC-LoginError.png` |
| `/register` | Registro | Alta de usuario con errores | `PC-Register.png`, `PC-RegisterError.png`, `PC-RegisterErrorCampos.png` |
| `/no-session` | Dashboard sin sesion | Estado sin autenticacion | `PC-DashboardSinsesion.png` |
| `/app/dashboard` | Dashboard | Vista principal con estados | `PC-Dashboard.png`, `PC-DashboardCargando.png`, `PC-DashboardVacio.png` |
| `/app/photos/:photoId` | Detalle foto | Votacion abierta | `PC-Detallefoto.png` |
| `/app/photos/:photoId/closed` | Detalle foto (cerrada) | Votacion cerrada | `PC-DetallefotoVotacionCerrada.png` |
| `/app/photos/upload` | Subir foto | Formulario de carga | `PC-Subirfoto.png` |
| `/app/photos/upload/success` | Foto subida | Confirmacion de exito | `PC-Fotosubida.png` |
| `/app/profile` | Perfil | Datos de usuario | `PC-Perfil.png` |
| `/app/profile/edit` | Editar perfil | Formulario de edicion | `PC-PerfilEditar.png` |
| `/unauthorized` | No autorizado | Estado 403 | n/a |
| `*` | 404 | Pagina no encontrada | n/a |

## Decisiones tecnicas
- React Router v6 con layouts publico y privado.
- Ruta privada protegida con contexto de autenticacion mock (`localStorage`).
- Estados de pantalla controlados con `?state=` (loading/error/empty/success).
- Imagenes de Figma servidas desde `public/img` para facilitar la referencia.

## Estados por pantalla
- Login: `default`, `loading`, `error`.
- Register: `default`, `error`, `fields`.
- Dashboard: `default`, `loading`, `empty`, `error`, `success`.

## Checklist de cobertura
- [x] Todas las pantallas del Figma tienen ruta y navegacion.
- [x] Layouts publico/privado y rutas protegidas.
- [x] Estados (loading/error/empty/success) en pantallas clave.
- [x] 404 y no autorizado.
