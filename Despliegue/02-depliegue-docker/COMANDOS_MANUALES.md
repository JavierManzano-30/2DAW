# Comandos Manuales - Despliegue WordPress con Docker

Esta guía contiene todos los comandos necesarios para desplegar WordPress manualmente, sin usar docker-compose.

---

## Paso 1: Verificar Docker

```bash
docker --version
docker-compose --version
```

---

## Paso 2: Crear la Red Docker Personalizada

```bash
# Crear la red
docker network create wordpress_network

# Verificar que se creó
docker network ls

# Ver detalles de la red
docker network inspect wordpress_network
```

**Salida esperada:**
```
NETWORK ID     NAME                DRIVER    SCOPE
xxxxxxxxxxxxx  wordpress_network   bridge    local
```

---

## Paso 3: Desplegar MariaDB

```bash
# Crear volumen para la base de datos
docker volume create db_data

# Iniciar el contenedor de MariaDB
docker run -d \
  --name wordpress_db \
  --network wordpress_network \
  -e MYSQL_ROOT_PASSWORD=rootpassword123 \
  -e MYSQL_DATABASE=wordpress \
  -e MYSQL_USER=wpuser \
  -e MYSQL_PASSWORD=wppassword123 \
  -v db_data:/var/lib/mysql \
  mariadb:10.11
```

**Explicación de parámetros:**
- `-d`: Ejecutar en segundo plano (detached)
- `--name wordpress_db`: Nombre del contenedor
- `--network wordpress_network`: Conectar a nuestra red personalizada
- `-e`: Variables de entorno
- `-v db_data:/var/lib/mysql`: Montar volumen para persistencia
- `mariadb:10.11`: Imagen a usar

---

## Paso 4: Verificar que MariaDB está corriendo

```bash
# Ver contenedores activos
docker ps

# Ver logs del contenedor MariaDB
docker logs wordpress_db

# Si necesitas seguir los logs en tiempo real
docker logs -f wordpress_db
```

**Salida esperada:**
```
CONTAINER ID   IMAGE            STATUS         PORTS       NAMES
xxxxxxxxxxxxx  mariadb:10.11    Up X seconds   .../tcp    wordpress_db
```

---

## Paso 5: Esperar a que MariaDB esté listo

```bash
# Verificar que MariaDB está escuchando
docker logs wordpress_db | grep "ready for connections"
```

Deberías ver: `"ready for connections"`

---

## Paso 6: Desplegar WordPress

```bash
# Crear volumen para WordPress
docker volume create wordpress_data

# Iniciar el contenedor de WordPress
docker run -d \
  --name wordpress_app \
  --network wordpress_network \
  -p 8080:80 \
  -e WORDPRESS_DB_HOST=db \
  -e WORDPRESS_DB_USER=wpuser \
  -e WORDPRESS_DB_PASSWORD=wppassword123 \
  -e WORDPRESS_DB_NAME=wordpress \
  -v wordpress_data:/var/www/html \
  wordpress:latest
```

**Explicación de parámetros:**
- `-p 8080:80`: Mapear puerto 8080 del host al puerto 80 del contenedor
- `-e WORDPRESS_DB_HOST=db`: IMPORTANTE: usar "db" aunque el contenedor se llame "wordpress_db" (lo cambiaremos)
- Resto similar a MariaDB

---

## Corrección: Configurar el nombre correcto del host de la base de datos

Como el contenedor de MariaDB se llama `wordpress_db` y no `db`, necesitamos:

### Opción A: Eliminar y volver a crear WordPress con el host correcto

```bash
# Detener y eliminar el contenedor actual
docker stop wordpress_app
docker rm wordpress_app

# Volver a crear con el host correcto
docker run -d \
  --name wordpress_app \
  --network wordpress_network \
  -p 8080:80 \
  -e WORDPRESS_DB_HOST=wordpress_db \
  -e WORDPRESS_DB_USER=wpuser \
  -e WORDPRESS_DB_PASSWORD=wppassword123 \
  -e WORDPRESS_DB_NAME=wordpress \
  -v wordpress_data:/var/www/html \
  wordpress:latest
```

### Opción B: Cambiar el nombre del contenedor de MariaDB

```bash
# Detener todo
docker stop wordpress_db wordpress_app
docker rm wordpress_db wordpress_app

# Recrear MariaDB con el nombre "db"
docker run -d \
  --name db \
  --network wordpress_network \
  -e MYSQL_ROOT_PASSWORD=rootpassword123 \
  -e MYSQL_DATABASE=wordpress \
  -e MYSQL_USER=wpuser \
  -e MYSQL_PASSWORD=wppassword123 \
  -v db_data:/var/lib/mysql \
  mariadb:10.11

# Ahora WordPress con WORDPRESS_DB_HOST=db funcionará
docker run -d \
  --name wordpress_app \
  --network wordpress_network \
  -p 8080:80 \
  -e WORDPRESS_DB_HOST=db \
  -e WORDPRESS_DB_USER=wpuser \
  -e WORDPRESS_DB_PASSWORD=wppassword123 \
  -e WORDPRESS_DB_NAME=wordpress \
  -v wordpress_data:/var/www/html \
  wordpress:latest
```

