# Reflexión sobre el Despliegue de WordPress con Docker

## Introducción

Este documento presenta una reflexión sobre el proceso de despliegue de WordPress con Docker, enfocándose en las decisiones tomadas y la importancia de las arquitecturas basadas en contenedores.

---

## Decisiones Durante el Despliegue

### 1. Elección de la Red Docker Personalizada

**Decisión:** Crear una red personalizada llamada `wordpress_network` de tipo bridge.

**Razones:**
- **Aislamiento**: Los contenedores de WordPress y MariaDB quedan aislados de otros contenedores que puedan estar corriendo en el sistema
- **Resolución de nombres**: Permite que WordPress se conecte a la base de datos usando simplemente el nombre `db` en lugar de la IP del contenedor
- **Seguridad**: Solo los contenedores conectados a esta red pueden comunicarse entre ellos
- **Mantenibilidad**: Facilita la gestión y configuración de la comunicación entre servicios

**Configuración:**
```yaml
networks:
  wordpress_network:
    driver: bridge
    name: wordpress_network
```

---

### 2. Separación de Aplicación y Base de Datos

**Decisión:** Usar contenedores separados para WordPress y MariaDB.

**Razones:**
- **Principio de responsabilidad única**: Cada contenedor tiene un propósito específico
- **Escalabilidad**: Se puede escalar WordPress sin afectar la base de datos y viceversa
- **Actualización independiente**: Puedes actualizar WordPress sin tocar la base de datos
- **Backup selectivo**: Respaldo de la base de datos sin incluir el código de la aplicación
- **Recursos**: Asignación independiente de recursos de CPU y RAM

**Ventajas prácticas:**
- Si WordPress falla, los datos en la base de datos permanecen intactos
- Puedes reiniciar WordPress sin afectar las conexiones a la base de datos
- Facilita la replicación en entornos de producción

---

### 3. Uso de Volúmenes para Persistencia

**Decisión:** Crear volúmenes Docker nombrados (`db_data` y `wordpress_data`).

**Razones:**
- **Persistencia**: Los datos sobreviven incluso si se eliminan los contenedores
- **Backup**: Fácil copia de seguridad mediante copia del volumen
- **Portabilidad**: Los volúmenes se pueden montar en otros contenedores
- **Rendimiento**: Mejor rendimiento que bind mounts en Windows/Mac

**Configuración:**
```yaml
volumes:
  db_data:
    # Almacena datos de MariaDB
  wordpress_data:
    # Almacena archivos de WordPress
```

---

### 4. Variables de Entorno

**Decisión:** Usar variables de entorno para configurar la conexión a la base de datos.

**Razones:**
- **Separación de código y configuración**: No se hardcoden credenciales en el código
- **Flexibilidad**: Fácil cambio de configuración sin modificar el contenedor
- **Seguridad**: Las credenciales no quedan expuestas en el código fuente
- **Mejores prácticas**: Estándar de la industria para configurar aplicaciones

**Variables configuradas para WordPress:**
- `WORDPRESS_DB_HOST`: Nombre del contenedor de la base de datos (`db`)
- `WORDPRESS_DB_USER`: Usuario para conectar a la base de datos
- `WORDPRESS_DB_PASSWORD`: Contraseña del usuario
- `WORDPRESS_DB_NAME`: Nombre de la base de datos

---

### 5. Puerto de Acceso

**Decisión:** Mapear WordPress al puerto 8080 del host.

**Razones:**
- Evitar conflicto con otros servicios que puedan usar el puerto 80
- Facilita probar múltiples instalaciones de WordPress simultáneamente
- Compatible con la mayoría de sistemas operativos (sin necesidad de privilegios root)

**Configuración:**
```yaml
ports:
  - "8080:80"  # Puerto_host:puerto_contenedor
```

---

## Importancia de Separar Aplicación y Base de Datos en Contenedores Diferentes

