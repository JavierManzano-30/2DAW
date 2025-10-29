# Arquitectura del Proyecto

## Diagrama de alto nivel

```mermaid
flowchart LR
  U[Usuario (Navegador)] --> F[Frontend (React + Vite)]
  F -->|HTTP/JSON (REST)| B[Backend (Node.js + Express)]
  B -->|SQL| DB[(PostgreSQL)]
  B -->|HTTP/JSON| EXT[(Servicios externos opcionales)]

  subgraph Entorno Local / Producción
    F
    B
    DB
  end
```

Repositorios:
- Frontend: `JMO-PI-FRONT`
- Backend: `JMO-PI-BACK`

## Comunicación entre componentes

- Frontend se comunica con Backend vía API REST (JSON) sobre HTTP/HTTPS.
- Backend expone endpoints REST y actúa como capa de negocio y acceso a datos.
- Backend se conecta a PostgreSQL usando un pool de conexiones.
- Servicios externos (p. ej., pagos, notificaciones, mapas) se integran desde el Backend para mantener llaves y lógica seguras.

## Tecnologías y justificación

- Frontend: React + Vite
  - React es estándar de facto para SPAs, gran ecosistema y componentes reutilizables.
  - Vite ofrece desarrollo rápido, HMR y build eficiente.
- Backend: Node.js + Express
  - JavaScript end-to-end reduce fricción y permite compartir modelos/utilidades.
  - Express es minimalista, flexible y fácil de extender.
- Base de datos: PostgreSQL
  - Relacional, potente, ACID, ampliamente soportada y con tipos avanzados.
- Herramientas
  - Docker Compose para levantar PostgreSQL local sin instalarlo nativamente.
  - Dotenv para configuración por entorno.
  - Eslint/Prettier (opcional) para consistencia de código.

## Entornos

- Desarrollo: Vite dev server (frontend), Nodemon (backend), PostgreSQL en Docker.
- Producción: Build estático del frontend servido por CDN o servidor web; backend en servicio gestionado (o contenedores); PostgreSQL gestionado.


