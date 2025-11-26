# 📷 SnapNation — Proyecto Intermodular (DAW 2)

SnapNation es una plataforma fotográfica competitiva donde los usuarios pueden subir imágenes relacionadas con un **tema semanal**, votar fotos de otros usuarios y visualizar las fotografías ganadoras. Cuenta además con moderación por parte de administradores y un backend con subida a **Cloudinary**.

Este proyecto forma parte del **Proyecto Integrado de 2º DAW**.

---

### 🧩 Arquitectura General

| FrontEnd | BackEnd | Servicios |
|----------|---------|-----------|
| Vue/React/SPA (cliente) | API REST (Node, Express o similar) | Cloudinary, Base de Datos |

Los componentes están documentados en el **Diagrama de Componentes** incluido en la carpeta de documentación.

---

### 📌 Funcionalidades principales

👤 **Usuarios**
- Registro e inicio de sesión
- Subida de fotos (tema semanal)
- Votar fotos
- Editar perfil
- Ver estadísticas y ganadores

🛡 **Administradores**
- Moderar fotos (aprobar / eliminar)
- Crear tema semanal
- Eliminar fotos con restricción
- Calcular ganadores

📊 **Visitantes**
- Ver galería
- Ver foto y autor
- Ver ganadores y temas activos

---

### 📎 Documentación técnica incluida

- 📌 Casos de Uso
- 🔁 Actividades (mínimo 5)
- 📩 Diagramas de Secuencia (mínimo 3)
- 🧱 Diagrama de Componentes
- 📦 JSON de intercambio
- 🗄 IE (Modelo entidad-relación)

Ubicación: `/docs/sprint5/`

---

### 📅 Gestión del Proyecto (JIRA)

Las historias y subtareas del producto están gestionadas en JIRA:

📌 Ejemplos encontrados:
- **SCRUM-59 [QA] Tests de registro**
- **SCRUM-58 [BE] Endpoint POST /auth/register**
- **SCRUM-57 [DB] Crear tabla users**
- **SCRUM-56 Historia: Detalle de Foto**

La documentación de cada HU se ha reflejado en los diagramas correspondientes usando PlantUML.

---

### 👨‍💻 Autor

**Javier Manzano Oliveros**

Proyecto Intermodular — 2º DAW  
Profesor: **Ricardo Ruiz Anaya**

---
