# 🚀 Inicio Rápido - WordPress con Docker

## Opción 1: Usar docker-compose (MÁS FÁCIL) ⭐

### 1️⃣ Levantar todo

En PowerShell o CMD, ejecuta:

```bash
docker-compose up -d
```

### 2️⃣ Esperar unos segundos

Espera a que los contenedores terminen de iniciar (unos 10-20 segundos).

### 3️⃣ Abrir WordPress

Abre tu navegador y ve a: **http://localhost:8080**

### 4️⃣ Completar instalación

Sigue el asistente de instalación de WordPress.

---

## Opción 2: Usar el script automático 🎬

### Para Windows:

```bash
desplegar.bat
```

Esto hará todo automáticamente y te dirá cuando termine.

---

## Opción 3: Pasos manuales (aprendizaje) 📚

Si quieres entender cada paso en detalle:

```bash
# 1. Crear la red
docker network create wordpress_network

# 2. Desplegar MariaDB
docker run -d --name db --network wordpress_network \
  -e MYSQL_ROOT_PASSWORD=rootpassword123 \
  -e MYSQL_DATABASE=wordpress \
  -e MYSQL_USER=wpuser \
  -e MYSQL_PASSWORD=wppassword123 \
  -v db_data:/var/lib/mysql \
  mariadb:10.11

# 3. Esperar 10 segundos
timeout /t 10

# 4. Desplegar WordPress
docker run -d --name wordpress_app --network wordpress_network \
  -p 8080:80 \
  -e WORDPRESS_DB_HOST=db \
  -e WORDPRESS_DB_USER=wpuser \
  -e WORDPRESS_DB_PASSWORD=wppassword123 \
  -e WORDPRESS_DB_NAME=wordpress \
  -v wordpress_data:/var/www/html \
  wordpress:latest

# 5. Abrir navegador
start http://localhost:8080
```

---

## ✅ Verificar que funciona

```bash
# Ver contenedores corriendo
docker ps

# Ver los logs
docker logs wordpress_app
```

Deberías ver ambos contenedores corriendo (`db` y `wordpress_app`).

---

## 🛑 Detener los contenedores

```bash
# Opción 1: Con docker-compose
docker-compose down

# Opción 2: Con el script
detener.bat

# Opción 3: Manualmente
docker stop wordpress_app db
docker rm wordpress_app db
```

---

## 📋 Archivos Importantes

- **docker-compose.yml**: Configuración de todos los servicios
- **PASOS.md**: Guía paso a paso detallada
- **COMANDOS_MANUALES.md**: Comandos para hacerlo manualmente
- **INSTRUCCIONES_ENTREGA.md**: Cómo crear el PDF para entregar
- **REFLEXION.md**: Ideas para la reflexión del PDF

---

## 🐛 Solución de Problemas

### Error: "Docker no está corriendo"
- Abre Docker Desktop y espera a que inicie
- Debería aparecer el icono de Docker en la bandeja del sistema

### Error: "Puerto ocupado"
Si el puerto 8080 está ocupado, edita `docker-compose.yml`:
```yaml
ports:
  - "8081:80"  # Cambia a 8081
```

### Error: "No se puede conectar a la base de datos"
Espera un poco más (MariaDB necesita tiempo para iniciar):
```bash
docker logs db
```
Debería mostrar "ready for connections".

### Ver logs de errores
```bash
docker-compose logs
```

---

## 📸 Para la Entrega del PDF

Necesitarás capturas de pantalla de:
1. ✅ Verificación de Docker (`docker --version`)
2. ✅ Red creada (`docker network ls`)
3. ✅ Contenedores corriendo (`docker ps`)
4. ✅ Red con contenedores (`docker network inspect wordpress_network`)
5. ✅ Pantalla de instalación de WordPress (http://localhost:8080)
6. ✅ Pantalla de login
7. ✅ Panel de administración

Consulta **INSTRUCCIONES_ENTREGA.md** para más detalles.

---

## 🎓 Aprender Más

- **PASOS.md**: Explicación detallada de cada paso
- **REFLEXION.md**: Reflexión sobre las decisiones tomadas
- **COMANDOS_MANUALES.md**: Todos los comandos explicados

---

## ⚡ Comandos Útiles

```bash
# Ver estado
docker ps
docker-compose ps

# Ver logs
docker-compose logs -f
docker logs wordpress_app
docker logs db

# Reiniciar
docker-compose restart

# Eliminar todo (¡CUIDADO! borra datos)
docker-compose down -v
```

---

¡Éxito con la tarea! 🎉
