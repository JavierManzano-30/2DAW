# Plan De Prueba Funcional

## Control Del Documento

| Campo | Valor |
|---|---|
| Proyecto | SnapNation |
| Repositorio analizado | `PROYECTOINTEGRADO` |
| Alcance revisado | `JMO-PI-BACK` y `JMO-PI-FRONT` |
| Tipo de documento | Plan de Pruebas Funcionales |
| Referencias | IEEE 829, ISTQB Foundation, análisis basado en código |
| Fecha base del análisis | 2026-04-07 |
| Estado | Listo para revisión QA / dirección técnica |

## 1. Introducción Y Propósito

Este documento define el Plan de Pruebas Funcionales del proyecto SnapNation, una plataforma web de fotografía competitiva compuesta por un backend Node.js/Express con PostgreSQL y un frontend SPA en React/Vite.

El propósito del documento es:

- establecer el alcance real de pruebas con base en lo implementado en código;
- identificar módulos, reglas de negocio, integraciones y riesgos técnicos;
- proponer una estrategia de validación funcional ejecutable;
- dejar un catálogo maestro ampliado de casos funcionales reutilizable en herramientas como Excel, TestRail, Xray o Jira.

El plan se ha construido tomando como fuente de verdad el código actual del proyecto, sus ficheros SQL, variables de entorno, OpenAPI, documentación técnica y pruebas automatizadas existentes. Cuando la documentación general del repositorio no coincide con la implementación real, prevalece el comportamiento detectado en código.

## 2. Fase 1. Análisis Previo

### 2.1 Inventario Del Proyecto

#### Backend

- `src/loaders`: inicialización de Express, CORS, JSON, Swagger, health, estáticos y manejo de errores.
- `src/routes`: exposición de endpoints REST versionados `/api/v1`.
- `src/controllers`: validaciones HTTP y lógica funcional.
- `src/models`: acceso a PostgreSQL; mezcla de SQL directo y Drizzle.
- `src/middleware`: autenticación JWT, control de rol y error handler.
- `src/services`: integración SMTP.
- `src/db`: pool PostgreSQL, esquema Drizzle y setup SQL.
- `src/utils`: JWT, upload, paginación, errores, async wrapper.
- `src/realtime`: Socket.IO con evento `photo:created`.

#### Frontend

- `src/App.jsx`: router principal y guards de sesión.
- `src/components/AuthContext.jsx`: bootstrap de sesión, login, registro, refresh, update profile y logout.
- `src/layouts`: layout público y privado.
- `src/pages`: pantallas funcionales de login, registro, dashboard, detalle, subida, perfil, edición, estados de error.
- `src/services`: cliente HTTP por dominio funcional.
- `src/lib`: cliente API, sesión y mappers de respuesta.
- `src/styles`: estilos globales.

#### Entidades Detectadas

- `communities`
- `categories`
- `users`
- `themes`
- `photos`
- `votes`
- `moderation`
- `winners`

#### Cobertura Funcional Real

- Implementado y consumido por UI: auth, users/profile, photos, votes, themes, communities, categories.
- Implementado solo backend: email de prueba, realtime, docs/openapi.
- Implementado en BD pero no expuesto funcionalmente: `moderation`, `winners`.
- Visible en UI como placeholder no funcional: comentarios, ganadores consumibles.

### 2.2 Stack Tecnológico

| Capa | Tecnología |
|---|---|
| Backend | Node.js, Express 4, ES Modules |
| Seguridad | JWT, `bcryptjs` |
| Base de datos | PostgreSQL 16, `pg`, Drizzle ORM |
| Upload | `multer`, filesystem local `uploads/` |
| Email | `nodemailer`, MailHog local |
| Realtime | Socket.IO |
| Contrato API | OpenAPI 3.0.3, Swagger UI |
| Frontend | React 18, React Router 6, Vite 5 |
| Persistencia cliente | `localStorage` |
| Calidad | Jest, Supertest, ESLint, SonarQube |
| Entorno | Docker Compose |

### 2.3 Puntos De Entrada

#### Backend REST

