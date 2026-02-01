# Guia de conexion y despliegue (MongoDB + Render + Vercel)

## 1) MongoDB Atlas
1. Crea un proyecto y un cluster (free tier vale).
2. En "Database Access", crea un usuario con password.
3. En "Network Access", permite acceso:
   - Para pruebas: agrega 0.0.0.0/0 (permite desde cualquier IP).
4. Crea una base de datos y coleccion (por ejemplo: `despliegue` y `tareas`).
5. Copia la URI de conexion (Connect -> Drivers -> MongoDB URI).
   - Sustituye `<db_password>` por la password del usuario.
   - Si hay caracteres raros, usa URL encode (ej: `@` -> `%40`).
   - Recomendado: añade el nombre de la BD al final (ej: `/despliegue`).
   - Ejemplo final:
     `mongodb+srv://usuario:password@cluster0.xxxx.mongodb.net/despliegue?retryWrites=true&w=majority`

Ejemplo de URI (no uses esta exacta):
`mongodb+srv://JavierManzano:<db_password>@cluster0.xg5nhyj.mongodb.net/?appName=Cluster0`

## 2) Backend (Render)
1. En Render, crea un nuevo "Web Service" desde tu repo.
2. Selecciona la carpeta `backend` como root si Render lo permite.
3. Build command: `npm install`
4. Start command: `npm start`
5. Variables de entorno (Render -> Environment):
   - `MONGO_URI`: pega tu URI de MongoDB
   - `PORT`: 4000 (opcional, Render lo define)

La API usa MongoDB si `MONGO_URI` esta definido. Si no, usa memoria.

## 3) Frontend (Vercel)
1. En Vercel, importa el repo y selecciona la carpeta `frontend`.
2. Variables de entorno en Vercel:
   - `VITE_API_URL`: URL publica del backend en Render (ej: https://tu-api.onrender.com)
3. Deploy y prueba.

## 4) Pruebas rapidas (curl)
GET:
`curl https://TU-API.onrender.com/tareas`

POST:
`curl -X POST https://TU-API.onrender.com/tareas -H "Content-Type: application/json" -d '{"titulo":"Demo","descripcion":"Probar API"}'`

DELETE (usa el id devuelto en GET/POST):
`curl -X DELETE https://TU-API.onrender.com/tareas/ID_AQUI`

## 5) Evidencias sugeridas
- Capturas de la app en Vercel funcionando.
- Capturas de la API en Render (deploy logs + URL).
- Capturas de Atlas: cluster, usuario, network, coleccion.
- Capturas de pruebas: GET/POST/DELETE (Postman o curl).
