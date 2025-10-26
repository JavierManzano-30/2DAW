# Instrucciones para la Entrega - Despliegue de WordPress con Docker

## Estructura de Archivos para el PDF

Este documento te guiará en la creación del PDF que debes entregar.

---

## 1. Estructura del Documento PDF

### Portada
- Título: "Despliegue de WordPress con Docker"
- Nombre del alumno
- Curso: 2º DAW
- Asignatura: Despliegue
- Fecha

---

## 2. Índice

1. Introducción
2. Objetivo de la Tarea
3. Requisitos Previos
4. Proceso de Despliegue
5. Capturas de Pantalla
6. Reflexión y Conclusiones
7. Referencias

---

## 3. Secciones del PDF

### Sección 1: Introducción

Explica brevemente qué es WordPress, Docker y la contenerización.
- ¿Qué es WordPress?
- ¿Qué es Docker?
- ¿Por qué usar contenedores?
- Fuente: https://wordpress.org, https://www.docker.com

---

### Sección 2: Objetivo de la Tarea

Copia y pega el objetivo de la tarea proporcionado por el profesor:

> "Desplegar la aplicación web de WordPress utilizando Docker, comprendiendo el proceso de contenerización y el manejo de bases de datos en contenedores separados. Esta tarea incluirá la creación de una red personalizada en Docker para facilitar la comunicación entre el contenedor de WordPress y el contenedor de la base de datos MariaDB."

---

### Sección 3: Requisitos Previos

- Docker Desktop para Windows instalado
- Terminal PowerShell
- Navegador web (Chrome, Edge, Firefox, etc.)
- Acceso a internet

**Comando para verificar:**
```bash
docker --version
docker-compose --version
```

**Incluye captura de pantalla** de la verificación.

---

### Sección 4: Proceso de Despliegue

#### 4.1. Crear una Red Docker Personalizada

**Explicación:**
Las redes Docker permiten que los contenedores se comuniquen de forma aislada. Creamos una red llamada `wordpress_network` para que WordPress y MariaDB puedan comunicarse de forma segura.

**Comando:**
```bash
docker network create wordpress_network
```

**Verificar:**
```bash
docker network ls
```

**Resultado esperado:**
```
NETWORK ID     NAME                DRIVER    SCOPE
xxxxxxxxxxxxx  wordpress_network   bridge    local
```

**Incluye captura de pantalla** del comando y resultado.

**¿Por qué es importante?**
- Aislamiento: Solo los contenedores en esta red pueden comunicarse
- Resolución de nombres: WordPress puede conectarse usando el nombre `db` en lugar de IPs
- Seguridad: Previene que otros contenedores accedan a nuestra base de datos

---

#### 4.2. Desplegar el Contenedor MariaDB

**Explicación:**
MariaDB es un sistema de gestión de bases de datos compatible con MySQL. Lo desplegamos en su propio contenedor para separarlo de la aplicación.

**Comando usando docker-compose:**
```bash
docker-compose up -d db
```

O manualmente:
```bash
docker run -d --name db --network wordpress_network \
  -e MYSQL_ROOT_PASSWORD=rootpassword123 \
  -e MYSQL_DATABASE=wordpress \
  -e MYSQL_USER=wpuser \
  -e MYSQL_PASSWORD=wppassword123 \
  -v db_data:/var/lib/mysql \
  mariadb:10.11
```

**Explicación de parámetros:**
- `-d`: Ejecutar en segundo plano
- `--name db`: Nombre del contenedor
- `--network wordpress_network`: Conectar a nuestra red
- `-e`: Variables de entorno (configuración)
- `-v db_data:/var/lib/mysql`: Montar volumen para persistencia

**Verificar que está corriendo:**
```bash
docker ps
```

**Ver logs:**
```bash
docker logs db
```

**Incluye captura de pantalla** de:
1. El comando
2. Contenedor corriendo (`docker ps`)
3. Logs mostrando "ready for connections"

---

#### 4.3. Desplegar WordPress

**Explicación:**
WordPress necesita conectarse a la base de datos. Configuramos las variables de entorno para que sepa cómo conectarse al contenedor de MariaDB.

**Comando usando docker-compose:**
```bash
docker-compose up -d wordpress
```