- `GET /health`
- `GET /api/v1/health`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/users/me`
- `PATCH /api/v1/users/me`
- `DELETE /api/v1/users/me`
- `DELETE /api/v1/users/:id`
- `GET /api/v1/photos`
- `POST /api/v1/photos`
- `GET /api/v1/photos/:id`
- `DELETE /api/v1/photos/:id`
- `GET /api/v1/themes`
- `POST /api/v1/themes`
- `GET /api/v1/themes/:id`
- `GET /api/v1/communities`
- `GET /api/v1/communities/:id`
- `GET /api/v1/categories`
- `POST /api/v1/votes`
- `DELETE /api/v1/votes`
- `POST /api/v1/email/test`
- `GET /docs`
- `GET /openapi.json`

#### Frontend

- `/login`
- `/register`
- `/no-session`
- `/app/dashboard`
- `/app/photos/:photoId`
- `/app/photos/:photoId/closed`
- `/app/photos/upload`
- `/app/photos/upload/success`
- `/app/profile`
- `/app/profile/edit`
- `/unauthorized`
- `*` -> `404`

#### Otros Entry Points

- WebSocket `photo:created`
- evento cliente `subscribe:community`
- script `npm run db:setup`
- PostgreSQL y MailHog vía Docker Compose

### 2.4 Reglas De Negocio Detectadas

#### Autenticación

- `username` válido: regex `[a-zA-Z0-9_]{3,50}`.
- `email` validado manualmente con reglas estrictas ASCII.
- `password` mínimo 8 caracteres en registro.
- normalización de email a minúsculas.
- comunidad opcional, pero si se informa debe existir.
- usuario duplicado por email o username devuelve `409 USER_EXISTS`.

#### Sesión Y Seguridad

- JWT firmado con `id`, `role`, `email`.
- middleware `authenticate` exige token.
- middleware `optionalAuth` no bloquea la petición si el token falta o es inválido.
- `requireRole('admin')` protege creación de tema y borrado administrativo.

#### Perfil

- `display_name` máximo 100.
- actualización rechazada si no hay cambios.
- avatar por multipart `avatar`.
- avatar por defecto en frontend si `avatar_url` es nulo.

#### Fotos

- título obligatorio entre 1 y 150.
- imagen obligatoria.
- formatos permitidos: `image/jpeg`, `image/jpg`, `image/png`.
- tamaño máximo por defecto: 5 MB.
- una sola foto activa por usuario y tema.
- tema debe existir y estar activo.
- categoría opcional, pero si se informa debe existir.
- borrado lógico mediante `is_deleted = true`.

#### Votos

- un usuario no puede votar la misma foto dos veces.
- voto solo sobre foto existente y no borrada.
- retirada de voto solo si el voto existe.

#### Temas

- alta solo por admin.
- `title`, `start_date`, `end_date` obligatorios.
- comunidad opcional, pero si se informa debe existir.
- existe riesgo funcional: no se valida orden lógico de fechas.
- existe riesgo funcional: `Boolean(is_active)` puede interpretar `"false"` como `true`.

#### Dashboard Y Navegación

- sesión requerida para todo `/app`.
- bootstrap de sesión con `/users/me`.
- dashboard con filtros por comunidad, categoría, orden y paginación.
- tema semanal obtenido vía `GET /themes?is_active=true&limit=1`.

### 2.5 Integraciones Externas

- PostgreSQL.
- MailHog / SMTP local.
- Socket.IO.
- almacenamiento local `uploads/`.
- Swagger/OpenAPI.
- Docker Compose para infraestructura.

### 2.6 Riesgos Técnicos Detectados

| Riesgo | Impacto |
|---|---|
| README raíz menciona Cloudinary, moderación y ganadores, pero no están implementados funcionalmente | Alto |
| OpenAPI no refleja todos los endpoints reales ni todos los contratos | Alto |
| `createTheme` no valida `start_date <= end_date` | Alto |
| `createTheme` convierte `is_active` con `Boolean()` | Alto |
| enlace de admin a `Ganadores` conduce a `403` | Alto |
| vistas de comentarios y ganadores son placeholders | Alto |
| endpoint `/email/test` no requiere autenticación | Medio-Alto |
| uploads locales y efímeros en despliegues con contenedor | Medio-Alto |
| no hay suite automática frontend | Alto |
| `.env` operativo con secretos y token de Sonar detectado en entorno local | Medio-Alto |

## 3. Alcance De Las Pruebas

### 3.1 En Scope

- autenticación y sesión;
- control de acceso y roles;
- perfil, edición de nombre y avatar;
- dashboard, galería, filtros, ordenación y paginación;
- detalle de foto;
- subida de foto y borrado lógico;
- votación y retirada de voto;
- gestión de temas;
- catálogos de comunidades y categorías;
- endpoint de email de prueba;
- health, Swagger, OpenAPI y estáticos;
- evento realtime `photo:created`;
- navegación, páginas de error y layouts.

### 3.2 Fuera De Scope

- moderación funcional end-to-end;
- cálculo y publicación de ganadores reales;
- comentarios persistentes;
- swipe móvil;
- listado de fotos votadas por el usuario;
- pruebas de carga, rendimiento y estrés;
- pruebas de seguridad ofensiva y hardening;
- accesibilidad y SEO;
- comportamiento interno de dependencias de terceros.

### 3.3 Niveles De Prueba Aplicables

- unitarias de apoyo técnico ya existentes en backend;
- integración API-DB, API-SMTP, API-filesystem, frontend-backend;
- sistema / end-to-end;
- aceptación funcional con foco en usuario y admin.

## 4. Objetivos De Calidad

- validar que los flujos nucleares del producto funcionan de punta a punta;
- garantizar que las reglas de negocio críticas se cumplen;
- asegurar contratos de error y permisos coherentes;
- reducir riesgo de regresión en despliegues;
- identificar defectos latentes documentados pero no cubiertos por automatización.

### 4.1 Métricas De Éxito Propuestas

- 100% de casos críticos y altos diseñados y ejecutados.
- al menos 95% del total de casos planificados ejecutados.
- 0 defectos de severidad crítica abiertos al cierre.
- 0 defectos de severidad alta sin plan formal aceptado.
- smoke de despliegue 100% verde.
- cobertura automática backend no inferior al 80% de líneas, alineada con `jest.config.js`.

## 5. Estrategia De Pruebas

### 5.1 Tipos De Prueba

- funcionales de caja negra;
- flujos de usuario end-to-end;
- validación de entradas y datos límite;
- reglas de negocio;
- autorización y control de acceso;
- integración con PostgreSQL, MailHog, uploads y Socket.IO;
- regresión;
- smoke tests por despliegue.

### 5.2 Técnicas De Diseño

- partición de equivalencia;
- análisis de valores límite;
- tablas de decisión;
- transición de estados;
- diseño basado en riesgo;
- exploratorio guiado en áreas ambiguas o placeholders.

### 5.3 Priorización Por Riesgo

#### Crítico

- auth y sesión;
- subida de fotos;
- voto / retirada;
- permisos y roles;
- integridad tema activo;
- consistencia de usuario/perfil.

#### Alto

- dashboard y listados;
- detalle de foto;
- creación de temas;
- contrato OpenAPI visible a cliente;
- navegación funcional.

#### Medio

- email de prueba;
- realtime;
- páginas de error;
- catálogos.

## 6. Módulos Y Áreas A Probar

| Módulo | Funcionalidades incluidas | Riesgo | Tipos de prueba | Dependencias |
|---|---|---|---|---|
| Auth y sesión | Registro, login, JWT, bootstrap sesión, logout, guardias | Crítico | API, UI, E2E | DB, JWT, localStorage |
| Usuarios y perfil | Consulta `/users/me`, edición nombre/avatar, borrados | Alto | API, UI, integración | Auth, upload, DB |
| Dashboard/Galería | Listado, filtros, orden, paginación, voto rápido | Alto | UI, API, E2E | Photos, Votes, Themes |
| Fotos | Subida, detalle, borrado lógico, exposición `/uploads` | Crítico | API, UI, integración | Auth, Themes, filesystem |
| Votos | Alta y baja de voto, sincronización visual | Crítico | API, UI, E2E | Auth, Photos, DB |
| Temas | Alta admin, listados, filtros, uso en dashboard/upload | Alto | API, integración | Communities, Auth |
| Comunidades y categorías | Catálogos y carga en combos/filtros | Medio | API, UI | DB |
| Email | Validación y envío SMTP | Medio-Alto | API, integración | MailHog |
| Docs, health y realtime | Swagger, OpenAPI, health, Socket.IO | Medio | API, smoke, integración | YAML, Socket.IO |
| Navegación y estados | Layout público/privado, `403`, `404`, `no-session` | Medio | UI, sistema | Router, Auth |

## 7. Criterios De Entrada Y Salida

### 7.1 Entrada

- build estable del backend y frontend;
- entorno de pruebas accesible;
- base de datos inicializada;
- MailHog operativo;
- datos maestros cargados;
- usuarios de prueba preparados;
- requisitos revisados y baseline funcional congelada.

### 7.2 Salida

- 100% de casos críticos y altos ejecutados;
- al menos 95% del total ejecutado;
- 0 defectos críticos abiertos;
- defectos altos con resolución o aceptación formal;
- smoke final aprobado;
- informe de cierre QA emitido.

## 8. Entorno De Pruebas

### 8.1 Entorno Requerido

- Backend en `http://localhost:3000`
- Frontend en `http://localhost:5173`
- PostgreSQL en `localhost:5433`
- MailHog SMTP `localhost:1025`
- MailHog UI `http://localhost:8025`
- Swagger `http://localhost:3000/docs`
- OpenAPI JSON `http://localhost:3000/openapi.json`