**Recomendación:** Usar la Opción B para que coincida con la documentación.

---

## Paso 7: Verificar que ambos contenedores están corriendo

```bash
docker ps
```

**Salida esperada:**
```
CONTAINER ID   IMAGE              STATUS         PORTS                  NAMES
xxxxxxxxxxxxx  wordpress:latest   Up X seconds   0.0.0.0:8080->80/tcp  wordpress_app
xxxxxxxxxxxxx  mariadb:10.11      Up X minutes   .../tcp              db
```

---

## Paso 8: Verificar la conexión entre contenedores

```bash
# Ver la configuración de la red
docker network inspect wordpress_network
```

Deberías ver ambos contenedores en "Containers"

---

## Paso 9: Verificar los volúmenes

```bash
docker volume ls
```

Deberías ver:
- `db_data`
- `wordpress_data`

---

## Paso 10: Acceder a WordPress

1. Abre tu navegador
2. Ve a: **http://localhost:8080**
3. Completarás la instalación de WordPress

---

## Comandos de Monitoreo y Debugging

### Ver logs de WordPress
```bash
docker logs wordpress_app
```

### Ver logs de MariaDB
```bash
docker logs db
```

### Ver logs en tiempo real
```bash
docker logs -f wordpress_app
```

### Entrar al contenedor de WordPress
```bash
docker exec -it wordpress_app bash
```

### Entrar al contenedor de MariaDB
```bash
docker exec -it db bash
```

### Conectarse a MariaDB desde el contenedor
```bash
docker exec -it db mysql -u wpuser -p wordpress
# Contraseña: wppassword123
```

---

## Comandos de Gestión

### Detener los contenedores
```bash
docker stop wordpress_app db
```

### Iniciar los contenedores
```bash
docker start db wordpress_app
```

### Reiniciar los contenedores
```bash
docker restart wordpress_app db
```

### Ver estadísticas de uso
```bash
docker stats
```

### Eliminar los contenedores (sin borrar datos)
```bash
docker stop wordpress_app db
docker rm wordpress_app db
```

### Eliminar TODO (incluidos datos)
```bash
docker stop wordpress_app db
docker rm wordpress_app db
docker volume rm db_data wordpress_data
docker network rm wordpress_network
```

---

## Verificación Final

### Checklist

- [ ] Red `wordpress_network` creada
- [ ] Contenedor `db` (MariaDB) corriendo
- [ ] Contenedor `wordpress_app` corriendo
- [ ] WordPress accesible en http://localhost:8080
- [ ] Instalación de WordPress completada
- [ ] Puedes iniciar sesión en WordPress

### Comandos de verificación

```bash
# Todos los contenedores corriendo
docker ps

# Ambos contenedores conectados a la red
docker network inspect wordpress_network

# Volúmenes creados
docker volume ls

# WordPress responde
curl http://localhost:8080
```

---

## Solución de Problemas

### El contenedor se detiene inmediatamente

```bash
# Ver qué salió mal
docker logs wordpress_app
```

### Error: "Cannot connect to database"

1. Verifica que `db` está corriendo: `docker ps`
2. Verifica que están en la misma red: `docker network inspect wordpress_network`
3. Verifica el host en las variables de entorno de WordPress

### Puerto ocupado

Si el puerto 8080 está ocupado, usa otro:

```bash
# Cambiar a puerto 8081
docker stop wordpress_app
docker rm wordpress_app

docker run -d \
  --name wordpress_app \
  --network wordpress_network \
  -p 8081:80 \
  -e WORDPRESS_DB_HOST=db \
  -e WORDPRESS_DB_USER=wpuser \
  -e WORDPRESS_DB_PASSWORD=wppassword123 \
  -e WORDPRESS_DB_NAME=wordpress \
  -v wordpress_data:/var/www/html \
  wordpress:latest
```

---

## Notas Importantes

1. **Nombres de contenedores:** El nombre `db` se usa en `WORDPRESS_DB_HOST` porque es el nombre del contenedor de MariaDB
2. **Red personalizada:** Ambos contenedores deben estar en la misma red para comunicarse
3. **Volúmenes:** Los volúmenes persisten aunque elimines los contenedores
4. **Variables de entorno:** Son sensibles a mayúsculas/minúsculas
5. **Imágenes:** Docker descargará automáticamente las imágenes de Docker Hub si no existen localmente

---

## Próximos Pasos

Una vez completado el despliegue manual:

1. Documenta el proceso en tu PDF
2. Incluye capturas de pantalla
3. Explica cada decisión tomada
4. Reflexiona sobre la importancia de separar servicios
5. Consulta REFLEXION.md para ideas de contenido

¡Éxito con la tarea!
