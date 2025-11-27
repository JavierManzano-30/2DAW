# Piedra, Papel o Tijeras con IA (Markov simple)

Ejercicio de IA para DAW: la máquina intenta predecir tu siguiente jugada a partir de tu historial y adapta su movimiento para ganarte. El flujo admite dos modos:

- **Interactivo por consola**: vas jugando ronda a ronda.
- **Automatizado por JSON**: recibe el estado completo y responde con la jugada y el análisis.

## Requisitos
- Node.js 14+ (probado con Node 18).

## Estructura
- `main.js`: implementación en JavaScript (modo interactivo y modo JSON).

## Cómo jugar en consola (PowerShell/Terminal)
Desde la carpeta del proyecto:
```powershell
node .\main.js
```
Instrucciones en el propio programa:
- Escribe `piedra`, `papel` o `tijeras` para tu jugada.
- Escribe `salir` / `fin` para terminar la partida.

Cada ronda muestra:
- Jugada de la máquina (adaptada a tu patrón).
- Resultado de la ronda.
- Predicción de tu siguiente jugada y porcentaje de previsibilidad.
- Marcador acumulado.

Al salir, obtienes un análisis final del patrón detectado y la previsibilidad estimada.

## Uso por JSON (modo automatizado)
El script detecta si la entrada estándar está conectada a un pipe; si recibe JSON, responde con JSON.

### Formato de entrada (Jugador → Máquina)
```json
{
  "score": { "player": 2, "machine": 3 },
  "history": {
    "player": ["piedra", "papel", "tijeras", "tijeras", "piedra"],
    "machine": ["papel", "papel", "tijeras", "papel", "piedra"]
  },
  "finish": false
}
```

### Formato de salida (Máquina → Jugador)
```json
{
  "next_move": "papel",
  "analysis": {
    "predictability_percentage": 66.7,
    "player_next_move_prediction": "piedra"
  }
}
```

### Ejecución en PowerShell con here-string
```powershell
@'
{"score":{"player":2,"machine":3},"history":{"player":["piedra","papel","tijeras","tijeras","piedra"],"machine":["papel","papel","tijeras","papel","piedra"]},"finish":false}
'@ | node .\main.js
```

Con `finish:true`, la respuesta es un análisis en texto plano (ignora el JSON de salida).

## Modo web con botones (nuevo)
Hemos añadido un servidor HTTP sencillo en `index.js` que reutiliza la IA de predicción.

1. Pon tu API key en `.env.local` (`OPENAI_API_KEY=...`).
2. Arranca el servidor web:
   ```bash
   node index.js --web   # por defecto en puerto 3000; cambia con PORT=4000 node index.js --web
   ```
3. Abre en el navegador:
   - `http://localhost:3000/rps.html` para jugar con botones (piedra/papel/tijeras), ver marcador, historial y resumen final (botón “Terminar partida”).
   - `http://localhost:3000/` sigue siendo la demo de chat contra el endpoint /api/chat.

### API de juego (para integraciones)
`POST /api/rps` con JSON:
```json
{
  "playerMove": "piedra",  // opcional si finish:true
  "finish": false,
  "state": {
    "score": { "player": 0, "machine": 0 },
    "history": { "player": [], "machine": [] }
  }
}
```
Respuesta normal:
```json
{
  "machineMove": "papel",
  "winner": "machine",
  "predictedPlayerMove": "piedra",
  "predictability": 66.7,
  "state": { "score": { "player": 0, "machine": 1 }, "history": { "player": ["piedra"], "machine": ["papel"] } }
}
```
Con `finish:true`, responde:
```json
{
  "summary": "Jugada más usada: ... Previsibilidad estimada: 42.8%.",
  "predictability": 42.8,
  "state": { ...último estado... }
}
```

## Lógica de predicción (resumen)
- Modelo de Markov de orden 1: mira la transición más frecuente desde tu último movimiento; si no hay suficiente historial, usa el movimiento más frecuente global; si no, cae a `piedra`.
- Porcentaje de previsibilidad: re-simula el predictor sobre tu historial y calcula aciertos.
- Jugada de la máquina: el movimiento que vence a la predicción de tu próxima jugada.