### 8.2 Datos De Prueba Recomendados

- 1 usuario estándar sin comunidad.
- 1 usuario estándar con comunidad.
- 1 usuario administrador.
- 1 tema activo.
- 1 tema inactivo.
- 1 comunidad válida y 1 id inexistente.
- varias categorías válidas.
- 1 foto activa por usuario.
- 1 foto borrada lógicamente.
- 1 voto existente.
- ficheros JPG, JPEG, PNG válidos.
- fichero no imagen.
- fichero >5 MB.

### 8.3 Herramientas Recomendadas

- Postman o Insomnia.
- Swagger UI.
- navegador con DevTools.
- cliente WebSocket / consola navegador.
- pgAdmin o DBeaver.
- Jira/Xray/TestRail/Excel para ejecución.

## 9. Roles Y Responsabilidades

| Rol | Responsabilidades |
|---|---|
| QA Lead | Planificación, estrategia, priorización, reporting, cierre |
| QA Tester | Diseño, ejecución, evidencia, defectos, regresión |
| Desarrollador | Soporte técnico, fixes, aclaración de reglas, datos |
| Product Owner / Cliente | Validación de aceptación y defectos diferibles |
| Soporte / DevOps | Disponibilidad de entornos y servicios |

## 10. Estimación De Esfuerzo

### 10.1 Estimación Global

| Fase | Esfuerzo estimado |
|---|---|
| Preparación de entorno y datos | 1 día |
| Diseño y revisión de casos | 4 días |
| Ejecución ciclo principal | 6 días |
| Retest y regresión | 2 días |
| Cierre e informe final | 1 día |
| Total estimado | 14 QA-días |

### 10.2 Estimación De Casos Por Módulo

| Módulo | Casos estimados |
|---|---:|
| Auth y sesión | 40 |
| Usuarios y perfil | 34 |
| Referenciales (comunidades/categorías) | 18 |
| Temas | 28 |
| Dashboard / galería | 44 |
| Fotos / upload / borrado | 52 |
| Detalle y vista cerrada | 24 |
| Votos | 26 |
| Email / health / docs / realtime | 25 |
| Navegación y estados | 20 |
| Total | 311 |

## 11. Gestión De Defectos

### 11.1 Severidad

- Crítica: impide operar el sistema o rompe flujo troncal.
- Alta: afecta seriamente un flujo principal sin workaround razonable.
- Media: degradación funcional parcial con workaround.
- Baja: impacto menor, cosmético o texto.

### 11.2 Prioridad

- P1 inmediata.
- P2 antes de cierre.
- P3 planificable.
- P4 backlog.

### 11.3 Ciclo De Vida

- Nuevo
- Triado
- Asignado
- En progreso
- Ready for QA
- Cerrado
- Reabierto
- Diferido

### 11.4 Métricas De Seguimiento

- abiertos/cerrados por severidad;
- aging de defectos;
- tasa de reapertura;
- densidad de defectos por módulo;
- defectos escapados;
- lead time de resolución.

## 12. Riesgos Del Plan Y Mitigaciones

| Riesgo | Efecto | Mitigación |
|---|---|---|
| Documentación general desalineada con el código | Cobertura errónea | Baseline basada en código real |
| OpenAPI incompleta | Contrato funcional parcial | Mantener matriz paralela de endpoints reales |
| Falta de tests frontend | Regresiones UI no detectadas | Regresión manual obligatoria por build |
| Endpoint de email anónimo | Riesgo de uso indebido | Casos específicos y recomendación de hardening |
| Uploads locales | Volatilidad en despliegue | Pruebas en entorno controlado y limitación documentada |
| Placeholders visibles a usuario | Rechazo en UAT | Declarar fuera de scope y probar comportamiento actual |
| Validaciones débiles en temas | Defectos de negocio | Casos negativos de alta prioridad |
| Dependencia de DB/MailHog | Bloqueos de ejecución | Checklist técnico previo al ciclo |

## 13. Métricas E Indicadores De Seguimiento

- porcentaje de casos diseñados vs planificados;
- porcentaje de casos ejecutados vs diseñados;
- porcentaje de casos pasados/fallados/bloqueados;
- cobertura de casos críticos;
- defectos por módulo;
- defectos por severidad;
- tendencia diaria del ciclo;
- tasa de retest exitoso;
- defectos abiertos al cierre.

## 14. Listado Inicial De Áreas De Prueba Por Módulo

| Área de prueba | Tipo | Prioridad | Riesgo | Técnica de diseño |
|---|---|---|---|---|
| Registro de usuario | API/UI | Alta | Crítico | Equivalencia + límites |
| Login y persistencia de sesión | API/UI/E2E | Alta | Crítico | Estados + decisión |
| Control de acceso y roles | API/UI | Alta | Crítico | Tabla de decisión |
| Perfil y edición de avatar | API/UI | Alta | Alto | Límites + equivalencia |
| Dashboard y filtros | UI/API | Alta | Alto | Equivalencia |
| Paginación y ordenación | UI/API | Media | Alto | Valores límite |
| Subida de foto | API/UI/E2E | Alta | Crítico | Flujo principal + negativos |
| Borrado lógico de foto | API | Alta | Crítico | Estados |
| Detalle de foto | UI/API | Alta | Alto | Equivalencia |
| Votación y retirada | API/UI/E2E | Alta | Crítico | Decisión + estados |
| Temas | API | Alta | Alto | Negativos + límites |
| Comunidades y categorías | API/UI | Media | Medio | Integración |
| Email de prueba | API/Integración | Media | Medio-Alto | Equivalencia |
| Health, OpenAPI y Swagger | API/Smoke | Media | Medio | Smoke |
| Realtime `photo:created` | Integración | Media | Medio | Integración |
| Navegación `403/404/no-session` | UI | Media | Medio | Navegación |

## 15. Catálogo Maestro De Casos Funcionales

### 15.1 Auth Y Sesión (40)

