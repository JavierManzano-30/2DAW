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

## Lógica de predicción (resumen)
- Modelo de Markov de orden 1: mira la transición más frecuente desde tu último movimiento; si no hay suficiente historial, usa el movimiento más frecuente global; si no, cae a `piedra`.
- Porcentaje de previsibilidad: re-simula el predictor sobre tu historial y calcula aciertos.
- Jugada de la máquina: el movimiento que vence a la predicción de tu próxima jugada.
