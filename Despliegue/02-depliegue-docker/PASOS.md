# Despliegue de WordPress con Docker - Pasos a Seguir

## Objetivo
Desplegar WordPress con Docker, usando MariaDB como base de datos en contenedores separados conectados mediante una red Docker personalizada.

---

## Pre-requisitos
- Docker instalado y funcionando
- Terminal/CMD/PowerShell abierto
- Navegador web

---

## Paso 1: Crear una Red Docker Personalizada

### Opción A: Con docker-compose (Automático)
Si usas el archivo `docker-compose.yml`, la red se crea automáticamente.

### Opción B: Manualmente
```bash
docker network create wordpress_network
```

**Verificar la red:**
```bash
docker network ls
```

**¿Por qué es importante?**
La red personalizada permite que los contenedores se comuniquen usando nombres en lugar de IPs, facilitando la gestión y el mantenimiento.

---

## Paso 2: Desplegar el Contenedor de MariaDB

### Opción A: Con docker-compose (Recomendado)
```bash
docker-compose up -d db
```

### Opción B: Manualmente
```bash
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

**Verificar que el contenedor está corriendo:**
```bash
docker ps
```

**Ver los logs para confirmar que inició correctamente:**
```bash
docker logs wordpress_db
```

---

## Paso 3: Desplegar WordPress

### Opción A: Con docker-compose (Recomendado)
```bash
docker-compose up -d wordpress
```

O para levantar ambos servicios a la vez:
```bash
docker-compose up -d
```

### Opción B: Manualmente
```bash
docker run -d \
  --name wordpress_app \
  --network wordpress_network \
  -p 8080:80 \
  -e WORDPRESS_DB_HOST=db \
  -e WORDPRESS_DB_USER=wpuser \
  -e WORDPRESS_DB_PASSWORD=wppassword123 \
  -e WORDPRESS_DB_NAME=wordpress \
  -v wordpress_data:/var/www/html \
  --depends_on db \
  wordpress:latest
```

**Verificar que ambos contenedores están corriendo:**
```bash
docker ps
```

**Ver los logs de WordPress:**
```bash
docker logs wordpress_app
```

---

## Paso 4: Acceder a WordPress

1. Abre tu navegador web
2. Ve a la siguiente URL: **http://localhost:8080**
3. Verás la pantalla de instalación de WordPress
4. Selecciona el idioma (español)
5. Completarás la instalación proporcionando:
   - **Título del sitio**: El nombre de tu sitio
   - **Nombre de usuario**: Tu usuario administrador
   - **Contraseña**: Una contraseña segura
   - **Correo electrónico**: Tu email
6. Haz clic en "Instalar WordPress"

**¡Enhorabuena!** Ya tienes WordPress funcionando.

---

## Comandos Útiles

### Ver contenedores en ejecución
```bash
docker ps
```

### Ver todos los contenedores (incluidos parados)
```bash
docker ps -a
```

### Ver redes Docker
```bash
docker network ls
```

### Ver volúmenes
```bash
docker volume ls
```

### Ver logs
```bash
docker logs wordpress_db
docker logs wordpress_app
```

### Detener los contenedores
```bash
docker-compose down
```

### Detener y eliminar datos (CUIDADO: borra los datos)
```bash
docker-compose down -v
```

### Reiniciar los contenedores
```bash
docker-compose restart
```

---

## Verificación del Despliegue

Para verificar que todo está funcionando correctamente:

1. **Contenedores corriendo:**
   ```bash
   docker ps
   ```
   Deberías ver `wordpress_app` y `wordpress_db` en estado "Up"

2. **Red creada:**
   ```bash
   docker network inspect wordpress_network
   ```
   Deberías ver ambos contenedores conectados a la red

3. **Volúmenes:**
   ```bash
   docker volume ls
   ```
   Deberías ver `db_data` y `wordpress_data`

4. **Acceso web:**
   - Abre http://localhost:8080
   - Deberías ver la pantalla de instalación de WordPress

---

## Importancia de Separar Aplicación y Base de Datos

### Ventajas de contenedores separados:

1. **Escalabilidad**: Puedes escalar WordPress independientemente de la base de datos
2. **Seguridad**: Aislamiento entre servicios, si uno falla el otro sigue funcionando
3. **Mantenimiento**: Actualizaciones independientes sin afectar al otro servicio
4. **Respaldo**: Backup de la base de datos independiente del código de la aplicación
5. **Rendimiento**: Optimización específica para cada contenedor
6. **Best Practices**: Arquitectura común en producción

### ¿Por qué usar una red personalizada?

- **Comunicación segura**: Solo los contenedores en la misma red pueden comunicarse
- **Resolución de nombres**: Puedes usar el nombre del contenedor como hostname
- **Aislamiento**: Separa tu aplicación de otras aplicaciones Docker
- **Configuración personalizada**: Puedes configurar DNS, subredes, etc.

---

## Solución de Problemas

### Error: "Port already in use"
```bash
# Cambiar el puerto en docker-compose.yml
ports:
  - "8081:80"  # Usa un puerto diferente
```

### Error: "Network not found"
```bash
# Asegúrate de crear la red primero
docker network create wordpress_network
```

### Error: "Cannot connect to database"
- Verifica que el contenedor de la base de datos esté corriendo
- Verifica las variables de entorno
- Revisa los logs del contenedor de WordPress:
  ```bash
  docker logs wordpress_app
  ```

### Reiniciar desde cero
```bash
# Detener y eliminar todo
docker-compose down -v
docker network rm wordpress_network

# Volver a levantar
docker-compose up -d
```

---

## Próximos Pasos

Una vez completada la instalación de WordPress:

1. Completa la configuración inicial de WordPress
2. Personaliza el tema
3. Instala plugins
4. Crea contenido

¡Recuerda documentar todo el proceso para entregar en PDF!