| ID | Caso funcional | Prioridad | Resultado esperado |
|---|---|---|---|
| AUTH-001 | Registrar usuario válido sin comunidad | Alta | Alta `201`, token devuelto, usuario creado |
| AUTH-002 | Registrar usuario válido con comunidad existente | Alta | Alta `201`, usuario asociado a comunidad |
| AUTH-003 | Registrar username de longitud mínima 3 | Media | Registro permitido |
| AUTH-004 | Registrar username de longitud máxima 50 | Media | Registro permitido |
| AUTH-005 | Registrar username con guion bajo | Media | Registro permitido |
| AUTH-006 | Rechazar username menor a 3 | Alta | `400 VALIDATION_ERROR` |
| AUTH-007 | Rechazar username mayor a 50 | Alta | `400 VALIDATION_ERROR` |
| AUTH-008 | Rechazar username con espacios | Alta | `400 VALIDATION_ERROR` |
| AUTH-009 | Rechazar username con caracteres especiales no permitidos | Alta | `400 VALIDATION_ERROR` |
| AUTH-010 | Normalizar email a minúsculas en registro | Alta | Usuario persistido con email lower-case |
| AUTH-011 | Rechazar email sin `@` | Alta | `400 VALIDATION_ERROR` |
| AUTH-012 | Rechazar email con espacios | Alta | `400 VALIDATION_ERROR` |
| AUTH-013 | Rechazar email con múltiples `@` | Alta | `400 VALIDATION_ERROR` |
| AUTH-014 | Rechazar email con caracteres Unicode | Alta | `400 VALIDATION_ERROR` |
| AUTH-015 | Rechazar email con local-part > 64 caracteres | Media | `400 VALIDATION_ERROR` |
| AUTH-016 | Rechazar email sin TLD válido | Media | `400 VALIDATION_ERROR` |
| AUTH-017 | Aceptar password de longitud 8 | Media | Registro permitido |
| AUTH-018 | Rechazar password menor a 8 | Alta | `400 VALIDATION_ERROR` |
| AUTH-019 | Rechazar `community_id` no numérico | Alta | `400 VALIDATION_ERROR` |
| AUTH-020 | Rechazar `community_id` inexistente | Alta | `400 VALIDATION_ERROR` |
| AUTH-021 | Rechazar email duplicado | Alta | `409 USER_EXISTS` |
| AUTH-022 | Rechazar username duplicado | Alta | `409 USER_EXISTS` |
| AUTH-023 | Verificar payload de respuesta de registro | Media | Incluye `token` y `user` |
| AUTH-024 | Verificar rol por defecto en registro | Media | Rol `user` |
| AUTH-025 | Login válido con email exacto | Alta | `200`, token y user devueltos |
| AUTH-026 | Login válido con email en mayúsculas/minúsculas mixtas | Alta | Login correcto por normalización |
| AUTH-027 | Rechazar login con email inválido | Alta | `400 VALIDATION_ERROR` |
| AUTH-028 | Rechazar login sin password | Alta | `400 VALIDATION_ERROR` |
| AUTH-029 | Rechazar login con password incorrecto | Alta | `401 AUTH_REQUIRED` |
| AUTH-030 | Rechazar login con email inexistente | Alta | `401 AUTH_REQUIRED` |
| AUTH-031 | Acceso a ruta protegida sin token | Alta | `401 AUTH_REQUIRED` |
| AUTH-032 | Acceso a ruta protegida con header `Authorization` mal formado | Alta | `401 AUTH_REQUIRED` |
| AUTH-033 | Acceso con JWT inválido | Alta | `401 AUTH_REQUIRED` |
| AUTH-034 | `GET /photos/:id` sin token por API | Media | Respuesta correcta si la foto existe |
| AUTH-035 | `GET /photos/:id` con token inválido y optional auth | Media | Respuesta correcta, sin bloqueo |
| AUTH-036 | Restaurar sesión frontend con token almacenado válido | Alta | Usuario cargado y sesión persistida |
| AUTH-037 | Restaurar sesión frontend con token inválido | Alta | Sesión limpiada y redirección funcional |
| AUTH-038 | Logout desde layout privado | Alta | Token y sesión eliminados |
| AUTH-039 | Acceso directo a `/app/dashboard` sin sesión | Alta | Redirección a `/no-session` |
| AUTH-040 | Visualización de estado `Restaurando sesion...` durante bootstrap | Baja | Mensaje visible mientras se resuelve el bootstrap |

### 15.2 Usuarios Y Perfil (34)

| ID | Caso funcional | Prioridad | Resultado esperado |
|---|---|---|---|
| USER-001 | Consultar `/users/me` con token válido | Alta | Perfil devuelto correctamente |
| USER-002 | Consultar `/users/me` de usuario inexistente | Media | `404 USER_NOT_FOUND` |
| USER-003 | Actualizar `display_name` válido | Alta | `200` y dato actualizado |
| USER-004 | Actualizar `display_name` vacío | Media | Actualización aceptada; frontend cae a username |
| USER-005 | Actualizar `display_name` de longitud 100 | Media | Actualización permitida |
| USER-006 | Rechazar `display_name` > 100 | Alta | `400 VALIDATION_ERROR` |
| USER-007 | Rechazar `display_name` con tipo inválido | Alta | `400 VALIDATION_ERROR` |
| USER-008 | Subir avatar `jpeg` válido | Alta | `200`, avatar_url actualizado |
| USER-009 | Subir avatar `png` válido | Alta | `200`, avatar_url actualizado |
| USER-010 | Subir avatar `jpg` válido | Alta | `200`, avatar_url actualizado |
| USER-011 | Rechazar avatar con mime no permitido | Alta | `400 VALIDATION_ERROR` |
| USER-012 | Rechazar actualización sin cambios | Alta | `400 VALIDATION_ERROR` |
| USER-013 | Actualizar solo avatar | Media | Cambio persistido |
| USER-014 | Actualizar solo `display_name` | Media | Cambio persistido |
| USER-015 | Actualizar nombre y avatar en misma petición | Media | Ambos cambios persistidos |
| USER-016 | Persistencia del perfil actualizado en `AuthContext` | Alta | UI refleja cambios sin relogin |
| USER-017 | Reflejo del nuevo perfil al volver a `/app/profile` | Media | Datos visibles actualizados |
| USER-018 | Vista previa local de avatar en pantalla de edición | Baja | Imagen local cambia antes de guardar |
| USER-019 | Avatar fallback cuando `avatar_url` no existe | Media | Se muestra imagen por defecto |
| USER-020 | Visualización de nombre visible, usuario, email y rol | Media | Datos renderizados correctamente |
| USER-021 | Cálculo de fotos subidas en perfil | Media | Total coincide con API |
| USER-022 | Cálculo de votos recibidos en perfil | Media | Sumatorio correcto |
| USER-023 | Perfil con usuario sin fotos | Baja | Estadísticas `0 / 0` |
| USER-024 | Error de servicio al cargar estadísticas | Baja | UI no rompe y muestra `0 / 0` |
| USER-025 | Borrado de usuario autenticado | Alta | `204`, usuario eliminado |
| USER-026 | Borrado propio cuando el usuario ya no existe | Media | `404 USER_NOT_FOUND` |
| USER-027 | Borrado de usuario por id como admin | Alta | `204`, usuario eliminado |
| USER-028 | Borrado admin con id inválido | Alta | `400 VALIDATION_ERROR` |
| USER-029 | Borrado admin de usuario inexistente | Media | `404 USER_NOT_FOUND` |
| USER-030 | Borrado admin por usuario no admin | Alta | `403 FORBIDDEN` |
| USER-031 | Borrado admin sin token | Alta | `401 AUTH_REQUIRED` |
| USER-032 | Render del nombre visible en cabecera privada | Media | Se muestra nombre correcto |
| USER-033 | Render del avatar en cabecera privada | Baja | Avatar correcto o fallback |
| USER-034 | Cancelar edición de perfil sin guardar | Baja | Regresa a perfil sin cambios persistidos |