### Arquitectura Tradicional vs Contenerizada

**Arquitectura tradicional (todo en uno):**
- La aplicación y la base de datos están en el mismo servidor
- Actualización de uno afecta al otro
- Difícil de escalar individualmente
- Riesgo de perder todo si falla el servidor

**Arquitectura contenerizada (separada):**
- Cada componente en su propio contenedor
- Actualización independiente
- Escalado independiente
- Tolerancia a fallos

### Ventajas Prácticas

1. **Escalabilidad**
   - Puedes levantar múltiples instancias de WordPress detrás de un balanceador
   - La base de datos puede escalarse independientemente (clusters, réplicas)
   - Optimización de recursos según necesidades

2. **Mantenimiento**
   - Actualizar WordPress no afecta la base de datos
   - Backup de la base de datos sin incluir código
   - Debugging más fácil al aislar problemas

3. **Seguridad**
   - Aislamiento de procesos
   - Políticas de seguridad específicas por contenedor
   - Menor superficie de ataque

4. **Desarrollo**
   - Desarrollo local similar a producción
   - Facilita pruebas con diferentes versiones de MySQL/MariaDB
   - Onboarding más rápido para nuevos desarrolladores

5. **Despliegue**
   - Despliegue independiente de servicios
   - Rollback granular si algo falla
   - CI/CD más efectivo

### Ejemplo Real de Beneficio

**Escenario:** Necesitas actualizar WordPress de la versión 6.2 a 6.3.

**Con contenedores separados:**
1. Creas un backup del volumen de la base de datos (just in case)
2. Actualizas solo el contenedor de WordPress
3. Si hay problemas, vuelves a la versión anterior del contenedor de WordPress
4. La base de datos permanece intacta durante todo el proceso

**Con todo en uno:**
1. Tienes que hacer backup de TODO
2. Si algo sale mal, pierdes todo
3. El tiempo de indisponibilidad es mayor

---

## Conceptos Clave Aprendidos

### Contenerización
El proceso de empaquetar una aplicación con todas sus dependencias en un contenedor ligero, portable y aislado.

### Redes Docker
Mecanismo para conectar contenedores de forma segura, permitiendo comunicación usando nombres de host.

### Volúmenes
Mecanismo de persistencia de datos que permite que los datos sobrevivan al ciclo de vida de los contenedores.

### Orquestación
Con Docker Compose aprendimos a definir y gestionar múltiples contenedores como una aplicación completa.

---

## Aplicación en el Mundo Real

Las empresas actuales (Netflix, Amazon, Google, etc.) usan arquitecturas similares:

- **Microservicios**: Cada funcionalidad en su propio contenedor
- **Orquestadores**: Kubernetes, Docker Swarm para gestionar miles de contenedores
- **CI/CD**: Despliegue automático de aplicaciones contenerizadas
- **DevOps**: Esta arquitectura facilita la colaboración entre desarrollo y operaciones

---

## Conclusiones

El despliegue de WordPress con Docker me ha permitido comprender:

1. **La importancia de la separación de servicios** para crear sistemas robustos y mantenibles
2. **El poder de la contenerización** para crear entornos reproducibles
3. **La flexibilidad de Docker Compose** para gestionar aplicaciones multi-contenedor
4. **Las mejores prácticas** de la industria moderna de desarrollo de software

Esta experiencia es directamente aplicable a entornos de producción reales, donde la separación de servicios, la escalabilidad y la seguridad son aspectos críticos.

---

## Referencias

- Docker Documentation: https://docs.docker.com/
- WordPress Official Image: https://hub.docker.com/_/wordpress
- MariaDB Official Image: https://hub.docker.com/_/mariadb
- Docker Compose Documentation: https://docs.docker.com/compose/

---

**Autor:** [Tu Nombre]  
**Fecha:** [Fecha Actual]  
**Asignatura:** Despliegue - DAW 2º año
