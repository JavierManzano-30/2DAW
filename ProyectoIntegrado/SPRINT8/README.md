# Sprint 8 · Navegacion React

SPA en React + Vite con navegacion completa basada en el prototipo de Figma. Incluye rutas, layouts publico/privado, pantallas mock y estados de carga/error/vacio/exito.

## Mapa de rutas (Figma → React)
| Ruta | Pantalla | Descripcion breve | Figma (imagen) |
| --- | --- | --- | --- |
| `/login` | Login | Acceso de usuarios con estados | `public/assets/figma/PC-Login.png`, `public/assets/figma/PC-LoginCargando.png`, `public/assets/figma/PC-LoginError.png` |
| `/register` | Registro | Alta de usuario con errores | `public/assets/figma/PC-Register.png`, `public/assets/figma/PC-RegisterError.png`, `public/assets/figma/PC-RegisterErrorCampos.png` |
| `/no-session` | Dashboard sin sesion | Estado sin autenticacion | `public/assets/figma/PC-DashboardSinsesion.png` |
| `/app/dashboard` | Dashboard | Vista principal con estados | `public/assets/figma/PC-Dashboard.png`, `public/assets/figma/PC-DashboardCargando.png`, `public/assets/figma/PC-DashboardVacio.png` |
| `/app/photos/:photoId` | Detalle foto | Votacion abierta | `public/assets/figma/PC-Detallefoto.png` |
| `/app/photos/:photoId/closed` | Detalle foto (cerrada) | Votacion cerrada | `public/assets/figma/PC-DetallefotoVotacionCerrada.png` |
| `/app/photos/upload` | Subir foto | Formulario de carga | `public/assets/figma/PC-Subirfoto.png` |
| `/app/photos/upload/success` | Foto subida | Confirmacion de exito | `public/assets/figma/PC-Fotosubida.png` |
| `/app/profile` | Perfil | Datos de usuario | `public/assets/figma/PC-Perfil.png` |
| `/app/profile/edit` | Editar perfil | Formulario de edicion | `public/assets/figma/PC-PerfilEditar.png` |
| `/unauthorized` | No autorizado | Estado 403 | n/a |
| `*` | 404 | Pagina no encontrada | n/a |

## Layouts y rutas protegidas
- Layout publico: login, registro y estado sin sesion.
- Layout privado: dashboard, galeria, detalle, subir foto y perfil.
- Proteccion mock con estado en memoria (`localStorage`) y credenciales de prueba.

## Estados por pantalla
- Login: `loading`, `error` (simulado).
- Register: `error`, `fields`.
- Dashboard: `loading`, `empty`, `error`, `success`.
- Otros estados: 404 y 403.

## Assets
- Mockups Figma: `public/assets/figma`.
- Fotos reales: `public/assets/photos`.
- Iconos/logos: `public/assets/icons`.

## Rutas de prueba rapidas
- `/login` (credenciales: `javier` / `1234`)
- `/register?state=error`
- `/app/dashboard?state=loading`
- `/app/dashboard?page=4`
- `/app/photos/02`
- `/app/photos/02/closed`

## Checklist de cobertura
- [x] Todas las pantallas del Figma tienen ruta y navegacion.
- [x] Layouts publico/privado y rutas protegidas.
- [x] Estados (loading/error/empty/success) en pantallas clave.
- [x] 404 y no autorizado.

Autor: Javier Manzano Oliveros