### 15.3 Comunidades Y Categorías (18)

| ID | Caso funcional | Prioridad | Resultado esperado |
|---|---|---|---|
| REF-001 | Listar comunidades con paginación por defecto | Media | Respuesta con `data` y `meta` |
| REF-002 | Listar comunidades con `page` y `limit` explícitos | Media | Respuesta paginada correcta |
| REF-003 | Rechazar `page` inválido en comunidades | Media | `400 VALIDATION_ERROR` |
| REF-004 | Rechazar `limit` inválido en comunidades | Media | `400 VALIDATION_ERROR` |
| REF-005 | Obtener comunidad existente por id | Media | `200` con comunidad |
| REF-006 | Rechazar id inválido de comunidad | Media | `400 VALIDATION_ERROR` |
| REF-007 | Rechazar comunidad inexistente | Media | `404 COMMUNITY_NOT_FOUND` |
| REF-008 | Listar categorías ordenadas por nombre | Media | Respuesta estable y ordenada |
| REF-009 | Consumir categorías en filtro del dashboard | Media | Select poblado correctamente |
| REF-010 | Consumir categorías en formulario de upload | Media | Select poblado correctamente |
| REF-011 | Consumir comunidades en formulario de registro | Media | Select poblado correctamente |
| REF-012 | Error al cargar comunidades en registro | Baja | Pantalla usable sin crash |
| REF-013 | Error al cargar comunidades en dashboard | Baja | Dashboard usable sin crash |
| REF-014 | Error al cargar categorías en dashboard | Baja | Dashboard usable sin crash |
| REF-015 | Error al cargar categorías en upload | Baja | Upload usable sin crash |
| REF-016 | Verificar estructura `data/meta` en comunidades | Baja | Contrato correcto |
| REF-017 | Verificar estructura `data` en categorías | Baja | Contrato correcto |
| REF-018 | Catálogos con lista vacía | Baja | Frontend mantiene selects funcionales |

### 15.4 Temas (28)

| ID | Caso funcional | Prioridad | Resultado esperado |
|---|---|---|---|
| THEME-001 | Listar temas sin filtros | Media | Respuesta con `data` y `meta` |
| THEME-002 | Filtrar temas activos `is_active=true` | Media | Solo temas activos |
| THEME-003 | Filtrar temas inactivos `is_active=false` | Media | Solo temas inactivos |
| THEME-004 | Filtrar temas por comunidad válida | Media | Solo temas de la comunidad |
| THEME-005 | Rechazar `community_id` inválido en listado | Media | `400 VALIDATION_ERROR` |
| THEME-006 | Rechazar `page` inválido en listado | Media | `400 VALIDATION_ERROR` |
| THEME-007 | Rechazar `limit` inválido en listado | Media | `400 VALIDATION_ERROR` |
| THEME-008 | Orden por `created_at DESC` en listado | Baja | Orden correcto |
| THEME-009 | Obtener tema existente por id | Media | `200` con tema |
| THEME-010 | Rechazar id inválido de tema | Media | `400 VALIDATION_ERROR` |
| THEME-011 | Rechazar tema inexistente | Media | `404 THEME_NOT_FOUND` |
| THEME-012 | Crear tema como admin con comunidad válida | Alta | `201`, tema creado |
| THEME-013 | Crear tema como admin sin comunidad | Alta | `201`, tema creado |
| THEME-014 | Crear tema como usuario no admin | Alta | `403 FORBIDDEN` |
| THEME-015 | Crear tema sin autenticación | Alta | `401 AUTH_REQUIRED` |
| THEME-016 | Rechazar título vacío | Alta | `400 VALIDATION_ERROR` |
| THEME-017 | Rechazar título > 150 | Alta | `400 VALIDATION_ERROR` |
| THEME-018 | Rechazar ausencia de `start_date` | Alta | `400 VALIDATION_ERROR` |
| THEME-019 | Rechazar ausencia de `end_date` | Alta | `400 VALIDATION_ERROR` |
| THEME-020 | Rechazar `community_id` no numérico | Alta | `400 VALIDATION_ERROR` |
| THEME-021 | Rechazar `community_id` inexistente | Alta | `400 VALIDATION_ERROR` |
| THEME-022 | Crear tema con `is_active=true` booleano | Media | Persistido como activo |
| THEME-023 | Crear tema con `is_active=false` booleano | Alta | Persistido como inactivo |
| THEME-024 | Crear tema con `is_active="false"` string | Alta | Resultado esperado de negocio: inactivo; si no, abrir defecto |
| THEME-025 | Crear tema con `start_date > end_date` | Alta | Resultado esperado de negocio: rechazo; si no, abrir defecto |
| THEME-026 | Crear tema con misma fecha inicio/fin | Media | Comportamiento validado según negocio |
| THEME-027 | Mostrar tema activo en dashboard | Media | Se ve el título correcto |
| THEME-028 | Fallback de dashboard sin tema activo | Baja | Se muestra `Sin tema activo` |

### 15.5 Dashboard Y Galería (44)

