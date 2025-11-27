const fs = require("fs");

const MOVES = ["piedra", "papel", "tijeras"];

const selectBest = (counts) => {
  let bestMove = null;
  let bestCount = -1;
  for (const move of MOVES) {
    const count = counts[move] || 0;
    if (count > bestCount) {
      bestMove = move;
      bestCount = count;
    }
  }
  return bestMove;
};

const predictPlayerNext = (historyPlayer) => {
  if (!historyPlayer || historyPlayer.length === 0) return "piedra";

  const transitions = Object.fromEntries(
    MOVES.map((m) => [m, Object.fromEntries(MOVES.map((n) => [n, 0]))])
  );

  for (let i = 0; i < historyPlayer.length - 1; i += 1) {
    const prev = historyPlayer[i];
    const nxt = historyPlayer[i + 1];
    if (transitions[prev] && MOVES.includes(nxt)) {
      transitions[prev][nxt] += 1;
    }
  }

  const lastMove = historyPlayer[historyPlayer.length - 1];
  const lastCounts = transitions[lastMove] || {};
  const totalLast = Object.values(lastCounts).reduce((a, b) => a + b, 0);
  if (totalLast > 0) {
    const candidate = selectBest(lastCounts);
    if (candidate) return candidate;
  }

  const overallCounts = Object.fromEntries(
    MOVES.map((m) => [m, historyPlayer.filter((x) => x === m).length])
  );
  const fallback = selectBest(overallCounts);
  return fallback || "piedra";
};

const computePredictability = (historyPlayer) => {
  if (!historyPlayer || historyPlayer.length < 2) return 0.0;
  let correct = 0;
  const total = historyPlayer.length - 1;
  for (let idx = 1; idx < historyPlayer.length; idx += 1) {
    const past = historyPlayer.slice(0, idx);
    const predicted = predictPlayerNext(past);
    if (predicted === historyPlayer[idx]) correct += 1;
  }
  return Math.round((correct / total) * 1000) / 10; // one decimal
};

const counterMove = (predictedPlayerMove) => {
  const beats = { piedra: "papel", papel: "tijeras", tijeras: "piedra" };
  return beats[predictedPlayerMove] || "piedra";
};

const summarizePattern = (historyPlayer, predictability) => {
  if (!historyPlayer || historyPlayer.length === 0) {
    return "No se registraron jugadas del jugador, no hay patrón que analizar.";
  }

  const counts = Object.fromEntries(
    MOVES.map((m) => [m, historyPlayer.filter((x) => x === m).length])
  );
  const mainMove = selectBest(counts) || "piedra";
  const mainShare = counts[mainMove] / historyPlayer.length;

  const transitions = Object.fromEntries(
    MOVES.map((m) => [m, Object.fromEntries(MOVES.map((n) => [n, 0]))])
  );
  for (let i = 0; i < historyPlayer.length - 1; i += 1) {
    const prev = historyPlayer[i];
    const nxt = historyPlayer[i + 1];
    if (transitions[prev] && MOVES.includes(nxt)) {
      transitions[prev][nxt] += 1;
    }
  }

  let dominantPair = null;
  let dominantCount = 0;
  for (const prev of MOVES) {
    for (const nxt of MOVES) {
      const count = transitions[prev][nxt];
      if (count > dominantCount) {
        dominantCount = count;
        dominantPair = [prev, nxt];
      }
    }
  }

  const deviations = [];
  if (mainShare < 0.5) {
    deviations.push("Distribución equilibrada: ninguna jugada supera el 50%.");
  } else {
    const leastMove = MOVES.reduce(
      (least, m) => (counts[m] < counts[least] ? m : least),
      MOVES[0]
    );
    deviations.push(`Rupturas frecuentes al cambiar de ${mainMove} a ${leastMove}.`);
  }

  const patternDesc =
    dominantPair && dominantCount > 0
      ? `Tendencia principal: tras ${dominantPair[0]} suele venir ${dominantPair[1]} (${dominantCount} veces).`
      : "No se detectó una transición dominante clara.";

  return `Jugada más usada: ${mainMove} (${counts[mainMove]} de ${historyPlayer.length}). ${patternDesc} ${deviations.join(" ")} Previsibilidad estimada: ${predictability}%.`;
};

const processTurn = (payload) => {
  const history = payload.history || {};
  const historyPlayer = history.player || [];
  const finish = Boolean(payload.finish);

  const predictability = computePredictability(historyPlayer);
  const predictedPlayerMove = predictPlayerNext(historyPlayer);
  const machineMove = counterMove(predictedPlayerMove);

  if (finish) {
    return summarizePattern(historyPlayer, predictability);
  }

  const response = {
    next_move: machineMove,
    analysis: {
      predictability_percentage: predictability,
      player_next_move_prediction: predictedPlayerMove,
    },
  };

  return JSON.stringify(response);
};

const decideWinner = (playerMove, machineMove) => {
  if (playerMove === machineMove) return "empate";
  const wins = {
    piedra: "tijeras",
    papel: "piedra",
    tijeras: "papel",
  };
  return wins[playerMove] === machineMove ? "player" : "machine";
};

const interactiveMain = () => {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const state = {
    score: { player: 0, machine: 0 },
    history: { player: [], machine: [] },
  };

  const promptMove = () => {
    rl.question(
      "Tu jugada (piedra/papel/tijeras) o 'salir' para terminar: ",
      (answer) => {
        const move = (answer || "").trim().toLowerCase();
        if (["salir", "fin", "exit", "q"].includes(move)) {
          const predictability = computePredictability(state.history.player);
          const summary = summarizePattern(
            state.history.player,
            predictability
          );
          console.log("\n--- Fin de partida ---");
          console.log(
            `Marcador final -> Tú: ${state.score.player} | Máquina: ${state.score.machine}`
          );
          console.log(summary);
          rl.close();
          return;
        }

        if (!MOVES.includes(move)) {
          console.log("Entrada no válida. Usa piedra, papel o tijeras.");
          promptMove();
          return;
        }

        const predictability = computePredictability(state.history.player);
        const predictedPlayerMove = predictPlayerNext(state.history.player);
        const machineMove = counterMove(predictedPlayerMove);

        const winner = decideWinner(move, machineMove);
        if (winner === "player") state.score.player += 1;
        if (winner === "machine") state.score.machine += 1;

        state.history.player.push(move);
        state.history.machine.push(machineMove);

        console.log(
          `Máquina juega: ${machineMove} | Resultado: ${
            winner === "empate" ? "Empate" : winner === "player" ? "Ganas" : "Pierdes"
          }`
        );
        console.log(
          `Predicción de tu siguiente jugada: ${predictedPlayerMove} | Previsibilidad: ${predictability}%`
        );
        console.log(
          `Marcador -> Tú: ${state.score.player} | Máquina: ${state.score.machine}\n`
        );
        promptMove();
      }
    );
  };

  console.log("Piedra, Papel o Tijeras - modo interactivo. Escribe salir para terminar.\n");
  promptMove();
};

const jsonMain = () => {
  const raw = fs.readFileSync(0, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.error("Entrada inválida: se esperaba un JSON.");
    process.exit(1);
  }

  const output = processTurn(data);
  process.stdout.write(output);
};

if (require.main === module) {
  if (process.stdin.isTTY) {
    interactiveMain();
  } else {
    jsonMain();
  }
}