O manualmente:
```bash
docker run -d --name wordpress_app --network wordpress_network \
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
- `WORDPRESS_DB_HOST=db`: Usar el nombre del contenedor MariaDB
- `v wordpress_data:/var/www/html`: Montar volumen para persistencia

**Verificar:**
```bash
docker ps
```

**Incluye captura de pantalla** de ambos contenedores corriendo.

---

#### 4.4. Verificar la Red

**Explicación:**
Confirmamos que ambos contenedores están en la misma red y pueden comunicarse.

**Comando:**
```bash
docker network inspect wordpress_network
```

**Incluye captura de pantalla** mostrando ambos contenedores conectados a la red.

---

#### 4.5. Verificar los Volúmenes

**Explicación:**
Los volúmenes permiten que los datos persistan aunque eliminemos los contenedores.

**Comando:**
```bash
docker volume ls
```

**Resultado esperado:**
```
DRIVER    VOLUME NAME
local     db_data
local     wordpress_data
```

**Incluye captura de pantalla.**

---

#### 4.6. Acceder a WordPress

**Pasos:**
1. Abre tu navegador web
2. Navega a: http://localhost:8080
3. Deberías ver la pantalla de instalación de WordPress

**Incluye capturas de pantalla de:**
1. La pantalla de selección de idioma
2. Formulario de configuración inicial
3. Pantalla de "¡Bienvenido!" después de la instalación
4. Pantalla de login
5. Panel de administración de WordPress

---

### Sección 5: Reflexión y Conclusiones

#### 5.1. Decisiones Tomadas Durante el Despliegue

**Red Docker Personalizada:**
- Decisión: Crear una red personalizada de tipo bridge
- Razón: Aislamiento y resolución de nombres
- Beneficio: Seguridad y mantenibilidad

**Contenedores Separados:**
- Decisión: Usar contenedores separados para WordPress y MariaDB
- Razón: Escalabilidad, seguridad, mantenimiento
- Beneficio: Actualización independiente de servicios

**Volúmenes Docker:**
- Decisión: Usar volúmenes nombrados en lugar de bind mounts
- Razón: Portabilidad y mejor rendimiento en Windows
- Beneficio: Datos persistentes independientes de los contenedores

**Puerto 8080:**
- Decisión: Usar puerto 8080 en lugar de 80
- Razón: Evitar conflictos con otros servicios
- Beneficio: No requiere privilegios de administrador

#### 5.2. Importancia de Separar Aplicación y Base de Datos

**Ventajas:**

1. **Escalabilidad:**
   - Escalar WordPress sin afectar la base de datos
   - Balancear carga entre múltiples instancias de WordPress
   - Clustering de base de datos independiente

2. **Seguridad:**
   - Aislamiento de procesos
   - Políticas de seguridad específicas por contenedor
   - Menor superficie de ataque

3. **Mantenimiento:**
   - Actualizar WordPress sin tocar la base de datos
   - Backup de base de datos independiente
   - Debug más fácil al aislar problemas

4. **Desarrollo:**
   - Desarrollo local similar a producción
   - Probable con diferentes versiones de MySQL
   - Onboarding más rápido

5. **Respaldo y Recuperación:**
   - Backup selectivo de base de datos
   - Recuperación parcial si un componente falla
   - Rollback granular

**Ejemplo Práctico:**
Si actualizas WordPress y algo sale mal, simplemente vuelves a la versión anterior del contenedor de WordPress. Los datos en la base de datos permanecen intactos.

#### 5.3. Conceptos Aprendidos

- **Contenerización:** Empaquetar aplicaciones con dependencias
- **Redes Docker:** Comunicación segura entre contenedores
- **Volúmenes:** Persistencia de datos
- **Docker Compose:** Orquestación de múltiples contenedores
- **Variables de entorno:** Configuración flexible

#### 5.4. Aplicación en el Mundo Real

Empresas como Netflix, Amazon y Google usan arquitecturas similares:
- Microservicios: Cada funcionalidad en su contenedor
- Kubernetes: Orquestación de miles de contenedores
- CI/CD: Despliegue automático
- DevOps: Colaboración entre desarrollo y operaciones

---

### Sección 6: Comandos Útiles para Gestión

**Ver todos los contenedores:**
```bash
docker ps
```

**Ver logs:**
```bash
docker logs wordpress_app
docker logs db
```

**Detener los contenedores:**
```bash
docker-compose down
```

**Detener y eliminar datos:**
```bash
docker-compose down -v
```

**Reiniciar:**
```bash
docker-compose restart
```

---

### Sección 7: Referencias

- Docker Documentation: https://docs.docker.com/
- WordPress Official Image: https://hub.docker.com/_/wordpress
- MariaDB Official Image: https://hub.docker.com/_/mariadb
- Docker Hub: https://hub.docker.com/
- Docker Compose Documentation: https://docs.docker.com/compose/

---

## Checklist para la Entrega

Antes de generar el PDF, asegúrate de tener:

- [ ] Portada con tus datos
- [ ] Índice
- [ ] Captura de pantalla de verificación de Docker
- [ ] Captura de la creación de la red
- [ ] Captura de MariaDB corriendo
- [ ] Captura de WordPress corriendo
- [ ] Captura de la inspección de red
- [ ] Captura de los volúmenes
- [ ] Capturas de pantalla del proceso de instalación de WordPress
- [ ] Captura del panel de administración
- [ ] Reflexión sobre decisiones tomadas
- [ ] Reflexión sobre importancia de separar servicios
- [ ] Conclusiones

---

## Consejos para el PDF

1. **Usa capturas claras:** Asegúrate de que las capturas sean legibles
2. **Numera las capturas:** "Figura 1: Verificación de Docker"
3. **Explica cada paso:** No solo muestres, explica por qué
4. **Se consistente:** Mismo formato, misma estructura
5. **Revisa ortografía:** Usa corrector ortográfico
6. **Incluye código:** Los comandos usados son importantes
7. **Date tiempo:** El PDF requiere tiempo para quedar bien

---

## Herramientas para Crear el PDF

- **Word o Google Docs:** Agregar texto y capturas
- **LaTeX:** Si prefieres algo más técnico
- **Markdown + Pandoc:** Convertir markdown a PDF
- **Exportar de Notion o similar:** Si trabajas allí

---

## Ejemplo de Estructura de Página

```
[Logo/Header]

1. Introducción
   - Texto sobre WordPress y Docker

[Captura pantalla 1]

2. Objetivo
   - Cita del profesor
   - Tu interpretación

3. Requisitos
   - Lista de requisitos
   
[Captura pantalla 2]

4. Proceso
   4.1 Red Docker
   - Explicación
   - Comando
   
[Captura pantalla 3]

... (continuar con todos los pasos)

6. Reflexión
   - Tus conclusiones
   - Decisiones tomadas

7. Referencias
```

---

¡Buena suerte con la entrega!
