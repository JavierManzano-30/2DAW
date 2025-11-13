# Convenciones API SnapNation

Este documento define las convenciones y estándares que deben seguirse en el diseño e implementación de la API SnapNation.

## Versionado

- **Versión actual**: `/api/v1`
- **Formato**: `/api/v{número}` donde `{número}` es un entero positivo
- **Estrategia**: Versionado por URL (no por headers)
- **Cambios breaking**: Requieren nueva versión de API

## Naming Conventions

### Paths (URLs)
- **Formato**: `kebab-case` (minúsculas con guiones)
- **Ejemplos**:
  - ✅ `/user-photos`
  - ✅ `/photo-votes`
  - ❌ `/userPhotos` (camelCase)
  - ❌ `/user_photos` (snake_case)

### Campos JSON
- **Formato**: `snake_case` (minúsculas con guiones bajos)
- **Ejemplos**:
  - ✅ `created_at`
  - ✅ `user_id`
  - ✅ `is_active`
  - ❌ `createdAt` (camelCase)
  - ❌ `created-at` (kebab-case)

### Base de Datos
- **Tablas**: `snake_case` plural (ej: `users`, `photo_votes`)
- **Columnas**: `snake_case` (ej: `created_at`, `user_id`)
- **Índices**: `idx_{tabla}_{columnas}` (ej: `idx_photos_user_id`)

## Estructura de Respuestas

### Respuestas Exitosas

#### Respuestas Simples
```json
{
  "data": { ... }
}
```

#### Respuestas Paginadas
```json
{
  "data": [ ... ],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 10,
    "total_pages": 15
  }
}
```

#### Respuestas de Creación
- **Código**: `201 Created`
- **Body**: Objeto creado (sin envoltorio `data`)

### Respuestas de Error

Todas las respuestas de error siguen el formato estándar definido en `errores.md`:

```json
{
  "code": "ERROR_CODE",
  "message": "Mensaje legible",
  "details": []
}
```

## Paginación

### Parámetros
- `page`: Número de página (empezando en 1)
- `limit`: Elementos por página (mínimo 1, máximo 100, default 10)

### Ejemplo
```
GET /photos?page=2&limit=20
```

### Metadatos
Todas las respuestas paginadas incluyen `meta` con:
- `total`: Total de elementos disponibles
- `page`: Página actual
- `limit`: Elementos por página
- `total_pages`: Total de páginas calculado

## Autenticación

### Método
- **Tipo**: Bearer Token (JWT)
- **Header**: `Authorization: Bearer {token}`
- **Obtención**: `/auth/login` o `/auth/register`

### Endpoints Protegidos
- Todos los endpoints excepto:
  - `POST /auth/register`
  - `POST /auth/login`
  - `GET /photos` (público)
  - `GET /themes` (público)
  - `GET /communities` (público)
  - `GET /categories` (público)

## Códigos de Estado HTTP

### Éxito
- `200 OK`: Operación exitosa (GET, PUT)
- `201 Created`: Recurso creado exitosamente (POST)
- `204 No Content`: Operación exitosa sin contenido (DELETE)

### Errores del Cliente
- `400 Bad Request`: Datos inválidos o mal formados
- `401 Unauthorized`: Token no presente o inválido
- `403 Forbidden`: Token válido pero sin permisos
- `404 Not Found`: Recurso no encontrado
- `409 Conflict`: Conflicto (ej: recurso ya existe)
- `413 Payload Too Large`: Archivo demasiado grande

### Errores del Servidor
- `500 Internal Server Error`: Error inesperado del servidor
- `503 Service Unavailable`: Servicio temporalmente no disponible

## Validaciones

### Campos Comunes

#### Email
- Formato válido de email
- Máximo 255 caracteres

#### Password
- Mínimo 8 caracteres
- Recomendado: mayúsculas, minúsculas, números y símbolos

#### Username
- Mínimo 3 caracteres
- Máximo 50 caracteres
- Solo letras, números y guiones bajos (`^[a-zA-Z0-9_]+$`)

#### Títulos
- Máximo 150 caracteres
- No vacío

#### Descripciones
- Máximo 2000 caracteres
- Opcional (nullable)

### Archivos de Imagen
- Formatos permitidos: JPG, JPEG, PNG
- Tamaño máximo: 10MB
- Resolución recomendada: mínimo 800x600px

## Orden de Campos en Respuestas

1. Identificadores (`id`)
2. Relaciones (`user_id`, `theme_id`, etc.)
3. Campos principales (`title`, `name`, `email`, etc.)
4. Campos opcionales (`description`, `avatar_url`, etc.)
5. Flags booleanos (`is_active`, `is_deleted`, etc.)
6. Timestamps (`created_at`, `updated_at`)

## Timestamps

- **Formato**: ISO 8601 (`YYYY-MM-DDTHH:mm:ssZ`)
- **Zona horaria**: UTC
- **Ejemplo**: `"2024-01-15T10:30:00Z"`

## Filtros y Búsquedas

### Parámetros de Filtro
- Usar nombres descriptivos: `community_id`, `theme_id`, `is_active`
- Tipos consistentes: enteros para IDs, booleanos para flags
- Documentar todos los filtros disponibles en OpenAPI

### Ordenamiento
- Parámetro: `sort` (ej: `sort=created_at:desc`)
- Default: `created_at:desc` (más recientes primero)

## Rate Limiting

- **Límite**: 100 requests por minuto por IP
- **Headers de respuesta**:
  - `X-RateLimit-Limit`: Límite total
  - `X-RateLimit-Remaining`: Requests restantes
  - `X-RateLimit-Reset`: Timestamp de reset

## Documentación

- Todos los endpoints deben estar documentados en `openapi.yaml`
- Incluir ejemplos de request/response
- Documentar todos los códigos de error posibles
- Especificar validaciones y constraints

## Cambios Futuros

Cuando se requiera hacer cambios breaking:
1. Crear nueva versión (`/api/v2`)
2. Mantener versión anterior durante período de transición
3. Documentar migración en changelog
4. Deprecar versión anterior con header `Deprecation: true`

