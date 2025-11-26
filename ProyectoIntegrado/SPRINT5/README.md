# 📚 Documentación UML — Sprint 5 (SnapNation)

Este directorio contiene **toda la documentación del Sprint 5**, formada por diagramas UML realizados con **PlantUML**, que describen el comportamiento, las estructuras de datos y la arquitectura general del sistema **SnapNation**.

El propósito de esta documentación es **diseñar completamente el sistema antes de seguir desarrollándolo**, asegurando coherencia entre frontend, backend y base de datos.

---

## 📌 Contenido del Sprint 5

| Tipo de Diagrama | Cantidad | Ubicación |
|------------------|----------|-----------|
| 🎭 Casos de Uso | 1 global | `usecase/` |
| 🔁 Actividades | 5 | `activities/` |
| ⏱ Secuencia | 3 | `sequence/` |
| 🧱 Componentes | 1 | `components/` |
| 📦 JSON (Intercambio API) | 2 | `json/` |
| 🗄 Modelo Entidad–Relación (IE) | 1 | `database/` |

Cada archivo incluye **el código PlantUML (.puml)** y su correspondiente **exportación (PNG/SVG)**.

---

## 🎭 Diagrama de Casos de Uso

Representa los actores del sistema y las funcionalidades principales que pueden realizar:

- Visitante
- Usuario Registrado
- Administrador
- Sistema externo Cloudinary

📍 Ubicación: `usecase/`

---

## 🔁 Diagramas de Actividad

Describen los flujos y reglas principales que afectan a UI, seguridad, tiempos y decisiones. Los procesos modelados son:

1. Subir y eliminar foto
2. Votar foto
3. Moderación de fotos (Administrador)
4. Crear tema semanal (Administrador)
5. Visualizar perfil de usuario

📍 Ubicación: `activities/`

---

## ⏱ Diagramas de Secuencia

Documentan el intercambio real entre Frontend ↔ Backend ↔ Base de Datos ↔ Cloudinary:

- Subir Foto
- Votar Foto
- Ver Ganadores Semanales

Estos diagramas definen **cómo debe diseñarse la API REST y sus validaciones**.

📍 Ubicación: `sequence/`

---

## 📦 Diagramas JSON (Contratos de API)

Representan el formato de datos que se enviará y recibirá entre Frontend y Backend.

Documentados:

- Respuesta al subir una foto (URL, metadatos, usuario, tema, id)
- Respuesta ver ganadores (fotos ganadoras + votos + autores)

📍 Ubicación: `json/`

---

## 🗄 Modelo IE (Entidad–Relación)

Define el modelo relacional de la base de datos que utilizará el backend, incluyendo:

- Tablas: `users`, `photos`, `votes`, `themes`, `moderation`
- Tipos de relaciones (1:N, N:M)
- Claves primarias y foráneas

📍 Ubicación: `database/`

---

## 🧱 Diagrama de Componentes

Describe la arquitectura lógica del sistema diferenciando:

| Capa | Ejemplos |
|------|----------|
| Frontend | GalleryView, PhotoDetailView, UploadView, AdminPanel |
| Backend | Controllers, Services, Cloudinary, PostgreSQL |
| Servicios externos | Cloudinary |

📍 Ubicación: `components/`

---

## 🛠 Herramienta utilizada

Todos los diagramas han sido creados en **PlantUML** usando la sintaxis oficial:

🔗 https://plantuml.com/es/

> Cada carpeta incluye los archivos `.puml` editables para futuras ampliaciones del sistema.

---

👨‍💻 Autor: **Javier Manzano Oliveros**  
📚 2º DAW — Proyecto Integrado — Sprint 5
