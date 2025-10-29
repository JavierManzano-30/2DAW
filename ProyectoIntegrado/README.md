# Proyecto Integrado — Sprint 3

Este repositorio contiene la arquitectura base, los esqueletos de frontend y backend, y la preparación del entorno para comenzar el desarrollo.

## Arquitectura
- Ver `docs/architecture.md` para diagrama y justificación tecnológica.

## Requisitos generales
- Node.js 18+
- npm 9+
- Docker (opcional para PostgreSQL local)

## Estructura
- `JMO-PI-FRONT/`: Frontend (React + Vite)
- `JMO-PI-BACK/`: Backend (Node.js + Express + PostgreSQL)
- `docker-compose.yml`: Servicio de PostgreSQL

## Puesta en marcha

### Base de datos (opcional con Docker)
```bash
docker compose up -d db
```
La BBDD quedará disponible en `postgres://postgres:postgres@localhost:5432/proyecto`.

### Backend (`JMO-PI-BACK`)
```bash
cd JMO-PI-BACK
npm install
# copia .env.example a .env y ajusta si es necesario
npm run dev
```
- Salud: `GET http://localhost:3000/health`

### Frontend (`JMO-PI-FRONT`)
```bash
cd JMO-PI-FRONT
npm install
npm run dev
```
- Abre `http://localhost:5173`

## Entornos
- Desarrollo: Vite (frontend), Nodemon (backend), PostgreSQL en Docker
- Producción: build estático frontend; backend desplegado; PostgreSQL gestionado

## Tareas de Jira
Se incluye `docs/jira_tasks.csv` para importar tareas técnicas con estimaciones iniciales.
