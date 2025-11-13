## Formato estándar de errores
Todos los errores se devuelven con el siguiente formato JSON:

```json
{
  "code": "PHOTO_NOT_FOUND",
  "message": "La foto no existe o fue eliminada",
  "details": []
}
---

Códigos comunes

AUTH_REQUIRED → Token no presente o inválido

VALIDATION_ERROR → Datos incorrectos

PHOTO_NOT_FOUND → ID inexistente

INTERNAL_ERROR → Error inesperado del servidor

---

### 🧩 `convenciones.md`
Define tus reglas:
```markdown
## Convenciones API SnapNation
- Versionado: /api/v1
- Paths en kebab-case (ej: /user-photos)
- Campos JSON en snake_case (ej: created_at)
- Respuestas siempre envueltas en objetos
- Paginación estándar: `?page=1&limit=10`
- Seguridad: Bearer JWT
