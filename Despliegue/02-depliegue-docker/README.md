# Despliegue de WordPress con Docker

Este proyecto contiene la configuración para desplegar WordPress con Docker, utilizando MariaDB como base de datos.

## Estructura del Proyecto

```
.
├── docker-compose.yml    # Configuración de contenedores
├── PASOS.md             # Guía paso a paso detallada
└── README.md            # Este archivo
```

## Inicio Rápido

### Opción 1: Usando docker-compose (Recomendado)

1. Levantar todos los servicios:
```bash
docker-compose up -d
```

2. Esperar unos segundos a que inicien los contenedores

3. Abrir en el navegador: http://localhost:8080

### Opción 2: Manualmente (paso a paso)

Ver archivo `PASOS.md` para instrucciones detalladas paso a paso.

## Servicios

- **WordPress**: Aplicación web en puerto 8080
- **MariaDB**: Base de datos MySQL/MariaDB
- **Red**: `wordpress_network` (bridge)
- **Volúmenes**: 
  - `db_data`: Datos de MariaDB
  - `wordpress_data`: Datos de WordPress

## Acceso

- **WordPress**: http://localhost:8080
- **Base de datos**: 
  - Host: `db`
  - Puerto: 3306
  - Usuario: `wpuser`
  - Contraseña: `wppassword123`
  - Base de datos: `wordpress`

## Comandos Útiles

```bash
# Ver estado de los contenedores
docker-compose ps

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Detener y eliminar datos
docker-compose down -v

# Reiniciar
docker-compose restart
```

## Documentación

Para más detalles sobre el proceso completo, consulta el archivo `PASOS.md`.

## Requisitos

- Docker Desktop (Windows/Mac) o Docker Engine (Linux)
- Docker Compose
- Navegador web moderno

## Notas de Seguridad

⚠️ **Importante**: Las contraseñas en este archivo son de ejemplo. En producción:
- Usa contraseñas seguras y únicas
- No subas archivos con credenciales a repositorios públicos
- Considera usar variables de entorno o secrets de Docker

## Autor

Este proyecto es parte de la asignatura de Despliegue - DAW 2º año.