| ID | Caso funcional | Prioridad | Resultado esperado |
|---|---|---|---|
| DASH-001 | Cargar dashboard con fotos disponibles | Alta | Estado `default` y tarjetas visibles |
| DASH-002 | Cargar dashboard sin fotos | Media | Estado `empty` y CTA de subida |
| DASH-003 | Cargar dashboard con error de API | Alta | Estado `error` con mensaje |
| DASH-004 | Filtrar por comunidad | Alta | Lista restringida a la comunidad |
| DASH-005 | Limpiar filtro de comunidad | Media | Lista vuelve al conjunto sin filtro |
| DASH-006 | Filtrar por categoría | Alta | Lista restringida a la categoría |
| DASH-007 | Limpiar filtro de categoría | Media | Lista vuelve al conjunto sin filtro |
| DASH-008 | Ordenar por más recientes | Media | Orden descendente por fecha |
| DASH-009 | Ordenar por más votadas | Media | Orden descendente por votos |
| DASH-010 | Ordenar por menos votadas | Media | Orden ascendente por votos |
| DASH-011 | Parametrizar `sort` inválido en URL | Alta | API error visible en UI |
| DASH-012 | Parametrizar `community_id` inválido en URL | Alta | API error visible en UI |
| DASH-013 | Parametrizar `category_id` inválido en URL | Alta | API error visible en UI |
| DASH-014 | Página 1 sin flecha previa operativa | Baja | Flecha previa deshabilitada |
| DASH-015 | Página >1 con flecha previa | Baja | Flecha previa visible y funcional |
| DASH-016 | Última página sin flecha siguiente | Baja | No se muestra siguiente |
| DASH-017 | Navegar a página siguiente | Media | `page` incrementa y la lista cambia |
| DASH-018 | Navegar a página anterior | Media | `page` decrementa y la lista cambia |
| DASH-019 | Verificar límite visual de 9 resultados por página | Media | Máximo 9 tarjetas por carga |
| DASH-020 | Mostrar imagen en cada tarjeta | Baja | Imagen visible |
| DASH-021 | Mostrar nombre visible en tarjeta | Baja | `displayName` correcto |
| DASH-022 | Mostrar comunidad o fallback `Sin comunidad` | Baja | Texto correcto |
| DASH-023 | Mostrar categoría o fallback `Sin categoria` | Baja | Texto correcto |
| DASH-024 | Mostrar contador de votos en tarjeta | Media | Contador correcto |
| DASH-025 | Navegar a detalle pulsando imagen | Alta | Abre `/app/photos/:id` |
| DASH-026 | Votar desde tarjeta | Alta | Voto registrado y lista recargada |
| DASH-027 | Gestión de error al votar desde tarjeta | Alta | Mensaje de error visible |
| DASH-028 | Botón `Votar` deshabilitado durante petición | Media | Previene doble acción |
| DASH-029 | Preservar filtros al paginar | Media | La query conserva filtros activos |
| DASH-030 | Reiniciar página a 1 al cambiar filtro de comunidad | Media | `page=1` |
| DASH-031 | Reiniciar página a 1 al cambiar filtro de categoría | Media | `page=1` |
| DASH-032 | Reiniciar página a 1 al cambiar orden | Media | `page=1` |
| DASH-033 | Mostrar select de comunidades con datos reales | Baja | Opciones correctas |
| DASH-034 | Mostrar select de categorías con datos reales | Baja | Opciones correctas |
| DASH-035 | Mostrar select de orden con tres opciones | Baja | Opciones correctas |
| DASH-036 | Fallback si falla servicio de comunidades | Baja | Sin crash |
| DASH-037 | Fallback si falla servicio de categorías | Baja | Sin crash |
| DASH-038 | Fallback si falla servicio de temas | Baja | Se mantiene `Sin tema activo` |
| DASH-039 | Excluir fotos borradas lógicamente del listado | Alta | No aparecen en galería |
| DASH-040 | Hidratar controles desde query string existente | Media | Selects muestran valores de URL |
| DASH-041 | Mantener estado de orden tras refresco con URL | Baja | Control conserva valor |
| DASH-042 | Mensaje de error genérico ante fallo no controlado | Baja | Mensaje estándar visible |
| DASH-043 | Estado vacío ofrece enlace a subida | Baja | CTA visible y navegable |
| DASH-044 | Texto alternativo de imagen basado en título/categoría | Baja | `alt` consistente |

### 15.6 Fotos, Upload Y Borrado (52)

| ID | Caso funcional | Prioridad | Resultado esperado |
|---|---|---|---|
| PHOTO-001 | Cargar temas activos en formulario de upload | Media | Select poblado |
| PHOTO-002 | Cargar categorías en formulario de upload | Media | Select poblado |
| PHOTO-003 | Mostrar vista previa por defecto antes de seleccionar fichero | Baja | Imagen placeholder visible |
| PHOTO-004 | Cambiar vista previa al seleccionar fichero | Baja | Imagen local actualizada |
| PHOTO-005 | Subir foto válida en PNG | Alta | `201`, navegación a éxito |
| PHOTO-006 | Subir foto válida en JPEG | Alta | `201`, navegación a éxito |
| PHOTO-007 | Subir foto válida en JPG | Alta | `201`, navegación a éxito |
| PHOTO-008 | Intentar enviar sin fichero seleccionado | Alta | Error cliente `Debes seleccionar una imagen` |
| PHOTO-009 | Enviar sin título | Alta | Bloqueo por required o `400` backend |
| PHOTO-010 | Enviar título de 150 caracteres | Media | Alta correcta |
| PHOTO-011 | Enviar título de 151 caracteres | Alta | Rechazo funcional |
| PHOTO-012 | Enviar descripción vacía | Media | Alta correcta |
| PHOTO-013 | Enviar sin categoría | Media | Alta correcta |
| PHOTO-014 | Enviar con categoría válida | Media | Alta correcta |
| PHOTO-015 | Enviar con tema activo seleccionado | Alta | Alta correcta |
| PHOTO-016 | Formulario sin temas activos disponibles | Alta | No debe romper; usuario no puede completar flujo válidamente |
| PHOTO-017 | Rechazar `theme_id` inválido | Alta | `400 VALIDATION_ERROR` |
| PHOTO-018 | Rechazar tema inexistente | Alta | `404 THEME_NOT_FOUND` |
| PHOTO-019 | Rechazar tema inactivo | Alta | `400 THEME_INACTIVE` |
| PHOTO-020 | Rechazar `category_id` inválido | Alta | `400 VALIDATION_ERROR` |
| PHOTO-021 | Rechazar categoría inexistente | Alta | `400 VALIDATION_ERROR` |
| PHOTO-022 | Rechazar duplicado de foto activa por usuario y tema | Alta | `409 PHOTO_ALREADY_SUBMITTED` |
| PHOTO-023 | Rechazar fichero de texto u otro mime no permitido | Alta | `400 VALIDATION_ERROR` |
| PHOTO-024 | Rechazar imagen superior al tamaño máximo | Alta | `413 PAYLOAD_TOO_LARGE` |
| PHOTO-025 | Rechazar petición multipart sin `image` | Alta | `400 VALIDATION_ERROR` |
| PHOTO-026 | Verificar estructura de respuesta de alta | Media | Incluye ids y urls |
| PHOTO-027 | Pantalla de éxito tras upload | Media | Mensaje de éxito visible |
| PHOTO-028 | Navegar de éxito a dashboard | Baja | Enlace funcional |
| PHOTO-029 | Navegar de éxito a nueva subida | Baja | Enlace funcional |
| PHOTO-030 | Cancelar upload y volver al dashboard | Baja | Enlace funcional |
| PHOTO-031 | Permitir subir segunda foto en tema distinto | Alta | Alta correcta |
| PHOTO-032 | Permitir subir nueva foto en mismo tema tras borrar la anterior | Alta | Alta correcta por unicidad parcial |
| PHOTO-033 | Alta con título mínimo de 1 carácter | Media | Aceptada |
| PHOTO-034 | Alta con descripción larga dentro del límite funcional esperado | Media | Aceptada |
| PHOTO-035 | Alta con descripción > 2000 caracteres | Alta | Resultado esperado de negocio: rechazo controlado; si falla en DB sin control, abrir defecto |
| PHOTO-036 | Verificar que el nombre guardado no conserva el nombre original | Media | Nombre randomizado |
| PHOTO-037 | Verificar que `image_url` expone `/uploads/` | Media | URL correcta |
| PHOTO-038 | Verificar que la comunidad de la foto se hereda del tema | Alta | `community_id` coherente |
| PHOTO-039 | Verificar que `thumb_url` usa la misma URL en la implementación actual | Baja | Valor esperado |
| PHOTO-040 | Emitir evento `photo:created` tras crear foto | Media | Evento emitido |
| PHOTO-041 | Subida sin autenticación | Alta | `401 AUTH_REQUIRED` |
| PHOTO-042 | Subida con campos extra dentro de límites | Baja | Flujo aceptado |
| PHOTO-043 | Subida con demasiados campos multipart | Media | Rechazo controlado |
| PHOTO-044 | Subida con más de un fichero | Media | Rechazo controlado |
| PHOTO-045 | Subida con campo individual demasiado grande | Media | Rechazo controlado |
| PHOTO-046 | Borrar foto propia | Alta | `204` y foto marcada como borrada |
| PHOTO-047 | Borrar foto con id inválido | Alta | `400 VALIDATION_ERROR` |
| PHOTO-048 | Borrar foto inexistente | Alta | `404 PHOTO_NOT_FOUND` |
| PHOTO-049 | Borrar foto de otro usuario | Alta | `403 FORBIDDEN` |
| PHOTO-050 | Foto borrada deja de aparecer en listado | Alta | No visible en galería |
| PHOTO-051 | Foto borrada no se puede consultar por detalle | Alta | `404 PHOTO_NOT_FOUND` |
| PHOTO-052 | Alta posterior tras borrado mantiene unicidad solo sobre activas | Alta | Flujo permitido |

### 15.7 Detalle Y Vista Cerrada (24)

| ID | Caso funcional | Prioridad | Resultado esperado |
|---|---|---|---|
| DETAIL-001 | Cargar detalle de foto existente con sesión | Alta | Datos visibles correctamente |
| DETAIL-002 | Consultar detalle por API sin token | Media | `200` si la foto existe |
| DETAIL-003 | Consultar detalle con id inválido | Media | `400 VALIDATION_ERROR` |
| DETAIL-004 | Consultar detalle de foto inexistente | Alta | `404 PHOTO_NOT_FOUND` |
| DETAIL-005 | Consultar detalle de foto borrada | Alta | `404 PHOTO_NOT_FOUND` |
| DETAIL-006 | Mostrar título de la foto | Baja | Texto correcto |
| DETAIL-007 | Mostrar autor de la foto | Baja | Texto correcto |
| DETAIL-008 | Mostrar categoría o `Sin categoria` | Baja | Texto correcto |
| DETAIL-009 | Mostrar descripción o `Sin descripcion` | Baja | Texto correcto |
| DETAIL-010 | Mostrar número de votos | Media | Contador correcto |
| DETAIL-011 | Botón `Votar` cuando `hasUserVoted=false` | Media | Estado correcto |
| DETAIL-012 | Botón `Quitar voto` cuando `hasUserVoted=true` | Media | Estado correcto |
| DETAIL-013 | Estado loading del detalle | Baja | Mensaje visible |
| DETAIL-014 | Estado error del detalle | Media | Mensaje visible y botón volver |
| DETAIL-015 | Abrir lightbox al pulsar imagen | Baja | Modal visible |
| DETAIL-016 | Cerrar lightbox al pulsar overlay | Baja | Modal cerrado |
| DETAIL-017 | Cerrar lightbox al pulsar botón cerrar | Baja | Modal cerrado |
| DETAIL-018 | Enlace volver a galería | Baja | Navegación correcta |
| DETAIL-019 | Enlace a vista de votación cerrada | Baja | Navegación correcta |
| DETAIL-020 | Vista cerrada de foto existente | Media | Datos visibles |
| DETAIL-021 | Vista cerrada con error de carga | Media | Mensaje de error |
| DETAIL-022 | Vista cerrada en loading | Baja | Mensaje visible |
| DETAIL-023 | Bloque de comentarios mostrado como placeholder | Baja | Texto informativo visible |
| DETAIL-024 | Bloque de ganadores mostrado como placeholder en vista cerrada | Baja | Texto informativo visible |

### 15.8 Votos (26)

| ID | Caso funcional | Prioridad | Resultado esperado |
|---|---|---|---|
| VOTE-001 | Crear voto válido sobre foto existente | Alta | `201`, voto creado |
| VOTE-002 | Eliminar voto existente | Alta | `204`, voto eliminado |
| VOTE-003 | Rechazar `photo_id` no numérico al votar | Alta | `400 VALIDATION_ERROR` |
| VOTE-004 | Rechazar `photo_id=0` al votar | Alta | `400 VALIDATION_ERROR` |
| VOTE-005 | Rechazar voto sobre foto inexistente | Alta | `404 PHOTO_NOT_FOUND` |
| VOTE-006 | Rechazar voto sobre foto borrada | Alta | `404 PHOTO_NOT_FOUND` |
| VOTE-007 | Rechazar voto duplicado | Alta | `400 ALREADY_VOTED` |
| VOTE-008 | Rechazar `photo_id` inválido al quitar voto | Alta | `400 VALIDATION_ERROR` |
| VOTE-009 | Rechazar retirada de voto inexistente | Alta | `404 VOTE_NOT_FOUND` |
| VOTE-010 | Votar sin autenticación | Alta | `401 AUTH_REQUIRED` |
| VOTE-011 | Quitar voto sin autenticación | Alta | `401 AUTH_REQUIRED` |
| VOTE-012 | Votar foto propia | Media | Se valida comportamiento real del sistema |
| VOTE-013 | `has_user_voted=false` sin autenticación | Media | Campo devuelto en `false` |
| VOTE-014 | `has_user_voted=true` con voto existente | Media | Campo devuelto en `true` |
| VOTE-015 | Incremento del contador tras votar desde detalle | Alta | Conteo actualizado |
| VOTE-016 | Decremento del contador tras quitar voto desde detalle | Alta | Conteo actualizado |
| VOTE-017 | Refresco de galería tras votar desde dashboard | Alta | Conteo/lista recargados |
| VOTE-018 | Ausencia de acción de voto en vista cerrada | Baja | UI no ofrece voto en esa vista |
| VOTE-019 | Prevención de doble click en detalle durante voto | Media | Botón bloqueado |
| VOTE-020 | Prevención de doble click en dashboard durante voto | Media | Botón bloqueado |
| VOTE-021 | Persistencia del voto tras refresco de página | Media | Estado mantenido |
| VOTE-022 | Persistencia de la retirada tras refresco | Media | Estado mantenido |
| VOTE-023 | Cambio de botón a `Votar` tras quitar voto | Baja | Estado correcto |
| VOTE-024 | `DELETE /votes` acepta body JSON | Media | `204` |
| VOTE-025 | `POST /votes` devuelve contrato completo del voto | Media | Incluye id, photo_id, user_id, created_at |
| VOTE-026 | `DELETE /votes` no devuelve body | Baja | Respuesta vacía / `204` |

### 15.9 Email, Health, Docs, Uploads Y Realtime (25)

| ID | Caso funcional | Prioridad | Resultado esperado |
|---|---|---|---|
| OPS-001 | `GET /health` responde 200 | Alta | `{ ok: true }` |
| OPS-002 | `GET /api/v1/health` responde 200 | Alta | `{ ok: true }` |
| OPS-003 | Ruta inexistente devuelve 404 estándar | Media | `NOT_FOUND` con formato de error |
| OPS-004 | `GET /docs` disponible | Media | Swagger UI visible |
| OPS-005 | `GET /openapi.json` disponible | Media | JSON OpenAPI servido |
| OPS-006 | Verificar versión OpenAPI 3.0.3 | Baja | Contrato correcto |
| OPS-007 | Verificar título de API en OpenAPI | Baja | `JMO-Backend API` |
| OPS-008 | Acceder a un fichero existente bajo `/uploads` | Media | Archivo servido |
| OPS-009 | Acceder a un fichero inexistente bajo `/uploads` | Baja | 404 o error de estático controlado |
| OPS-010 | Enviar email de prueba con `text` | Media | `200` y metadatos devueltos |
| OPS-011 | Enviar email de prueba con `html` | Media | `200` y metadatos devueltos |
| OPS-012 | Enviar email con `from` personalizado | Baja | SMTP recibe remitente indicado |
| OPS-013 | Rechazar email sin `to` | Media | `400 VALIDATION_ERROR` |
| OPS-014 | Rechazar email sin `subject` | Media | `400 VALIDATION_ERROR` |
| OPS-015 | Rechazar email sin `text` ni `html` | Media | `400 VALIDATION_ERROR` |
| OPS-016 | Confirmar acceso anónimo a `/email/test` | Media | Endpoint responde sin auth; si no deseado, abrir hallazgo |
| OPS-017 | Fallo SMTP en `/email/test` | Media | Error `500` controlado |
| OPS-018 | Inicialización de Socket.IO con CORS correcto | Baja | Configuración coherente |
| OPS-019 | `subscribe:community` con id válido | Baja | Cliente queda suscrito a la sala |
| OPS-020 | `subscribe:community` con id inválido | Baja | Evento ignorado sin romper |
| OPS-021 | Crear foto emite `photo:created` global | Media | Evento recibido |
| OPS-022 | Crear foto emite `photo:created` a sala de comunidad | Media | Evento recibido en room |
| OPS-023 | Crear foto sin `community_id` emite solo global | Baja | Sin error ni room emit |
| OPS-024 | CORS permite origen configurado de frontend | Media | Consumo desde SPA permitido |
| OPS-025 | Contrato de error genérico en `500` | Baja | `INTERNAL_ERROR` y `details: []` |

### 15.10 Navegación, Layouts Y Estados (20)

| ID | Caso funcional | Prioridad | Resultado esperado |
|---|---|---|---|
| NAV-001 | `/` redirige a `/login` | Baja | Redirección correcta |
| NAV-002 | Layout público muestra cabecera y footer | Baja | Estructura visible |
| NAV-003 | Layout público marca `Login` como activo en `/login` | Baja | Estilo activo correcto |
| NAV-004 | Layout público marca `Registro` como activo en `/register` | Baja | Estilo activo correcto |
| NAV-005 | Enlace de login a registro | Baja | Navegación correcta |
| NAV-006 | Enlace de registro a login | Baja | Navegación correcta |
| NAV-007 | Layout privado se muestra solo con sesión válida | Media | Acceso permitido tras auth |
| NAV-008 | Ruta `/unauthorized` requiere autenticación | Media | Sin sesión -> redirección funcional |
| NAV-009 | Pantalla `/no-session` visible cuando falta sesión | Media | Mensaje correcto |
| NAV-010 | Pantalla `404` para ruta inexistente | Baja | Mensaje correcto |
| NAV-011 | Logout devuelve al login con `replace` | Media | Redirección correcta |
| NAV-012 | Tras logout no queda sesión persistida | Media | Usuario desautenticado |
| NAV-013 | Enlace `Perfil` en cabecera privada | Baja | Navega a `/app/profile` |
| NAV-014 | Enlace `Inicio/Galeria` en cabecera privada | Baja | Navega a dashboard |
| NAV-015 | Footer privado visible | Baja | Estructura visible |
| NAV-016 | Footer público visible | Baja | Estructura visible |
| NAV-017 | Usuario admin ve enlace clicable `Ganadores` | Media | Navega a `/unauthorized` |
| NAV-018 | Usuario no admin ve `Ganadores` como texto no navegable | Media | Sin enlace clicable |
| NAV-019 | Flujo actual de admin hacia `403` al pulsar `Ganadores` | Alta | Caso para detectar defecto UX/funcional |
| NAV-020 | Token inválido en bootstrap impide entrar a rutas privadas | Alta | Limpieza de sesión y salida del área privada |

## 16. Resumen Ejecutivo

El producto implementa correctamente el núcleo funcional de autenticación, perfil, galería, subida de fotos y votación, pero presenta desalineaciones relevantes entre documentación y código.  
El plan propuesto cubre 311 casos funcionales, concentrando la mayor presión de prueba en auth, upload, voto, permisos y control del tema activo.  
Se han identificado riesgos altos en validación de temas, contrato OpenAPI incompleto, placeholders expuestos en UI y navegación admin hacia `403`.  
Quedan fuera de alcance funcional real moderación, ganadores operativos, comentarios persistentes y cualquier integración Cloudinary.  
El documento está orientado a ejecución manual y semiautomatizada, con priorización por riesgo y listo para trasladarse a una herramienta de gestión de pruebas.  
La recomendación operativa es ejecutar primero smoke, luego casos críticos, después altos, y cerrar con regresión transversal sobre auth, galería, upload y votos.
